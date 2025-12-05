"use client"
import React from 'react'
import { FaMinus } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";
import { metadata } from '../layout';

function Registration() {
    const [count, setCount] = useState(1)

    const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

    const backend_domain = process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL
    const [dataForm, setDataForm] = useState({})
    const [emailD, setEmailD] = useState("")
    const [nameI, setName] = useState("")
    const [ticketID, setTicketID] = useState(null)
    async function verifyPayment(reference) {
        try {
            const res = await fetch(`
                ${backend_domain}/ticket/api/paystack/verify/${reference}`)
            const data = await res.json()
            if (data.data.status === "success"){
                window.location.href = "/success"
            }
            console.log("Verification result:", data)
        } catch (err) {
            console.error("Error verifying payment:", err)
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const formData = new FormData(e.target)

        let data = {
            email: formData.get("email"),
            number_of_ticket: formData.get("ticketNumber"),
            name: formData.get("name"),
            fecamds_class: formData.get("fecamdsClass"),
            set_year: formData.get("setYear")
        }
        
        e.target.reset()
        

        

        

        const res = await fetch(`${backend_domain}/ticket/api/`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(data)
        })

        // if (!res.ok){
        //     console.error("failed", await res.text())
        // }

        const response = await res.json()
        
        if (!response?.data?.reference) return alert("Initialization failed")
        setTicketID(response.ticket_id)
        const reference = response.data.reference
        
        
        console.log(response.ticket_id, "hello")



        // Paystack Integrataion
        
        let dataEmail = String(data.email)
        let ticketNumberPurchase = data.number_of_ticket
        let ticketName = data.name
        console.log(dataEmail, "hrllo")

        const handler = window.PaystackPop.setup({
            key: paystackPublicKey,
            email: emailD,
            amount: (parseInt(ticketNumberPurchase) * 1020) * 100, // convert Naira to Kobo
            currency: "NGN",
            firstname: nameI,
            // callback: function (response) {
            //     onSuccess(response.reference);
            // },
            reference: reference,
            metadata: {
                ticket_id: response.ticket_id

            },

            callback: function(response){
                // console.log(reference)
                verifyPayment(response.reference)
                // onSuccess(response.reference);
            },

            onClose: function () {
                alert("Payment window closed");
            },


        });
        handler.openIframe();

    }

    const handleAddCount = ()=>{
        
        setCount(count + 1)
    }
    const handleSubtractCount = () =>{
        
        if (count === 1){
            setCount(1)
        }
        else{
            setCount(count - 1)
        }
    }
  return (
    <div className='mt-5'>
        <form action="" onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <p className='font-monda text-3xl text-red-400 font-bold'>
                    Register for Carol of Nine Lessons 2025
                </p>
            </div>
            
            <div className='mt-10'>
                
                <div className='flex flex-col space-y-5'>
                    <label htmlFor="email" className='font-bold font-monda text-xl' >Email</label>
                    <input 
                    type="email"
                    name='email'
                    value={emailD}
                    onChange={(e)=>{setEmailD(e.target.value), console.log(emailD)}}
                    className='border-2 border-gray-300 w-[90%] px-6 h-14 rounded-lg font-monda'
                    placeholder='Enter email' 
                    id='email'/>
                </div>

                <div className='flex flex-col space-y-5 mt-3'>
                    <label htmlFor="email" className='font-bold font-monda text-xl' >Full Name</label>
                    <input 
                    type="text"
                    value={nameI}
                    onChange={(e)=>{setName(e.target.value)}}
                    name='name'
                    className='border-2 border-gray-300 w-[90%] px-6 h-14 rounded-lg font-monda'
                    placeholder='John Doe' 
                    id='name'/>
                </div>
                <div className='flex flex-col space-y-5 mt-3'>
                    <label htmlFor="fecamdsClass">FECAMDS Class</label>
                    <select name="fecamdsClass" 
                    id="" 
                    className='shadow-2xl shadow-white p-2 border-1 
                    border-gray-400 h-fit dark:shadow-gray-700 bg-white dark:bg-black'
                    required
                    >
                        {/* <option value="" disabled selected> e.g St Joan class</option> */}
                        <option value="St Joan class">St Joan class</option>
                        <option value="St Anselem class">St Anselem class</option>
                        <option value="St Francis class">St Francis class</option>
                        <option value="St Mary class">St Mary class</option>
                        <option value="St Raphael class">St Raphael class</option>
                    </select>
                </div>
                <div className='flex flex-col space-y-5 mt-3'>
                    <label htmlFor="Set year">Set Year</label>
                    <select 
                    name="setYear" 
                    id="" required
                    className='shadow-2xl shadow-white p-2 border-1 
                    border-gray-400 h-fit dark:shadow-gray-700 bg-white dark:bg-black'
                    >
                        {/* <option value="" disabled>Your Set Year e.g 2019</option> */}
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>

                </div>
                

                <input type="text" 
                className='hidden'
                name='ticketNumber'
                value={count}
                onChange={(e)=>{console.log(e.target.value)}}
                />
                
            </div>
            <div className='mt-10'>
                <div className='flex place-content-between max-md:space-x-5'>
                    <div>
                        <button 
                        className='h-12 w-12 bg-gray-100 cursor-pointer 
                        text-gray-300 py-1 text-2xl px-2 hover:bg-gray-400'
                        onClick={(e)=>{handleSubtractCount(), e.preventDefault()}}
                        >
                            <FaMinus className='text-2xl'/>
                        </button>
                    </div>
                    <div>
                        <p className='text-lg font-monda'>{count} Carol ticket(s)</p>
                    </div>
                    
                    <div>
                        <button 
                        className='h-12 w-12 bg-orange-500 
                        cursor-pointer hover:bg-orange-700
                        text-gray-300 py-1 text-2xl px-2'
                        onClick={(e)=>{handleAddCount(), e.preventDefault()}}
                        >
                            <FaPlus className='text-2xl'/>
                        </button>
                    </div>

                </div>

            </div>
            <div className='mt-10'>
                <button
                type='submit' 
                className={`w-[90%] h-15 ${emailD === "" ? "bg-gray-200 cursor-not-allowed": "bg-[#DC4A56]"}
                text-gray-400 rounded-lg cursor-pointer hover:bg-[#DC4A56]`}
                disabled = {emailD === ""}
                >
                    Buy ticket

                </button>
            </div>
        </form>

    </div>
  )
}

export default Registration