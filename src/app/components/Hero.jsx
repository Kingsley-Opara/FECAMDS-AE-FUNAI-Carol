"use client"
import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { IoFlowerOutline } from "react-icons/io5";
import Image from 'next/image';
import Registration from './register';
import { useState } from 'react';
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useGlobalContext } from '../context';
import Thanks from "./Thanks"

function Hero() {
 
  const {show, setShow, toggleShow} = useGlobalContext()

  return (
    <div className='mt-15 relative'>
        <div className=' text-4xl flex place-content-center items-center 
        flex-col space-y-3 hero'>
            
          <div className='whitespace-normal font-serif flex space-x-2 hero'>
            <span>FECAMDS</span> <span className='text-green-500'> AE-FUNAI </span>
            <span className='bg-red-500 rounded-full p-1 text-white text-sm h-5 w-5 self-center'>

              <FaArrowRight/>
            </span>               
          </div>
          <div className='text-3xl flex space-x-3 font-nova'>
            <span className='font-nova'> Presents to you </span> 
            <span className='bg-red-500 rounded-full p-1'> <IoFlowerOutline/></span>
            

          </div>
          <div className='text-4xl font-monda font-bold text-red-500'>
            Carol of Nine Lessons
          </div>

            <div className='text-lg mt-8'>
              <button className='px-4 py-2 bg-orange-500 
              text-white rounded-2xl cursor-pointer mt-6 
              hover:bg-orange-400 text-lg flex space-x-2'
              onClick={() =>{toggleShow()}}
              >
                  <p>Register Now</p>
                  <FaArrowRight className='mt-2'/>

              </button>
            </div>


            <div className='mt-25 flex space-x-5 font-nova'>
              <div className='flex space-x-3'>
                <p className='font-nova'>Brought to you by </p>
                <div>
                   <Image src={"/images/fecamds-logo.png"} alt='image' height={40} width={40} className='object-contain'/>
                </div>

                </div>
               

            </div>
            <div>
              {/* <div>
                <p className='font-monda text-2xl'>In partenership with</p>
                <div className='mt-5 flex space-x-4'>
                  <div className=''>
                    <Image 
                    src={"/images/perpetual_help.jpg"} alt='img' 
                    className='rounded-full object-contain'
                    height={20} width={20}/>
                  </div>
                  <p className='text-sm font-nova'>Our Mother of Perpetual Help Chaplaincy</p>
                </div>
              </div> */}
            </div>
            
        </div>
        <div className={`absolute top-[-5%] 
          max-md:left-[10%] ${!show && 'hidden'} bg-white left-[20%] 
          dark:bg-black h-fit w-[40%] shadow-gray-100 
          dark:shadow-black max-md:w-[80%]
          shadow-3xl p-4 px-6 py-5`}>
          <div className='flex place-content-end'>
              <AiOutlineCloseSquare
              onClick={()=>{toggleShow()}}
              className='text-3xl cursor-pointer text-gray-400'/>

          </div>
          <Registration/>
          {/* <Thanks/> */}
        </div>
        
        
    </div>
  )
}

export default Hero