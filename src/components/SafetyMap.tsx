import { MapContainer, TileLayer, Circle, Polyline, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { riskZones, routeOptions, type RiskZone } from "@/lib/mockData";

// Fix leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const riskColorMap = {
  safe: "#22c55e",
  moderate: "#f59e0b",
  danger: "#ef4444",
};

function UserLocationMarker() {
  const map = useMap();

  useEffect(() => {
    const marker = L.circleMarker([28.6139, 77.209], {
      radius: 8,
      fillColor: "#0ea5e9",
      fillOpacity: 1,
      color: "#0ea5e9",
      weight: 2,
      opacity: 0.5,
    }).addTo(map);

    const pulse = L.circleMarker([28.6139, 77.209], {
      radius: 20,
      fillColor: "#0ea5e9",
      fillOpacity: 0.15,
      color: "#0ea5e9",
      weight: 1,
      opacity: 0.3,
    }).addTo(map);

    return () => {
      marker.remove();
      pulse.remove();
    };
  }, [map]);

  return null;
}

interface SafetyMapProps {
  selectedZone: RiskZone | null;
  onSelectZone: (zone: RiskZone | null) => void;
  selectedRoute: string | null;
}

const SafetyMap = ({ selectedZone, onSelectZone, selectedRoute }: SafetyMapProps) => {
  const activeRoute = routeOptions.find((r) => r.id === selectedRoute) || routeOptions[0];

  return (
    <MapContainer
      center={[28.6139, 77.209]}
      zoom={14}
      className="w-full h-full"
      zoomControl={true}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <UserLocationMarker />

      {riskZones.map((zone) => (
        <Circle
          key={zone.id}
          center={[zone.lat, zone.lng]}
          radius={zone.radius}
          pathOptions={{
            color: riskColorMap[zone.riskLevel],
            fillColor: riskColorMap[zone.riskLevel],
            fillOpacity: selectedZone?.id === zone.id ? 0.4 : 0.2,
            weight: selectedZone?.id === zone.id ? 3 : 1,
            opacity: 0.6,
          }}
          eventHandlers={{
            click: () => onSelectZone(zone),
          }}
        />
      ))}

      {activeRoute && (
        <Polyline
          positions={activeRoute.waypoints}
          pathOptions={{
            color: riskColorMap[activeRoute.riskLevel],
            weight: 4,
            opacity: 0.8,
            dashArray: activeRoute.recommended ? undefined : "10 6",
          }}
        />
      )}
    </MapContainer>
  );
};

export default SafetyMap;
