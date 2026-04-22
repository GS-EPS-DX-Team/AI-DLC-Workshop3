import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "../common/LoadingIndicator";

export default function MessageList({ messages, isLoading, onApprove, onReject }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-4"
      role="log"
      aria-live="polite"
      aria-label="대화 내역"
    >
      <div className="mx-auto max-w-3xl">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onApprove={onApprove}
            onReject={onReject}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[85%] px-4 py-3 bg-gray-100 text-gray-900 rounded-2xl rounded-tl-sm">
              <LoadingIndicator message="요구사항을 분석하고 있습니다..." />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
