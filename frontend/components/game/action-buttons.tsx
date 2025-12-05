"use client"

interface ActionButtonsProps {
  onAction: (action: "linux" | "local" | "repair") => void
  disabled: boolean
}

export function ActionButtons({ onAction, disabled }: ActionButtonsProps) {
  return (
    <div className="actions-container">
      <button className="action-btn action-green" onClick={() => onAction("linux")} disabled={disabled}>
        🐧 Installer Linux (Liberté)
      </button>
      <button className="action-btn action-blue" onClick={() => onAction("local")} disabled={disabled}>
        ☁️ Héberger Local (Données)
      </button>
      <button className="action-btn action-orange" onClick={() => onAction("repair")} disabled={disabled}>
        🛠️ Réparer (Durabilité)
      </button>
    </div>
  )
}
