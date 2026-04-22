import React from "react";

/**
 * Export controls bar showing selection counter, preview button, and export/download button.
 * Buttons are disabled when no items are selected.
 */
export default function ExportControls({
  selectedCount,
  totalCount,
  onPreview,
  onExport,
  disabled,
}) {
  const hasSelection = selectedCount > 0;

  return (
    <div
      className="flex items-center justify-between gap-3 flex-wrap"
      data-testid="export-controls"
    >
      {/* Selection counter */}
      <div className="text-sm text-gray-600" data-testid="selection-counter">
        {hasSelection ? (
          <span>
            <span className="font-semibold text-blue-600">{selectedCount}</span>
            <span className="text-gray-500">/{totalCount}</span>
            건 선택됨
          </span>
        ) : (
          <span className="text-gray-400">선택된 항목이 없습니다</span>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Preview button */}
        <button
          type="button"
          onClick={onPreview}
          disabled={disabled || !hasSelection}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
          aria-label={`미리보기 (${selectedCount}건 선택됨)`}
          data-testid="preview-button"
        >
          {/* Eye icon */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          미리보기
        </button>

        {/* Export / Download button */}
        <button
          type="button"
          onClick={onExport}
          disabled={disabled || !hasSelection}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 transition-colors"
          aria-label={`내보내기 (${selectedCount}건 선택됨)`}
          data-testid="export-button"
        >
          {/* Download icon */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          내보내기
        </button>
      </div>
    </div>
  );
}
