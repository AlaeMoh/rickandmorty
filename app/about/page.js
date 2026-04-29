import React from 'react'
import AboutImage from '../../public/assets/about2.jpg';
import Image from 'next/image';
import "../styles/home.css"

 
  


     
export default async function AboutPage() {
  return (
    <div className="container py-5 text-white">
      {/* Header Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="title mb-4" style={{ fontSize: '3rem' }}>
            The Multiverse Explorer
          </h1>
          <p className="description fs-5 ">
            Welcome to the ultimate hub for all things Rick and Morty. Whether 
            you&apos;re tracking down your favorite version of Summer Smith or 
            catching up on the latest Season 9 trailers, we’ve got you covered.
          </p>
          <p className="text-white">
            Our mission is simple: to document every dimension, every character, 
            and every bizarre adventure across the galaxy. Wubba Lubba Dub Dub!
          </p>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm overflow-hidden">
            <Image 
              src={AboutImage} 
              alt="Rick and Morty Universe" 
              className="img-fluid"
              style={{ objectFit: 'cover', height: '400px' }}
              priority
            />
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Features/Tech Section */}
      <div className="row text-center g-4">
        <h2 className="title mb-4">Project Portals</h2>
        
        <div className="col-md-4 text-white">
          <div className="card h-100 p-4 border-0 shadow-sm text-white">
            <div className="fs-1 mb-2">🚀</div>
            <h4 className="title">Next.js 15</h4>
            <p className="description">Powered by the latest App Router for lightning-fast portal travel between pages.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 p-4 border-0 shadow-sm text-white">
            <div className="fs-1 mb-2">🧬</div>
            <h4 className="title">The RM API</h4>
            <p className="description">Fetching real-time data from across the multiverse to keep our character logs updated.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 p-4 border-0 shadow-sm text-white">
            <div className="fs-1 mb-2">🎨</div>
            <h4 className="title">Bootstrap & CSS</h4>
            <p className="description">A responsive UI designed to look good on any planet, from C-137 to Earth.</p>
          </div>
        </div>
      </div>

      {/* Fun Fact / Footer Note */}
      <div className="mt-5 p-4  rounded text-center border">
        <h5 className="title">Interdimensional Fact:</h5>
        <p className="mb-0">
          Did you know? The Season 9 premiere is officially set for <strong>May 24th</strong>. 
          Don&apos;t get stuck in a simulation and miss it!
        </p>
      </div>
    </div>
  
  )
}
