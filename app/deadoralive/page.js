"use client"
import Image from "next/image"
import React, { useEffect, useState, useCallback, useRef } from "react"
import "../styles/games.css"
import { fetchAllCharacters } from "../service/api" // ✅ FIX IMPORT
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function Page() {
  const router = useRouter()
  const [allCharacters, setAllCharacters] = useState([])
  const [character, setCharacter] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameState, setGameState] = useState("idle")
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const gameStateRef = useRef(gameState)
  const characterRef = useRef(character)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => { gameStateRef.current = gameState }, [gameState])
  useEffect(() => { characterRef.current = character }, [character])

  // ✅ FETCH FROM SERVICE (clean)
  useEffect(() => {
    const loadCharacters = async () => {
      setIsLoading(true)
      const data = await fetchAllCharacters(5) // 👈 from API file
      setAllCharacters(data)
      setIsLoading(false)
    }

    loadCharacters()
  }, [])

  // ✅ Random picker
  const getRandomCharacter = useCallback(() => {
    if (allCharacters.length === 0) return null
    return allCharacters[Math.floor(Math.random() * allCharacters.length)]
  }, [allCharacters])

  const getNewCharacter = useCallback(() => {
    const newChar = getRandomCharacter()
    if (newChar) {
      setCharacter(newChar)
      setFeedback(null)
    }
  }, [getRandomCharacter])

  // ✅ Prevent starting before data loads
  const startGame = useCallback(() => {
    if (allCharacters.length === 0) return

    setScore(0)
    setTimeLeft(30)
    setGameState("playing")
    setFeedback(null)
    getNewCharacter()
  }, [getNewCharacter, allCharacters])

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          setGameState("gameOver")
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [gameState])

  // Guess handler
  const handleGuess = useCallback((guess) => {
    const currentChar = characterRef.current
    if (!currentChar) return

    setFeedback(guess === currentChar.status ? "correct" : "wrong")

    if (guess === currentChar.status) {
      setScore(s => s + 1)
    }

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (gameStateRef.current === "playing") {
        getNewCharacter()
      }
    }, 400)
  }, [getNewCharacter])

  // Cleanup
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
      clearInterval(intervalRef.current)
    }
  }, [])

  const cardClassName = `card game-card mx-auto mt-3 shadow-lg ${feedback || ''}`

  return (
    <div className="container text-center mt-5 text-white mb-5 flex-grow-1">
      <h1 className="mb-4 mt-5 title f-100 me-3"> 🛸Alive or Dead?</h1>

      {gameState === "idle" && (
        <button 
          className="btn btn-lg btn-success px-5" 
          onClick={startGame}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Start Game"}
        </button>
      )}

      {gameState === "playing" && (
        <div className="game-box">
          <div className="d-flex justify-content-between px-3">
            <h5 className="text-warning">⏱ {timeLeft}s</h5>
            <h5 className="text-info">⭐ {score}</h5>
          </div>

          {!character ? (
            <div className="card game-card mx-auto mt-3 shadow-lg">
              <div className="card-body">
                <div className="spinner-border text-light" />
              </div>
            </div>
          ) : (
            <div className={cardClassName}>
              <Image
                src={character.image}
                alt={character.name}
                width={300}
                height={300}
                className="card-img-top"
              />

              <div className="card-body text-white title d-bg">
                <h5 className="card-title title text-warning">{character.name}</h5>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-success w-45"
                    onClick={() => handleGuess("Alive")}
                    disabled={!!feedback}
                  >
                    ALIVE
                  </button>
                  <button
                    className="btn btn-danger w-45"
                    onClick={() => handleGuess("Dead")}
                    disabled={!!feedback}
                  >
                    DEAD
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {gameState === "gameOver" && (
        <div className="mt-5">
          <h1 className="me-3">💀 Game Over</h1>
          <h3 className="text-warning">Score: {score}</h3>
          <button
            className="btn btn-warning px-4 py-2 fw-bold me-3"
            onClick={startGame}
          >
            🔄 Play Again
          </button>
            <button
            className="btn btn-warning px-5 py-2 fw-bold "
            onClick={()=>{router.push("/allgames")}}
          >
            <FontAwesomeIcon icon={faAngleLeft} /> Go back
          </button>
        </div>
      )}
    </div>
  )
}