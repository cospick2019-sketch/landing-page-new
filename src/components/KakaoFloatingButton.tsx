"use client";

import { useState, useCallback } from "react";

const KAKAO_CHANNEL_ID = "_DLuZX";
const KAKAO_CHAT_URL = `http://pf.kakao.com/${KAKAO_CHANNEL_ID}/chat`;
const KAKAO_CHANNEL_URL = `http://pf.kakao.com/${KAKAO_CHANNEL_ID}`;

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      Channel: {
        chat: (options: { channelPublicId: string }) => void;
      };
    };
  }
}

function isMobile() {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export default function KakaoFloatingButton() {
  const [expanded, setExpanded] = useState(false);

  const openChat = useCallback(() => {
    if (isMobile()) {
      window.open(KAKAO_CHAT_URL, "_blank");
      return;
    }
    try {
      if (window.Kakao?.isInitialized() && window.Kakao.Channel) {
        window.Kakao.Channel.chat({ channelPublicId: KAKAO_CHANNEL_ID });
      } else {
        window.open(KAKAO_CHAT_URL, "_blank");
      }
    } catch {
      window.open(KAKAO_CHAT_URL, "_blank");
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      {expanded && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            type="button"
            onClick={openChat}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 999,
              backgroundColor: "#FEE500",
              color: "#3C1E1E",
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.4-.99 3.63 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.85.56.08 1.14.12 1.72.12 5.52 0 10-3.58 10-7.82C22 6.58 17.52 3 12 3Z"
                fill="#3C1E1E"
              />
            </svg>
            상담하기
          </button>
          <a
            href={KAKAO_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 999,
              backgroundColor: "#fff",
              color: "#3C1E1E",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              border: "1px solid #e5e7eb",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="#3C1E1E" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            채널 추가
          </a>
        </div>
      )}

      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {!expanded && (
          <div
            style={{
              position: "absolute",
              right: 70,
              padding: "12px 20px",
              borderRadius: 16,
              backgroundColor: "#FEE500",
              color: "#3C1E1E",
              fontSize: 15,
              fontWeight: 800,
              whiteSpace: "nowrap",
              boxShadow: "0 6px 20px rgba(254,229,0,0.4), 0 2px 8px rgba(0,0,0,0.15)",
              animation: "kakao-bubble 1.5s ease-in-out infinite",
              letterSpacing: "-0.3px",
            }}
          >
            💬 견적문의 클릭!
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: -7,
                transform: "translateY(-50%) rotate(45deg)",
                width: 14,
                height: 14,
                backgroundColor: "#FEE500",
              }}
            />
            <style>{`
              @keyframes kakao-bubble {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-6px); }
              }
            `}</style>
          </div>
        )}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label="카카오톡 메뉴"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "#FEE500",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            transition: "transform 0.3s",
            transform: expanded ? "rotate(45deg)" : "none",
          }}
        >
          {expanded ? (
            <path d="M12 5v14M5 12h14" stroke="#3C1E1E" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <path
              d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.4-.99 3.63 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.85.56.08 1.14.12 1.72.12 5.52 0 10-3.58 10-7.82C22 6.58 17.52 3 12 3Z"
              fill="#3C1E1E"
            />
          )}
        </svg>
        </button>
      </div>
    </div>
  );
}
