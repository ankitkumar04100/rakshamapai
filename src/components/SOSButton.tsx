import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MapPin, Shield } from "lucide-react";

const SOSButton = () => {
  const [active, setActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!active) {
      setCountdown(5);
      setTriggered(false);
      return;
    }
    if (countdown <= 0) {
      setTriggered(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [active, countdown]);

  return (
    <>
      {/* SOS Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setActive(true)}
        className="relative w-14 h-14 rounded-full bg-danger flex items-center justify-center glow-danger"
      >
        <Phone className="w-6 h-6 text-foreground" />
        <span className="absolute inset-0 rounded-full bg-danger/40 risk-pulse" />
      </motion.button>

      {/* SOS Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-background/90 backdrop-blur-xl p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-panel p-8 max-w-sm w-full text-center space-y-6 border-danger/30"
            >
              <button
                onClick={() => setActive(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              {!triggered ? (
                <>
                  <div className="relative w-24 h-24 mx-auto">
                    <svg className="w-24 h-24 -rotate-90">
                      <circle cx="48" cy="48" r="42" fill="none" stroke="hsl(222, 30%, 16%)" strokeWidth="6" />
                      <motion.circle
                        cx="48" cy="48" r="42" fill="none"
                        stroke="hsl(0, 72%, 51%)" strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={264}
                        animate={{ strokeDashoffset: 264 - (264 * (5 - countdown)) / 5 }}
                        transition={{ duration: 1, ease: "linear" }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold font-mono text-danger">
                      {countdown}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">SOS Activating...</h3>
                  <p className="text-sm text-muted-foreground">
                    Emergency alert will be sent with your location in {countdown} seconds
                  </p>
                  <button
                    onClick={() => setActive(false)}
                    className="w-full py-3 rounded-lg border border-border/50 text-foreground font-medium hover:bg-secondary/50 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 mx-auto rounded-full bg-danger/20 flex items-center justify-center"
                  >
                    <Shield className="w-10 h-10 text-danger" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-danger">SOS Alert Sent!</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Location shared: 28.6139°N, 77.2090°E
                    </p>
                    <p>Emergency contacts notified</p>
                    <p>Nearest help center alerted</p>
                  </div>
                  <button
                    onClick={() => setActive(false)}
                    className="w-full py-3 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Close
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;
