import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCar,
  faHeartPulse,
  faBrain,
  faTriangleExclamation,
  faBone,
  faBolt,
  faChild,
} from "@fortawesome/free-solid-svg-icons";

const emergencyTypes = [
  { id: "all", name: "All Emergencies", icon: faCircleExclamation, accent: "#ef4444" },
  { id: "accident", name: "Accident", icon: faCar, accent: "#f97316" },
  { id: "cardiac", name: "Cardiac", icon: faHeartPulse, accent: "#ec4899" },
  { id: "stroke", name: "Stroke", icon: faBrain, accent: "#a855f7" },
  { id: "trauma", name: "Trauma", icon: faTriangleExclamation, accent: "#ef4444" },
  { id: "orthopedic", name: "Orthopedic", icon: faBone, accent: "#f59e0b" },
  { id: "neurological", name: "Neurological", icon: faBolt, accent: "#06b6d4" },
  { id: "pediatric", name: "Pediatric", icon: faChild, accent: "#f472b6" },
];

export default function EmergencySelector({ selected, onSelect }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0f0f1c] p-4">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
        Emergency Type
      </p>
      <div className="flex gap-2 overflow-x-auto pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {emergencyTypes.map((type) => {
          const isSelected = selected === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              style={isSelected ? { borderColor: type.accent + "55", backgroundColor: type.accent + "18", color: type.accent } : {}}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all duration-200 whitespace-nowrap
                ${isSelected
                  ? "shadow-md"
                  : "border-white/8 bg-white/4 text-gray-400 hover:bg-white/8 hover:text-gray-200"
                }`}
            >
              <FontAwesomeIcon
                icon={type.icon}
                style={isSelected ? { color: type.accent } : {}}
                className={isSelected ? "" : "text-gray-500"}
              />
              {type.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
