import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function DoctorStatusBadge({ status, eta }) {
  const statusConfig = {
    available: {
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      dotColor: "text-green-400",
      label: "Available",
    },
    busy: {
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      dotColor: "text-yellow-400",
      label: "Busy",
    },
    offline: {
      color: "text-gray-400",
      bg: "bg-gray-500/10",
      border: "border-gray-500/30",
      dotColor: "text-gray-400",
      label: "Offline",
    },
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border
        ${config.bg} ${config.color} ${config.border}
      `}
    >
      <FontAwesomeIcon
        icon={faCircle}
        className={`text-[6px] ${config.dotColor}`}
      />
      {config.label}
      {eta && eta !== "On-site" && (
        <span className="opacity-70 ml-1">· {eta}</span>
      )}
    </span>
  );
}
