import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Movie } from "@/types/movie-type";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
const TopRated = () => {
  const url = "https://image.tmdb.org/t/p/w500";
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const { setTheme, theme } = useTheme();
  const [topRated, setTopRated] = useState<Movie[]>([]);

  const getDATA = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setTopRated(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDATA();
  }, []);

  const router = useRouter();

  const handleMovieClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  const Jump = (type: string) => {
    router.push(`/More/${type}`);
  };

  return (
    <div className="w-full h-fit flex flex-col items-center gap-y-8 font-semibold text-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-5xl px-4">
      <p className={`${theme === "dark" ? "text-white" : "text-black"}`}>Top Rated</p>
        <Button className="font-bold" onClick={() => Jump("top_rated")}>
          See More
        </Button>
      </div>

   
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap gap-5 lg:gap-8 max-w-5xl">
          {topRated.slice(0, 10).map((movie) => (
            <div
              key={movie.id}
              className={`w-[157.5px] lg:w-[230px] flex flex-col rounded-lg shadow ${theme === "dark" ? "bg-gray-900" : "bg-cardWhite"}  cursor-pointer`}
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="relative">
              <Image
                src={`${url}${movie.poster_path}`}
                width={230}
                height={340}
                alt={`${movie.title} poster`}
                className="rounded-t-lg object-cover"
              />
              <div className="w-full h-full absolute bg-black absolute opacity-0 hover:opacity-[0.7] top-0 left-0 z-15 rounded-lg"></div>
              </div>
              <div className="text-sm px-2 py-3 flex flex-col justify-between">
                <h1 className="flex items-center gap-2 text-yellow-500">
                  <Star width={16} height={16} />
                  {movie.vote_average}/10
                </h1>
                <h1 className="truncate">{movie.title}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRated;
