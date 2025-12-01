"use client"
import React from 'react'
import Image from 'next/image'

function About() {
  return (
    <div className='about mt-30 h-fit py-5 w-[90%] bg-[#DC4A56] 
    bg-linear-to-b px-10 flex  mx-auto text-white flex-col'>
        <div className='mt-10 font-monda text-4xl font-bold w-[80%]'>
            <p>About Carol of Nine Lessons 2025</p>

        </div>
        <div className='mt-10 w-[90%]'>
            <p className='font-monda leading-normal whitespace-normal'>
                The inaugural christmas carol held on the <span className='font-bold'>3rd of december 2024 </span>
                birthed the  
                FECAMDS-AEFUNAI choir, a developmet that has had tremendous impact on the 
                association.
                Givig an oppoutunity for our students to win souls through evangelism with 
                their God given talents.

            </p>
            <p className='mt-5 leading-normal'>
                This years carol is to be held on the <span className='font-bold'>13th of December </span>. 
                The choir intends to 
                not just render songs but to remind us of the essence of the birth of our saviour.
                They have worked tirelessly for months amid their busy schedules to prepare 
                for this event, to win souls through the power of music and bring joy to the heavens. 
                10 songs, 9 lessons from the fecamds choir, guest performances from other choirs, 
                kareoke's of your favourite christian songs etc. The event promises to be uplifting, educating and transforming.
                God bless you as you join us in the celebration of the birth of our redeemer.
            </p>

        </div>
        <div className='mt-10'>
            <div>
                <p className='font-bold text-3xl'>Shots From FECAMDS AE-FUNAI Choir</p>
            </div>
            <div className='mt-10 flex space-x-20 max-md:flex-col space-y-5'>
                <div className=''>
                    <Image src={"/images/choir.jpeg"} alt='image' height={500} width={500} 
                    className='object-contain max-md:hidden'/>
                </div>

                <div>
                    <Image src={"/images/choir-2.jpeg"} alt='image' height={400} width={400} 
                    className='object-contain'/>
                </div>
                

            </div>
        </div>
    </div>
  )
}

export default About