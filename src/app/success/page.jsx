"use client"
import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'

function Success() {
  return (
    <div>
        <Navbar/>

        <div className='items-center flex place-content-center mt-40 flex-col mx-auto 
        self-center align-middle my-auto justify-center max-md:ml-10'>
            <div className='flex space-x-3'>
                <div>
                    <Image src={'/images/good.png'} height={40} width={40} alt='image'/>
                </div>
                <div>
                    <p className='text-[#FD6C37] text-3xl font-bold font-monda'>
                        Ticket Purchase Successful
                    </p>
                </div>
            </div>
            <div className='font-monda text-xl mt-4'>
               <p> You have Successfully purchase your ticket(s). Kindly check your
                <span className='text-[#FD6C37]'> email Inbox</span> for the Receipt.</p>
                <p className='text-center'>We hope at seeing you at the event.</p>
            </div>
            

        </div>

    </div>
  )
}

export default Success