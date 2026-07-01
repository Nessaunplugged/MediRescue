import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faLocationDot,
  faStar,
  faClock,
  faUserDoctor,
  faMicroscope,
  faPhone,
  faRoute,
  faTrophy,
  faTriangleExclamation,
  faChevronDown,
  faChevronUp,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import DoctorStatusBadge from "./DoctorStatusBadge";

export default function HospitalCard({ hospital, isTop }) {
  const [expanded, setExpanded] = useState(false);

  const availableDoctors = hospital.doctorsOnGround.filter((d) => d.status === "available");
  const availableEquipment = hospital.equipment.filter((e) => e.available);

  const handleCall = (e) => {
    e.stopPropagation();
    window.open(`tel:${hospital.phone.replace(/[^+\d]/g, "")}`, "_self");
  };

  const handleNavigate = (e) => {
    e.stopPropagation();
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.address)}`,
      "_blank"
    );
  };

  const waitColor =
    hospital.waitTime <= 5
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : hospital.waitTime <= 15
      ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
      : "text-red-400 bg-red-500/10 border-red-500/20";

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`relative rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden
        ${isTop
          ? "border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-[#0f1a14] to-[#0d0d1a] shadow-xl shadow-emerald-900/20"
          : "border-white/8 bg-[#0f0f1c] hover:border-white/15 hover:bg-[#13131f]"
        }
        ${!hospital.acceptingPatients ? "opacity-50" : ""}
      `}
    >
      {/* Top accent bar for best match */}
      {isTop && (
        <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-transparent" />
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1 min-w-0">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
              ${isTop ? "bg-emerald-500/15 border border-emerald-500/20" : "bg-red-500/10 border border-red-500/15"}`}>
              <FontAwesomeIcon icon={faHospital} className={`text-xl ${isTop ? "text-emerald-400" : "text-red-400"}`} />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <h3 className="font-bold text-white text-base leading-tight">{hospital.name}</h3>
                {isTop && (
                  <span className="px-2 py-0.5 bg-emerald-500/15 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/25 uppercase tracking-wider flex items-center gap-1">
                    <FontAwesomeIcon icon={faTrophy} />
                    Best Match
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-xs truncate mb-2">
                <FontAwesomeIcon icon={faLocationDot} className="mr-1 text-gray-600" />
                {hospital.address}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/15">
                  {hospital.distance} {hospital.distanceUnit} away
                </span>
                <span className="flex items-center gap-1 text-yellow-400 text-xs">
                  <FontAwesomeIcon icon={faStar} className="text-[10px]" />
                  {hospital.rating}
                  <span className="text-gray-600">({hospital.reviewCount})</span>
                </span>
                <span className="text-blue-400 text-xs font-semibold bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/15">
                  {hospital.traumaCenterLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Wait time badge */}
          <div className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold border flex flex-col items-center ${waitColor}`}>
            <FontAwesomeIcon icon={faClock} className="mb-0.5" />
            ~{hospital.waitTime}m
          </div>
        </div>

        {/* Quick action buttons - always visible */}
        <div className="mt-4 flex gap-2">
          <a
            href={`tel:${hospital.phone.replace(/[^+\d]/g, "")}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30"
          >
            <FontAwesomeIcon icon={faPhone} />
            Call Hospital
          </a>
          <button
            onClick={handleNavigate}
            className="flex-1 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/25 text-blue-400 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faRoute} />
            Navigate
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-4 flex-wrap text-xs">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="status-dot available" />
            {availableDoctors.length} doctor{availableDoctors.length !== 1 ? "s" : ""} available
          </span>
          <span className="flex items-center gap-1.5 text-gray-400">
            <FontAwesomeIcon icon={faMicroscope} className="text-purple-400" />
            {availableEquipment.length} equipment ready
          </span>
          {hospital.open24h ? (
            <span className="flex items-center gap-1 text-emerald-400">
              <FontAwesomeIcon icon={faCircleCheck} />
              Open 24h
            </span>
          ) : (
            <span className="flex items-center gap-1 text-yellow-500">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              Limited hours
            </span>
          )}
        </div>

        {/* Expanded section */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-white/5 space-y-5 animate-slideUp">
            {/* Doctors */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faUserDoctor} className="text-blue-400" />
                Doctors On Ground
              </h4>
              <div className="space-y-2">
                {hospital.doctorsOnGround.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex items-center justify-between bg-white/3 border border-white/5 rounded-xl px-4 py-2.5"
                  >
                    <div>
                      <p className="text-white text-sm font-semibold">{doctor.name}</p>
                      <p className="text-gray-500 text-xs">{doctor.specialty}</p>
                    </div>
                    <DoctorStatusBadge status={doctor.status} eta={doctor.eta} />
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faMicroscope} className="text-purple-400" />
                Equipment
              </h4>
              <div className="flex flex-wrap gap-2">
                {hospital.equipment.map((eq) => (
                  <span
                    key={eq.name}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                      eq.available
                        ? "bg-emerald-500/8 text-emerald-400 border-emerald-500/15"
                        : "bg-white/3 text-gray-600 border-white/5 line-through"
                    }`}
                  >
                    {eq.name}
                    {eq.available && eq.count > 1 && (
                      <span className="ml-1 opacity-60">×{eq.count}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>


          </div>
        )}

        {/* Expand toggle */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-gray-600 text-xs">
          <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} />
          {expanded ? "Collapse" : "View details"}
        </div>
      </div>
    </div>
  );
}
