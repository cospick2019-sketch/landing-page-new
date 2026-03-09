"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConsultationProvider } from "@/components/consultation/ConsultationContext";
import ConsultationForm from "@/components/consultation/ConsultationForm";

export default function PrivacyPage() {
  return (
    <ConsultationProvider>
      <Header />
      <main className="pt-14 md:pt-16 bg-white min-h-screen">
        <article className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            개인정보처리방침
          </h1>

          <div className="prose prose-gray prose-sm md:prose-base max-w-none space-y-8 text-gray-700 leading-relaxed">
            <p>
              주식회사 픽소코퍼레이션(이하 &ldquo;회사&rdquo;)은 개인정보보호법,
              정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령에 따라
              이용자의 개인정보를 보호하고, 이와 관련된 고충을 신속하고 원활하게
              처리할 수 있도록 다음과 같이 개인정보처리방침을 수립합니다.
            </p>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제1조 (수집하는 개인정보 항목 및 수집 방법)
              </h2>
              <p className="mb-2">
                회사는 상담 신청 및 서비스 제공을 위해 다음과 같은 개인정보를
                수집합니다.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 md:p-5 space-y-3">
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    필수 수집 항목
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>성함 (담당자명)</li>
                    <li>연락처 (휴대폰 번호)</li>
                    <li>업종/카테고리</li>
                    <li>문의 내용</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    선택 수집 항목
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>예산 범위</li>
                    <li>현재 운영 중인 쇼핑몰/사이트 URL</li>
                    <li>기타 참고 자료</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">수집 방법</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>웹사이트 내 상담 신청 폼</li>
                    <li>이메일, 전화 등을 통한 직접 문의</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제2조 (개인정보의 수집 및 이용 목적)
              </h2>
              <p className="mb-2">
                회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>서비스 상담 및 견적 안내</li>
                <li>서비스 계약 체결 및 이행</li>
                <li>고객 문의 응대 및 불만 처리</li>
                <li>서비스 개선 및 신규 서비스 개발을 위한 통계 분석</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제3조 (개인정보의 보유 및 이용 기간)
              </h2>
              <p className="mb-2">
                회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체
                없이 파기합니다. 단, 관련 법령에 따라 보존이 필요한 경우 해당
                기간 동안 보관합니다.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 md:p-5 space-y-2 text-sm">
                <p>
                  <span className="font-medium text-gray-900">
                    상담 신청 정보:
                  </span>{" "}
                  상담 완료 후 3년 (전자상거래법)
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    계약 및 결제 정보:
                  </span>{" "}
                  5년 (전자상거래법)
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    웹사이트 방문 기록:
                  </span>{" "}
                  3개월 (통신비밀보호법)
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제4조 (개인정보의 제3자 제공)
              </h2>
              <p>
                회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
                다만, 다음의 경우에는 예외로 합니다.
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의한 경우</li>
                <li>
                  수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가
                  있는 경우
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제5조 (개인정보의 파기 절차 및 방법)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  <span className="font-medium">파기 절차:</span> 수집 목적이
                  달성된 개인정보는 별도의 DB로 옮겨져 내부 방침 및 관련 법령에
                  따라 일정 기간 보관 후 파기됩니다.
                </li>
                <li>
                  <span className="font-medium">파기 방법:</span> 전자적 파일
                  형태의 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여
                  삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나
                  소각합니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제6조 (이용자의 권리와 행사 방법)
              </h2>
              <p className="mb-2">
                이용자는 언제든지 다음의 권리를 행사할 수 있습니다.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>개인정보 열람 요구</li>
                <li>개인정보 정정 요구</li>
                <li>개인정보 삭제 요구</li>
                <li>개인정보 처리 정지 요구</li>
              </ul>
              <p className="mt-2">
                위 권리 행사는 이메일(cospick2019@gmail.com)을 통해 요청하실 수
                있으며, 회사는 지체 없이 조치하겠습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제7조 (개인정보의 안전성 확보 조치)
              </h2>
              <p className="mb-2">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
                있습니다.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>개인정보 접근 권한 제한</li>
                <li>개인정보의 암호화</li>
                <li>해킹 등에 대비한 기술적 대책</li>
                <li>개인정보 취급 직원의 최소화 및 교육</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제8조 (쿠키의 사용)
              </h2>
              <p>
                회사는 이용자에게 최적화된 서비스를 제공하기 위해 쿠키(Cookie)를
                사용할 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키의 설치를
                거부할 수 있으나, 이 경우 서비스 이용에 일부 제한이 있을 수
                있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제9조 (개인정보 보호책임자)
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 md:p-5 text-sm space-y-1">
                <p>
                  <span className="font-medium text-gray-900">성명:</span>{" "}
                  윤서준
                </p>
                <p>
                  <span className="font-medium text-gray-900">직책:</span>{" "}
                  대표이사
                </p>
                <p>
                  <span className="font-medium text-gray-900">이메일:</span>{" "}
                  cospick2019@gmail.com
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제10조 (개인정보 침해 관련 상담 및 신고)
              </h2>
              <p className="mb-2">
                개인정보 침해에 대한 상담이 필요한 경우 아래 기관에 문의하실 수
                있습니다.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  개인정보침해신고센터 (한국인터넷진흥원): 118 /
                  privacy.kisa.or.kr
                </li>
                <li>
                  개인정보 분쟁조정위원회: 1833-6972 / kopico.go.kr
                </li>
                <li>대검찰청 사이버수사과: 1301 / spo.go.kr</li>
                <li>경찰청 사이버수사국: 182 / ecrm.police.go.kr</li>
              </ul>
            </section>

            <section className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500">
                본 개인정보처리방침은 2026년 3월 9일부터 시행됩니다.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                주식회사 픽소코퍼레이션 | 대표 윤서준
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
      <ConsultationForm />
    </ConsultationProvider>
  );
}
