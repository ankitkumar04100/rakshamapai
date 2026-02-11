import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Shield } from "lucide-react";
import { useState, useEffect } from "react";

const AlertBanner = () => {
  const [visible, setVisible] = useState(true);
  const [currentAlert, setCurrentAlert] = useState(0);

  const bannerAlerts = [
    { icon: AlertTriangle, text: "2 high-risk zones detected near your area", level: "danger" as const },
    { icon: Shield, text: "Safer route available via Rajpath corridor", level: "safe" as const },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % bannerAlerts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const alert = bannerAlerts[currentAlert];
  const Icon = alert.icon;

  return (
    <AnimatePresence>
      <motion.div
        key={currentAlert}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        className={`glass-panel px-4 py-2.5 flex items-center gap-3 ${
          alert.level === "danger"
            ? "border-danger/30"
            : "border-safe/30"
        }`}
      >
        <div className={`p-1 rounded-md ${
          alert.level === "danger" ? "bg-danger/10" : "bg-safe/10"
        }`}>
          <Icon className={`w-4 h-4 ${
            alert.level === "danger" ? "text-danger" : "text-safe"
          }`} />
        </div>
        <p className="flex-1 text-xs font-medium text-foreground">{alert.text}</p>
        <button onClick={() => setVisible(false)} className="text-muted-foreground hover:text-foreground">
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default AlertBanner;
