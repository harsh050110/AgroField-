import { useState } from "react";

// 🎨 Theme
const T = {
  red: "#ef4444",
  redPale: "#fee2e2",

  amber: "#f59e0b",
  amberPale: "#fef3c7",

  green: "#22c55e",
  greenPale: "#dcfce7",
  greenMid: "#15803d",

  border: "#e5e7eb",

  textMuted: "#64748b",
  textLight: "#94a3b8",

  charcoal: "#111827",
};

// 📊 Small Stat Card
function StatCard({ icon, label, value, color }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 20,
        border: `1px solid ${T.border}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 24 }}>{icon}</div>

        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: color,
          }}
        />
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: T.charcoal,
          marginBottom: 4,
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: 13,
          color: T.textMuted,
        }}
      >
        {label}
      </div>
    </div>
  );
}

// 🏷️ Badge
function Badge({ children, color }) {
  const colors = {
    red: {
      bg: T.redPale,
      text: T.red,
    },

    amber: {
      bg: T.amberPale,
      text: T.amber,
    },

    green: {
      bg: T.greenPale,
      text: T.greenMid,
    },
  };

  return (
    <div
      style={{
        background: colors[color].bg,
        color: colors[color].text,
        padding: "5px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        height: "fit-content",
      }}
    >
      {children}
    </div>
  );
}

// 🔘 Button
function Btn({
  children,
  onClick,
  variant = "solid",
  size = "md",
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding:
          size === "sm"
            ? "7px 14px"
            : "10px 18px",

        borderRadius: 10,

        border:
          variant === "ghost"
            ? `1px solid ${T.border}`
            : "none",

        background:
          variant === "ghost"
            ? "#fff"
            : T.green,

        color:
          variant === "ghost"
            ? T.charcoal
            : "#fff",

        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

// 📦 Card
function Card({ children }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 20,
        border: `1px solid ${T.border}`,
      }}
    >
      {children}
    </div>
  );
}

// 🚨 Main Alerts Page
export default function AlertsPage({
  alerts = [],
  setAlerts,
  notify,
}) {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? alerts
      : alerts.filter((a) => a.type === filter);

  // ❌ Dismiss Single Alert
  const dismiss = (id) => {
    setAlerts((prev) =>
      prev.filter((a) => a.id !== id)
    );

    if (notify) {
      notify("✅", "Alert dismissed");
    }
  };

  // 🧹 Clear All
  const dismissAll = () => {
    setAlerts([]);

    if (notify) {
      notify("✅", "All alerts cleared");
    }
  };

  return (
    <div
      style={{
        overflowY: "auto",
        height: "100%",
        padding: 24,
        background: "#f8fafc",
      }}
    >
      {/* 📊 TOP STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",

          gap: 14,
          marginBottom: 20,
        }}
      >
        <StatCard
          icon="🔴"
          label="Critical Alerts"
          value={
            alerts.filter(
              (a) => a.type === "crit"
            ).length
          }
          color={T.red}
        />

        <StatCard
          icon="🟡"
          label="Warnings"
          value={
            alerts.filter(
              (a) => a.type === "warn"
            ).length
          }
          color={T.amber}
        />

        <StatCard
          icon="🟢"
          label="Info Alerts"
          value={
            alerts.filter(
              (a) => a.type === "ok"
            ).length
          }
          color={T.green}
        />
      </div>

      {/* 🚨 ALERT LIST */}
      <Card>
        {/* FILTERS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {["all", "crit", "warn", "ok"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,

                    border: `1px solid ${
                      filter === f
                        ? T.green
                        : T.border
                    }`,

                    background:
                      filter === f
                        ? T.greenPale
                        : "#fff",

                    color:
                      filter === f
                        ? T.greenMid
                        : T.textMuted,

                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {f === "crit"
                    ? "Critical"
                    : f === "warn"
                    ? "Warning"
                    : f === "ok"
                    ? "Info"
                    : "All"}
                </button>
              )
            )}
          </div>

          {alerts.length > 0 && (
            <Btn
              onClick={dismissAll}
              variant="ghost"
              size="sm"
            >
              Clear All
            </Btn>
          )}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: T.textMuted,
            }}
          >
            <div
              style={{
                fontSize: 42,
                marginBottom: 12,
              }}
            >
              ✅
            </div>

            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 4,
                color: T.charcoal,
              }}
            >
              No alerts
            </div>

            <div style={{ fontSize: 13 }}>
              All systems operating normally
            </div>
          </div>
        ) : (
          filtered.map((a) => (
            <div
              key={a.id}
              style={{
                display: "flex",
                gap: 14,
                padding: "16px 0",
                borderBottom: `1px solid ${T.border}`,
                alignItems: "flex-start",
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",

                  background:
                    a.type === "crit"
                      ? T.redPale
                      : a.type === "warn"
                      ? T.amberPale
                      : T.greenPale,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {a.type === "crit"
                  ? "🔴"
                  : a.type === "warn"
                  ? "⚠️"
                  : "✅"}
              </div>

              {/* CONTENT */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    color: T.charcoal,
                    fontWeight: 600,
                    lineHeight: 1.5,
                  }}
                >
                  {a.msg}
                </div>

                <div
                  style={{
                    fontSize: 12,
                    color: T.textMuted,
                    marginTop: 4,
                  }}
                >
                  {a.time}
                </div>
              </div>

              {/* BADGE */}
              <Badge
                color={
                  a.type === "crit"
                    ? "red"
                    : a.type === "warn"
                    ? "amber"
                    : "green"
                }
              >
                {a.type === "crit"
                  ? "Critical"
                  : a.type === "warn"
                  ? "Warning"
                  : "Info"}
              </Badge>

              {/* CLOSE */}
              <span
                onClick={() => dismiss(a.id)}
                style={{
                  cursor: "pointer",
                  color: T.textLight,
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                ✕
              </span>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}