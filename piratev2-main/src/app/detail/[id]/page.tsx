"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Star, Play} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { Movie, CrewMember } from '@/types/movie-type';
import MoreLike from '@/components/MoreLike';
import { useRouter } from 'next/navigation';


const Page = () => {
    const params = useParams();
    const movieId = params.id;
    const url = 'https://image.tmdb.org/t/p/';
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [crew, setCrew] = useState<CrewMember[] | null>(null);
    const getDATA = async () => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}?language=en-US`, {
                headers: {
                    Authorization: `Bearer ${TMDB_API_TOKEN}`,
                },
            });
            setMovie(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    const getCREW = async () => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/credits?language=en-US`, {
                headers: {
                    Authorization: `Bearer ${TMDB_API_TOKEN}`,
                },
            });
            setCrew(response.data.crew);
            
            
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (movieId) {
            getDATA();
            getCREW();
        }
    }, [movieId]);
    const router = useRouter();
    const jumpTOtrailer=(id:number)=>{
        router.push(`/Trailer/${id}`);
    }
    const jump=(genre:number)=>{
        router.push(`/Genrepage/${genre}`);
    }
    return (
        <div className='flex flex-col items-center'>
           
            {movie ? (
                <div className='flex flex-col gap-[20px] px-[20px] lg:w-[80%] '>
                    <div className='flex justify-between'>
                        <div className='w-fit'>
                            <h2>{movie.title}</h2>
                            <p>{movie.release_date}{" "}{Math.floor(movie.runtime / 60)}h {movie.runtime - (Math.floor(movie.runtime / 60)) * 60}min</p>
                        </div>
                        <div className='w-fit flex items-center flex-row-reverse gap-[4px]'>
                            <div className='w-fit flex items-center gap-[8px]'>
                                <Star />
                                <div className='w-fit'>
                                    <p className='font-[600]'>{movie.vote_average.toFixed(1)}/10</p>
                                    <h1 className='text-[12px]'>{(movie.popularity / 100).toFixed(1)}K</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='relative'>
                 
                  



             
                 
                   <Button className='absolute bottom-0' onClick={()=>jumpTOtrailer(movie.id)}>
                        <Play/>
                        <p>Play trailer</p>
                        </Button> 
                        <div className=' w-full h-[211px] md:h-[428px] lg:h-[700px]'>
                    <Image
                        src={`${url}original${movie.backdrop_path}`}
                      
                        alt={movie.title}
                     layout='fill'
                       objectFit="cover"
        className="rounded-[8px]"
                    />
           
</div>
</div>
                    <div className='flex justify-between ' >
                        <div className=''>
                            <Image
                                src={`${url}original${movie.poster_path}`}
                                width={100}
                                height={148}
                                alt={movie.title}
                            />
                        </div>
                        <div className='h-full w-[60%] flex flex-col gap-[20px]'>
                            <div className='flex flex-row flex-wrap gap-[12px]'>
                                {movie.genres.map((genre) => (
                                    <Button className='w-fit h-[20px]' key={genre.id} onClick={()=>jump(genre.id)} > 
                                        {genre.name}
                                    </Button>
                                ))}
                            </div>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                    <div className='w-full h-fit flex flex-col gap-[15px]'>
                        <div className='flex justify-between'>
                            <p>Director:</p>
                            {crew?.map((member) => {
                                if (member.job === "Director" && member.known_for_department === "Directing") {
                                    return <div key={member.id}>{member.name}</div>;
                                }
                                return null;
                            })}
                        </div>
                        <div className='flex justify-between'>
                            <p className='w-fit h-full'>Writers:</p>
                            <div className='flex gap-[15px]'>
                                <div>
                                    {crew
                                        ?.filter(
                                            (member, index, self) =>
                                                member.department === "Writing" && member.known_for_department === "Writing" &&
                                                self.findIndex((m) => m.name === member.name) === index
                                        )
                                        .map((member) => (
                                            <div key={member.id} className='w-[218px] h-fit flex flex-col py-[10px]'>
                                                <div className='flex justify-end'>
                                                    {member.name}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <p>Stars:</p>
                            {crew
                                ?.filter(
                                    (member) =>
                                        member.popularity > 5 && member.known_for_department === "Acting"
                                )
                                .map((member) => (
                                    <div key={member.id}>{member.name}</div>
                                ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
           <MoreLike/>
        </div>
    );
};

export default Page;