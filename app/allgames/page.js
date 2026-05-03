"use client";
import { useRouter } from "next/navigation";
import "../styles/games.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faSkull } from '@fortawesome/free-solid-svg-icons'
import { faSpaceShuttle } from "@fortawesome/free-solid-svg-icons/faSpaceShuttle";

export default function GamesPage() {
  const router = useRouter();


  return (
<div className="container my-5 pb-5">
  
  {/* Title */}
  <h1 className="text-center mb-3 title text-success ">🎮 Games Zone</h1>
  <p className="text-center mb-5 text-white">
    Test your knowledge of Rick and Morty in fun interactive games!
  </p>

  {/* ONE row only */}
  <div className="row justify-content-center g-4 pb-5">

    {/* Card 1 */}
    <div className="col-12 col-md-6 col-lg-4 ">
      <div className="card h-100 shadow-sm p-3 text-center d-bg d-flex flex-column">
        <h4 className="mb-3 text-warning title">
            <FontAwesomeIcon icon={faBrain} className="me-2 text-warning" /> 
            Memory Game</h4>

        <p className="text-white">
          Flip cards and match identical characters before time runs out
        </p>

        <small className="text-secondary mb-3">
          <strong>How to play:</strong> Click on cards to flip them. Match all pairs to win.
        </small>

        <button
          className="btn button-text mt-auto text-warning"
          onClick={() => router.push("/memorymatch")}
        >
          Play Now
        </button>
      </div>
    </div>

    {/* Card 2 */}
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm p-3 text-center d-bg d-flex flex-column">
        <h4 className="mb-3 text-warning title">
            <FontAwesomeIcon icon={faSkull} className="me-2 text-warning" /> Dead or Alive
        </h4>

        <p className="text-white">
          Guess whether the character is alive, dead, or unknown.
        </p>

        <small className="text-secondary mb-3">
          <strong>How to play:</strong> Look at the character and choose the correct status.
        </small>

        <button
          className="btn button-text mt-auto text-warning"
          onClick={() => router.push("/deadoralive")}
        >
          Play Now
        </button>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm p-3 text-center d-bg d-flex flex-column">
        <h4 className="mb-3 text-warning title"><FontAwesomeIcon icon={faSpaceShuttle} className="me-2 text-warning" /> Who Lives Where</h4>

        <p className="text-white">
          Match each character with their correct location.
        </p>

        <small className="text-secondary mb-3">
          <strong>How to play:</strong> Drag or select the correct location for each character.
        </small>

        <button
          className="btn button-text mt-auto text-warning"
          onClick={() => router.push("/residentgame")}
        >
          Play Now
        </button>
      </div>
    </div>

  </div>
</div>
  );
}