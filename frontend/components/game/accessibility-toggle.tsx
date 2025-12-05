"use client"

interface AccessibilityToggleProps {
  highContrast: boolean
  onToggle: () => void
}

export function AccessibilityToggle({ highContrast, onToggle }: AccessibilityToggleProps) {
  return (
    <button
      className="accessibility-btn"
      onClick={onToggle}
      aria-label={highContrast ? "Désactiver le mode contraste élevé" : "Activer le mode contraste élevé"}
    >
      👁️
    </button>
  )
}
