import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, MapPin, Send, CheckCircle } from "lucide-react";

const categories = [
  { id: "harassment", label: "Harassment", emoji: "⚠️" },
  { id: "stalking", label: "Stalking", emoji: "👁️" },
  { id: "poor_lighting", label: "Poor Lighting", emoji: "💡" },
  { id: "isolated_area", label: "Isolated Area", emoji: "🏚️" },
  { id: "suspicious_activity", label: "Suspicious Activity", emoji: "🔍" },
  { id: "other", label: "Other", emoji: "📝" },
];

const IncidentReportModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedCategory) return;
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setSelectedCategory(null);
      setDescription("");
    }, 2500);
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="glass-panel px-3 py-2 flex items-center gap-2 hover:border-moderate/30 transition-colors"
      >
        <AlertTriangle className="w-4 h-4 text-moderate" />
        <span className="text-xs font-medium text-foreground">Report Incident</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-background/80 backdrop-blur-lg p-6"
            onClick={() => !submitted && setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-6 max-w-md w-full space-y-5"
            >
              {!submitted ? (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Report an Incident</h3>
                    <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/30">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Current Location: 28.6139°N, 77.2090°E</span>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Select category:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`p-3 rounded-lg border text-left text-sm transition-all ${
                            selectedCategory === cat.id
                              ? "border-primary/50 bg-primary/10 text-foreground"
                              : "border-border/30 hover:bg-secondary/30 text-muted-foreground"
                          }`}
                        >
                          <span className="mr-2">{cat.emoji}</span>
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description (optional):</p>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Additional details..."
                      rows={3}
                      className="w-full rounded-lg bg-secondary/50 border border-border/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!selectedCategory}
                    className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Submit Report
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-16 h-16 text-safe mx-auto" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground">Report Submitted</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for contributing to community safety. Your report will help improve risk predictions.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IncidentReportModal;
