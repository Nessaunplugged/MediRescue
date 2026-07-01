import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital, faCircleCheck, faClock } from "@fortawesome/free-solid-svg-icons";

export default function StatsBar({ hospitals, filteredCount }) {
  const totalAvailable = hospitals.filter((h) => h.acceptingPatients).length;
  const avgWait = Math.round(
    hospitals.reduce((acc, h) => acc + h.waitTime, 0) / (hospitals.length || 1)
  );

  const stats = [
    { label: "Matching", value: filteredCount, icon: faHospital, color: "text-red-400", bg: "bg-red-500/10 border-red-500/15" },
    { label: "Accepting", value: totalAvailable, icon: faCircleCheck, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/15" },
    { label: "Avg Wait", value: `~${avgWait}m`, icon: faClock, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/15" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((s) => (
        <div key={s.label} className={`rounded-2xl border ${s.bg} p-3 text-center`}>
          <FontAwesomeIcon icon={s.icon} className={`${s.color} text-sm mb-1`} />
          <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
          <p className="text-gray-500 text-[10px] font-medium">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
