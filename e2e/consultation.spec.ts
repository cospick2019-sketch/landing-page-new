import { test, expect } from "@playwright/test";

/* ──────────────────────────────────────────────
   상담 신청 폼 E2E 테스트
   ────────────────────────────────────────────── */

test.describe("상담 신청 모달", () => {
  test("CTA 버튼 클릭 → 모달 오픈 → 3단계 폼 진행", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // 헤더 "상담 신청" 버튼 클릭
    const ctaBtn = page.getByRole("button", { name: "상담 신청" }).first();
    await ctaBtn.click();

    // Step 1: 사이트 유형 선택
    await expect(page.getByText("어떤 유형의 사이트를")).toBeVisible({ timeout: 5000 });
    const landingOption = page.getByText("랜딩페이지");
    await landingOption.click();

    // Step 2: 필수 정보 입력
    await expect(page.getByText("기본 정보를")).toBeVisible({ timeout: 5000 });

    await page.getByPlaceholder("업종").fill("테스트 업종");
    await page.getByPlaceholder("이름").fill("테스트");
    await page.getByPlaceholder("연락처").fill("010-0000-0000");

    const nextBtn = page.getByRole("button", { name: "다음" });
    await nextBtn.click();

    // Step 3: 추가 정보 (선택)
    await expect(page.getByText("추가 정보")).toBeVisible({ timeout: 5000 });
  });

  test("필수 입력 누락 시 다음 버튼 비활성화", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    const ctaBtn = page.getByRole("button", { name: "상담 신청" }).first();
    await ctaBtn.click();

    // 랜딩페이지 선택
    await page.getByText("랜딩페이지").click();

    // 이름만 입력 (업종, 연락처 비어있음)
    await page.getByPlaceholder("이름").fill("테스트");

    const nextBtn = page.getByRole("button", { name: "다음" });
    await expect(nextBtn).toBeDisabled();
  });
});

/* ──────────────────────────────────────────────
   페이지 네비게이션 테스트
   ────────────────────────────────────────────── */

test.describe("네비게이션", () => {
  test("헤더 메뉴에서 서브페이지 이동", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // 포트폴리오 이동
    await page.getByRole("link", { name: "포트폴리오" }).click();
    await expect(page).toHaveURL("/portfolio");

    // 가격 안내 이동
    await page.getByRole("link", { name: "가격 안내" }).click();
    await expect(page).toHaveURL("/pricing");

    // 로고 클릭으로 메인 복귀
    await page.getByRole("link", { name: "Landing Pick" }).click();
    await expect(page).toHaveURL("/");
  });

  test("가격 안내 페이지 메타데이터가 올바르다", async ({ page }) => {
    await page.goto("/pricing", { waitUntil: "networkidle" });
    await expect(page).toHaveTitle(/가격 안내/);
  });

  test("포트폴리오 페이지 메타데이터가 올바르다", async ({ page }) => {
    await page.goto("/portfolio", { waitUntil: "networkidle" });
    await expect(page).toHaveTitle(/포트폴리오/);
  });
});

/* ──────────────────────────────────────────────
   어드민 인증 테스트
   ────────────────────────────────────────────── */

test.describe("어드민 인증", () => {
  test("비밀번호 없이 접근 시 로그인 화면 표시", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "networkidle" });
    await expect(page.getByText("관리자 인증")).toBeVisible();
    await expect(page.getByText("상담 신청 관리")).not.toBeVisible();
  });

  test("잘못된 비밀번호 입력 시 에러 표시", async ({ page }) => {
    await page.goto("/admin", { waitUntil: "networkidle" });
    await page.getByPlaceholder("비밀번호").fill("wrong-password");
    await page.getByRole("button", { name: "로그인" }).click();
    await expect(page.getByText("비밀번호가 올바르지 않습니다")).toBeVisible({ timeout: 5000 });
  });

  test("API가 인증 없이 401 반환", async ({ request }) => {
    const res = await request.get("/api/consultation");
    expect(res.status()).toBe(401);
  });
});
