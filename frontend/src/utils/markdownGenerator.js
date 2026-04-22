import { formatDateTime } from "./dateFormatter";

/**
 * Generates a markdown string from selected user stories, grouped by theme.
 * Follows BR-006 export format specification.
 *
 * @param {Array} stories - Selected user story objects
 * @param {Array} themes - All theme objects (for name/description lookup)
 * @param {Array} requirements - All requirement objects (for raw_text lookup)
 * @returns {string} Formatted markdown content
 */
export function generateExportMarkdown(stories, themes, requirements) {
  const now = formatDateTime(new Date().toISOString());
  const totalCount = stories.length;

  // Build lookup maps
  const themeMap = new Map(themes.map((t) => [t.id, t]));
  const requirementMap = new Map(requirements.map((r) => [r.id, r]));

  // Group stories by theme_id
  const groupedByTheme = new Map();
  for (const story of stories) {
    const themeId = story.theme_id;
    if (!groupedByTheme.has(themeId)) {
      groupedByTheme.set(themeId, []);
    }
    groupedByTheme.get(themeId).push(story);
  }

  // Sort themes alphabetically by name
  const sortedThemeIds = [...groupedByTheme.keys()].sort((a, b) => {
    const nameA = themeMap.get(a)?.name || "";
    const nameB = themeMap.get(b)?.name || "";
    return nameA.localeCompare(nameB, "ko");
  });

  // Sort stories within each theme by created_at ascending
  for (const [themeId, themeStories] of groupedByTheme) {
    themeStories.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
  }

  // Build markdown
  const lines = [];

  lines.push("# 유저스토리 내보내기");
  lines.push("");
  lines.push(`> 내보내기 일시: ${now}`);
  lines.push(`> 총 ${totalCount}건`);
  lines.push("");

  for (const themeId of sortedThemeIds) {
    const theme = themeMap.get(themeId);
    const themeName = theme ? theme.name : "분류 없음";
    const themeStories = groupedByTheme.get(themeId);

    lines.push(`## 테마: ${themeName}`);
    lines.push("");

    themeStories.forEach((story, index) => {
      const storyNumber = index + 1;
      const summary = truncateForHeading(story.story);
      const requirement = requirementMap.get(story.requirement_id);
      const rawText = requirement ? requirement.raw_text : "";
      const systemSupportLabel = getSystemSupportLabel(story.system_support);

      lines.push(`### ${storyNumber}. ${summary}`);
      lines.push("");
      lines.push(`**유저스토리**: ${story.story}`);
      lines.push("");
      lines.push(`**목적**: ${story.purpose}`);
      lines.push("");
      lines.push("**인수 조건**:");
      lines.push("");
      for (const ac of story.acceptance_criteria) {
        lines.push(`- ${ac}`);
      }
      lines.push("");
      lines.push(`**시스템 지원 상태**: ${systemSupportLabel}`);
      lines.push("");
      lines.push(`**원본 요구사항**: ${rawText ? `> ${rawText}` : "없음"}`);
      lines.push("");
    });
  }

  return lines.join("\n");
}

/**
 * Truncates a story sentence for use as a heading summary.
 */
function truncateForHeading(text, maxLength = 50) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Maps system_support status to a Korean label.
 */
function getSystemSupportLabel(status) {
  switch (status) {
    case "supported":
      return "시스템 지원";
    case "needs_development":
      return "개발 필요";
    case "not_analyzed":
    default:
      return "미분석";
  }
}
