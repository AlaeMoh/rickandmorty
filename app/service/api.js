
export const fetchCharachters= async () =>{

try{
    const res= await fetch('https://rickandmortyapi.com/api/character')
    const data= await res.json()
    
    // console.log(data.results)
    return data.results
}catch(err){
    console.log(err)
}

}

//////

export const fetchEpisodes= async () =>{

try{
    const res= await fetch('https://rickandmortyapi.com/api/episode')
    const data= await res.json()
    
    // console.log(data.results)
    return data.results
}catch(err){
    console.log(err)
}

}


///////
export const fetchLocations= async () =>{

try{
    const res= await fetch('https://rickandmortyapi.com/api/location')
    const data= await res.json()
    
    console.log(data.results)
    return data.results
}catch(err){
    console.log(err)
}

}
///////////

export const fetchOneCharacter= async (id) =>{

try{
    const res= await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const data= await res.json()
    
    console.log(data)
    return data
}catch(err){
    console.log(err)
}

}

//////////////////

export const fetchOneLocation= async (id) =>{

try{
    const res= await fetch(`https://rickandmortyapi.com/api/location/${id}`)
    const data= await res.json()
    
    console.log(data)
    return data
}catch(err){
    console.log(err)
}

}

///////////


export const fetchOneEpisode= async (id) =>{

try{
    const res= await fetch(`https://rickandmortyapi.com/api/episode/${id}`)
    const data= await res.json()
    
    console.log(data)
    return data
}catch(err){
    console.log(err)
}

}

//////////////

export const searchCharacter = async (query, page = 1) => {
  if (!query?.trim()) return { results: [], info: {} };
  
  const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(query.trim())}&page=${page}`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 60 } }); 
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("API fetch failed:", err);
    return { results: [], error: err.message };
  }
};

///////


// service/api.js

export const fetchAllCharacters = async (maxPages = 5) => {
  try {
    let all = []
    let page = 1

    while (page <= maxPages) {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)

      if (!res.ok) {
        throw new Error(`Failed on page ${page}`)
      }

      const data = await res.json()

      all = [...all, ...data.results]
      page++
    }

    // remove "unknown" once here
    return all.filter(c => c.status !== "unknown")

  } catch (error) {
    console.error("API Error:", error)
    return []
  }
}


