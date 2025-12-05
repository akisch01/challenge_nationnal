interface GaugeBarsProps {
  gauges: {
    budget: number
    data: number
    planet: number
  }
}

export function GaugeBars({ gauges }: GaugeBarsProps) {
  return (
    <div className="gauges-container">
      <div className="gauge-item">
        <span className="gauge-label">💸 Budget</span>
        <div className="gauge-bar">
          <div className="gauge-fill gauge-budget" style={{ width: `${gauges.budget}%` }} />
        </div>
        <span className="gauge-value">{Math.round(gauges.budget)}%</span>
      </div>

      <div className="gauge-item">
        <span className="gauge-label">🛡️ Données</span>
        <div className="gauge-bar">
          <div className="gauge-fill gauge-data" style={{ width: `${gauges.data}%` }} />
        </div>
        <span className="gauge-value">{Math.round(gauges.data)}%</span>
      </div>

      <div className="gauge-item">
        <span className="gauge-label">🌍 Planète</span>
        <div className="gauge-bar">
          <div className="gauge-fill gauge-planet" style={{ width: `${gauges.planet}%` }} />
        </div>
        <span className="gauge-value">{Math.round(gauges.planet)}%</span>
      </div>
    </div>
  )
}
