import { motion } from "framer-motion";

const ZoneLegend = () => {
  const zones = [
    { label: "Safe Zone", color: "bg-safe", score: "0-30" },
    { label: "Moderate Risk", color: "bg-moderate", score: "31-60" },
    { label: "High Risk", color: "bg-danger", score: "61-100" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="glass-panel px-3 py-2 flex items-center gap-4"
    >
      {zones.map((z) => (
        <div key={z.label} className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${z.color}`} />
          <span className="text-[10px] font-mono text-muted-foreground">
            {z.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
};

export default ZoneLegend;
