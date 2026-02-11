import { motion } from "framer-motion";
import { MapPin, Clock, AlertTriangle, TrendingDown } from "lucide-react";
import RiskScoreGauge from "./RiskScoreGauge";
import { getTimeOfDay, getRiskForTime, type RiskZone } from "@/lib/mockData";

interface RiskPanelProps {
  selectedZone: RiskZone | null;
}

const RiskPanel = ({ selectedZone }: RiskPanelProps) => {
  const timeOfDay = getTimeOfDay();
  const timeRisk = getRiskForTime();
  const score = selectedZone?.riskScore ?? 28;
  const level = score < 30 ? "safe" : score < 60 ? "moderate" : "danger";

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="glass-panel p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          Risk Assessment
        </h2>
        <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {timeOfDay}
        </span>
      </div>

      <div className="flex justify-center py-2">
        <RiskScoreGauge score={score} />
      </div>

      {selectedZone ? (
        <motion.div
          key={selectedZone.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{selectedZone.name}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-secondary/50 text-center">
              <p className="text-xs text-muted-foreground">Incidents</p>
              <p className="text-lg font-bold font-mono text-foreground">{selectedZone.incidents}</p>
            </div>
            <div className="p-2 rounded-lg bg-secondary/50 text-center">
              <p className="text-xs text-muted-foreground">Updated</p>
              <p className="text-xs font-mono text-foreground mt-1">{selectedZone.lastUpdated}</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-2">
          <p className="text-xs text-muted-foreground">
            Tap a zone on the map for details
          </p>
        </div>
      )}

      <div className="pt-2 border-t border-border/30">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Time-Based Risk</span>
        </div>
        <div className="flex gap-1">
          {["Morning", "Afternoon", "Evening", "Night"].map((t) => {
            const isActive = t === timeOfDay;
            const risk = t === "Night" ? 72 : t === "Evening" ? 48 : t === "Morning" ? 35 : 20;
            const c = risk < 30 ? "bg-safe/20 border-safe/30" : risk < 60 ? "bg-moderate/20 border-moderate/30" : "bg-danger/20 border-danger/30";
            return (
              <div
                key={t}
                className={`flex-1 text-center p-1.5 rounded-md border text-[10px] font-mono ${c} ${isActive ? "ring-1 ring-primary/50" : ""}`}
              >
                <div className="text-foreground">{t.slice(0, 3)}</div>
                <div className="text-muted-foreground">{risk}</div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default RiskPanel;
