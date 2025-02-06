"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  import axios from 'axios'
  import { Movie } from '@/types/movie-type'
  import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'

const Genre = () => {
    const url = 'https://image.tmdb.org/t/p/w500'
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  
    const [popular, setPopular] = useState<Movie[]>([])
    const getDATA = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?language=en`, {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`
          }
        })
        setPopular(response.data.genres);
  console.log(response.data.genres);
  
  
      }
      catch (err) {
        console.log(err);
      }
    }
    useEffect(() => {
      getDATA()
    }, [])
    const [genra,setGenra] = useState([])
const router = useRouter();
      const jump = (genre:number,name:string  ) => {


    
        router.push(`/Genrepage/${genre}`);
      
        
      };

 

  return (
    <div className='bg-green-300'>
        <DropdownMenu >
        
  <DropdownMenuTrigger>
 <div className='h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90 flex justify-center items-center
   inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none 
   focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
 '>genre</div>
  </DropdownMenuTrigger>
  
  
  <DropdownMenuContent>
  <DropdownMenuLabel>Genre</DropdownMenuLabel>
  <DropdownMenuSeparator/>
  <DropdownMenuLabel>See lists of movies by genre</DropdownMenuLabel>
  <div className='w-screen flex flex-row flex-wrap '>
   {popular.map((genre)=>{
    return(


         <DropdownMenuItem key={genre.name} onClick={()=>jump(genre.id,genre.name)}>
        <Badge >{genre.name}</Badge>
         </DropdownMenuItem>
    )
   })}
    </div>
  </DropdownMenuContent>
 
 
</DropdownMenu>

    </div>
  )
}

export default Genre