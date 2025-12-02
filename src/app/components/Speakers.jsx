"use client"
import React from 'react'
import Image from 'next/image'
import { loc } from '../utilis'
function Speakers() {
  return (
    <div className='mt-35 ml-15 max-md:ml-8'>
        <div className='text-3xl font-monda font-extrabold'>
            Meet the LOC Members
        </div>
        <div className='mt-10 grid grid-cols-3 max-md:grid-cols-1 gap-x-10 gap-y-8'>
            {loc.map((item) =>{
                return(
                    <div className='flex flex-col space-y-5' key={item.id}>
                        <div>
                            <Image src={item.image} alt='image' height={200} width={300}/>

                        </div>
                        <div className='border-1 border-black dark:border-white w-80 
                        px-2 flex flex-col space-y-2 rounded-2xl py-2'>
                            <p className='text-xl font-semibold font-monda w-full'>
                                {item.name}
                            </p>

                            <p className='text-sm font-semibold'>
                                {item.role}
                            </p>
                            <p className='text-xs'>
                                {item.location}
                            </p>

                        </div>


                    </div>
                )
            })}



        </div>
    </div>
  )
}

export default Speakers