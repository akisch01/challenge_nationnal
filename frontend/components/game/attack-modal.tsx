"use client"

interface AttackModalProps {
  onDefend: () => void
}

export function AttackModal({ onDefend }: AttackModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="attack-emoji">⚠️</div>
        <h2 className="attack-title">Attaque Big Tech !</h2>
        <p className="attack-text">
          Google veut imposer ses services au lycée ! Vos données et votre budget sont menacés !
        </p>
        <button className="defend-btn" onClick={onDefend}>
          🛡️ Défendre !
        </button>
      </div>
    </div>
  )
}
