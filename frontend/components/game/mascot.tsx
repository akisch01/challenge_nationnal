interface MascotProps {
  gameOver: boolean
}

export function Mascot({ gameOver }: MascotProps) {
  return (
    <div className="mascot-zone">
      <div className="mascot-circle">
        <span className="mascot-emoji">{gameOver ? "😵" : "🖥️"}</span>
      </div>
      <div className="speech-bubble">
        <p>{gameOver ? "Nooon ! Les Big Tech ont gagné..." : "Sauve-moi de l'obsolescence !"}</p>
      </div>
    </div>
  )
}
