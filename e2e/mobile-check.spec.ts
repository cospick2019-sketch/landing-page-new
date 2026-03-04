import { test, expect } from "@playwright/test";
import path from "path";

/* ──────────────────────────────────────────────
   Landing Pick — 모바일/데스크톱 자동 검증 테스트
   사용법: npx playwright test
   ────────────────────────────────────────────── */

const SECTIONS = [
  "hero",
  "problem",
  "solution",
  "marketing",
  "proof",
  "guarantee",
  "faq",
  "cta",
] as const;

const screenshotDir = path.join(__dirname, "screenshots");

// ─── 테스트 1: 가로 overflow 감지 ───────────────────────

test.describe("가로 overflow 감지", () => {
  test("페이지 전체에서 가로 스크롤이 발생하지 않아야 한다", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    // dynamic import 로딩 대기
    await page.waitForTimeout(2000);

    const overflows: string[] = [];

    for (const id of SECTIONS) {
      const el = page.locator(`#${id}`);
      if ((await el.count()) === 0) continue;

      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      const hasOverflow = await page.evaluate(() => {
        return (
          document.documentElement.scrollWidth > window.innerWidth
        );
      });

      if (hasOverflow) {
        overflows.push(id);
      }
    }

    // footer 영역도 체크
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    const footerOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    if (footerOverflow) overflows.push("footer");

    expect(
      overflows,
      `가로 overflow 발생 섹션: ${overflows.join(", ")}`
    ).toHaveLength(0);
  });
});

// ─── 테스트 2: 전 섹션 스크린샷 캡처 ──────────────────

test.describe("전 섹션 스크린샷", () => {
  test("각 섹션별 스크린샷을 캡처한다", async ({ page }, testInfo) => {
    const device = testInfo.project.name; // "mobile" or "desktop"

    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    // 헤더 스크린샷 (페이지 최상단)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(screenshotDir, `${device}-header.png`),
    });

    // 각 섹션 스크린샷
    for (const id of SECTIONS) {
      const el = page.locator(`#${id}`);
      if ((await el.count()) === 0) continue;

      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(screenshotDir, `${device}-${id}.png`),
      });
    }

    // 푸터 스크린샷
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(screenshotDir, `${device}-footer.png`),
    });
  });
});

// ─── 테스트 3: 깨진 리소스 감지 ─────────────────────────

test.describe("깨진 리소스 감지", () => {
  test("404 리소스가 없어야 한다 (grid.svg 제외)", async ({ page }) => {
    const errors404: string[] = [];

    page.on("response", (response) => {
      if (response.status() === 404) {
        const url = response.url();
        // 알려진 이슈 제외
        if (url.endsWith("/grid.svg")) return;
        errors404.push(url);
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    // 전체 스크롤하여 lazy-load 리소스 트리거
    await page.evaluate(async () => {
      const delay = (ms: number) =>
        new Promise((r) => setTimeout(r, ms));
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += 500) {
        window.scrollTo(0, y);
        await delay(200);
      }
    });
    await page.waitForTimeout(1000);

    expect(
      errors404,
      `404 리소스: ${errors404.join(", ")}`
    ).toHaveLength(0);
  });

  test("깨진 이미지가 없어야 한다", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    // 전체 스크롤
    await page.evaluate(async () => {
      const delay = (ms: number) =>
        new Promise((r) => setTimeout(r, ms));
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += 500) {
        window.scrollTo(0, y);
        await delay(200);
      }
    });
    await page.waitForTimeout(1000);

    const brokenImages = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      return imgs
        .filter((img) => {
          // 투명 전환용 이미지 (opacity: 0) 제외
          const style = window.getComputedStyle(img);
          if (style.opacity === "0") return false;
          return img.complete && img.naturalWidth === 0;
        })
        .map((img) => img.src);
    });

    expect(
      brokenImages,
      `깨진 이미지: ${brokenImages.join(", ")}`
    ).toHaveLength(0);
  });
});
