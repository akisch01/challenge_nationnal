"use client"

import { useState, useEffect, useCallback } from "react"
import { IntroScreen } from "@/components/game/intro-screen"
import { EndScreen } from "@/components/game/end-screen"
import { Confetti } from "@/components/game/confetti"
import { AccessibilityToggle } from "@/components/game/accessibility-toggle"

type Screen = "intro" | "game" | "end"

type Problem = {
  id: string
  name: string
  emoji: string
  description: string
  correctTools: string[]
}

type Tool = {
  id: string
  name: string
  emoji: string
  description: string
  isGood: boolean
  badMessage?: string
}

const PROBLEMS: Problem[] = [
  {
    id: "slow-pc",
    name: "PC Lent",
    emoji: "🐌",
    description: "L'ordinateur rame terriblement...",
    correctTools: ["linux", "repair"],
  },
  {
    id: "data-leak",
    name: "Fuite de Donnees",
    emoji: "💧",
    description: "Les donnees fuient vers des serveurs inconnus!",
    correctTools: ["local-server", "forge"],
  },
  {
    id: "expired-license",
    name: "Licence Expiree",
    emoji: "⏰",
    description: "Windows demande 150 euros pour continuer...",
    correctTools: ["linux"],
  },
  {
    id: "broken-screen",
    name: "Ecran Casse",
    emoji: "🖥️",
    description: "L'ecran est fissure mais le PC fonctionne!",
    correctTools: ["repair", "screwdriver"],
  },
  {
    id: "virus",
    name: "Virus Detecte",
    emoji: "🦠",
    description: "Un malware a infecte le systeme!",
    correctTools: ["linux", "forge"],
  },
  {
    id: "full-storage",
    name: "Stockage Plein",
    emoji: "💾",
    description: "Plus d'espace disque disponible!",
    correctTools: ["local-server", "repair"],
  },
]

const TOOLS: Tool[] = [
  { id: "linux", name: "Linux", emoji: "🐧", description: "Systeme libre et leger", isGood: true },
  { id: "forge", name: "La Forge", emoji: "🤝", description: "Plateforme collaborative NIRD", isGood: true },
  {
    id: "local-server",
    name: "Serveur Local",
    emoji: "🛡️",
    description: "Hebergement souverain et securise",
    isGood: true,
  },
  { id: "repair", name: "Reparation", emoji: "🔧", description: "Reparer plutot que jeter!", isGood: true },
  { id: "screwdriver", name: "Tournevis", emoji: "🪛", description: "Ouvrir et reparer le materiel", isGood: true },
  {
    id: "buy-new",
    name: "Acheter Neuf",
    emoji: "💸",
    description: "Acheter un nouveau PC",
    isGood: false,
    badMessage: "Pas ecologique ! On repare d'abord.",
  },
  {
    id: "cloud-gafam",
    name: "Cloud GAFAM",
    emoji: "☁️",
    description: "Stocker sur Google/Amazon",
    isGood: false,
    badMessage: "Attention RGPD ! Vos donnees partent aux USA.",
  },
  {
    id: "crack",
    name: "Crack Windows",
    emoji: "🏴‍☠️",
    description: "Telecharger Windows pirate",
    isGood: false,
    badMessage: "Illegal et dangereux ! Risque de virus.",
  },
]

export default function GamePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("intro")
  const [highContrast, setHighContrast] = useState(false)
  const [confetti, setConfetti] = useState<{ id: number; x: number }[]>([])

  const [score, setScore] = useState(0)
  const [threats, setThreats] = useState<Problem[]>([])
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null)
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [hoveredTool, setHoveredTool] = useState<Tool | null>(null)
  const [isShaking, setIsShaking] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [isVictory, setIsVictory] = useState(false)
  const [problemsSolved, setProblemsSolved] = useState(0)

  const triggerConfetti = useCallback(() => {
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
    }))
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 2000)
  }, [])

  useEffect(() => {
    if (currentScreen !== "game" || gameOver) return

    const spawnThreat = () => {
      const randomProblem = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)]
      const newThreat = { ...randomProblem, id: `${randomProblem.id}-${Date.now()}` }
      setThreats((prev) => [...prev, newThreat])
    }

    // Spawn first threat immediately
    if (threats.length === 0 && !activeProblem) {
      spawnThreat()
    }

    const timer = setInterval(spawnThreat, 5000)
    return () => clearInterval(timer)
  }, [currentScreen, gameOver, threats.length, activeProblem])

  useEffect(() => {
    if (threats.length >= 5 && !gameOver) {
      setGameOver(true)
      setIsVictory(false)
      setCurrentScreen("end")
    }
  }, [threats, gameOver])

  useEffect(() => {
    if (problemsSolved >= 10 && !gameOver) {
      setGameOver(true)
      setIsVictory(true)
      setCurrentScreen("end")
    }
  }, [problemsSolved, gameOver])

  const selectThreat = (threat: Problem) => {
    setActiveProblem(threat)
    setThreats((prev) => prev.filter((t) => t.id !== threat.id))
    setFeedback(null)
  }

  const applyTool = (tool: Tool) => {
    if (!activeProblem) return

    if (!tool.isGood) {
      // Bad tool selected
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      setFeedback({ message: tool.badMessage || "Mauvais choix!", type: "error" })
      setScore((prev) => Math.max(0, prev - 50))
      return
    }

    if (activeProblem.correctTools.includes(tool.id)) {
      // Correct tool!
      triggerConfetti()
      setFeedback({ message: "Excellent ! Probleme resolu !", type: "success" })
      setScore((prev) => prev + 100)
      setProblemsSolved((prev) => prev + 1)
      setTimeout(() => {
        setActiveProblem(null)
        setFeedback(null)
      }, 1000)
    } else {
      // Wrong good tool
      setFeedback({ message: "Cet outil ne resout pas ce probleme...", type: "error" })
      setScore((prev) => Math.max(0, prev - 25))
    }
  }

  const startGame = () => {
    setCurrentScreen("game")
    setScore(0)
    setThreats([])
    setActiveProblem(null)
    setFeedback(null)
    setGameOver(false)
    setIsVictory(false)
    setProblemsSolved(0)
  }

  const restartGame = () => {
    setCurrentScreen("intro")
  }

  const handleMouseEnter = (tool: Tool) => {
    setHoveredTool(tool)
  }

  const handleMouseLeave = () => {
    setHoveredTool(null)
  }

  if (currentScreen === "intro") {
    return <IntroScreen onStart={startGame} highContrast={highContrast} />
  }

  if (currentScreen === "end") {
    return <EndScreen isVictory={isVictory} score={score} onReplay={restartGame} highContrast={highContrast} />
  }

  return (
    <div className={`cockpit-container ${highContrast ? "high-contrast" : ""} ${isShaking ? "screen-shake" : ""}`}>
      <AccessibilityToggle highContrast={highContrast} onToggle={() => setHighContrast(!highContrast)} />
      <Confetti particles={confetti} />

      {/* Score Header */}
      <div className="cockpit-header">
        <div className="score-display">
          <span className="score-icon">⭐</span>
          <span className="score-text">Resistance: {score}</span>
        </div>
        <div className="problems-counter">
          <span>Problemes resolus: {problemsSolved}/10</span>
        </div>
      </div>

      <div className="cockpit-layout">
        {/* LEFT COLUMN: Toolbox */}
        <div className="toolbox-column">
          <h2 className="column-title">Boite a Outils</h2>
          <div className="tools-grid">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                className={`tool-btn ${!tool.isGood ? "tool-bad" : "tool-good"}`}
                onClick={() => applyTool(tool)}
                onMouseEnter={() => handleMouseEnter(tool)}
                onMouseLeave={handleMouseLeave}
                disabled={!activeProblem}
              >
                <span className="tool-emoji">{tool.emoji}</span>
                <span className="tool-name">{tool.name}</span>
              </button>
            ))}
          </div>
          {/* Tooltip */}
          {hoveredTool && (
            <div className={`tool-tooltip ${!hoveredTool.isGood ? "tooltip-bad" : ""}`}>
              <span className="tooltip-emoji">{hoveredTool.emoji}</span>
              <span className="tooltip-name">{hoveredTool.name}</span>
              <span className="tooltip-desc">{hoveredTool.description}</span>
            </div>
          )}
        </div>

        {/* CENTER COLUMN: Workshop */}
        <div className="workshop-column">
          <h2 className="column-title">Atelier</h2>
          <div className="workshop-area">
            {activeProblem ? (
              <>
                <div className="active-problem">
                  <span className="problem-emoji-large">{activeProblem.emoji}</span>
                  <h3 className="problem-name">{activeProblem.name}</h3>
                  <p className="problem-desc">{activeProblem.description}</p>
                </div>
                <p className="workshop-prompt">Quel outil utiliser ?</p>
              </>
            ) : (
              <div className="workshop-empty">
                <span className="empty-emoji">👈</span>
                <p>Selectionnez une menace a droite</p>
              </div>
            )}
            {/* Feedback message */}
            {feedback && <div className={`feedback-message ${feedback.type}`}>{feedback.message}</div>}
          </div>
        </div>

        {/* RIGHT COLUMN: Threats Queue */}
        <div className="threats-column">
          <h2 className="column-title">
            Menaces <span className="threat-count">({threats.length}/5)</span>
          </h2>
          <div className="threats-queue">
            {threats.length === 0 ? (
              <div className="no-threats">
                <span>En attente...</span>
              </div>
            ) : (
              threats.map((threat) => (
                <button
                  key={threat.id}
                  className="threat-card"
                  onClick={() => selectThreat(threat)}
                  disabled={activeProblem !== null}
                >
                  <span className="threat-emoji">{threat.emoji}</span>
                  <span className="threat-name">{threat.name}</span>
                </button>
              ))
            )}
          </div>
          {threats.length >= 4 && <div className="danger-warning">Attention ! File presque pleine !</div>}
        </div>
      </div>
    </div>
  )
}
