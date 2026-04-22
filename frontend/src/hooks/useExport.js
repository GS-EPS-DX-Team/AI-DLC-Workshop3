import { useCallback } from "react";
import { generateExportMarkdown } from "../utils/markdownGenerator";
import { formatDate } from "../utils/dateFormatter";

/**
 * Hook for markdown export generation and file download.
 * Uses markdownGenerator for formatting and Blob + URL.createObjectURL for download.
 */
export function useExport() {
  /**
   * Generates a formatted markdown string from selected stories.
   * @param {Array} stories - Selected user story objects
   * @param {Array} themes - All theme objects
   * @param {Array} requirements - All requirement objects
   * @returns {string} Formatted markdown content
   */
  const generateMarkdown = useCallback((stories, themes, requirements) => {
    return generateExportMarkdown(stories, themes, requirements);
  }, []);

  /**
   * Triggers browser file download of markdown content.
   * Creates a Blob, generates a temporary URL, and programmatically clicks a link.
   * @param {string} markdownContent - The markdown string to download
   * @param {string} [filename] - Optional filename; defaults to user-stories-YYYY-MM-DD.md
   */
  const downloadMarkdown = useCallback((markdownContent, filename) => {
    const defaultFilename = `user-stories-${formatDate(new Date().toISOString())}.md`;
    const finalFilename = filename || defaultFilename;

    const blob = new Blob([markdownContent], {
      type: "text/markdown; charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return {
    generateMarkdown,
    downloadMarkdown,
  };
}
