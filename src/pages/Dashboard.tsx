import { useState } from "react";
import Header from "@/components/Header";
import SafetyMap from "@/components/SafetyMap";
import RiskPanel from "@/components/RiskPanel";
import RoutePanel from "@/components/RoutePanel";
import SearchBar from "@/components/SearchBar";
import AlertBanner from "@/components/AlertBanner";
import ZoneLegend from "@/components/ZoneLegend";
import SOSButton from "@/components/SOSButton";
import IncidentReportModal from "@/components/IncidentReportModal";
import SafetyStats from "@/components/SafetyStats";
import SafetyTips from "@/components/SafetyTips";
import { type RiskZone } from "@/lib/mockData";

const Dashboard = () => {
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>("r1");

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <Header />

      {/* Map fills the screen */}
      <div className="absolute inset-0 pt-14">
        <SafetyMap
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
          selectedRoute={selectedRoute}
        />
      </div>

      {/* Left overlay: Search + Alert + Tips */}
      <div className="fixed top-16 left-4 z-[500] w-80 space-y-2 hidden sm:block">
        <SearchBar />
        <AlertBanner />
        <ZoneLegend />
        <SafetyTips />
        <IncidentReportModal />
      </div>

      {/* Right overlay: Risk + Routes + Stats */}
      <div className="fixed top-16 right-4 z-[500] w-72 space-y-2 hidden sm:block max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-none">
        <RiskPanel selectedZone={selectedZone} />
        <RoutePanel selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} />
        <SafetyStats />
      </div>

      {/* SOS button - fixed bottom right */}
      <div className="fixed bottom-6 right-6 z-[600]">
        <SOSButton />
      </div>

      {/* Mobile bottom sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-[500] sm:hidden p-3 space-y-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <SearchBar />
          </div>
        </div>
        <AlertBanner />
        <div className="flex gap-2 overflow-x-auto pb-16">
          <div className="min-w-[280px]">
            <RiskPanel selectedZone={selectedZone} />
          </div>
          <div className="min-w-[280px]">
            <RoutePanel selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} />
          </div>
          <div className="min-w-[280px]">
            <SafetyStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
