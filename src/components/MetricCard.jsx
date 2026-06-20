function MetricCard({ label, value, trend, muted = false }) {
  return (
    <article className={`metric-card${muted ? ' metric-card--muted' : ''}`}>
      <span className="metric-label">{label}</span>
      <strong>{value}</strong>
      <small className={trend.startsWith('+') ? 'trend-positive' : 'trend-negative'}>{trend} this month</small>
    </article>
  )
}

export default MetricCard
