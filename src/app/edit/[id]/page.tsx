"use client"

import { fetchEachContactAPI } from '@/app/action';
import axios from 'axios'
import { useParams,useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState,useEffect } from 'react'

const  EditContactPage = () => {
    const {id}=useParams();
    const router=useRouter();

    // console.log(id);
    const [contactData,setContactData]=useState({
        name:"",
        phone:"",
        email:"",
        address:""
    })
    const [loading,setLoading]=useState(true);
    const [err,setErr]=useState<string | null>(null);
    const [elapsedTime,setElapsedTime]=useState(0);

    useEffect(()=>{
        let timer:NodeJS.Timeout;

        if(loading){
            const startTime:number=Date.now();
            timer=setInterval(()=>{
                setElapsedTime(Date.now()-startTime)
            },100)
        }
        else{
            setElapsedTime(0);
        }
        
        fetchContact();

        return ()=>clearInterval(timer);
    },[loading])

    const fetchContact= async ()=>{
        try {
            // const res=fetchEachContactAPI(id);
            const res=await fetchEachContactAPI(Array.isArray(id) ? id[0] :id);
    
            setContactData(
                {   ...contactData,
                    name:res.name,
                    phone:res.phone,
                    email:res.email,
                    address:res.address
                }
            )
            setLoading(false);
            
        } catch (error) {
            console.error(error);
            setErr("Error in fetching");
            setLoading(true);
        }
    }


    const handleChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setContactData({...contactData, [e.target.name]:e.target.value})
    }

    const handleUpdate=async (e:FormEvent)=>{
       e.preventDefault();
        await axios.put(`/api/contact/${id}`,contactData)
        .then((res)=>{
            alert("Contact updated successfully.");
            router.push('/');
        })
        .catch((err)=>console.log("Error in creating new contact",err))
    }

    if(loading) return <div className='w-full h-screen flex justify-center place-items-center '>
        <h2 className={`text-3xl font-semibold text-blue-${elapsedTime}`}>Loading...{elapsedTime} ms</h2>
        </div>

  return (
    <>
    <div className='h-screen w-full bg-gray-200'>
    <div className='flex justify-center py-2'>
        <h2 className='text-3xl font-semibold  text-zinc-600'>Create New Contact Component</h2>
    </div>
    <div className='w-full   flex justify-center place-items-center py-5'>
      <form  method="put" onSubmit={handleUpdate}>
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
            >Update Contact</button>
        </div>
      </form>
    </div>
    </div>
    </>
  )
}

export default EditContactPage


/*
setContactData(
                {   ...contactData,
                    name:res.data.contact.name,
                    phone:res.data.contact.phone,
                    email:res.data.contact.email,
                    address:res.data.contact.address
                }
            )
*/