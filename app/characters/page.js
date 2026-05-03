"use client"
import React, { useEffect, useState } from 'react'
import { fetchCharachters } from '../service/api'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import "../styles/characters.css"
import '../globals.css';
export default function Characters() {
  const router = useRouter()

  const [Characters , setCharacters]= useState([])

  useEffect(()=>{
    
      const dataResult= async()=>{
        try{
       const myCharacters = await fetchCharachters()
      setCharacters(myCharacters)
      console.log(Characters)

      }catch(err){
      console.log(err)
    }}

      dataResult()
    
  },[])
  return (
   <div className="container my-5">
      <h1 className="text-center mb-4 title text-success">Rick and Morty Characters</h1>
      
      <div className="row g-4">
        {Characters?.map((character) => (
          <div key={character.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div 
                className="card h-100 p-3 text-center shadow-sm d-flex flex-column align-items-center justify-content-center"
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/characters/${character.id}`)}
              >
                <span className={`ribbon ${
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
                className="img-fluid rounded mb-3" 
                alt={character.name}
                width={300} 
                height={300}
              />
              <h5 className='title text-warning'>{character.name}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>


)
}
