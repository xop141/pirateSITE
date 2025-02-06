import React from 'react'
import { useEffect, useState } from 'react';
import axios from "axios";
import Image from "next/image";
import { Star, Play } from 'lucide-react';
import { Button } from './ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useRouter } from 'next/navigation';
import { Movie } from '@/types/movie-type';
const NowPlaying = () => {
    const url = 'https://image.tmdb.org/t/p/original'
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
    const [popular, setPopular] = useState<Movie[]>([])
    const getDATA = async () => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`, {
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
     const jumpTOtrailer=(id:number)=>{

       router.push(`/Trailer/${id}`);
      
      
        
    }
      const handleMovieClick = (id:Number) => {
    
        router.push(`/detail/${id}`);
      };

    

    return (
        <div className="w-full h-fit flex flex-col items-center ">

            <Carousel className='w-[100%] '>
                <CarouselContent>
                    {popular.slice(0, 5).map((movie) => {
                        return (

                            <CarouselItem key={movie.id} id={movie.title} onClick={() =>handleMovieClick(movie.id)} > 
                            
                            <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
    <Image
        src={`${url}${movie.backdrop_path}`}
        alt={`${movie.title} backdrop`}
        layout="fill"
        objectFit="cover"
        className="rounded-[8px]"
    />
</div>


                                <div className='flex flex-col py-[20px] gap-[16px] lg:w-[40%] md:w-[100%] sm:w-[100%] lg:absolute lg:bottom-[10%] '>
                                    <div className='flex justify-between '>
                                        <div >
                                            <h1>Now Playing:</h1>
                                            <h1 className='text-[24px] font-[600]'> {movie.original_title}</h1>
                                        </div>

                                        <div className='w-fit flex items-center gap-[4px] '>
                                            <Star />
                                            <p className='font-[600]'>{movie.vote_average}</p>/10
                                        </div>
                                    </div>
<div className='w-[100%] h-fit'>
{movie.overview}
</div>
                             
                                    <Button className='w-[145px] h-[40px] flex items-center ' onClick={()=>jumpTOtrailer(movie.id)}>
                                        <Play />
                                        Watch trailer</Button>
                                </div>


                            </CarouselItem>




                        )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>


        </div>
    )
}
export default NowPlaying
