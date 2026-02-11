import { Shield, Bell, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { alerts } from "@/lib/mockData";

const Header = () => {
  const [showAlerts, setShowAlerts] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[1000] glass-panel rounded-none border-t-0 border-x-0 px-4 py-3"
    >
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-8 h-8 text-primary" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-safe animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-gradient-brand">RakshaMap</span>
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
              AI Safety Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 mr-4 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/30">
            <span className="w-2 h-2 rounded-full bg-safe animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">LIVE</span>
          </div>

          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger" />
          </button>

          <button className="p-2 rounded-lg hover:bg-secondary/50 transition-colors sm:hidden">
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {showAlerts && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-4 mt-2 w-80 glass-panel p-3 space-y-2"
        >
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${
                alert.type === "danger"
                  ? "border-danger/30 bg-danger/5"
                  : alert.type === "warning"
                  ? "border-moderate/30 bg-moderate/5"
                  : "border-primary/30 bg-primary/5"
              }`}
            >
              <p className="text-xs font-medium text-foreground">{alert.message}</p>
              <p className="text-[10px] text-muted-foreground mt-1">
                {alert.location} • {alert.time}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
