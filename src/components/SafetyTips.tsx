import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { getTimeOfDay } from "@/lib/mockData";

const tipsByTime: Record<string, string[]> = {
  Morning: [
    "Early morning routes near parks may have low visibility — stay on main roads",
    "Check today's risk map before starting your commute",
    "Share your route with a trusted contact",
  ],
  Afternoon: [
    "Crowded market areas may have moderate risk — stay aware",
    "Stick to well-trafficked routes when possible",
    "Keep your phone charged for navigation and alerts",
  ],
  Evening: [
    "Risk levels increase after sunset — prefer well-lit routes",
    "Avoid isolated shortcuts through back alleys",
    "Enable location sharing with emergency contacts",
  ],
  Night: [
    "High-risk zones are most dangerous now — avoid red zones",
    "Use the safest route option even if it takes longer",
    "Keep emergency numbers readily accessible",
  ],
};

const SafetyTips = () => {
  const timeOfDay = getTimeOfDay();
  const tips = tipsByTime[timeOfDay] || tipsByTime.Afternoon;
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-panel p-3"
    >
      <div className="flex items-start gap-2">
        <div className="p-1 rounded-md bg-primary/10 shrink-0 mt-0.5">
          <Lightbulb className="w-3.5 h-3.5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">
            {timeOfDay} Safety Tip
          </p>
          <motion.p
            key={currentTip}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-foreground leading-relaxed"
          >
            {tips[currentTip]}
          </motion.p>
          <div className="flex gap-1 mt-2">
            {tips.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === currentTip ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SafetyTips;
