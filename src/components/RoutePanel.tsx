import { motion } from "framer-motion";
import { Navigation, Route, Clock, ShieldCheck } from "lucide-react";
import { routeOptions } from "@/lib/mockData";
import RiskScoreGauge from "./RiskScoreGauge";

interface RoutePanelProps {
  selectedRoute: string | null;
  onSelectRoute: (id: string) => void;
}

const RoutePanel = ({ selectedRoute, onSelectRoute }: RoutePanelProps) => {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="glass-panel p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <Navigation className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          Route Options
        </h2>
      </div>

      <div className="space-y-2">
        {routeOptions.map((route) => {
          const isSelected = selectedRoute === route.id;
          const borderColor =
            route.riskLevel === "safe"
              ? "border-safe/40"
              : route.riskLevel === "moderate"
              ? "border-moderate/40"
              : "border-danger/40";

          return (
            <motion.button
              key={route.id}
              onClick={() => onSelectRoute(route.id)}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                isSelected
                  ? `${borderColor} bg-secondary/50`
                  : "border-border/30 hover:bg-secondary/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{route.name}</span>
                    {route.recommended && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase rounded bg-safe/20 text-safe border border-safe/30 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Route className="w-3 h-3" /> {route.distance}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {route.duration}
                    </span>
                  </div>
                </div>
                <RiskScoreGauge score={route.riskScore} size="sm" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RoutePanel;
