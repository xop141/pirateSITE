import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import { Movie } from '@/types/movie-type';
import { useRouter, useParams } from 'next/navigation';

const MoreLike = () => {
  const { id } = useParams(); 
  const url = 'https://image.tmdb.org/t/p/w500';
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  const [popular, setPopular] = useState<Movie[]>([]);

  const getDATA = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setPopular(response.data.results);
      console.log(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getDATA();
    }
  }, [id]);

  const router = useRouter();
  const handleMovieClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <div>
      <div className="w-full p-[20px]">
        <div className="flex justify-between">
          <h1 className="text-[24px] font-[600]">More Like This</h1>
          <Button>See More</Button>
        </div>
      </div>

      
      <div className="w-full h-fit flex flex-row justify-start gap-[20px] lg:gap-[32px] flex-wrap px-[20px]">
        {popular.slice(0, 10).map((movie) => {
          return (
            <div
              key={movie.id}
              className="w-[157.5px] bg-cardWhite flex flex-col rounded-[8px]"
              onClick={() => handleMovieClick(movie.id)}

            >
              <img
                src={`${url}${movie.poster_path}`}
                width={157.5}
                height={233}
                alt={movie.title}
                className="rounded-[8px]"
              />
              <div className="text-[15px] px-[8px]">
                <h1 className="w-full h-[56px]">{movie.title}</h1>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoreLike;
