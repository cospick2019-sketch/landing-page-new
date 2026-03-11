"use client";

import { useState } from "react";

const KAKAO_CHAT_URL = "http://pf.kakao.com/_DLuZX/chat";
const KAKAO_CHANNEL_URL = "http://pf.kakao.com/_DLuZX";

export default function KakaoFloatingButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-2">
      {/* 펼침 메뉴 */}
      {expanded && (
        <div className="flex flex-col gap-2">
          <a
            href={KAKAO_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FEE500] text-[#3C1E1E] text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.4-.99 3.63 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.85.56.08 1.14.12 1.72.12 5.52 0 10-3.58 10-7.82C22 6.58 17.52 3 12 3Z"
                fill="#3C1E1E"
              />
            </svg>
            상담하기
          </a>
          <a
            href={KAKAO_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#3C1E1E] text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap border border-gray-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="#3C1E1E" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            채널 추가
          </a>
        </div>
      )}

      {/* 메인 버튼 - 항상 노출 */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-label="카카오톡 메뉴"
        className="flex items-center justify-center w-14 h-14 md:w-[60px] md:h-[60px] rounded-full bg-[#FEE500] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}
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
  );
}
