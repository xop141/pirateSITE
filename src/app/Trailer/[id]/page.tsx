"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Movie } from '@/types/movie-type';
import axios from "axios";

const page = () => {
  const params = useParams();
  const id = params.id;
const url = 'https://image.tmdb.org/t/p/w500'
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const [trailerkey, SetTrailerkey] = useState<Movie[]>([])
const getDATA = async () => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`
      }
    })
    SetTrailerkey(response.data.results[0].key);
  
  }
  catch (err) {
    console.log(err);
  }
}
useEffect(() => {
  getDATA()
}, [])

  const router = useRouter();
const backTOpage = ()=>{
  router.push(`/detail/${id}`)
}


return (
  <div className='h-screen flex items-center' onClick={backTOpage} >
      
          
                          <iframe
          width="375"
          height="210"
          src={`https://www.youtube.com/embed/${trailerkey}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Movie Trailer"
        ></iframe>

 </div>
                          
)
}

export default page