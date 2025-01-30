import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import Image from "next/image";
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Movie } from '@/types/movie-type';
const Popular = () => {
  const url = 'https://image.tmdb.org/t/p/w500'
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  const [popular, setPopular] = useState<Movie[]>([])
  const getDATA = async () => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`, {
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
    <div className="w-full h-fit flex flex-col items-center gap-y-[32px]">

      <div className='flex justify-between items-center  w-[100%]'>
        <p className='font-[600] text-white'>Popular</p>
        <Button id='but' className='font-[600]' onClick={()=>Jump("popular")}>see more</Button>
      </div>
      <div className="w-full h-fit flex flex-row justify-start gap-[20px] lg:gap-[32px] flex-wrap">
      
              {popular.slice(0, 10).map((movie) => {
                return (
                  <div key={movie.id} className="w-[157.5px] bg-cardWhite flex flex-col rounded-[8px]" onClick={() => handleMovieClick(movie.id)
                  }  >
      
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
    </div >
  )
}
export default Popular
