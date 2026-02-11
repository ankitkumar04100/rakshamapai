import { motion } from "framer-motion";

interface RiskScoreGaugeProps {
  score: number;
  size?: "sm" | "lg";
}

const RiskScoreGauge = ({ score, size = "lg" }: RiskScoreGaugeProps) => {
  const level = score < 30 ? "safe" : score < 60 ? "moderate" : "danger";
  const label = score < 30 ? "LOW RISK" : score < 60 ? "MODERATE" : "HIGH RISK";
  const dim = size === "lg" ? 140 : 64;
  const strokeWidth = size === "lg" ? 8 : 4;
  const r = (dim - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;

  const colorClass = level === "safe" ? "text-safe" : level === "moderate" ? "text-moderate" : "text-danger";
  const strokeColor = level === "safe" ? "hsl(142, 70%, 45%)" : level === "moderate" ? "hsl(38, 92%, 50%)" : "hsl(0, 72%, 51%)";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            fill="none"
            stroke="hsl(222, 30%, 16%)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`font-bold font-mono ${colorClass} ${size === "lg" ? "text-3xl" : "text-lg"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          {size === "lg" && (
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest">{label}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskScoreGauge;
