import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Full-screen modal for previewing markdown export content.
 * Renders the markdown as formatted HTML (headings, lists, blockquotes).
 * Includes download button and close button.
 * Uses createPortal to document.body.
 * Supports Escape key close and focus trap.
 */
export default function PreviewModal({
  isOpen,
  onClose,
  markdownContent,
  onDownload,
}) {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Capture previous focus and auto-focus close button on open
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTab);
    return () => modal.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen || !markdownContent) return null;

  const renderedContent = renderMarkdownToElements(markdownContent);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col bg-white"
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      data-testid="preview-modal"
    >
      {/* Header bar */}
      <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        <h2
          id="preview-modal-title"
          className="text-lg font-semibold text-gray-900"
        >
          내보내기 미리보기
        </h2>

        <div className="flex items-center gap-2">
          {/* Download button */}
          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
            aria-label="다운로드"
            data-testid="preview-download-button"
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
            다운로드
          </button>

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            aria-label="미리보기 닫기"
            data-testid="preview-close-button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-6"
        data-testid="preview-content"
      >
        <div className="mx-auto max-w-3xl prose prose-sm sm:prose-base">
          {renderedContent}
        </div>
      </div>
    </div>,
    document.body
  );
}

/**
 * Simple markdown-to-React-elements renderer.
 * Handles: H1, H2, H3, bold, blockquotes, unordered lists, paragraphs.
 * This is a lightweight renderer -- not a full markdown parser.
 */
function renderMarkdownToElements(markdown) {
  const lines = markdown.split("\n");
  const elements = [];
  let listItems = [];
  let key = 0;

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 mb-4">
          {listItems.map((item, i) => (
            <li key={i} className="text-sm text-gray-800">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Empty line -- flush list, skip
    if (line.trim() === "") {
      flushList();
      continue;
    }

    // H1
    if (line.startsWith("# ") && !line.startsWith("## ")) {
      flushList();
      elements.push(
        <h1
          key={key++}
          className="text-2xl font-bold text-gray-900 mb-2 pb-2 border-b border-gray-200"
        >
          {line.substring(2)}
        </h1>
      );
      continue;
    }

    // H2
    if (line.startsWith("## ") && !line.startsWith("### ")) {
      flushList();
      elements.push(
        <h2
          key={key++}
          className="text-xl font-semibold text-gray-800 mt-6 mb-3 pb-1 border-b border-gray-100"
        >
          {line.substring(3)}
        </h2>
      );
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={key++}
          className="text-lg font-medium text-gray-800 mt-4 mb-2"
        >
          {line.substring(4)}
        </h3>
      );
      continue;
    }

    // Blockquote (> prefix)
    if (line.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote
          key={key++}
          className="border-l-4 border-gray-300 pl-3 py-1 text-sm text-gray-600 italic mb-2"
        >
          {renderInline(line.substring(2))}
        </blockquote>
      );
      continue;
    }

    // Unordered list item (- prefix)
    if (line.startsWith("- ")) {
      listItems.push(line.substring(2));
      continue;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p key={key++} className="text-sm text-gray-800 mb-2 leading-relaxed">
        {renderInline(line)}
      </p>
    );
  }

  flushList();
  return elements;
}

/**
 * Renders inline markdown formatting: **bold**
 */
function renderInline(text) {
  if (!text) return text;

  // Split by **bold** patterns
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
