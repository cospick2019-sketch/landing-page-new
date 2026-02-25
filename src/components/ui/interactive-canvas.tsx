"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface InteractiveCanvasProps {
  className?: string;
  /** Dot RGB — e.g. "79, 70, 229" (indigo-600) */
  rgb?: string;
  /** Number of floating dots */
  count?: number;
  /** Max connection distance in px */
  linkDist?: number;
  /** Mouse influence radius in px */
  mouseRadius?: number;
}

export function InteractiveCanvas({
  className,
  rgb = "79, 70, 229",
  count = 70,
  linkDist = 140,
  mouseRadius = 250,
}: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const dots = useRef<Dot[]>([]);
  const raf = useRef(0);

  const seed = useCallback(
    (w: number, h: number) => {
      dots.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.8,
      }));
    },
    [count]
  );

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = cvs.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (dots.current.length === 0) seed(w, h);
    };

    const onMove = (e: MouseEvent) => {
      const rect = cvs.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const pts = dots.current;

      // Update positions
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));
      }

      // Draw ambient connections + mouse-reactive connections + dots
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const dm = Math.hypot(a.x - mx, a.y - my);
        const nearMouse = dm < mouseRadius;

        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDist) {
            const linkFade = 1 - dist / linkDist;
            if (nearMouse) {
              // Bright connections near mouse
              const mouseFade = 1 - dm / mouseRadius;
              const alpha = linkFade * mouseFade * 0.4;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            } else if (dist < linkDist * 0.6) {
              // Subtle ambient connections always visible
              const alpha = linkFade * 0.06;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }

        // Dot — always visible, brighter near mouse
        const glow = nearMouse ? 1 + (1 - dm / mouseRadius) * 2.5 : 1;
        const dotAlpha = nearMouse
          ? 0.3 + (1 - dm / mouseRadius) * 0.5
          : 0.3;

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r * glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${dotAlpha})`;
        ctx.fill();
      }

      // Soft cursor glow
      if (mx > -999) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, mouseRadius * 0.6);
        grad.addColorStop(0, `rgba(${rgb}, 0.07)`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      raf.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    cvs.addEventListener("mousemove", onMove);
    cvs.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      cvs.removeEventListener("mousemove", onMove);
      cvs.removeEventListener("mouseleave", onLeave);
    };
  }, [seed, rgb, linkDist, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-auto absolute inset-0 h-full w-full", className)}
    />
  );
}
