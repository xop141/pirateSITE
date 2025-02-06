import React from 'react'
import { useEffect,useState } from 'react';
import axios from "axios";
import Image from "next/image";
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { Movie } from '@/types/movie-type';
import { useRouter } from 'next/navigation';

const TopRated = () => {
    const url = 'https://image.tmdb.org/t/p/w500'
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const [popular, setPopular] = useState<Movie[]>([])
    const getDATA = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}//movie/top_rated?language=en-US&page=1`, {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`
          }
        })
        setPopular(response.data.results);
    
      }
      catch (err) {
        console.log(err);
      }
    }
    useEffect(() => {
      getDATA()
    }, [])
     const router = useRouter();
      const handleMovieClick = (id:Number) => {
    
        router.push(`/detail/${id}`);
      };
      const Jump=(type:string)=>{
        router.push(`/More/${type}`);
      }
  return (
    <div className="w-full h-fit flex flex-col gap-y-[32px] ">

    <div className='flex justify-between w-[100%]'>
        <p className='font-[600] text-white'>Top Rated</p>
        <Button id='but' className='font-[600]' onClick={()=>Jump("top_rated")}>see more</Button>
    </div>
    <div className="w-full h-fit flex justify-center">
    <div className='flex lg:w-[80%] lg:justify-start gap-[20px] flex-row flex-wrap md:justify-start lg:gap-[32px]'>
      {popular.slice(0,10).map((movie) => {
        return (
          <div key={movie.title} className="w-[157.5px] bg-cardWhite flex flex-col rounded-[8px]" onClick={()=>handleMovieClick(movie.id)}>
            <Image
              src={`${url}${movie.poster_path}`}
               width={157.5}
               height={233}
              alt={`${movie.title} backdrop`}
              className="rounded-[8px] "
              
            />
            <div className='text-[15px] px-[8px]'>
            <h1 className="flex items-center gap-[4px]"><Star width={16} height={16} />{movie.vote_average}/10</h1>
              <h1 className='w-full h-[56px]'> {movie.title}</h1>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  </div>
  )
}
export default TopRated
