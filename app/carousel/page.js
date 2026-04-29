"use client"
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { fetchEpisodes } from '../service/api';
import Image from 'next/image';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [episodes, setEpisodes] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchingCarousel = async () => {
      try {
        const data = await fetchEpisodes();
        const firstThree = data.slice(0, 3);

        setEpisodes(firstThree);
      } catch (err) {
        console.log(err);
      }
    };

    fetchingCarousel();
  }, []); 


  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {episodes.map((episode, i) => (
        <Carousel.Item key={episode.id}>
          
          <div className="position-relative" style={{ height: "500px", width: "100%" }}>
            <Image
              src={`/assets/epis${i}.jpg`} 
              alt={episode.name}
              fill
              style={{ objectFit: "cover" }}
              priority={i === 0}
            />
          </div>

          <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
            <h3>{episode.name}</h3>
            <p>
              Episode: {episode.episode} | Air Date: {episode.air_date}
            </p>
          </Carousel.Caption>

        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;