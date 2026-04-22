import { useRef, useEffect } from "react";

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  useEffect(() => {
    if (isOpen && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onCancel}
      role="presentation"
      data-testid="confirm-dialog-backdrop"
    >
      <div
        className="w-full max-w-sm mx-4 p-6 bg-white rounded-xl shadow-xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(e) => e.stopPropagation()}
        data-testid="confirm-dialog"
      >
        <h3
          id="confirm-dialog-title"
          className="text-lg font-semibold text-gray-900 mb-2"
        >
          {title}
        </h3>
        <p
          id="confirm-dialog-message"
          className="text-sm text-gray-600 mb-6"
        >
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            onClick={onCancel}
            ref={cancelButtonRef}
            data-testid="confirm-dialog-cancel"
          >
            취소
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            onClick={onConfirm}
            data-testid="confirm-dialog-confirm"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
