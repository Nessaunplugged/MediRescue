import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faLocationDot,
  faClock,
  faPhone,
  faRoute,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function SOSModal({ hospital, onClose }) {
  if (!hospital) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border-2 border-red-500 shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* SOS Header */}
        <div className="text-center mb-4">
          <div className="text-6xl mb-3 animate-bounce-slow">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-red-500"
            />
          </div>
          <h2 className="text-2xl font-black text-white">SOS Activated</h2>
          <p className="text-red-400 text-sm mt-1">
            Emergency services have been notified
          </p>
        </div>

        {/* Nearest Hospital Info */}
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4">
          <p className="text-emerald-400 font-bold text-sm flex items-center gap-2">
            <FontAwesomeIcon icon={faHospital} />
            Nearest Hospital:
          </p>
          <p className="text-white font-bold text-lg mt-1">{hospital.name}</p>
          <p className="text-gray-400 text-sm">{hospital.address}</p>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="text-emerald-300 flex items-center gap-1">
              <FontAwesomeIcon icon={faLocationDot} />
              {hospital.distance} {hospital.distanceUnit} away
            </span>
            <span className="text-yellow-300 flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} />~{hospital.waitTime} min wait
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-3">
            <a
              href={`tel:${hospital.phone.replace(/[^+\d]/g, "")}`}
              className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faPhone} />
              Call
            </a>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm text-center transition-all flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faRoute} />
              Navigate
            </a>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faXmark} />
          Close
        </button>
      </div>
    </div>
  );
}
