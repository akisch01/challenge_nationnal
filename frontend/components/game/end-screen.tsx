"use client"

import { useEffect, useState } from "react"
import { Confetti } from "./confetti"

interface EndScreenProps {
  isVictory: boolean
  score: number
  onReplay: () => void
  highContrast: boolean
}

export function EndScreen({ isVictory, score, onReplay, highContrast }: EndScreenProps) {
  const [confetti, setConfetti] = useState<{ id: number; x: number }[]>([])

  useEffect(() => {
    if (isVictory) {
      // Trigger victory confetti
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
      }))
      setConfetti(particles)
    }
  }, [isVictory])

  return (
    <div className={`end-screen ${highContrast ? "high-contrast" : ""}`}>
      {isVictory && <Confetti particles={confetti} />}

      <div className="end-content">
        <div className={`end-emoji ${isVictory ? "victory-bounce" : "defeat-shake"}`}>{isVictory ? "🎉" : "💔"}</div>

        <h1 className={`end-title ${isVictory ? "victory-text" : "defeat-text"}`}>
          {isVictory ? "LE VILLAGE EST SAUVE !" : "MISSION ECHOUEE"}
        </h1>

        <p className="end-subtitle">
          {isVictory
            ? "Bravo ! Vous avez resiste a l'obsolescence programmee !"
            : "Les Big Tech ont pris le controle... Reessayez !"}
        </p>

        <div className="score-container">
          <span className="score-label">Score Final</span>
          <span className="score-value">{score}</span>
        </div>

        <div className="end-buttons">
          <button className="replay-btn" onClick={onReplay}>
            Rejouer
          </button>
          <a
            href="https://nird.forge.apps.education.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="learn-btn"
          >
            En savoir plus sur NIRD
          </a>
        </div>
      </div>
    </div>
  )
}
