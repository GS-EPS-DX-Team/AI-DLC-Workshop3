export default function LoadingIndicator({ message = "" }) {
  return (
    <div className="flex items-center gap-1.5 p-3" role="status" aria-label="처리 중" data-testid="loading-indicator">
      <div className="flex gap-1">
        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      {message && (
        <span className="text-xs text-gray-400 ml-2">{message}</span>
      )}
    </div>
  );
}
