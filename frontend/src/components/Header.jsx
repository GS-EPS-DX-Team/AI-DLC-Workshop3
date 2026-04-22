import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-14 px-4 bg-white border-b border-gray-200 shrink-0">
      <h1 className="text-lg font-bold text-gray-900">
        말해 뭐해
      </h1>
      <nav className="flex items-center gap-1" aria-label="메인 내비게이션">
        <NavLink
          to="/user"
          className={({ isActive }) =>
            isActive
              ? "px-3 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              : "px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }
          data-testid="nav-user"
        >
          사용자
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive
              ? "px-3 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              : "px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }
          data-testid="nav-admin"
        >
          관리자
        </NavLink>
      </nav>
    </header>
  );
}
