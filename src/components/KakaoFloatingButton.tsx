"use client";

import { useCallback } from "react";

const KAKAO_CHANNEL_ID = "_DLuZX";
const KAKAO_CHAT_URL = `http://pf.kakao.com/${KAKAO_CHANNEL_ID}/chat`;

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
        alignItems: "center",
      }}
    >
      {/* 말풍선 — 정적, 바운스 없음 */}
      <div
        style={{
          position: "absolute",
          right: 70,
          padding: "10px 16px",
          borderRadius: 14,
          backgroundColor: "#FEE500",
          color: "#3C1E1E",
          fontSize: 14,
          fontWeight: 700,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 12px rgba(254,229,0,0.3), 0 2px 6px rgba(0,0,0,0.1)",
          letterSpacing: "-0.3px",
        }}
      >
        카톡 상담
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: -6,
            transform: "translateY(-50%) rotate(45deg)",
            width: 12,
            height: 12,
            backgroundColor: "#FEE500",
          }}
        />
      </div>

      {/* 원형 버튼 — 바로 채팅 연결 */}
      <button
        type="button"
        onClick={openChat}
        aria-label="카카오톡 상담"
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.4-.99 3.63 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.85.56.08 1.14.12 1.72.12 5.52 0 10-3.58 10-7.82C22 6.58 17.52 3 12 3Z"
            fill="#3C1E1E"
          />
        </svg>
      </button>
    </div>
  );
}
