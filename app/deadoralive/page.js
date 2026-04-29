"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import "../styles/games.css"

export default function Page() {
  const [character, setCharacter] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameState, setGameState] = useState("idle")
  const [feedback, setFeedback] = useState(null)

  const getNewCharacter = async () => {
    try {
      let valid = false
      let data

      while (!valid) {
        const randomId = Math.floor(Math.random() * 826) + 1
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${randomId}`
        )
        data = await res.json()

        if (data.status !== "unknown") valid = true
      }

      setCharacter(data)
      setFeedback(null)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("gameOver")
    }
  }, [timeLeft, gameState])

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameState("playing")
    getNewCharacter()
  }

  const handleGuess = (guess) => {
    if (!character) return

    if (guess === character.status) {
      setScore((s) => s + 1)
      setFeedback("correct")
    } else {
      setFeedback("wrong")
    }

    setTimeout(() => {
      getNewCharacter()
    }, 600)
  }

  return (
    <div className="container text-center mt-5 text-white">

      <h2 className="mb-4 title">🛸 Alive or Dead?</h2>

      {gameState === "idle" && (
        <button className="btn btn-lg btn-success px-5" onClick={startGame}>
          Start Game
        </button>
      )}

      {gameState === "playing" && character && (
        <div className="game-box">

          <div className="d-flex justify-content-between px-3">
            <h5 className="text-warning">⏱ {timeLeft}s</h5>
            <h5 className="text-info">⭐ {score}</h5>
          </div>

          <div className={`card game-card mx-auto mt-3 shadow-lg ${feedback}`}>
            <Image
              src={character.image}
              alt={character.name}
              width={300}
              height={300}
              className="card-img-top"
            />

            <div className="card-body text-dark">
              <h5 className="card-title">{character.name}</h5>

              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-success w-45"
                  onClick={() => handleGuess("Alive")}
                >
                  ALIVE
                </button>

                <button
                  className="btn btn-danger w-45"
                  onClick={() => handleGuess("Dead")}
                >
                  DEAD
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {gameState === "gameOver" && (
        <div className="mt-5">
          <h1>💀 Game Over</h1>
          <h3 className="text-warning">Score: {score}</h3>

          <button className="btn btn-primary mt-3 px-4" onClick={startGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}