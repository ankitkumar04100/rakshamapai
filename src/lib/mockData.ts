export interface RiskZone {
  id: string;
  lat: number;
  lng: number;
  radius: number;
  riskScore: number;
  riskLevel: "safe" | "moderate" | "danger";
  name: string;
  incidents: number;
  lastUpdated: string;
}

export interface RouteOption {
  id: string;
  name: string;
  distance: string;
  duration: string;
  riskScore: number;
  riskLevel: "safe" | "moderate" | "danger";
  waypoints: [number, number][];
  recommended: boolean;
}

export interface Alert {
  id: string;
  type: "warning" | "danger" | "info";
  message: string;
  location: string;
  time: string;
}

// Delhi-centered mock data
const CENTER: [number, number] = [28.6139, 77.209];

export const riskZones: RiskZone[] = [
  { id: "z1", lat: 28.6280, lng: 77.2190, radius: 400, riskScore: 82, riskLevel: "danger", name: "Chandni Chowk Area", incidents: 34, lastUpdated: "12 min ago" },
  { id: "z2", lat: 28.6050, lng: 77.2250, radius: 350, riskScore: 71, riskLevel: "danger", name: "Nizamuddin Railway", incidents: 28, lastUpdated: "25 min ago" },
  { id: "z3", lat: 28.6320, lng: 77.1980, radius: 300, riskScore: 45, riskLevel: "moderate", name: "Karol Bagh Market", incidents: 15, lastUpdated: "1h ago" },
  { id: "z4", lat: 28.5950, lng: 77.2100, radius: 280, riskScore: 38, riskLevel: "moderate", name: "Lodhi Garden Periphery", incidents: 11, lastUpdated: "45 min ago" },
  { id: "z5", lat: 28.6200, lng: 77.2350, radius: 320, riskScore: 55, riskLevel: "moderate", name: "ITO Junction", incidents: 19, lastUpdated: "30 min ago" },
  { id: "z6", lat: 28.6100, lng: 77.1900, radius: 400, riskScore: 18, riskLevel: "safe", name: "Diplomatic Enclave", incidents: 3, lastUpdated: "2h ago" },
  { id: "z7", lat: 28.6350, lng: 77.2250, radius: 250, riskScore: 12, riskLevel: "safe", name: "Civil Lines", incidents: 2, lastUpdated: "3h ago" },
  { id: "z8", lat: 28.5850, lng: 77.2050, radius: 350, riskScore: 22, riskLevel: "safe", name: "Sarojini Nagar", incidents: 5, lastUpdated: "1h ago" },
  { id: "z9", lat: 28.6450, lng: 77.2100, radius: 280, riskScore: 67, riskLevel: "danger", name: "Old Delhi Station", incidents: 24, lastUpdated: "18 min ago" },
  { id: "z10", lat: 28.5780, lng: 77.2300, radius: 300, riskScore: 42, riskLevel: "moderate", name: "Jangpura Extension", incidents: 13, lastUpdated: "50 min ago" },
];

export const routeOptions: RouteOption[] = [
  {
    id: "r1", name: "Safest Route", distance: "4.2 km", duration: "18 min", riskScore: 15, riskLevel: "safe", recommended: true,
    waypoints: [[28.6139, 77.209], [28.6100, 77.1950], [28.6050, 77.1920], [28.5950, 77.2000]],
  },
  {
    id: "r2", name: "Balanced Route", distance: "3.5 km", duration: "14 min", riskScore: 42, riskLevel: "moderate", recommended: false,
    waypoints: [[28.6139, 77.209], [28.6100, 77.2100], [28.6020, 77.2080], [28.5950, 77.2000]],
  },
  {
    id: "r3", name: "Fastest Route", distance: "2.8 km", duration: "11 min", riskScore: 74, riskLevel: "danger", recommended: false,
    waypoints: [[28.6139, 77.209], [28.6080, 77.2200], [28.6000, 77.2150], [28.5950, 77.2000]],
  },
];

export const alerts: Alert[] = [
  { id: "a1", type: "danger", message: "High-risk zone detected 200m ahead", location: "Near Chandni Chowk", time: "Just now" },
  { id: "a2", type: "warning", message: "Risk level increasing in ITO area", location: "ITO Junction", time: "5 min ago" },
  { id: "a3", type: "info", message: "Safe corridor available via Rajpath", location: "Central Delhi", time: "12 min ago" },
];

export const currentRiskScore = 28;

export function getRiskColor(level: "safe" | "moderate" | "danger") {
  switch (level) {
    case "safe": return "safe";
    case "moderate": return "moderate";
    case "danger": return "danger";
  }
}

export function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 21) return "Evening";
  return "Night";
}

export function getRiskForTime(): number {
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 5) return 72;
  if (hour >= 17 && hour < 22) return 48;
  if (hour >= 5 && hour < 8) return 35;
  return 20;
}
