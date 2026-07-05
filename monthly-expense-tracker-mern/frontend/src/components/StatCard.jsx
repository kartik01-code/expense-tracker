export default function StatCard({ title, value, helper, icon: Icon, tone = "neutral" }) {
  return (
    <article className={`stat-card ${tone}`}>
      <div>
        <p className="muted-label">{title}</p>
        <h3>{value}</h3>
        {helper && <span>{helper}</span>}
      </div>

      <div className="stat-icon">
        <Icon size={22} />
      </div>
    </article>
  );
}
