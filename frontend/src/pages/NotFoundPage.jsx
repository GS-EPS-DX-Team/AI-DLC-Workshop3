import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center" data-testid="not-found-page">
      <p className="text-6xl font-bold text-gray-300 mb-4" aria-hidden="true">
        404
      </p>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-500 mb-6">
        요청하신 페이지가 존재하지 않습니다.
      </p>
      <div className="flex gap-3">
        <Link
          to="/user"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          data-testid="not-found-user-link"
        >
          사용자 페이지로 이동
        </Link>
        <Link
          to="/admin"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          data-testid="not-found-admin-link"
        >
          관리자 페이지로 이동
        </Link>
      </div>
    </div>
  );
}
