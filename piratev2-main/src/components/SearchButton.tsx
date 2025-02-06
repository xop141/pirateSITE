import React, { useState, useEffect } from 'react'
import { Search, Star } from "lucide-react"
import { Input } from "../components/ui/input"
import { Movie } from '@/types/movie-type'
import axios from 'axios'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'


const SearchButton = () => {
  const [searchVALUE, setSearchVALUE] = useState<string>("")
  const [popular, setPopular] = useState<Movie[]>([])

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    setSearchVALUE(search)
  }

  const TMDB_BASE_URL = process.env.TMDB_BASE_URL
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN

  const getDATA = async () => {
    if (searchVALUE.trim() === "") {
      setPopular([]) 
      return
    }
    
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/search/movie?query=${searchVALUE}&language=en-US&page=1`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`
        }
      })
      setPopular(response.data.results)
 
       
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
  
      getDATA()
    
  }, [searchVALUE])

 const router = useRouter();
  const handleMovieClick = (id: number) => {
    router.push(`/detail/${id}`);
    // setPopular("")
    // setSearchVALUE("")
    
  };
   
    const seeMore = (id:number) => {
      setSearchVALUE("")
      router.push(`/allSearch/${id}`);
    };
const clear = (event)=>{
 if (!event.target.id) {
    
  setSearchVALUE("")
 }  
  
  
}
document.addEventListener('click', clear);


  return (
    <div id='searchbar' className='flex  flex-col items-center'>

 
    <div className={`w-[100%] flex items-center rounded-[8px] border px-[12px] `}>
      <Search />
      <Input
        type="text"
        
        placeholder="Search"
        value={searchVALUE}
        onChange={handleValue}

      /> 
     
    </div>
    <div className=' w-fit h-fit absolute z-10 top-[70px]'>
     {popular.length > 0 && (
    <div className="mt-4  flex justify-center flex-col ">
      <ul className='bg-background border rounded-[8px] p-[10px] '>
        {popular.slice(0,3).map((movie) => (
      
          <li key={movie.id} className="mb-2 flex text-white border-b-2 py-[10px] relative" onClick={()=>handleMovieClick(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-24 h-36 object-cover rounded-[8px]"
            />
            <div className=' w-full flex flex-col items-start px-[10px] justify-between '>{movie.title}
               <p className='flex gap-[5px] items-center'> <Star/> {movie.vote_average.toFixed(1)}/10</p>
            <p>{movie.release_date.slice(0,4)}</p>
            </div>
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-[0.5]'></div>
            
          </li>
    
    
        ))}
          <div className='text-black font-[600] text-white' onClick={()=>seeMore(searchVALUE)}>see all results for "{searchVALUE}" </div>
      </ul>
     
    </div>
  )}
     </div>
     
      </div>
   
  )
}

export default SearchButton
