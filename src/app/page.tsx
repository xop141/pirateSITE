"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button" 
import axios from "axios";
import { useEffect } from "react";
export default function Home() {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  const getDATA = async () =>{
    try{
      const response =await axios.get('${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1',{headers:{
        Authorization: 'Bearer ${TMDB_API_TOKEN}'
      },
    })
      console.log(response);
      
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getDATA()
  },[])
  return (
  <div className="w-screen h-screen flex items-center justify-center">
asd
  </div>
  );
}
