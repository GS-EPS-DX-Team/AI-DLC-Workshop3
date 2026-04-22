import { useState } from "react";
import ConfirmDialog from "../common/ConfirmDialog";

export default function VerificationControls({ item, onApprove, onReject }) {
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  const status = item.verification_status || "pending";

  if (status === "verified") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full"
        data-testid="verification-badge-verified"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        승인됨
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full"
        data-testid="verification-badge-rejected"
      >
        거부됨
      </span>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2" data-testid="verification-controls">
        <button
          type="button"
          onClick={onApprove}
          className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition-colors"
          data-testid="verification-approve-button"
          aria-label="승인"
        >
          승인
        </button>
        <button
          type="button"
          onClick={() => setShowRejectConfirm(true)}
          className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors"
          data-testid="verification-reject-button"
          aria-label="거부"
        >
          거부
        </button>
      </div>

      <ConfirmDialog
        isOpen={showRejectConfirm}
        title="항목 거부"
        message="이 항목을 거부하시겠습니까?"
        onConfirm={() => {
          setShowRejectConfirm(false);
          onReject();
        }}
        onCancel={() => setShowRejectConfirm(false)}
      />
    </>
  );
}
