import AvailabilityDashboard from "@/components/availability-dashboard";

export default function AvailabilityDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Navigation spacer for fixed header */}
      <div className="h-16"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <AvailabilityDashboard />
      </div>
    </div>
  );
}