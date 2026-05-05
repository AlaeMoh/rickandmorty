"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import "../styles/games.css"
import confetti from "canvas-confetti";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Page() {

const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);


  const initGame = async () => {
    const randomIds = Array.from({ length: 8 }, () => Math.floor(Math.random() * 826) + 1);
    const res = await fetch(`https://rickandmortyapi.com/api/character/${randomIds.join(',')}`);
    const data = await res.json();

    const pairCards = [...data, ...data]
      .sort(() => Math.random() - 0.5)
      .map((char, index) => ({ ...char, instanceId: index }));

    setCards(pairCards);
    setMatchedIds([]);
    setFlippedCards([]);
    setMoves(0);
  };

  useEffect(() => { initGame(); }, []);

    useEffect(() => {
    if (matchedIds.length === 8) {
      triggerFireworks();
    }
  }, [matchedIds]);

  const handleFlip = (card) => {
    if (locked || flippedCards.some(f => f.instanceId === card.instanceId) || matchedIds.includes(card.id)) return;

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      setLocked(true);

      if (newFlipped[0].id === newFlipped[1].id) {
        setMatchedIds(prev => [...prev, newFlipped[0].id]);
        setFlippedCards([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setLocked(false);
        }, 1000);
      }
    }
  };

  const triggerFireworks = () => {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  const run = () => {
    confetti({
      particleCount: 5,
      spread: 70,
      origin: { y: 0.6 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(run);
    }
  };

  run();
};


  return (
    <div className="container mt-5 text-center text-warning pb-5 ">
      <h1 className='title'>Memory Match</h1>
      <p className="mb-4 title">Moves: {moves} | Matches: {matchedIds.length} / 8</p>
      
      <div className="row g-3 mx-auto" style={{ maxWidth: '600px' }}>
        {cards.map((card) => {
          const isFlipped = flippedCards.some(f => f.instanceId === card.instanceId) || matchedIds.includes(card.id);
          
          return (
            <div key={card.instanceId} className="col-3">
              <div 
                className={`card shadow-sm ${
                  isFlipped ? 'bg-dark border-secondary' : 'bg-dark'
                } ${
                  matchedIds.includes(card.id) ? 'border-success border-3' : ''
                }`}
                style={{ 
                  cursor: 'pointer', 
                  height: '120px', 
                  transition: 'transform 0.3s' 
                }}
                onClick={() => handleFlip(card)}
              >
                {isFlipped ? (
                  <Image 
                    src={card.image} 
                    alt="character" 
                    fill 
                    style={{ objectFit: 'cover' }} 
                    className="rounded"
                  />
                ) : (
                  <div className="h-100 d-flex align-items-center justify-content-center">
                    <span className="h2">?</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {matchedIds.length === 8 && (
        <div className="mt-4">
          <h2 className="text-success title">Wubba Lubba Dub Dub! You Won!</h2>
          <button className="btn btn-warning px-4 py-2 fw-bold me-3 mt-2" onClick={initGame}>
              🔄 Play Again
          </button>
            <button
            className="btn btn-warning px-5 py-2 fw-bold mt-2"
            onClick={()=>{router.push("/allgames")}}
          >
            <FontAwesomeIcon icon={faAngleLeft} /> Go back
          </button>

        </div>
      )}
    </div>
  );
}