import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { formatCurrency } from "../utils/date.js";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      <p>{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export function CategoryChart({ data }) {
  return (
    <section className="panel chart-panel">
      <div className="section-title">
        <div>
          <p className="muted-label">Insights</p>
          <h2>Category Spending</h2>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="empty-chart">No category data yet</div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export function DailyChart({ data }) {
  return (
    <section className="panel chart-panel">
      <div className="section-title">
        <div>
          <p className="muted-label">Trend</p>
          <h2>Daily Spending</h2>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="empty-chart">No daily spending data yet</div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="amount" strokeWidth={3} fillOpacity={0.18} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
