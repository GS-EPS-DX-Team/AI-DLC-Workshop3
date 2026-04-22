export default function EmptyState({ message, submessage = "", actionLabel = "", onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4" role="status" data-testid="empty-state">
      <svg
        className="w-16 h-16 text-gray-300 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <p className="text-base font-medium text-gray-500 mb-1">
        {message}
      </p>
      {submessage && (
        <p className="text-sm text-gray-400 mb-4 text-center max-w-sm">
          {submessage}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={onAction}
          data-testid="empty-state-action"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
