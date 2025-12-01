"use client"
import React from 'react'
import Image from 'next/image'

function CarolPage() {
  return (
    <div>
        <div className='mt-10 flex place-content-center justify-center self-center space-x-0'>
            <div>
                <Image src={"/images/carol-design.png"} 
                alt='image' height={200} width={200}/>
            </div>
            {/* <div className='text-5xl font-bold font-monda mt-20 max-md:mt-9 max-md:ml-3'>
                <p className='text-gray-500'>Of Nine Lessons</p>

            </div> */}
            <div className='-ml-3'>
                <Image src={"/images/2025-removebg-preview.png"} 
                alt='image' height={200} width={200}/>
            </div>


        </div>
        <div className='mt-4'>
            <p className='font-monda text-4xl font-bold text-center text-gray-300'>
                The Spark You Need this Christmas
            </p>
        </div>
    </div>
  )
}

export default CarolPage