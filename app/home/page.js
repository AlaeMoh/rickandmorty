"use client"
import React, { useState } from 'react'
import "../styles/home.css"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Game1 from "../deadoralive/page"
import Game2 from "../residentgame/page"
import Game3 from "../memorymatch/page"

export default function Home() {

  const router= useRouter()
  // const [characters, setCharacters]= useState([])
  // const [episodes, setEpisodes]= useState([])
  // const [location, setLocations]= useState([])

  return (
    <div>
    <section className="hero">
  <div className="hero-content">
    <h1>Welcome to the Multiverse</h1>
    <p className="mb-4">Explore characters, dimensions, and chaos</p>
    <Link href="/characters" className="btn btn-custom me-2">View Characters</Link>
    <a href="/about" className="btn btn-outline-light">Explore More</a>
  </div>
</section>

{/* <!-- Featured Characters --> */}
<section className="container py-5">
  <h2 className="section-title title">In our space you can</h2>

  <div className="row g-4">

    <div className="col-md-3">
      <div className="card p-3 text-center">
      <button className='btn button-text' onClick={()=>{router.push("/episodes")}}>Watch Episodes</button>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card p-3 text-center">
      <button className='btn button-text' onClick={()=>{router.push("/locations")}}>Find locations</button>

      </div>
    </div>
        <div className="col-md-3">
      <div className="card p-3 text-center">
      <button className='btn button-text onClick={()=>{router.push("/characters")}}'>check characters</button>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card p-3 text-center">
      <button className='btn button-text'>Shop</button>

      </div>
    </div>

  </div>
</section>

{/* <!-- Section 3 --> */}
<section className="container py-5">
  <h2 className="section-title title">Teasers</h2>

  <div className="row g-4">

    <div className="col-md-4">
      <div className="card p-3 text-center">
      <iframe
        width="380"
        height="360"
        src="https://www.youtube.com/embed/EuLzlDQ8Ohs"
        title="Rick and Morty | Season 9 Episode Titles"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>    
      </div>
    </div>

    <div className="col-md-4">
      <div className="card p-3 text-center">
        <iframe
          width="380"
          height="360"
        src="https://www.youtube.com/embed/wSgipC6JDsU"
        title="Rick and Morty | Season 9 Preview"          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
        <div className="col-md-4">
      <div className="card p-3 text-center">
      <iframe
        width="380"
        height="360"
src="https://www.youtube.com/embed/XO43hYFRSbs"
        title="Rick and Morty | Season 9 Official Trailer"        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>  
          </div>
    </div>

  </div>
</section>

{/* <!-- Section 4--> */}
<section className="container py-5">
  <h2 className="section-title title">Shop Now</h2>

  <div className="row g-4">

    <div className="col-md-6">
      <div className="card p-3 text-center">
        <Link className="underline" href="https://wbshop.com/collections/rick-and-morty">
        <Image 
          src="/assets/shop3.jpg" 
          width={380}
          height={400}
          alt="Shop Item"
          className="img-fluid rounded mb-3"
          priority 
        />    
            <h5 className='underline'>Get it now</h5> 
      </Link>
      </div>
      
    </div>

    <div className="col-md-6">
      <div className="card p-3 text-center">
        <Link className="underline" href="https://wbshop.com/collections/rick-and-morty">
        <Image 
          src="/assets/shop2.jpg" 
          width={380}
          height={400}
          alt="Shop Item"
          className="img-fluid rounded mb-3"
          priority 
        />    
            <h5 className='underline'>Get it now</h5> 
      </Link>
      </div>
    </div>

  </div>
</section>

{/* <!-- Section 5--> */}
<section className="container py-5">
  <h2 className="section-title title">Time to Play</h2>

  <div className="row g-4">

    <div className="col-md-6">
    <div className="card p-3 text-center game1">
      
      <Game1></Game1>
      </div>
    </div>

    <div className="col-md-6">
      <div className="card p-3 text-center game3">
          <Game3></Game3>
      </div>
    </div>

  </div>
</section>


{/* <!-- Section 6--> */}
<section className="container py-5">

  <div className="row g-4">

    <div className="col-md-12">
    <div className="card p-3 text-center game2">
      
      <Game2></Game2>
      </div>
    </div>


  </div>
</section>
    </div>


  )
}
