"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import "../styles/games.css"
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

  return (
    <div className="container mt-5 text-center text-white">
      <h1 className='title'>Memory Match</h1>
      <p className="mb-4 title">Moves: {moves} | Matches: {matchedIds.length} / 8</p>
      
      <div className="row g-3 mx-auto" style={{ maxWidth: '600px' }}>
        {cards.map((card) => {
          const isFlipped = flippedCards.some(f => f.instanceId === card.instanceId) || matchedIds.includes(card.id);
          
          return (
            <div key={card.instanceId} className="col-3">
              <div 
                className={`card bg-dark border-secondary shadow-sm ${isFlipped ? '' : 'bg-primary'}`}
                style={{ cursor: 'pointer', height: '120px', transition: 'transform 0.3s' }}
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
          <h2 className="text-success">Wubba Lubba Dub Dub! You Won!</h2>
          <button className="btn btn-warning mt-2" onClick={initGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}