"use client"
import { useEffect, useState } from "react";
import { fetchLocations } from "../service/api";
import "../styles/location.css"
import { useRouter } from "next/navigation";
export default  function  Locations() {

  const router = useRouter()
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLocations();
        setLocations(data); 
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

     
  return (
    <div className="container my-5">

      <h1 className="text-center text-success mb-5 title">
        our Space navigations
      </h1>

      <div className="row g-4">
        {locations.map((loc) => (
          
          <div key={loc.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            
            <div className="card location-card p-4 text-center h-100"
             onClick={() => router.push(`/locations/${loc.id}`)}>
              
              <h5 className="mb-3 title">{loc.name}</h5>

              <span className="badge butbg mb-2">
                {loc.type}
              </span>

              <span className="badge bg-warning text-dark">
                {loc.dimension}
              </span>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}