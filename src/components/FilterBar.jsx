import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUserDoctor, faClock, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";

export default function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0f0f1c] p-4 space-y-3">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Search & Filter</p>

      {/* Search */}
      <div className="flex items-center gap-2.5 bg-white/4 border border-white/8 rounded-xl px-3 py-2.5">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500 text-sm flex-shrink-0" />
        <input
          type="text"
          placeholder="Hospital, doctor, equipment..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="bg-transparent outline-none text-white placeholder-gray-600 flex-1 text-sm"
        />
      </div>

      {/* Toggles */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onFilterChange("availableDoctorsOnly", !filters.availableDoctorsOnly)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all
            ${filters.availableDoctorsOnly
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
              : "bg-white/4 text-gray-400 border-white/8 hover:border-white/15"
            }`}
        >
          <FontAwesomeIcon icon={faUserDoctor} />
          Doctors Available
        </button>
        <button
          onClick={() => onFilterChange("openNowOnly", !filters.openNowOnly)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all
            ${filters.openNowOnly
              ? "bg-blue-500/15 text-blue-400 border-blue-500/25"
              : "bg-white/4 text-gray-400 border-white/8 hover:border-white/15"
            }`}
        >
          <FontAwesomeIcon icon={faClock} />
          Open Now
        </button>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-xl px-3 py-2.5">
        <FontAwesomeIcon icon={faArrowDownWideShort} className="text-gray-500 text-sm flex-shrink-0" />
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
          className="bg-transparent outline-none text-white text-sm flex-1 cursor-pointer"
        >
          <option value="distance" className="bg-[#0f0f1c]">Nearest First</option>
          <option value="waitTime" className="bg-[#0f0f1c]">Shortest Wait</option>
          <option value="rating" className="bg-[#0f0f1c]">Top Rated</option>
        </select>
      </div>
    </div>
  );
}
