"use client"
import React from 'react'
import { FaMinus } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";

function Registration() {
    const [count, setCount] = useState(1)

    const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

    const backend_domain = process.env.NEXT_PUBLIC_DJANGO_BACKEND_URL
    const [dataForm, setDataForm] = useState({})
    async function verifyPayment(reference) {
        try {
            const res = await fetch(`${backend_domain}/ticket/api/paystack/verify/${reference}`)
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

        const data = {
            email: formData.get("email"),
            number_of_ticket: formData.get("ticketNumber"),
            name: formData.get("name")
        }
        setDataForm(data)

        

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

        const reference = response.data.reference
        console.log(reference)



        // Paystack Integrataion
        
        const dataEmail = String(data.email)
        const ticketNumberPurchase = data.number_of_ticket
        const ticketName = data.name
        console.log(dataEmail, "hrllo")

        const handler = window.PaystackPop.setup({
            key: paystackPublicKey,
            email: dataEmail,
            amount: (parseInt(ticketNumberPurchase) * 1000) * 100, // convert Naira to Kobo
            currency: "NGN",
            firstname: ticketName,
            // callback: function (response) {
            //     onSuccess(response.reference);
            // },
            reference: reference,

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
                    className='border-2 border-gray-300 w-[70%] px-6 h-14 rounded-lg font-monda'
                    placeholder='Enter email' 
                    id='email'/>
                </div>

                <div className='flex flex-col space-y-5 mt-3'>
                    <label htmlFor="email" className='font-bold font-monda text-xl' >Full Name</label>
                    <input 
                    type="text"
                    name='name'
                    className='border-2 border-gray-300 w-[70%] px-6 h-14 rounded-lg font-monda'
                    placeholder='John Doe' 
                    id='name'/>
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
                        <p className='text-lg font-monda'>{count} conferenece ticket(s)</p>
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
                className={`w-[90%] h-15 ${dataForm ? "hover:bg-[#DC4A56]": bg-gray-200} 
                text-gray-400 rounded-lg cursor-pointer hover:bg-[#DC4A56]`}>
                    Buy ticket

                </button>
            </div>
        </form>

    </div>
  )
}

export default Registration