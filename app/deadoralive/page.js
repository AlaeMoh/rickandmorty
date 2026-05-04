// "use client"
// import Image from "next/image"
// import React, { useEffect, useState, useCallback } from "react"
// import "../styles/games.css"

// export default function Page() {
//   const [character, setCharacter] = useState(null)
//   const [score, setScore] = useState(0)
//   const [timeLeft, setTimeLeft] = useState(30)
//   const [gameState, setGameState] = useState("idle")
//   const [feedback, setFeedback] = useState(null)
//   const [nextCharacter, setNextCharacter] = useState(null)
 
  
// const fetchCharacter = async () => {
//   const randomId = Math.floor(Math.random() * 826) + 1
//   const res = await fetch(
//     `https://rickandmortyapi.com/api/character/${randomId}`
//   )
//   const data = await res.json()

//   if (data.status === "unknown") return fetchCharacter()
//   return data
// }

// const getNewCharacter = async () => {
//   const newChar = nextCharacter || await fetchCharacter()
//   setCharacter(newChar)
//   setNextCharacter(await fetchCharacter()) 
//   setFeedback(null)
// }
// ///////////

// const startGame = () => {
//    setScore(0) ,
//    setTimeLeft(30),
//     setGameState("playing") ,
//     getNewCharacter() }


// /////
// useEffect(() => {
//   if (gameState !== "playing") return

//   const interval = setInterval(() => {
//     setTimeLeft((t) => {
//       if (t <= 1) {
//         clearInterval(interval)
//         setGameState("gameOver")
//         return 0
//       }
//       return t - 1
//     })
//   }, 1000)

//   return () => clearInterval(interval)
// }, [gameState])

// const handleGuess = useCallback((guess) => {
//   if (!character) return

//   if (guess === character.status) {
//     setScore((s) => s + 1)
//     setFeedback("correct")
//   } else {
//     setFeedback("wrong")
//   }

//   setTimeout(() => {
//     getNewCharacter()
//   }, 600)
// }, [character])


//   return (
//     <div className="container text-center mt-5 text-white mb-5 flex-grow-1">

//       <h1 className="mb-4 mt-5 title f-100 me-3"> 🛸Alive or Dead?</h1>

//       {gameState === "idle" && (
//         <button className="btn btn-lg btn-success px-5" onClick={startGame}>
//           Start Game
//         </button>
//       )}

//       {gameState === "playing" && character && (
//         <div className="game-box">

//           <div className="d-flex justify-content-between px-3">
//             <h5 className="text-warning">⏱ {timeLeft}s</h5>
//             <h5 className="text-info">⭐ {score}</h5>
//           </div>

//           <div className={`card game-card mx-auto mt-3 shadow-lg ${feedback}`}>
//             <Image
//               src={character.image}
//               alt={character.name}
//               width={300}
//               height={300}
//               className="card-img-top"
//               priority
//             />
//             <div className="card-body text-dark">
//               <h5 className="card-title">{character.name}</h5>

//               <div className="d-flex justify-content-between mt-3">
//                 <button
//                   className="btn btn-success w-45"
//                   onClick={() => handleGuess("Alive")}
//                 >
//                   ALIVE
//                 </button>

//                 <button
//                   className="btn btn-danger w-45"
//                   onClick={() => handleGuess("Dead")}
//                 >
//                   DEAD
//                 </button>
//               </div>
//             </div>
//           </div>

//         </div>
//       )}

//       {gameState === "gameOver" && (
//         <div className="mt-5">
//           <h1 className="me-3">💀 Game Over</h1>
//           <h3 className="text-warning">Score: {score}</h3>

//           <button className="btn btn-warning mt-3 px-4" onClick={startGame}>
//             Play Again
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"
import Image from "next/image"
import React, { useEffect, useState, useCallback, useRef } from "react"
import "../styles/games.css"
import { fetchCharachters } from "../service/api"


const MAX_RETRY = 3 
export default function Page() {
  const [character, setCharacter] = useState(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameState, setGameState] = useState("idle")
  const [feedback, setFeedback] = useState(null)
  const [nextCharacter, setNextCharacter] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const gameStateRef = useRef(gameState)
  const characterRef = useRef(character)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)

  // Keep refs in sync with state
  useEffect(() => { gameStateRef.current = gameState }, [gameState])
  useEffect(() => { characterRef.current = character }, [character])

  const fetchCharacter = useCallback(async (retryCount = 0) => {
    try {
      const randomId = Math.floor(Math.random() * 826) + 1
      const res = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`, {
        cache: 'no-store' // Ensure fresh data
      })
      
      if (!res.ok) throw new Error('Fetch failed')
      
      const data = await res.json()
      
      // Filter out unwanted statuses with limited retries
      if (data.status === "unknown" && retryCount < MAX_RETRY) {
        return fetchCharachters(retryCount + 1)
      }
      
      return data.status === "unknown" ? null : data
    } catch (error) {
      console.error('Failed to fetch character:', error)
      return retryCount < MAX_RETRY ? fetchCharacters(retryCount + 1) : null
    }
  }, [])

  // ✅ Parallel preloading + loading state management
  const getNewCharacter = useCallback(async () => {
    if (nextCharacter) {
      setCharacter(nextCharacter)
      setFeedback(null)
      // Preload next in background
      const fresh = await fetchCharacter()
      if (fresh) setNextCharacter(fresh)
    } else {
      setIsLoading(true)
      const [current, next] = await Promise.all([
        fetchCharacter(),
        fetchCharacter()
      ])
      if (current) setCharacter(current)
      if (next) setNextCharacter(next)
      setIsLoading(false)
      setFeedback(null)
    }
  }, [nextCharacter, fetchCharacter])

  // ✅ Batched state updates + proper cleanup
  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(30)
    setGameState("playing")
    setFeedback(null)
    getNewCharacter()
  }, [getNewCharacter])

  // ✅ Timer with ref check + single interval reference
  useEffect(() => {
    if (gameState !== "playing") return

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setGameState("gameOver")
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [gameState])

  // ✅ Optimized guess handler with cleanup + ref usage
  const handleGuess = useCallback((guess) => {
    const currentChar = characterRef.current
    if (!currentChar) return

    // Immediate visual feedback
    setFeedback(guess === currentChar.status ? "correct" : "wrong")
    
    if (guess === currentChar.status) {
      setScore(s => s + 1)
    }

    // ✅ Store timeout ref for cleanup
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (gameStateRef.current === "playing") {
        getNewCharacter()
      }
    }, 400) // Reduced delay for snappier feel
  }, [getNewCharacter])

  // ✅ Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // ✅ Memoized feedback class to prevent unnecessary recalculations
  const cardClassName = `card game-card mx-auto mt-3 shadow-lg ${feedback || ''}`

  return (
    <div className="container text-center mt-5 text-white mb-5 flex-grow-1">
      <h1 className="mb-4 mt-5 title f-100 me-3"> 🛸Alive or Dead?</h1>

      {gameState === "idle" && (
        <button 
          className="btn btn-lg btn-success px-5" 
          onClick={startGame}
          aria-label="Start the game"
        >
          Start Game
        </button>
      )}

      {gameState === "playing" && (
        <div className="game-box">
          <div className="d-flex justify-content-between px-3">
            <h5 className="text-warning">⏱ {timeLeft}s</h5>
            <h5 className="text-info">⭐ {score}</h5>
          </div>

          {isLoading || !character ? (
            <div className="card game-card mx-auto mt-3 shadow-lg">
              <div className="card-body">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={cardClassName}>
              {/* ✅ Removed priority + added loading="lazy" + sizes for responsive loading */}
                    {character?.image ? (
                      <Image
                        src={character.image}
                        alt={character.name || "Character"}
                        width={300}
                        height={300}
                        className="card-img-top"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    ) : (
                      // Fallback placeholder while image loads or if missing
                      <div 
                        className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                        style={{ width: 300, height: 300 }}
                      >
                        <span className="text-light">🎭 No Image</span>
                      </div>
                    )}
              <div className="card-body text-white title">
                <h5 className="card-title title1">{character.name}</h5>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-success w-45"
                    onClick={() => handleGuess("Alive")}
                    disabled={!!feedback}
                    aria-label="Guess character is alive"
                  >
                    ALIVE
                  </button>
                  <button
                    className="btn btn-danger w-45"
                    onClick={() => handleGuess("Dead")}
                    disabled={!!feedback}
                    aria-label="Guess character is dead"
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
        <div className="mt-5" role="alert" aria-live="polite">
          <h1 className="me-3">💀 Game Over</h1>
          <h3 className="text-warning">Score: {score}</h3>
          <button 
            className="btn btn-warning mt-3 px-4" 
            onClick={startGame}
            aria-label="Play again"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}