import React from "react";
import StoryRow from "./StoryRow";

export default function StoryList({ stories, onStoryClick, themeMap }) {
  return (
    <div data-testid="story-list">
      {/* Desktop header row */}
      <div
        className="hidden md:grid md:grid-cols-[1fr_120px_120px_100px] gap-4 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200"
        role="row"
        aria-hidden="true"
      >
        <span>유저스토리</span>
        <span>테마</span>
        <span>시스템 지원</span>
        <span>날짜</span>
      </div>

      {/* Story rows */}
      <div role="list" aria-label="유저스토리 목록">
        {stories.map((story) => (
          <StoryRow
            key={story.id}
            story={story}
            themeName={themeMap.get(story.theme_id) || ""}
            onRowClick={() => onStoryClick(story.id)}
          />
        ))}
      </div>
    </div>
  );
}
