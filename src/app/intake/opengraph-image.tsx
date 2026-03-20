import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "맞춤 견적을 위한 사전 확인서 | 랜딩픽";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            LP
          </div>
          <span
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.5px",
            }}
          >
            LANDING PICK
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.3,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          맞춤 견적을 위한
        </div>
        <div
          style={{
            fontSize: "52px",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.3,
            textAlign: "center",
            letterSpacing: "-1px",
          }}
        >
          사전 확인서
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: "24px",
            fontSize: "22px",
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
          }}
        >
          간단한 작성으로 정확한 견적을 받아보세요
        </div>

        {/* Badge */}
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "12px",
          }}
        >
          {["3~5분 소요", "13개 항목", "맞춤 견적"].map((text) => (
            <div
              key={text}
              style={{
                padding: "10px 20px",
                borderRadius: "50px",
                background: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.9)",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
