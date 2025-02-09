import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Star, Play } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movie-type";

const NowPlaying = () => {
  const url = "https://image.tmdb.org/t/p/original";
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const [popular, setPopular] = useState<Movie[]>([]);

  const getDATA = async () => {
    const response = await axios.get(
      `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      }
    );
    setPopular(response.data.results);
  };

  useEffect(() => {
    getDATA();
  }, []);

  const router = useRouter();
  const jumpTOtrailer = (id: number) => {
    router.push(`/Trailer/${id}`);
  };

  const handleMovieClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
   
    <div className="w-full h-fit flex flex-col items-center">
      <Carousel className="w-full">
        <CarouselContent>
          {popular.slice(0, 5).map((movie) => (
            <CarouselItem
              key={movie.id}
              id={movie.title}
              onClick={() => handleMovieClick(movie.id)}
            >
              {/* Movie Banner Image */}
              <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
                <Image
                  src={`${url}${movie.backdrop_path}`}
                  alt={`${movie.title} backdrop`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              {/* Movie Info Section */}
              <div className="flex flex-col py-5 gap-4 lg:w-[40%] md:w-[80%] sm:w-full lg:absolute lg:bottom-10 px-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg">Now Playing:</h2>
                    <h1 className="text-xl font-semibold">{movie.original_title}</h1>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star width={18} height={18} />
                    <p className="font-semibold">{movie.vote_average}</p>/10
                  </div>
                </div>

                {/* Movie Overview */}
                <p className="text-sm">{movie.overview}</p>

                {/* Watch Trailer Button */}
                <Button
                  className="w-[145px] h-[40px] flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-500"
                  onClick={() => jumpTOtrailer(movie.id)}
                >
                  <Play width={18} height={18} />
                  Watch Trailer
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Navigation */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default NowPlaying;
