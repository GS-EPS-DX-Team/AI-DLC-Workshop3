import React from "react";

export default function ThemeFilter({ themes, selectedTheme, onThemeChange }) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      role="group"
      aria-label="테마 필터"
      data-testid="theme-filter"
    >
      {/* "전체" (All) pill */}
      <button
        type="button"
        onClick={() => onThemeChange(null)}
        className={`shrink-0 px-3 py-1.5 text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          selectedTheme === null
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
        }`}
        aria-pressed={selectedTheme === null}
        data-testid="theme-filter-all"
      >
        전체
      </button>

      {/* Theme pills */}
      {themes.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onThemeChange(theme.id)}
          className={`shrink-0 px-3 py-1.5 text-sm font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            selectedTheme === theme.id
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
          aria-pressed={selectedTheme === theme.id}
          data-testid={`theme-filter-${theme.id}`}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
}
