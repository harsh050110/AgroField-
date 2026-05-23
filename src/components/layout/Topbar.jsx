import { useEffect, useState } from "react";

// 🎨 Theme
const T = {
  green: "#22c55e",
  greenDark: "#14532d",
  greenMid: "#15803d",
  greenLight: "#bbf7d0",
  greenPale: "#dcfce7",

  red: "#ef4444",
  redPale: "#fee2e2",

  border: "#e5e7eb",

  charcoal: "#111827",

  textMuted: "#64748b",
};

// 📌 Navigation Items
const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
  },

  {
    id: "dash",
    label: "Dashboard",
  },

  {
    id: "zones",
    label: "Field Zones",
  },

  {
    id: "ai",
    label: "AI Engine",
  },

  {
    id: "analytics",
    label: "Analytics",
  },

  {
    id: "schedule",
    label: "Schedule",
  },

  {
    id: "alerts",
    label: "Alerts",
  },

  {
    id: "settings",
    label: "Settings",
  },
];

// 🚀 Topbar Component
export default function Topbar({
  page,
  setPage,
  zones = [],
  notif,
  setNotif,
}) {
  const [time, setTime] = useState(
    new Date()
  );

  // ⏰ Live Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  // 🚨 Critical Zones Count
  const critCount = zones.filter(
    (z) => z.status === "Critical"
  ).length;

  return (
    <div
      style={{
        height: 70,

        background: "#fff",

        borderBottom: `1px solid ${T.border}`,

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        padding: "0 24px",

        flexShrink: 0,

        position: "sticky",

        top: 0,

        zIndex: 5,
      }}
    >
      {/* 📌 PAGE TITLE */}
      <div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: T.charcoal,
            textTransform: "capitalize",
            marginBottom: 2,
          }}
        >
          {NAV_ITEMS.find(
            (n) => n.id === page
          )?.label || "AgroMind"}
        </div>

        <div
          style={{
            fontSize: 12,
            color: T.textMuted,
          }}
        >
          Smart Irrigation Intelligence
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* DATE + TIME */}
        <div
          style={{
            fontSize: 12,
            color: T.textMuted,
            padding: "8px 12px",
            borderRadius: 12,
            background: "#f8fafc",
            border: `1px solid ${T.border}`,
          }}
        >
          {time.toLocaleDateString(
            "en-IN",
            {
              weekday: "short",
              day: "numeric",
              month: "short",
            }
          )}{" "}
          ·{" "}
          {time.toLocaleTimeString(
            "en-IN",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )}
        </div>

        {/* AI STATUS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,

            background: T.greenPale,

            border: `1px solid ${T.greenLight}`,

            borderRadius: 999,

            padding: "7px 14px",

            fontSize: 12,

            color: T.greenMid,

            fontWeight: 700,
          }}
        >
          {/* PULSE DOT */}
          <span
            style={{
              width: 8,
              height: 8,

              background: T.green,

              borderRadius: "50%",

              display: "inline-block",

              animation:
                "pulse 2s infinite",
            }}
          />

          AI Active
        </div>

        {/* CRITICAL ALERT */}
        {critCount > 0 && (
          <div
            onClick={() =>
              setPage("alerts")
            }
            style={{
              cursor: "pointer",

              background: T.redPale,

              border:
                "1px solid #fecaca",

              borderRadius: 999,

              padding: "7px 14px",

              fontSize: 12,

              color: T.red,

              fontWeight: 700,

              transition:
                "all .2s ease",
            }}
          >
            ⚠ {critCount} Critical
          </div>
        )}

        {/* USER AVATAR */}
        <div
          style={{
            width: 42,
            height: 42,

            borderRadius: "50%",

            background:
              "linear-gradient(135deg,#22c55e,#14532d)",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            color: "#fff",

            fontSize: 14,

            fontWeight: 700,

            cursor: "pointer",

            boxShadow:
              "0 8px 18px rgba(34,197,94,.2)",
          }}
        >
          FM
        </div>
      </div>

      {/* ✨ Animations */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }

            50% {
              transform: scale(1.5);
              opacity: .5;
            }

            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}