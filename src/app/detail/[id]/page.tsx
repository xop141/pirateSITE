"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Star, Play } from 'lucide-react';
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
    const [loading, setLoading] = useState<boolean>(true);

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
            setLoading(false);
        }
    }, [movieId]);

    const router = useRouter();
    const jumpTOtrailer = (id: number) => {
        router.push(`/Trailer/${id}`);
    };

    const jump = (genre: number) => {
        router.push(`/Genrepage/${genre}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <div className="loader">Loading...</div>
                {/* A custom loading spinner can be added here */}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center px-5 py-10 lg:w-[80%] mx-auto">
            {movie ? (
                <div className="flex flex-col gap-[20px] px-[20px] lg:w-[80%]">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold">{movie.title}</h2>
                            <p className="text-gray-500">
                                {movie.release_date} | {Math.floor(movie.runtime / 60)}h {movie.runtime - (Math.floor(movie.runtime / 60)) * 60}min
                            </p>
                        </div>
                        <div className="flex items-center gap-[8px]">
                            <Star />
                            <div>
                                <p className="font-semibold">{movie.vote_average.toFixed(1)}/10</p>
                                <p className="text-xs">{(movie.popularity / 100).toFixed(1)}K</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <Button className="z-10 absolute bottom-5 left-5 bg-black hover:text-black text-white px-5 py-3 rounded-md flex items-center gap-2" onClick={() => jumpTOtrailer(movie.id)}>
                            <Play /> Play Trailer
                        </Button>
                        <div className="relative w-full h-[211px] md:h-[428px] lg:h-[700px]">
                            <Image
                                src={`${url}original${movie.backdrop_path}`}
                                alt={movie.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-[8px]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-4">
                        <div>
                            <Image
                                src={`${url}original${movie.poster_path}`}
                                width={100}
                                height={148}
                                alt={movie.title}
                                className="rounded-md"
                            />
                        </div>
                        <div className="w-[60%] flex flex-col gap-[20px]">
                            <div className="flex gap-[12px] flex-wrap">
                                {movie.genres.map((genre) => (
                                    <Button key={genre.id} onClick={() => jump(genre.id)} className="bg-gray-700 text-white py-1 px-3 rounded-md">
                                        {genre.name}
                                    </Button>
                                ))}
                            </div>
                            <p className="text-gray-700">{movie.overview}</p>
                        </div>
                    </div>

                    <div className="w-full mt-5">
                        <div className="mb-4">
                            <p className="font-semibold">Director:</p>
                            <div>{crew?.find((member) => member.job === 'Director')?.name}</div>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">Writers:</p>
                            <div className="flex gap-[10px]">
                                {crew
                                    ?.filter((member) => member.department === 'Writing' && member.known_for_department === 'Writing')
                                    .map((member) => (
                                        <div key={member.id}>{member.name}</div>
                                    ))}
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">Stars:</p>
                            {crew
                                ?.filter((member) => member.popularity > 5 && member.known_for_department === 'Acting')
                                .map((member) => (
                                    <div key={member.id}>{member.name}</div>
                                ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <MoreLike />
        </div>
    );
};

export default Page;

