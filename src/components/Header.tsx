"use client"
import React from 'react'
import { Film } from 'lucide-react';
import { Moon, Sun, ChevronDown, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "../components/ui/input"
import axios from 'axios';





   

const Header = () => {
    const { setTheme, theme } = useTheme()

const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light')
 
  
}
  return (
    <div className='w-screen h-fit flex justify-between p-[20px]'>
        <div className='flex gap-[8px] items-center'>
        <Film />
        <p className='text-indigo-700 font-[700]'>Movie Z</p>
        </div>



        <div className="hidden md:flex items-center justify-center gap-[12px]">
          <div>
          <Button className='flex gap-[8px]'>
            <ChevronDown/>
            <p className='font-[700] text-[14px]'>Genre</p>
            </Button>
          </div>
        
            <div className='w-[60%] flex items-center gap-[10px] rounded-[8px] border px-[12px]'>
              <Search/>

              <Input type='text' className='outline-none' placeholder='Search...'/>
            </div>
            
 
        </div>




        <div className='flex gap-[12px]'>
        <div 
  style={{
    borderRadius: 'var(--radius-rounded-md, 10px)',
    border: '1px solid var(--border-border-input, #E4E4E7)',
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)'
  }}
  className="p-4 flex md:hidden"
>
                <Search/>
                </div>
      

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
            <Moon  />
          )}
                </div>
            </div>
      
        </div>
                   

   
  )
}

export default Header