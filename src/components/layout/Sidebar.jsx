import { useState } from "react";

// 🎨 Theme
const T = {
  green: "#22c55e",
  greenDark: "#14532d",
  greenMid: "#15803d",

  border: "rgba(255,255,255,.08)",

  whiteSoft: "rgba(255,255,255,.7)",
  whiteFade: "rgba(255,255,255,.45)",
};

// 🌱 Simple Logo
function Logo({ size = 36 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        background:
          "linear-gradient(135deg,#22c55e,#15803d)",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        fontSize: size / 2,
        color: "#fff",

        boxShadow:
          "0 8px 20px rgba(34,197,94,.25)",
      }}
    >
      🌿
    </div>
  );
}

// 📌 Sidebar Navigation Items
const NAV_ITEMS = [
  {
    id: "home",
    icon: "🏠",
    label: "Home",
  },

  {
    id: "dash",
    icon: "📊",
    label: "Dashboard",
  },

  {
    id: "zones",
    icon: "🌿",
    label: "Field Zones",
  },

  {
    id: "ai",
    icon: "🤖",
    label: "AI Engine",
  },

  {
    id: "analytics",
    icon: "📈",
    label: "Analytics",
  },

  {
    id: "schedule",
    icon: "⏱",
    label: "Schedule",
  },

  {
    id: "alerts",
    icon: "🔔",
    label: "Alerts",
  },

  {
    id: "settings",
    icon: "⚙️",
    label: "Settings",
  },
];

// 🚀 Sidebar Component
export default function Sidebar({
  page,
  setPage,
}) {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <div
      style={{
        width: collapsed ? 74 : 240,

        background:
          "linear-gradient(180deg,#14532d,#052e16)",

        display: "flex",
        flexDirection: "column",

        transition: "all .25s ease",

        flexShrink: 0,

        position: "relative",

        zIndex: 10,

        borderRight: `1px solid ${T.border}`,

        overflow: "hidden",
      }}
    >
      {/* 🌿 LOGO */}
      <div
        style={{
          padding: "22px 18px",

          display: "flex",

          alignItems: "center",

          gap: 14,

          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <Logo size={40} />

        {!collapsed && (
          <div>
            <div
              style={{
                fontSize: 22,
                color: "#fff",
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              AgroMind
            </div>

            <div
              style={{
                fontSize: 11,
                color: T.whiteFade,
                marginTop: 2,
              }}
            >
              AI Irrigation Platform
            </div>
          </div>
        )}
      </div>

      {/* 📌 NAVIGATION */}
      <nav
        style={{
          flex: 1,
          padding: "14px 10px",
          overflowY: "auto",
        }}
      >
        {NAV_ITEMS.map((n) => {
          const active = page === n.id;

          return (
            <div
              key={n.id}
              onClick={() => setPage(n.id)}
              style={{
                display: "flex",

                alignItems: "center",

                gap: 14,

                padding: "12px 14px",

                borderRadius: 14,

                cursor: "pointer",

                marginBottom: 6,

                transition: "all .18s ease",

                background: active
                  ? "rgba(34,197,94,.18)"
                  : "transparent",

                border: active
                  ? "1px solid rgba(34,197,94,.25)"
                  : "1px solid transparent",

                color: active
                  ? "#fff"
                  : T.whiteSoft,

                backdropFilter: active
                  ? "blur(8px)"
                  : "none",

                boxShadow: active
                  ? "0 8px 20px rgba(34,197,94,.12)"
                  : "none",
              }}
            >
              {/* ICON */}
              <span
                style={{
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {n.icon}
              </span>

              {/* LABEL */}
              {!collapsed && (
                <span
                  style={{
                    fontSize: 14,

                    fontWeight: active
                      ? 600
                      : 500,

                    whiteSpace: "nowrap",
                  }}
                >
                  {n.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* 👤 USER CARD */}
      {!collapsed && (
        <div
          style={{
            margin: 12,

            padding: 14,

            borderRadius: 16,

            background:
              "rgba(255,255,255,.05)",

            border: `1px solid ${T.border}`,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: "#fff",
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            Smart Irrigation Active
          </div>

          <div
            style={{
              fontSize: 11,
              color: T.whiteFade,
              lineHeight: 1.5,
            }}
          >
            AI engine monitoring soil
            moisture, weather conditions,
            and irrigation schedules.
          </div>
        </div>
      )}

      {/* ↔️ COLLAPSE BUTTON */}
      <div
        onClick={() =>
          setCollapsed((p) => !p)
        }
        style={{
          padding: 16,

          borderTop: `1px solid ${T.border}`,

          cursor: "pointer",

          display: "flex",

          alignItems: "center",

          justifyContent: collapsed
            ? "center"
            : "flex-end",

          color: T.whiteFade,

          fontSize: 18,

          transition: "all .2s ease",
        }}
      >
        {collapsed ? "→" : "←"}
      </div>
    </div>
  );
}