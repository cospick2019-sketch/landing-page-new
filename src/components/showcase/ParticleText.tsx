"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SHOWCASE_PARTICLE } from "@/constants/content";
import { SHOWCASE_THEME } from "@/constants/theme";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  size: number;
  alpha: number;
}

const PARTICLE_COLOR = "79, 70, 229"; // indigo-600
const PARTICLE_COUNT = 600;
const MOUSE_RADIUS = 80;
const LERP_SPEED = 0.06;
const DISPERSE_FORCE = 6;

export default function ParticleText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const convergedRef = useRef(false);
  const [ready, setReady] = useState(false);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w === 0 || h === 0) return;
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Render text to offscreen canvas for sampling
    const offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    const fontSize = Math.min(w * 0.28, 160);
    offCtx.font = `900 ${fontSize}px Pretendard Variable, sans-serif`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillStyle = "#000";
    offCtx.fillText(SHOWCASE_PARTICLE.text, w / 2, h / 2);

    const imageData = offCtx.getImageData(0, 0, w, h);
    const positions: { x: number; y: number }[] = [];

    // Sample every 3rd pixel for performance
    for (let y = 0; y < h; y += 3) {
      for (let x = 0; x < w; x += 3) {
        const idx = (y * w + x) * 4;
        if (imageData.data[idx + 3] > 128) {
          positions.push({ x, y });
        }
      }
    }

    // Randomly select target positions
    const shuffled = positions.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(PARTICLE_COUNT, shuffled.length));

    particlesRef.current = selected.map((pos) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      targetX: pos.x,
      targetY: pos.y,
      originX: Math.random() * w,
      originY: Math.random() * h,
      size: Math.random() * 1.5 + 1,
      alpha: Math.random() * 0.5 + 0.3,
    }));

    setReady(true);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const converged = convergedRef.current;

    for (const p of particlesRef.current) {
      let tx = converged ? p.targetX : p.originX;
      let ty = converged ? p.targetY : p.originY;

      // Mouse dispersion
      if (converged) {
        const dist = Math.hypot(p.x - mx, p.y - my);
        if (dist < MOUSE_RADIUS) {
          const angle = Math.atan2(p.y - my, p.x - mx);
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * DISPERSE_FORCE;
          p.x += Math.cos(angle) * force;
          p.y += Math.sin(angle) * force;
        }
      }

      // Lerp toward target
      p.x += (tx - p.x) * LERP_SPEED;
      p.y += (ty - p.y) * LERP_SPEED;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${p.alpha})`;
      ctx.fill();
    }

    ctx.restore();
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  // Init and cleanup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => initParticles(canvas);

    // Wait for font to load
    document.fonts.ready.then(() => {
      initParticles(canvas);

      // Start converging after 600ms
      setTimeout(() => {
        convergedRef.current = true;
      }, 600);
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [initParticles, animate]);

  return (
    <div className={cn(SHOWCASE_THEME.card, "p-0 overflow-hidden relative")}>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: 420 }}
      />
      {ready && (
        <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-400">
          {SHOWCASE_PARTICLE.subtitle}
        </p>
      )}
    </div>
  );
}
