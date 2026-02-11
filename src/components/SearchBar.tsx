import { Search, MapPin, Crosshair } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const suggestions = [
    "Connaught Place",
    "India Gate",
    "Sarojini Nagar Market",
    "Hauz Khas Village",
    "Lajpat Nagar",
  ].filter((s) => query && s.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-panel p-3"
    >
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Search destination..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary/50 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
        <button className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors">
          <Crosshair className="w-4 h-4 text-primary" />
        </button>
      </div>

      {focused && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 space-y-1"
        >
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary/50 transition-colors text-left"
            >
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              {s}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;
