"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Page = () => {
    const [popular, setPopular] = useState(null); 
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
            setError(err.message || "An error occurred");
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
        <div className='bg-green-300 px-[20px]'>
            <div className='flex flex-row flex-wrap'>
                {popular && popular.length > 0 ? (
                    popular.map(movie => (
                        <div key={movie.id} className="bg-gray-300 w-[157px] md:w-[200px] lg:w-[250px] h-fit" onClick={() => jump(movie.id)}>
                            <Image
                                width={157}
                                height={233}
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/path/to/fallback-image.jpg'}
                                alt={movie.title}
                            />
                            <h2>{movie.title}</h2>
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
