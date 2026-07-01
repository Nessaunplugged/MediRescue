import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBell } from "@fortawesome/free-solid-svg-icons";

export default function SOSButton({ onActivate }) {
  const [countdown, setCountdown] = useState(null);

  const handleClick = () => {
    if (countdown === null) setCountdown(3);
  };

  const handleCancel = () => setCountdown(null);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) {
      onActivate();
      setCountdown(null);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 500]);
    }
  }, [countdown, onActivate]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {countdown !== null && (
        <div className="animate-slideUp bg-[#0f0f1c] border border-red-500/40 rounded-2xl p-4 text-center shadow-2xl shadow-red-900/30 min-w-[160px]">
          <p className="text-white font-bold text-sm mb-2">
            {countdown > 0 ? "Activating SOS..." : "SOS Activated!"}
          </p>
          {countdown > 0 && (
            <p className="text-5xl font-black text-red-400 animate-pulse mb-2">{countdown}</p>
          )}
          <button
            onClick={handleCancel}
            className="text-xs bg-white/8 hover:bg-white/15 text-gray-300 px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 mx-auto"
          >
            <FontAwesomeIcon icon={faXmark} />
            Cancel
          </button>
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={countdown !== null}
        className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black text-white text-xs tracking-widest transition-all duration-300 shadow-2xl
          ${countdown !== null
            ? "bg-gray-700 cursor-not-allowed scale-90"
            : "bg-red-600 hover:bg-red-500 sos-pulse cursor-pointer active:scale-95 shadow-red-900/50"
          }`}
        aria-label="Emergency SOS"
      >
        <FontAwesomeIcon icon={faBell} className="text-lg mb-0.5" />
        SOS
      </button>
    </div>
  );
}
