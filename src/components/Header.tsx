"use client"
import React, { useState } from 'react'
import { Film } from 'lucide-react';
import { Moon, Sun, ChevronDown, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "../components/ui/input"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SearchButton from './SearchButton';
import { X } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const Header = () => {
  const router = useRouter();
  const JumpHOME = () => {
    router.push(`//`);
  };
  const { setTheme, theme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const [isBAR, setIsBAR] = useState("true")
const showBAR=()=>{
  if (isBAR === "hidden") {
    setIsBAR("flex")
  } else {
    setIsBAR("hidden")
  }
  
}

// `${isBAR === "hidden" ? "hidden" : "flex"} w-full h-fit justify-between relative `

  return (
    <div className='w-screen h-fit p-[20px] '>
      <div className='flex w-full h-fit justify-between relative'>
      <div
  className={`${
    isBAR === "hidden" ? "flex" : "hidden"
  } ${theme === "dark" ? "bg-background " : "bg-white"} justify-center absolute top-0 left-0 w-full h-full items-center z-100`}
>
          <div>drop</div>
          <SearchButton/>
<X onClick={showBAR}/>


         </div>
         
      <div className='flex gap-[8px] items-center w-fit' onClick={() => JumpHOME()} >
        <Film />
        <p className='text-indigo-700 font-[700]'>MovieZ</p>
      </div>
     
      <div  className='flex gap-[12px]'>
      
     
            
              <div
          style={{
            borderRadius: 'var(--radius-rounded-md, 10px)',
            border: '1px solid var(--border-border-input, #E4E4E7)',
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)'
          }}
            className='p-4 flex md:hidden'
            onClick={showBAR}
             ><Search/></div>
          
        <div
          style={{
            borderRadius: 'var(--radius-rounded-md, 10px)',
            border: '1px solid var(--border-border-input, #E4E4E7)',
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)'
          }}
          className="p-4 "
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <Sun />
          ) : (
            <Moon />
          )}
        </div>
        
      </div>
   
      </div>
      </div>
    
  )
}

export default Header