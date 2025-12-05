interface ConfettiProps {
  particles: { id: number; x: number }[]
}

export function Confetti({ particles }: ConfettiProps) {
  const colors = ["#4ECDC4", "#FF6B6B", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]

  return (
    <div className="confetti-container">
      {particles.map((particle, i) => (
        <div
          key={particle.id}
          className="confetti-piece"
          style={{
            left: `${particle.x}%`,
            backgroundColor: colors[i % colors.length],
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  )
}
