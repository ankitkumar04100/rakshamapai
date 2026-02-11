import { motion } from "framer-motion";
import { Shield, MapPin, Navigation, Bell, ChevronRight, Zap, Eye, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Zap, title: "Predictive AI", desc: "ML-powered risk scores before incidents happen" },
  { icon: Eye, title: "Real-Time Maps", desc: "Color-coded safety zones updated live" },
  { icon: Navigation, title: "Safer Routes", desc: "Navigate avoiding high-risk areas" },
  { icon: Bell, title: "Smart Alerts", desc: "Proactive warnings as you move" },
  { icon: Users, title: "Community Intel", desc: "Crowd-sourced incident reporting" },
  { icon: MapPin, title: "Zone Analysis", desc: "Detailed risk breakdown per area" },
];

const stats = [
  { value: "10K+", label: "Zones Analyzed" },
  { value: "98%", label: "Prediction Accuracy" },
  { value: "50K+", label: "Routes Optimized" },
  { value: "24/7", label: "Live Monitoring" },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        {/* Nav */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-border/30"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-primary" />
            <span className="text-lg font-bold text-gradient-brand">RakshaMap</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Launch Map
          </button>
        </motion.nav>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-safe animate-pulse" />
              AI-Powered Safety Intelligence
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
              <span className="text-foreground">Predict.</span>{" "}
              <span className="text-gradient-brand">Prevent.</span>{" "}
              <span className="text-foreground">Protect.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              RakshaMap transforms public safety from reactive alerts to proactive prevention.
              AI-driven risk scores, safer routes, and real-time zone intelligence — empowering
              women to navigate cities with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/dashboard")}
                className="group px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-primary flex items-center gap-2 transition-all"
              >
                <MapPin className="w-5 h-5" />
                Launch Safety Map
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <a
                href="#features"
                className="px-8 py-4 rounded-xl border border-border/50 text-foreground font-medium hover:bg-secondary/50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass-panel p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold font-mono text-gradient-brand">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Intelligent Safety Features
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powered by supervised machine learning and geospatial analysis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How RakshaMap Works</h2>
            <p className="text-muted-foreground">From data to decisions in seconds</p>
          </motion.div>

          <div className="space-y-6">
            {[
              { step: "01", title: "Location & Time Detection", desc: "Your position and current time feed into the AI engine as core prediction inputs." },
              { step: "02", title: "AI Risk Prediction", desc: "Supervised ML analyzes incident density, temporal patterns, and area vulnerability to generate risk scores (0-100)." },
              { step: "03", title: "Visual Safety Intelligence", desc: "Results are rendered as color-coded zones on an interactive map — green, yellow, red." },
              { step: "04", title: "Safer Route Recommendation", desc: "Multiple routes are evaluated and the path minimizing risk exposure is recommended." },
              { step: "05", title: "Real-Time Monitoring", desc: "Continuous alerts as you navigate, dynamically adjusting to changing conditions." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 flex gap-6 items-start"
              >
                <span className="text-3xl font-black font-mono text-gradient-brand shrink-0">{item.step}</span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact / SDG */}
      <section id="impact" className="py-24 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Built for Impact</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-12">
              Aligned with UN Sustainable Development Goals for gender equality and sustainable cities
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              <div className="glass-panel p-8">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">SDG 5: Gender Equality</h3>
                <p className="text-sm text-muted-foreground">Reducing mobility-related fear and constraints faced by women in public spaces</p>
              </div>
              <div className="glass-panel p-8">
                <div className="text-4xl mb-3">🏙️</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">SDG 11: Sustainable Cities</h3>
                <p className="text-sm text-muted-foreground">Data-driven insights for safer, more inclusive urban infrastructure planning</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-primary inline-flex items-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Experience RakshaMap
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold text-gradient-brand">RakshaMap</span>
            <span className="text-xs text-muted-foreground ml-2">AI Safety Intelligence</span>
          </div>
          <p className="text-xs text-muted-foreground">
            🔐 Predict • Prevent • Protect — Privacy-first, ethical AI for public safety
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
