import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSpinner, faCircleDot } from "@fortawesome/free-solid-svg-icons";

export default function LocationBar({ userLocation, onUpdateLocation }) {
  const [isLocating, setIsLocating] = useState(false);

  const handleGetLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onUpdateLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "Current Location",
          });
          setIsLocating(false);
        },
        () => {
          alert("Could not get location. Using demo location.");
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      alert("Geolocation not supported.");
      setIsLocating(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-[#0f0f1c] p-4">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Your Location</p>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center flex-shrink-0">
            <FontAwesomeIcon icon={faLocationDot} className="text-red-400 map-pin" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">{userLocation.address}</p>
            <p className="text-gray-600 text-xs mt-0.5 flex items-center gap-1">
              <FontAwesomeIcon icon={faCircleDot} className="text-emerald-500 text-[8px]" />
              GPS active
            </p>
          </div>
        </div>
        <button
          onClick={handleGetLocation}
          disabled={isLocating}
          className="flex-shrink-0 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-40"
        >
          <FontAwesomeIcon icon={isLocating ? faSpinner : faLocationDot} className={isLocating ? "animate-spin" : ""} />
          {isLocating ? "Locating..." : "Update"}
        </button>
      </div>
    </div>
  );
}
