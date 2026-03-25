"use client";

import { motion, AnimatePresence } from "motion/react";
import { useConsultation } from "@/components/consultation/ConsultationContext";

export default function FloatingConsultationBanner() {
  const { open: openConsultation, isOpen } = useConsultation();

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            position: "fixed",
            bottom: 100,
            right: 20,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* 말풍선 */}
          <div
            style={{
              position: "absolute",
              right: 70,
              top: "50%",
              transform: "translateY(-50%)",
              padding: "10px 16px",
              borderRadius: 14,
              backgroundColor: "#4F46E5",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(79,70,229,0.3), 0 2px 6px rgba(0,0,0,0.1)",
              letterSpacing: "-0.3px",
            }}
          >
            무료 상담
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: -6,
                transform: "translateY(-50%) rotate(45deg)",
                width: 12,
                height: 12,
                backgroundColor: "#4F46E5",
              }}
            />
          </div>

          {/* 원형 버튼 */}
          <button
            type="button"
            onClick={openConsultation}
            aria-label="무료 상담 신청"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "#4F46E5",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(79,70,229,0.35)",
              transition: "background-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = "#4338CA";
              btn.style.boxShadow = "0 6px 20px rgba(79,70,229,0.5)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.backgroundColor = "#4F46E5";
              btn.style.boxShadow = "0 4px 12px rgba(79,70,229,0.35)";
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              <path d="M8 9h8M8 13h4" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
