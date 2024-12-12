"use client"

import axios from 'axios'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const  CreateContactPage = () => {
    const [contactData,setContactData]=useState({
        name:"",
        phone:"",
        email:"",
        address:""
    })

    const handleChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setContactData({...contactData, [e.target.name]:e.target.value})
    }

    const handleSubmit=async (e:FormEvent)=>{
       e.preventDefault();
        await axios.post("/api/contact",contactData)
        .then((res)=>{
            alert("Contact created successfully.");
            setContactData({ 
            name:"",
            phone:"",
            email:"",
            address:""})
        })
        .catch((err)=>console.log("Error in creating new contact",err))
    }
  return (
    <>
    <div className='h-screen w-full bg-gray-200'>
    <div className='flex justify-center py-2'>
        <h2 className='text-3xl font-semibold  text-zinc-600'>Create New Contact Component</h2>
    </div>
    <div className='w-full   flex justify-center place-items-center py-5'>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className=''>
            <input 
            type="text"
            name="name"
            value={contactData.name} 
            onChange={handleChange}
            placeholder='Enter name'
            className='border w-96 px-2 py-1 bg-gray-50 m-2'/>
        </div>
        <div>
            <input 
            type="text"
            name="phone"
            value={contactData.phone}
            onChange={handleChange}
            placeholder='Enter phone number'
            className='border w-96 px-2 py-1 bg-gray-50 m-2' />
        </div>
        <div>
            <input 
            type="email"
            name="email"
            value={contactData.email}
            onChange={handleChange}
            placeholder='Enter email'
            className='border w-96 px-2 py-1 bg-gray-50 m-2' />
        </div>
        <div>
            <textarea
             name="address" 
             value={contactData.address}
             cols={44} rows={3} 
             placeholder='Enter address'
             onChange={handleChange}
             className='m-2 px-2 py-1'></textarea>
        </div>
        <div>
            <button 
            type='submit'
            className='bg-blue-700 m-2 px-4 py-1.5 rounded-sm text-white'
            >Create Contact</button>
        </div>
      </form>
    </div>
    </div>
    </>
  )
}

export default CreateContactPage
