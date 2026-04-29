"use client"
import React, { useEffect, useState } from "react"
import "../../styles/episodes.css"
import { useParams, useRouter } from "next/navigation"
import { fetchOneEpisode } from "@/app/service/api"

export default function EpisodeDetail() {
  const { id } = useParams()
  const router = useRouter()

  const [episode, setEpisode] = useState(null)
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOneEpisode(id)
        setEpisode(data)

        if (data.characters.length > 0) {
          const charactersData = await Promise.all(
            data.characters.map((url) =>
              fetch(url).then((res) => res.json())
            )
          )
          setCharacters(charactersData)
        }

      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [id])

  if (!episode) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success mb-3" />
        <p className="text-muted">Loading episode...</p>
      </div>
    )
  }

  return (
    <div className="container my-5">

      {/* 🔥 Episode Header */}
      <div className="card p-4 shadow-lg text-center mb-5 bg-dark text-white border-0 rounded-4">
        <h1 className="text-success fw-bold title">{episode.name}</h1>

        <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
          <span className="badge bg-primary px-3 py-2">
            🎬 {episode.episode}
          </span>

          <span className="badge bg-warning text-dark px-3 py-2">
            📅 {episode.air_date}
          </span>

          <span className="badge bg-info text-dark px-3 py-2">
            👥 {episode.characters.length} Characters
          </span>
        </div>
      </div>

      {/* 🔥 Characters */}
      <h3 className="text-center text-success mb-4 fw-semibold title">
        Characters in this Episode
      </h3>

      <div className="row g-4">
        {characters.map((char) => (
          <div key={char.id} className="col-6 col-md-4 col-lg-3">

            <div
              className="card character-card border-0 shadow-sm"
              onClick={() => router.push(`/characters/${char.id}`)}
            >
              <div className="image-wrapper">
                <img
                  src={char.image}
                  alt={char.name}
                  className="img-fluid"
                />

                <div className="overlay">
                  <h6>{char.name}</h6>
                  <span className="status">
                    ● {char.status}
                  </span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}