"use client"

interface IntroScreenProps {
  onStart: () => void
  highContrast: boolean
}

export function IntroScreen({ onStart, highContrast }: IntroScreenProps) {
  return (
    <div className={`intro-screen ${highContrast ? "high-contrast" : ""}`}>
      <div className="intro-content">
        <div className="intro-badge">2025</div>
        <h1 className="intro-title">MISSION : VILLAGE NIRD</h1>
        <div className="intro-divider"></div>
        <p className="intro-text">
          L'obsolescence menace le lycee ! Triez les problemes et utilisez les bons outils pour sauver le materiel
          informatique.
        </p>
        <div className="intro-mascot">
          <span className="intro-mascot-emoji">🖥️</span>
        </div>
        <button className="start-btn" onClick={onStart}>
          COMMENCER LA MISSION
        </button>
        <p className="intro-hint">Resolvez 10 problemes avant que la file de menaces ne deborde !</p>
      </div>
    </div>
  )
}
