"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-14 md:pt-16 bg-white min-h-screen">
        <article className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            이용약관
          </h1>

          <div className="prose prose-gray prose-sm md:prose-base max-w-none space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제1조 (목적)
              </h2>
              <p>
                본 약관은 주식회사 픽소코퍼레이션(이하 &ldquo;회사&rdquo;)이
                운영하는 Landing Pick 서비스(이하 &ldquo;서비스&rdquo;)의 이용과
                관련하여 회사와 이용자 간의 권리, 의무 및 기타 필요한 사항을
                규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제2조 (정의)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  &ldquo;서비스&rdquo;란 회사가 제공하는 랜딩페이지 기획, 디자인,
                  개발 및 관련 컨설팅 서비스를 의미합니다.
                </li>
                <li>
                  &ldquo;이용자&rdquo;란 본 약관에 따라 회사가 제공하는 서비스를
                  이용하는 자를 의미합니다.
                </li>
                <li>
                  &ldquo;상담 신청&rdquo;이란 이용자가 서비스 이용을 위해
                  웹사이트를 통해 정보를 제출하는 행위를 의미합니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제3조 (약관의 효력 및 변경)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게
                  공지함으로써 효력이 발생합니다.
                </li>
                <li>
                  회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수
                  있으며, 변경 시 적용일자 및 변경사유를 명시하여 현행 약관과 함께
                  서비스 화면에 그 적용일자 7일 전부터 공지합니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제4조 (서비스의 제공 및 변경)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  회사는 다음과 같은 서비스를 제공합니다.
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>랜딩페이지 기획 및 카피라이팅</li>
                    <li>웹 디자인 및 퍼블리싱</li>
                    <li>광고 마케팅 컨설팅</li>
                    <li>기타 회사가 정하는 서비스</li>
                  </ul>
                </li>
                <li>
                  회사는 서비스의 내용을 변경할 수 있으며, 변경 시 변경 내용을
                  사전에 공지합니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제5조 (서비스 이용 계약)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  서비스 이용 계약은 이용자가 상담 신청을 완료하고, 회사가 이를
                  승낙함으로써 성립됩니다.
                </li>
                <li>
                  구체적인 서비스 범위, 비용, 일정 등은 별도의 계약서 또는
                  견적서를 통해 합의합니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제6조 (이용자의 의무)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  이용자는 상담 신청 시 정확한 정보를 제공해야 하며, 허위 정보
                  제공에 따른 불이익에 대해 회사는 책임지지 않습니다.
                </li>
                <li>
                  이용자는 서비스 이용 과정에서 관련 법령 및 본 약관의 규정을
                  준수해야 합니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제7조 (회사의 의무)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  회사는 관련 법령과 본 약관에서 정하는 바에 따라 지속적이고
                  안정적인 서비스를 제공하기 위해 최선을 다합니다.
                </li>
                <li>
                  회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을
                  수립하고 준수합니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제8조 (지식재산권)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  서비스를 통해 제작된 결과물의 저작권 및 지식재산권은 별도의
                  계약에서 정한 바에 따릅니다.
                </li>
                <li>
                  대금 완납 전까지 제작물의 저작권은 회사에 귀속되며, 대금 완납
                  후 이용자에게 이전됩니다.
                </li>
                <li>
                  회사가 제작물의 소스코드를 이용자에게 제공하는 경우, 해당
                  소스코드는 본 계약으로 제작된 단일 프로젝트에 한해서만 사용할
                  수 있으며, 이용자는 아래 행위를 할 수 없습니다.
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      소스코드의 전부 또는 일부를 제3자에게 판매, 양도, 대여,
                      배포하는 행위
                    </li>
                    <li>
                      소스코드를 기반으로 다른 웹사이트·템플릿·제품을 제작하여
                      영리 목적으로 사용하는 행위
                    </li>
                    <li>
                      회사의 디자인 시스템, 컴포넌트 구조, 설정 체계 등
                      제작물에 내재된 기술적 구성 요소를 독립적으로 추출·복제하여
                      재사용하는 행위
                    </li>
                    <li>
                      소스코드 내에 포함된 회사의 저작권 표시, 식별 정보 등을
                      임의로 제거·변경하는 행위
                    </li>
                  </ul>
                </li>
                <li>
                  전항의 의무는 제작물의 저작권이 이용자에게 이전된 이후에도
                  회사가 기 개발하여 재사용 가능한 템플릿·디자인 시스템·공통
                  컴포넌트 등 회사 고유 자산에 대해서는 계속 유효합니다. 즉,
                  이용자는 본 프로젝트 결과물 자체에 대한 사용 권리를 가지되,
                  회사의 범용 제작 자산에 대한 독립적 사용 권리를 갖지는
                  않습니다.
                </li>
                <li>
                  이용자가 본 조항을 위반한 경우, 회사는 소스코드 사용 권한의
                  즉시 소멸을 통보할 수 있으며, 이로 인해 발생한 손해에 대하여
                  배상을 청구할 수 있습니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제9조 (환불 규정)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  작업 착수 전: 계약금 전액 환불이 가능합니다.
                </li>
                <li>
                  작업 착수 후: 진행 단계에 따라 환불 금액이 차등 적용되며,
                  구체적인 환불 기준은 개별 계약에서 정합니다.
                </li>
                <li>
                  최종 납품 완료 후에는 환불이 불가합니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제10조 (면책 조항)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등
                  불가항력적 사유로 인하여 서비스를 제공할 수 없는 경우 책임이
                  면제됩니다.
                </li>
                <li>
                  회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임을
                  지지 않습니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                제11조 (분쟁 해결)
              </h2>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  본 약관과 관련하여 분쟁이 발생한 경우, 회사와 이용자는 상호
                  협의하여 해결하도록 합니다.
                </li>
                <li>
                  협의가 이루어지지 않을 경우, 관할 법원은 회사 소재지의
                  법원으로 합니다.
                </li>
              </ol>
            </section>

            <section className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500">
                본 약관은 2026년 3월 9일부터 시행됩니다.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                주식회사 픽소코퍼레이션 | 대표 윤서준
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
