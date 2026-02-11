import { motion } from "framer-motion";
import { BarChart3, TrendingDown, Shield, MapPin } from "lucide-react";
import { riskZones } from "@/lib/mockData";

const SafetyStats = () => {
  const dangerZones = riskZones.filter((z) => z.riskLevel === "danger").length;
  const safeZones = riskZones.filter((z) => z.riskLevel === "safe").length;
  const totalIncidents = riskZones.reduce((sum, z) => sum + z.incidents, 0);
  const avgRisk = Math.round(riskZones.reduce((sum, z) => sum + z.riskScore, 0) / riskZones.length);

  const stats = [
    { icon: MapPin, label: "Zones Monitored", value: riskZones.length, color: "text-primary" },
    { icon: Shield, label: "Safe Zones", value: safeZones, color: "text-safe" },
    { icon: BarChart3, label: "Total Incidents", value: totalIncidents, color: "text-moderate" },
    { icon: TrendingDown, label: "Avg Risk Score", value: avgRisk, color: "text-danger" },
  ];

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="glass-panel p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          Safety Statistics
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="p-3 rounded-lg bg-secondary/50 text-center">
            <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
            <p className="text-lg font-bold font-mono text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mini risk distribution bar */}
      <div className="space-y-1.5">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Risk Distribution</p>
        <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(safeZones / riskZones.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-safe rounded-l-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((riskZones.length - safeZones - dangerZones) / riskZones.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.7 }}
            className="bg-moderate"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(dangerZones / riskZones.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.9 }}
            className="bg-danger rounded-r-full"
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-muted-foreground">
          <span>{safeZones} Safe</span>
          <span>{riskZones.length - safeZones - dangerZones} Moderate</span>
          <span>{dangerZones} High Risk</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SafetyStats;
