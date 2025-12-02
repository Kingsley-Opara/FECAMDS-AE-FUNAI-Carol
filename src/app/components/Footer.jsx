"use client"
import React from 'react'
import Image from 'next/image'
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className='bg-[#DC4A56] mt-10 px-4 py-3'>
        <div className='ml-10 flex place-content-between px-10 max-md:flex-col 
        max-md:place-content-center space-y-5'>
            <div className='flex'>
                <div className=''>
                    <Image src={"/images/carol-design.png"} 
                    alt='image' height={200} width={200}/>
                </div>
                <div className='text-white text-4xl font-monda mt-21 font-bold flex space-x-5'>
                    <span className='text-pink-300'>OF</span> 
                    <span className='font-monda text-yellow-100'> Nine Lessons</span>


                </div>
            </div>
            <div className='my-auto flex flex-col space-y-3 font-monda'>
                <p>For enquires and sponsorships</p>
                <p>Call: +2347041060482</p>
                <div className='flex space-x-4'>
                    <a href="https://x.com/fecamdsaefunai" className='cursor-pointer'>
                        <FaXTwitter/>
                    </a>
                    <a href="https://www.instagram.com/fecamds_aefunai" className='cursor-pointer'>
                        <FaInstagram/>
                    </a>
                </div>

            </div>


        </div>

    </div>
  )
}

export default Footer