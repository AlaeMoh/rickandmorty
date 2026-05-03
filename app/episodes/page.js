"use client"
import React, { useEffect, useState } from 'react'
import { fetchEpisodes } from '../service/api'
import ControlledCarousel from '../carousel/page'
import "../styles/episodes.css"
import { useRouter } from 'next/navigation'
export default function Episodes() {

    const router= useRouter()
    const [episodes, setEpisodes]= useState([])

  useEffect(() => {
    const fetchingCarousel = async () => {
      try {
        const data = await fetchEpisodes();

        setEpisodes(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchingCarousel();
  }, []); 
  return (
       <div className="container my-5">
          <h1 className="text-center mb-4 title text-success">Rick and Morty Episodes</h1>
          
          {/* Carousel section */}
          <section>
          <ControlledCarousel></ControlledCarousel>
          </section>

            {/* Episodes section */}
          <section>
     <div className="container py-5">
      <h1 className="title text-center mb-5">Multiverse Episode Logs</h1>
      
      <div className="row gap-5 ">
        {episodes.map((episode) => (
      <div key={episode.id} episode={episode} className="card h-100 shadow-sm border-0 bg-card text-white episodecard">
        {/* Episode Season/Number Badge */}

        <div className="card-header cardbg text-white d-flex justify-content-between align-items-center ">
          <span className="fw-bold">{episode.episode}</span>
          <small className="badge bg-warning text-dark">ID: {episode.id}</small>
        </div>

        <div className="card-body ">
          <h5 className="card-title title mb-3" style={{ fontSize: '1.4rem' }}>
            {episode.name}
          </h5>
          
          <p className="card-text  description text-white mb-2">
            <strong>Release Date:</strong> {episode.air_date}
          </p>
          
          <div className="mt-3">
            <span className="text-secondary small">
              Characters featured: <strong>{episode.characters.length}</strong>
            </span>
          </div>
        </div>

        <div className="card-footer border-top-0 pb-3">
          <button className="btn bg-warning w-100 rounded-pill  title"  onClick={()=>{router.push(`/episodes/${episode.id}`)}}>
            View Details
          </button>
        </div>
      </div>
    
    ))}
      </div>
       </div>
          </section>


    </div>
  )
}
