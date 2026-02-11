import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { riskZones, routeOptions, type RiskZone } from "@/lib/mockData";

const riskColorMap = {
  safe: "#22c55e",
  moderate: "#f59e0b",
  danger: "#ef4444",
};

interface SafetyMapProps {
  selectedZone: RiskZone | null;
  onSelectZone: (zone: RiskZone | null) => void;
  selectedRoute: string | null;
}

const SafetyMap = ({ selectedZone, onSelectZone, selectedRoute }: SafetyMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<L.Circle[]>([]);
  const routeLineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.CircleMarker | null>(null);
  const userPulseRef = useRef<L.CircleMarker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [28.6139, 77.209],
      zoom: 14,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    // User location marker
    userMarkerRef.current = L.circleMarker([28.6139, 77.209], {
      radius: 8,
      fillColor: "#0ea5e9",
      fillOpacity: 1,
      color: "#0ea5e9",
      weight: 2,
      opacity: 0.5,
    }).addTo(map);

    userPulseRef.current = L.circleMarker([28.6139, 77.209], {
      radius: 20,
      fillColor: "#0ea5e9",
      fillOpacity: 0.15,
      color: "#0ea5e9",
      weight: 1,
      opacity: 0.3,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Draw risk zones
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old circles
    circlesRef.current.forEach((c) => c.remove());
    circlesRef.current = [];

    riskZones.forEach((zone) => {
      const circle = L.circle([zone.lat, zone.lng], {
        radius: zone.radius,
        color: riskColorMap[zone.riskLevel],
        fillColor: riskColorMap[zone.riskLevel],
        fillOpacity: selectedZone?.id === zone.id ? 0.4 : 0.2,
        weight: selectedZone?.id === zone.id ? 3 : 1,
        opacity: 0.6,
      }).addTo(map);

      circle.on("click", () => onSelectZone(zone));
      circlesRef.current.push(circle);
    });
  }, [selectedZone, onSelectZone]);

  // Draw route
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (routeLineRef.current) {
      routeLineRef.current.remove();
      routeLineRef.current = null;
    }

    const activeRoute = routeOptions.find((r) => r.id === selectedRoute) || routeOptions[0];
    if (activeRoute) {
      routeLineRef.current = L.polyline(activeRoute.waypoints, {
        color: riskColorMap[activeRoute.riskLevel],
        weight: 4,
        opacity: 0.8,
        dashArray: activeRoute.recommended ? undefined : "10 6",
      }).addTo(map);
    }
  }, [selectedRoute]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default SafetyMap;
