import { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Notification from "./components/Notification";

import HomePage from "./pages/HomePage";
import ZonesPage from "./pages/ZonesPage";
import AIPage from "./pages/AIPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SchedulePage from "./pages/SchedulePage";
import AlertsPage from "./pages/AlertsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [zones, setZones] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [notification, setNotification] = useState(null);

  // 🔔 Notification Function
  const notify = (icon, msg) => {
    setNotification({ icon, msg });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // 📄 Render Different Pages
  const renderPage = () => {
    switch (page) {
      case "zones":
        return (
          <ZonesPage
            zones={zones}
            setZones={setZones}
            notify={notify}
          />
        );

      case "ai":
        return (
          <AIPage
            zones={zones}
            notify={notify}
          />
        );

      case "analytics":
        return <AnalyticsPage />;

      case "schedule":
        return (
          <SchedulePage
            zones={zones}
            notify={notify}
          />
        );

      case "alerts":
        return (
          <AlertsPage
            alerts={alerts}
            setAlerts={setAlerts}
            notify={notify}
          />
        );

      case "settings":
        return (
          <SettingsPage
            notify={notify}
          />
        );

      default:
        return (
          <HomePage
            setPage={setPage}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden">

      {/* SIDEBAR */}
      <Sidebar
        page={page}
        setPage={setPage}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOPBAR */}
        <Topbar
          page={page}
          setPage={setPage}
          zones={zones}
          setNotif={setNotification}
        />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <Notification
          icon={notification.icon}
          msg={notification.msg}
          onClose={() => setNotification(null)}
        />
      )}

    </div>
  );
}