import VerificationControls from "./VerificationControls";

export default function MessageBubble({ message, onApprove, onReject }) {
  const { role, content, extracted_items } = message;

  if (role === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[75%] px-4 py-3 bg-blue-500 text-white rounded-2xl rounded-tr-sm">
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    );
  }

  if (role === "system") {
    return (
      <div className="flex justify-center mb-4">
        <div className="max-w-[90%] px-4 py-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-xl text-center">
          <p className="text-sm">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%] px-4 py-3 bg-gray-100 text-gray-900 rounded-2xl rounded-tl-sm">
        {content && (
          <p className="text-sm whitespace-pre-wrap mb-3">{content}</p>
        )}
        {extracted_items && extracted_items.length > 0 && (
          <div className="space-y-3">
            {extracted_items.map((item, index) => (
              <ExtractedItemCard
                key={index}
                item={item}
                index={index}
                onApprove={() => onApprove && onApprove(message.id, item, index)}
                onReject={() => onReject && onReject(message.id, item, index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ExtractedItemCard({ item, index, onApprove, onReject }) {
  const statusConfig = {
    pending: {
      borderColor: "border-gray-200",
      bgColor: "bg-white",
      statusText: "대기 중",
      statusColor: "text-gray-500",
    },
    verified: {
      borderColor: "border-green-300",
      bgColor: "bg-green-50",
      statusText: "승인됨",
      statusColor: "text-green-600",
    },
    rejected: {
      borderColor: "border-red-200",
      bgColor: "bg-red-50/50",
      statusText: "거부됨",
      statusColor: "text-red-500",
    },
  };

  const status = item.verification_status || "pending";
  const config = statusConfig[status] || statusConfig.pending;
  const isRejected = status === "rejected";

  return (
    <div
      className={`p-4 rounded-lg border ${config.borderColor} ${config.bgColor} ${isRejected ? "opacity-60" : ""}`}
      data-testid={`extracted-item-${index}`}
    >
      {/* Theme badge */}
      <span className="inline-block px-2.5 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full mb-2">
        {item.theme}
      </span>

      {/* Summary */}
      <h4 className="text-sm font-semibold text-gray-800 mb-2">
        {item.summary}
      </h4>

      {/* User Story */}
      <div className="mb-2">
        <p className="text-xs font-medium text-gray-500 mb-0.5">유저스토리</p>
        <p className="text-sm text-gray-700 italic">
          &ldquo;{item.story}&rdquo;
        </p>
      </div>

      {/* Purpose */}
      <div className="mb-2">
        <p className="text-xs font-medium text-gray-500 mb-0.5">목적</p>
        <p className="text-sm text-gray-700">{item.purpose}</p>
      </div>

      {/* Acceptance Criteria */}
      <div className="mb-3">
        <p className="text-xs font-medium text-gray-500 mb-1">인수 조건</p>
        <ul className="list-disc list-inside space-y-0.5">
          {item.acceptance_criteria.map((ac, acIdx) => (
            <li key={acIdx} className="text-sm text-gray-700">{ac}</li>
          ))}
        </ul>
      </div>

      {/* Verification controls */}
      <div
        className="flex items-center justify-between pt-2 border-t border-gray-100"
        data-testid={`verification-slot-${index}`}
      >
        <span className={`text-xs font-medium ${config.statusColor}`}>
          {config.statusText}
        </span>
        <VerificationControls
          item={item}
          onApprove={onApprove}
          onReject={onReject}
        />
      </div>
    </div>
  );
}
