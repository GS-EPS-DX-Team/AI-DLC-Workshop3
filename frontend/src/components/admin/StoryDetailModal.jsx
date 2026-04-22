import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import SystemSupportBadge from "./SystemSupportBadge";
import { formatDateTime } from "../../utils/dateFormatter";

export default function StoryDetailModal({
  story,
  requirement,
  themeName,
  isOpen,
  onClose,
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

  if (!isOpen || !story) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="presentation"
      data-testid="story-detail-backdrop"
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col bg-white rounded-xl shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-detail-title"
        onClick={(e) => e.stopPropagation()}
        data-testid="story-detail-modal"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 shrink-0">
          <h3
            id="story-detail-title"
            className="text-lg font-semibold text-gray-900"
          >
            유저스토리 상세
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="모달 닫기"
            data-testid="story-detail-close"
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

        {/* Modal body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {/* Theme and System Support */}
          <div className="flex items-center gap-3 flex-wrap">
            {themeName && (
              <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                {themeName}
              </span>
            )}
            <SystemSupportBadge status={story.system_support} />
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* User Story */}
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">
              유저스토리
            </h4>
            <p className="text-sm text-gray-900 leading-relaxed italic bg-gray-50 p-3 rounded-lg">
              &ldquo;{story.story}&rdquo;
            </p>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Purpose */}
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">
              목적
            </h4>
            <p className="text-sm text-gray-900 leading-relaxed">
              {story.purpose}
            </p>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Acceptance Criteria */}
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">
              인수 조건
            </h4>
            <ol className="list-decimal list-inside space-y-1">
              {story.acceptance_criteria.map((ac, index) => (
                <li key={index} className="text-sm text-gray-900">
                  {ac}
                </li>
              ))}
            </ol>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Source Requirement */}
          <div>
            <h4 className="text-sm font-semibold text-gray-500 mb-2">
              원본 요구사항
            </h4>
            {requirement ? (
              <blockquote className="text-sm text-gray-600 italic border-l-4 border-gray-300 pl-3 py-1">
                &ldquo;{requirement.raw_text}&rdquo;
              </blockquote>
            ) : (
              <p className="text-sm text-gray-400 italic">
                원본 요구사항을 찾을 수 없습니다
              </p>
            )}
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Timestamps */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400">생성일</span>
              <span className="text-xs text-gray-600">
                {formatDateTime(story.created_at)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-400">수정일</span>
              <span className="text-xs text-gray-600">
                {formatDateTime(story.updated_at)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
