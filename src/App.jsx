import { useState, useMemo } from "react";
import { hospitals } from "./data/hospitals";
import LocationBar from "./components/LocationBar";
import EmergencySelector from "./components/EmergencySelector";
import FilterBar from "./components/FilterBar";
import StatsBar from "./components/StatsBar";
import HospitalCard from "./components/HospitalCard";
import SOSButton from "./components/SOSButton";
import SOSModal from "./components/SOSModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faMagnifyingGlass,
  faTriangleExclamation,
  faShieldHeart,
} from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [selectedEmergency, setSelectedEmergency] = useState("all");
  const [filters, setFilters] = useState({
    search: "",
    availableDoctorsOnly: false,
    openNowOnly: false,
    sortBy: "distance",
  });
  const [sosOpen, setSosOpen] = useState(false);
  const [userLocation, setUserLocation] = useState({
    lat: 6.5244,
    lng: 3.3792,
    address: "Lagos, Nigeria (Demo)",
  });

  const filteredHospitals = useMemo(() => {
    let result = [...hospitals];
    if (selectedEmergency !== "all") {
      result = result.filter((h) => h.emergencyTypes.includes(selectedEmergency));
    }
    const query = filters.search.toLowerCase();
    if (query) {
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(query) ||
          h.address.toLowerCase().includes(query) ||
          h.doctorsOnGround.some(
            (d) =>
              d.name.toLowerCase().includes(query) ||
              d.specialty.toLowerCase().includes(query)
          ) ||
          h.equipment.some((e) => e.name.toLowerCase().includes(query))
      );
    }
    if (filters.availableDoctorsOnly) {
      result = result.filter((h) =>
        h.doctorsOnGround.some((d) => d.status === "available")
      );
    }
    if (filters.openNowOnly) {
      result = result.filter((h) => h.open24h);
    }
    switch (filters.sortBy) {
      case "distance": result.sort((a, b) => a.distance - b.distance); break;
      case "waitTime": result.sort((a, b) => a.waitTime - b.waitTime); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [selectedEmergency, filters]);

  const nearestHospital = filteredHospitals[0] || null;
  const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const resetFilters = () => {
    setSelectedEmergency("all");
    setFilters({ search: "", availableDoctorsOnly: false, openNowOnly: false, sortBy: "distance" });
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/8 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-white/5 bg-[#080810]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30">
              <FontAwesomeIcon icon={faHospital} className="text-white text-sm" />
            </div>
            <span className="text-lg font-black tracking-tight">
              Medi<span className="text-red-500">Rescue</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
            <FontAwesomeIcon icon={faShieldHeart} className="text-emerald-400" />
            Nigeria Emergency Network
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="border-b border-white/5 bg-gradient-to-r from-red-950/30 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <h1 className="text-3xl lg:text-4xl font-black mb-2">
            Find Emergency Care{" "}
            <span className="text-red-500">Near You</span>
          </h1>
          <p className="text-gray-400 text-sm lg:text-base max-w-xl">
            Real-time hospital availability, doctors on ground, and equipment status across Nigeria.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 pb-28">
        <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-8">

          {/* Sidebar */}
          <aside className="space-y-4 mb-6 lg:mb-0">
            <LocationBar userLocation={userLocation} onUpdateLocation={setUserLocation} />
            <EmergencySelector selected={selectedEmergency} onSelect={setSelectedEmergency} />
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            <StatsBar hospitals={hospitals} filteredCount={filteredHospitals.length} />
          </aside>

          {/* Hospital List */}
          <main>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">
                Showing <span className="text-white font-semibold">{filteredHospitals.length}</span> hospitals
              </p>
            </div>

            <div className="space-y-4">
              {filteredHospitals.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-2xl text-gray-500" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">No hospitals found</h3>
                  <p className="text-gray-500 text-sm mb-5">Try adjusting your filters or emergency type</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-semibold text-sm transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredHospitals.map((hospital, index) => (
                  <HospitalCard key={hospital.id} hospital={hospital} isTop={index === 0} />
                ))
              )}
            </div>

            <p className="text-center text-gray-700 text-xs mt-10 flex items-center justify-center gap-1.5">
              <FontAwesomeIcon icon={faTriangleExclamation} />
              Prototype only — In a real emergency call <span className="text-red-500 font-bold">112</span>. Data is simulated.
            </p>
          </main>
        </div>
      </div>

      <SOSButton onActivate={() => setSosOpen(true)} />
      {sosOpen && <SOSModal hospital={nearestHospital} onClose={() => setSosOpen(false)} />}
    </div>
  );
}
