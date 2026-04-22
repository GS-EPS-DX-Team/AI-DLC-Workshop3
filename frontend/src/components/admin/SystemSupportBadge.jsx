import React from "react";

const STATUS_CONFIG = {
  supported: {
    label: "시스템 지원",
    className: "bg-green-100 text-green-800",
    ariaLabel: "시스템 지원 상태: 시스템 지원",
  },
  needs_development: {
    label: "개발 필요",
    className: "bg-orange-100 text-orange-800",
    ariaLabel: "시스템 지원 상태: 개발 필요",
  },
  not_analyzed: {
    label: "미분석",
    className: "bg-gray-100 text-gray-500",
    ariaLabel: "시스템 지원 상태: 미분석",
  },
};

export default function SystemSupportBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.not_analyzed;

  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${config.className}`}
      aria-label={config.ariaLabel}
      data-testid={`system-support-badge-${status}`}
    >
      {config.label}
    </span>
  );
}
