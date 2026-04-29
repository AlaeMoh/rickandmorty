
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


