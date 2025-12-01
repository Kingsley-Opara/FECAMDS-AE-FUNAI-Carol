"use client"
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { CiDark } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosMoon } from "react-icons/io";
import { CiLight } from "react-icons/ci";
import { MdLaptopChromebook } from "react-icons/md";


function Navbar() {
    const [showThemeOpt, setShowThemOpt] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, systemTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
            
    }, []);
    if (!mounted) return null;
  return (
    <div>
        <nav className='flex mt-5 ml-6 place-content-between px-7 max-md:ml-1'>
            <div className='-mt-1'>
                <Image src={"/images/fecamds-logo.png"} 
                height={50} width={50} 
                alt='logo' className='object-contain max-md:w-10 max-md:h-10'/>

            </div>

            <div className='mt-3 font-mono max-md:hidden'>
                <ul className='flex space-x-6'>
                    <li className='cursor-pointer hover:text-blue-400'>About</li>
                    <li className='cursor-pointer hover:text-blue-400'>Order of Events</li>
                    <li className='cursor-pointer hover:text-blue-400'>LOC Members</li>
                </ul>

            </div>

            <div className='flex space-x-6'>
                <div>
                    <button className='px-4 py-2 bg-orange-500 
                    text-white rounded-2xl cursor-pointer mt-0 
                    hover:bg-orange-400 max-md:-mt-2 max-sm:text-xs'>
                        Register Now

                    </button>
                </div>

                <div className='px-3 flex py-1 border-1 border-black dark:border-white w-20
                rounded-xl h-8 space-x-3 text-2xl cursor-pointer relative'>
                    <CiDark 
                    className='text-2xl'
                    
                    />
                    <RiArrowDropDownLine className='text-2xl'
                    onClick={()=>{setShowThemOpt(!showThemeOpt), console.log("Hello")}}
                    />
                        <div className={`absolute top-10 right-4 dark:bg-white dark:text-black h-fit p-1 w-[7rem] space-y-2 
                            ${!showThemeOpt && "hidden"}`}>

                            <div
                            onClick={() =>{setShowThemOpt(!showThemeOpt), setTheme("dark")}} 
                            className='flex space-x-2 hover:bg-blue-300 cursor-pointer'>
                                <IoIosMoon className='text-sm'/>
                                <p className='text-xs'>Dark theme</p>

                            </div>

                            <div
                            onClick={() =>{setShowThemOpt(!showThemeOpt), setTheme("light")}} 
                            className='flex space-x-2 hover:bg-blue-300 cursor-pointer'>
                                <CiLight className='text-sm'/>
                                <p className='text-xs'>Light theme</p>

                            </div>

                            <div
                            onClick={() =>{setShowThemOpt(!showThemeOpt), setTheme("system")}} 
                            className='flex space-x-2 hover:bg-blue-300 cursor-pointer'>
                                <MdLaptopChromebook className='text-sm'/>
                                <p className='text-xs'>System Default</p>

                            </div>

                        </div>

                </div>
            </div>
            
        </nav>
        <hr className='mt-5' />
    </div>
  )
}

export default Navbar