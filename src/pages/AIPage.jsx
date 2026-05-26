import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// 🎨 Theme
const T = {
  green: "#16a34a",
  greenPale: "#dcfce7",
  greenMid: "#15803d",
  greenDark: "#166534",

  blue: "#2563eb",
  purple: "#7c3aed",
  amber: "#f59e0b",

  border: "#e5e7eb",
  bgSoft: "#f8fafc",

  textMuted: "#64748b",
  charcoal: "#111827",
};

// 📊 Forecast Data
const FORECASTS = {
  A: {
    vals: [62, 58, 54, 50, 46, 42],
    reco: "Irrigation recommended within 2 hours.",
  },

  B: {
    vals: [70, 68, 64, 61, 58, 54],
    reco: "No irrigation needed currently.",
  },

  C: {
    vals: [48, 45, 42, 39, 36, 34],
    reco: "Immediate irrigation recommended.",
  },
};

export default function AIPage({ zones = [], notify }) {
  const [running, setRunning] = useState(false);

  const [accuracy, setAccuracy] = useState(93);

  const [selZone, setSelZone] = useState("A");

  // 🔄 Retrain Model
  const retrain = () => {
    setRunning(true);

    setTimeout(() => {
      const newAcc = Math.min(
        99,
        accuracy + Math.round(Math.random() * 2)
      );

      setAccuracy(newAcc);

      setRunning(false);

      if (notify) {
        notify(
          "🤖",
          `Model retrained — accuracy now ${newAcc}%`
        );
      }
    }, 2500);
  };

  // 📈 Pie Data
  const pieData = [
    {
      name: "LSTM",
      value: 45,
      color: T.green,
    },

    {
      name: "XGBoost",
      value: 28,
      color: T.blue,
    },

    {
      name: "CNN",
      value: 16,
      color: T.purple,
    },

    {
      name: "RL Agent",
      value: 11,
      color: T.amber,
    },
  ];

  // 🌱 Default Zones
  const zoneList =
    zones.length > 0
      ? zones
      : [
          { id: "A" },
          { id: "B" },
          { id: "C" },
        ];

  return (
    <div
      style={{
        overflowY: "auto",
        height: "100%",
        padding: 24,
        background: "#f1f5f9",
      }}
    >
      {/* TOP GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        {/* MODEL OVERVIEW */}
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
              alignItems: "flex-start",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: T.charcoal,
                  marginBottom: 4,
                }}
              >
                LSTM Prediction Model
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: T.textMuted,
                }}
              >
                Time-series soil moisture forecasting
              </div>
            </div>

            {/* ACCURACY BADGE */}
            <div
              style={{
                background: T.greenPale,
                color: T.greenDark,
                padding: "6px 12px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {accuracy}% accuracy
            </div>
          </div>

          {/* INFO GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {[
              {
                l: "Model Type",
                v: "LSTM (Deep Learning)",
              },

              {
                l: "Training Data",
                v: "24 months",
              },

              {
                l: "Prediction Window",
                v: "6 hours ahead",
              },

              {
                l: "Retrain Frequency",
                v: "Nightly",
              },
            ].map(({ l, v }) => (
              <div
                key={l}
                style={{
                  background: T.bgSoft,
                  borderRadius: 8,
                  padding: "10px 12px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: T.textMuted,
                    marginBottom: 3,
                  }}
                >
                  {l}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: T.charcoal,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>

          {/* RETRAIN BUTTON */}
          <button
            onClick={retrain}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 10,
              border: "none",
              background: T.green,
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            {running
              ? "🔄 Retraining Model..."
              : "🤖 Retrain Model Now"}
          </button>
        </div>

        {/* PIE CHART */}
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
              fontSize: 16,
              fontWeight: 700,
              color: T.charcoal,
              marginBottom: 4,
            }}
          >
            AI Model Breakdown
          </div>

          <div
            style={{
              fontSize: 12,
              color: T.textMuted,
              marginBottom: 16,
            }}
          >
            Contribution to final irrigation decisions
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <PieChart width={140} height={140}>
              <Pie
                data={pieData}
                cx={65}
                cy={65}
                innerRadius={40}
                outerRadius={65}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>

            <div style={{ flex: 1 }}>
              {pieData.map((p) => (
                <div
                  key={p.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: p.color,
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: T.charcoal,
                      }}
                    >
                      {p.name}
                    </div>

                    <div
                      style={{
                        height: 4,
                        background: T.border,
                        borderRadius: 2,
                        marginTop: 2,
                      }}
                    >
                      <div
                        style={{
                          height: 4,
                          width: `${p.value}%`,
                          background: p.color,
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: T.charcoal,
                    }}
                  >
                    {p.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ZONE PREDICTIONS */}
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          border: `1px solid ${T.border}`,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: T.charcoal,
            }}
          >
            Zone-wise AI Predictions
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            {zoneList.map((z) => (
              <button
                key={z.id}
                onClick={() => setSelZone(z.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: `1px solid ${
                    selZone === z.id
                      ? T.green
                      : T.border
                  }`,
                  background:
                    selZone === z.id
                      ? T.greenPale
                      : "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {z.id}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <LineChart
            data={FORECASTS[selZone].vals.map(
              (v, i) => ({
                hour: `+${i + 1}h`,
                predicted: v,
                threshold: 40,
              })
            )}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="hour" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="predicted"
              stroke={T.green}
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="threshold"
              stroke={T.amber}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>

        <div
          style={{
            marginTop: 12,
            padding: "12px 14px",
            background: T.greenPale,
            borderRadius: 10,
            color: T.greenDark,
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          🤖 AI Recommendation for Zone {selZone}:{" "}
          {FORECASTS[selZone].reco}
        </div>
      </div>
    </div>
  );
}
