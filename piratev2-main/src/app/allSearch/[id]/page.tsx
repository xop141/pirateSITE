"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Movie } from '@/types/movie-type';

const Page = () => {
    const [popular, setPopular] = useState<Movie[]>([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const params = useParams();
    const searchVALUE = params.id;
    
    const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

    const getData = async () => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/search/movie?query=${searchVALUE}&language=en-US&page=1`, {
                headers: {
                    Authorization: `Bearer ${TMDB_API_TOKEN}`,
                }
            });
            setPopular(response.data.results);
            setLoading(false);
        } catch (err) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchVALUE) {
            getData();
        }
    }, [searchVALUE]); 

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const router = useRouter();
    const jump = (id: Number) => {
        router.push(`/detail/${id}`);
    };

    return (
        
        <div className='w-full h-full px-[20px] bg-green-300'>
            <h1>movies found {popular.length}</h1>
            <div className='flex flex-row gap-[20px] flex-wrap bg-black'>
                {popular && popular.length > 0 ? (
                    popular.map(movie => (
                        <div key={movie.id} className=" w-[157px] md:w-[200px] lg:w-[250px] h-fit bg-cardWhite rounded-[5px] " onClick={() => jump(movie.id)}>
                            <div className=' '>
                            <Image
                                width={157.5}
                                height={233}
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : '/path/to/fallback-image.jpg'}
                                alt={movie.title}
                                sizes='w-[157.5px] h-[233px]'
                            />
                            </div>
                            <p className='w-full h-fit px-[5px]'>{movie.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default Page;
