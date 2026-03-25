import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-[#030513] px-5 text-center">
      <p className="text-8xl font-black text-indigo-600">404</p>
      <h1 className="mt-4 text-2xl md:text-3xl font-bold text-white">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-3 text-gray-400 text-base max-w-md">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
