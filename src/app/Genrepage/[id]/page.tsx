"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "@/types/movie-type";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const { push } = useRouter();
  const url = "https://image.tmdb.org/t/p/original";
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const searchParams = useSearchParams();
  const [genre, setGenre] = useState<{ id: number; name: string }[]>([]);
  const [selected, Setselected] = useState<number[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const testid = params.id;
  const router = useRouter();

  
  const getDATA = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?language=en`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      });
      setGenre(response.data.genres);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getMovie = async (genreIDs: string) => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreIDs}`, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleclick = (id: number) => {
    const updated = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id];
    Setselected(updated);
    const queryParams = new URLSearchParams();
    queryParams.set("id", updated.join(","));
    const path = queryParams.toString();

    push(`/Genrepage/${testid}?${path}`);
    getMovie(updated.join(","));
    console.log(movies);
    
  };

  useEffect(() => {
    getDATA();
    if (testid) {
      Setselected([parseInt(testid)]);
    }
    getMovie(testid);
  }, [testid]);

  const jump = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <div className="flex flex-col lg:w-[100%] items-center ">
      <div className="px-[20px] flex flex-col gap-[15px] lg:w-[80%]">
        <div>
          {loading ? (
            <div>
              <Skeleton className="w-[200px] h-[30px] rounded mt-2" />
              <Skeleton className="w-[150px] h-[20px] rounded mt-2" />
            </div>
          ) : error ? (
            <div className="text-red-500">try again later.</div>
          ) : (
            <div>
              <h1 className="text-[24px] font-[600]">Search filter</h1>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[10px] md:flex-row">
          <div className="flex flex-col gap-y-[30px]">
            <div>
              <h1>Genres</h1>
              <p>See list of movies by genre</p>
            </div>

            <div className="flex flex-row flex-wrap gap-x-[30px] gap-y-[20px] lg:w-[50%] md:w-[50%] sm:w-[100%] py-[20px]">
              {genre.map((genre) => (
                <Badge key={genre.id} onClick={() => handleclick(genre.id)}>
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-wrap gap-[20px] justify-end">
            {loading ? (
              Array.from({ length: 20 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-[157.5px] h-[233px] rounded-[8px]"
                />
              ))
            ) : error ? (
              <div className="text-red-500">try again later.</div>
            ) : (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-[157.5px] bg-cardWhite flex flex-col rounded-[8px] cursor-pointer"
                  onClick={() => jump(movie.id)}
                >
                  <Image
                    src={`${url}${movie.poster_path}`}
                    width={157.5}
                    height={233}
                    alt={`${movie.title} backdrop`}
                    className="rounded-[8px]"
                  />
                  <div className="text-[15px] px-[8px]">
                    <h1 className="flex items-center gap-[4px]">
                      <Star width={16} height={16} />
                      {movie.vote_average}/10
                    </h1>
                    <h1 className="w-full h-[56px]">{movie.title}</h1>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
