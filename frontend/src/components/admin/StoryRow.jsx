import React from "react";
import SystemSupportBadge from "./SystemSupportBadge";
import { formatDate } from "../../utils/dateFormatter";

function truncateText(text, maxLength = 60) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export default function StoryRow({ story, themeName, onRowClick }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[1fr_120px_120px_100px] gap-2 md:gap-4 px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
      role="listitem"
      onClick={onRowClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onRowClick();
        }
      }}
      tabIndex={0}
      aria-label={`유저스토리: ${truncateText(story.story, 40)}`}
      data-testid={`story-row-${story.id}`}
    >
      {/* Story summary */}
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-sm text-gray-900 truncate md:overflow-visible md:whitespace-normal md:line-clamp-1">
          {truncateText(story.story)}
        </p>
        {/* Mobile-only: show theme and badge inline */}
        <div className="flex items-center gap-2 md:hidden">
          {themeName && (
            <span className="inline-block px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
              {themeName}
            </span>
          )}
          <SystemSupportBadge status={story.system_support} />
          <span className="text-xs text-gray-400">
            {formatDate(story.created_at)}
          </span>
        </div>
      </div>

      {/* Theme badge (desktop only) */}
      <div className="hidden md:flex md:items-center">
        {themeName && (
          <span className="inline-block px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full truncate max-w-full">
            {themeName}
          </span>
        )}
      </div>

      {/* System support badge (desktop only) */}
      <div className="hidden md:flex md:items-center">
        <SystemSupportBadge status={story.system_support} />
      </div>

      {/* Date (desktop only) */}
      <div className="hidden md:flex md:items-center">
        <span className="text-sm text-gray-500">
          {formatDate(story.created_at)}
        </span>
      </div>
    </div>
  );
}
