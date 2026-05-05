"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import "../../styles/characters.css"
import '../../globals.css';
import {  fetchOneCharacter } from '@/app/service/api'

export default function Page() {
const {characterId} = useParams()
  const router = useRouter()

  const [character , setCharacter]= useState([])

  useEffect(()=>{
    
      const dataResult= async()=>{
        try{
       const myCharacter = await fetchOneCharacter(characterId)
      setCharacter(myCharacter)
      console.log(Character)

      }catch(err){
      console.log(err)
    }}

      dataResult()
    
  },[characterId])

    if (!character || !character.image ) return <p className="text-center mt-5">Loading...</p>;

  return (
   <div className="container my-5">
      <h1 className="text-center mb-4 title1">Rick and Morty Characters</h1>
      
    <div className="container my-5">

      <div className="card p-4 shadow-lg cardbg text-white border-0">

        <div className="row align-items-center">

          {/* Image */}
          <div className="col-md-4 text-center position-relative">

            {/* Ribbon */}
            <span className={`oneCharacterRibon ${
              character.status === 'Alive'
                ? 'bg-success'
                : character.status === 'Dead'
                ? 'bg-danger'
                : 'bg-warning'
            }`}>
              {character.status}
            </span>

            <Image 
             src={character.image}
              alt={character.name}
              width={300}
              height={300}
              className="rounded img-fluid"
            />
          </div>

          {/* Info */}
          <div className="col-md-8">

            <h2 className=" mb-3 title1 fs-1 pt-4 md-text-center">{character.name}</h2>

            <div className="mb-3">
              <span className="badge yellowish me-2">
                {character.species}
              </span>

              <span className="badge bg-info text-dark me-2">
                {character.gender}
              </span>

              {character.type && (
                <span className="badge bg-secondary">
                  {character.type}
                </span>
              )}
            </div>

            <p><strong>Origin:</strong> {character.origin?.name}</p>
            <p><strong>Last Location:</strong> {character.location?.name}</p>

            <p><strong>Episodes:</strong> {character.episode?.length}</p>

            {/* Button to Episodes page */}
            <button
              className="btn yellowish mt-3 title"
              onClick={() => router.push(`/episodes`)}
            >
              View Episodes
            </button>

          </div>

        </div>
      </div>
    </div>
</div>


)
}

