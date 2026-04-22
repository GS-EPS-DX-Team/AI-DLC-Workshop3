import React from "react";
import StoryRow from "./StoryRow";

export default function StoryList({
  stories,
  selectedIds,
  onToggle,
  onToggleAll,
  onStoryClick,
  themeMap,
}) {
  // Determine if all visible stories are selected
  const allVisibleSelected =
    stories.length > 0 && stories.every((s) => selectedIds.has(s.id));
  const someVisibleSelected =
    !allVisibleSelected && stories.some((s) => selectedIds.has(s.id));

  return (
    <div data-testid="story-list">
      {/* Desktop header row */}
      <div
        className="hidden md:grid md:grid-cols-[40px_1fr_120px_120px_100px] gap-4 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200"
        role="row"
        aria-hidden="true"
      >
        {/* Select all checkbox */}
        <span className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={allVisibleSelected}
            ref={(el) => {
              if (el) el.indeterminate = someVisibleSelected;
            }}
            onChange={onToggleAll}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
            aria-label="전체 선택"
            data-testid="select-all-checkbox"
          />
        </span>
        <span>유저스토리</span>
        <span>테마</span>
        <span>시스템 지원</span>
        <span>날짜</span>
      </div>

      {/* Mobile select-all row */}
      <div className="md:hidden flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
        <input
          type="checkbox"
          checked={allVisibleSelected}
          ref={(el) => {
            if (el) el.indeterminate = someVisibleSelected;
          }}
          onChange={onToggleAll}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
          aria-label="전체 선택"
          data-testid="select-all-checkbox-mobile"
        />
        <span className="text-xs font-medium text-gray-500">전체 선택</span>
      </div>

      {/* Story rows */}
      <div role="list" aria-label="유저스토리 목록">
        {stories.map((story) => (
          <StoryRow
            key={story.id}
            story={story}
            themeName={themeMap.get(story.theme_id) || ""}
            isSelected={selectedIds.has(story.id)}
            onToggle={onToggle}
            onRowClick={() => onStoryClick(story.id)}
          />
        ))}
      </div>
    </div>
  );
}
