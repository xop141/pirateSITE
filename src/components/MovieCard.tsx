import React, { useEffect, useState } from 'react';
import axios from "axios";
import Image from "next/image";
import { Star } from 'lucide-react';
import { Button } from './ui/button';

const MovieCard = ({ data }) => {
    const url = 'https://image.tmdb.org/t/p/w500';
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

    const [movie, setMovie] = useState(null);

    const getDATA = async () => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/movie/${data}?language=en-US`, {
                headers: {
                    Authorization: `Bearer ${TMDB_API_TOKEN}`
                }
            });

            setMovie(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (data) {
            getDATA();
        }
    }, [data]);

    return (
        <div>
            {movie ? (
                <div className='flex flex-col gap-[20px]'>
                    <div className=' flex justify-between'>
                        <div className=' w-fit'>
                            <h2>{movie.title}</h2>
                            <p>{movie.release_date}{" "}{Math.floor(movie.runtime / 60)}h {movie.runtime - (Math.floor(movie.runtime / 60)) * 60}min</p>
                        </div>
                        <div className='w-fit flex items-center flex-row-reverse gap-[4px]'>

                            <div className='w-fit flex items-center gap-[8px] '>

                                <Star />
                                <div className='w-fit'>
                                    <p className='font-[600]'>{movie.vote_average.toFixed(1)}/10</p>
                                    <h1 className='text-[12px]'>{(movie.popularity / 100).toFixed(1)}K</h1>
                                </div>
                            </div>




                        </div>
                    </div>
                    <Image
                        src={`${url}${movie.backdrop_path}`}
                        width={375}
                        height={211}
                        alt={movie.title}
                    />
                    <div className='flex justify-between'>
                        <Image
                            src={`${url}${movie.poster_path}`}
                            width={100}
                            height={100}
                            alt={movie.title}
                        />
                        <div className=' h-full w-[60%] flex flex-col gap-[20px]'>
                            <div className='flex flex-row flex-wrap gap-[12px] '>
                                {movie.genres.map((genre) => {
                                    return (
                                        <Button className='w-fit h-[20px]' key={genre.name}>
                                            {genre.name}
                                        </Button>
                                    )
                                })}
                            </div>
                            <p>{movie.overview}</p>
                        </div>
                    </div>


                </div>
            ) : (
                <p>Loading...</p>
            )}

        </div>





    );

};

export default MovieCard;
