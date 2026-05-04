"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import "../styles/games.css"
export default function Page() {
     
  const [score, setScore]= useState(0)
  const [options, setOptions] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [correctId, setCorrectId] = useState(null);
  const [message, setMessage] = useState("Pick the resident!");
  const [locked, setLocked] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

const setUpRound = async () => {
  try {
    const locId = Math.floor(Math.random() * 126) + 1;

    const res = await fetch(
      `https://rickandmortyapi.com/api/location/${locId}`
    );
    const location = await res.json();

    // If no residents → retry
    if (!location.residents || location.residents.length === 0) {
      return setUpRound();
    }

    setLocationName(location.name);

    const randomResidentUrl =
      location.residents[
        Math.floor(Math.random() * location.residents.length)
      ];

    const correctRes = await fetch(randomResidentUrl);
    const correctChar = await correctRes.json();
    setCorrectId(correctChar.id);

    const imposters = [];

    while (imposters.length < 3) {
      const impId = Math.floor(Math.random() * 826) + 1;

      if (impId !== correctChar.id) {
        const impRes = await fetch(
          `https://rickandmortyapi.com/api/character/${impId}`
        );
        const impData = await impRes.json();

        // avoid duplicates
        if (!imposters.find((c) => c.id === impData.id)) {
          imposters.push(impData);
        }
      }
    }

    const allOptions = [correctChar, ...imposters].sort(
      () => Math.random() - 0.5
    );

    setOptions(allOptions);
    setMessage("Pick the resident!");
  } catch (err) {
    console.log(err);
  }
};

    useEffect(()=>{
        setUpRound()
    },[])

    //////

  const handleChoice = (id) => {
  if (locked || gameOver) return;

  setLocked(true);

  if (id === correctId) {
    setScore((prev) => prev + 1);
    setMessage("✅ Correct! Loading next...");

    setTimeout(() => {
      setLocked(false);
      setUpRound();
    }, 1200);

  } else {
    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      setGameOver(true);
      setMessage("💀 Game Over!");
    } else {
      setMessage(`❌ Wrong! Lives left: ${newLives}`);

      setTimeout(() => {
        setLocked(false);
        setUpRound();
      }, 1200);
    }
  }
};
    

    /////////


    const restartGame = () => {
  setScore(0);
  setLives(3);
  setGameOver(false);
  setLocked(false);
  setMessage("Pick the resident!");
  setUpRound();
};


  return (
    <div className="container mt-5 text-center text-white title flex-grow-1">
      {gameOver ? (
        <div className="p-5 bg-dark rounded shadow">
          <h1 className="text-danger mb-3 title">💀 Game Over</h1>
          <h3 className="mb-3">Final Score: {score}</h3>

          <button
            className="btn btn-warning px-4 py-2 fw-bold"
            onClick={restartGame}
          >
            🔄 Play Again
          </button>
        </div>
      ) : (
        <>
          <h1 className="mb-3 title">
            Who lives at{" "}
            <span className="text-warning">{locationName}</span>?
          </h1>

          {/* Score + Lives */}
          <div className="d-flex justify-content-center gap-4 mb-3">
            <h5>🎯 Score: {score}</h5>

            <div>
              {Array.from({ length: lives }).map((_, i) => (
                <span key={i} style={{ fontSize: "1.5rem" }}>
                  ❤️
                </span>
              ))}
            </div>
          </div>

          <p className="mb-4">{message}</p>

          {/* Cards */}
          <div className="row g-4 justify-content-center">
            {options.map((char) => (
              <div key={char.id} className="col-6 col-md-3">
                <div
                  className="card bg-dark text-white border-0 shadow-lg h-100"
                  style={{
                    cursor: locked ? "not-allowed" : "pointer",
                    opacity: locked ? 0.6 : 1,
                    transform: "scale(1)",
                    transition: "0.3s",
                  }}
                  onClick={() => handleChoice(char.id)}
                  onMouseEnter={(e) => {
                    if (!locked)
                      e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Image
                    src={char.image}
                    alt={char.name}
                    width={200}
                    height={200}
                    className="card-img-top rounded-top"
                  />

                  <div className="card-body p-2">
                    <h6 className="card-title text-truncate">
                      {char.name}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
