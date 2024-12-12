"use server"

import axios from "axios";


export const fetchContactAPI= async()=>{
    try {
        const result= await axios.get("http://localhost:3000/api/contact");
        // console.log(result.data.fetchedContact)
        return result.data.fetchedContact;
    } catch (error) {
        console.error(error)
        return [];
    }  
}

export const fetchEachContactAPI= async (id:string)=>{
    try {
        const result=await axios.get(`http://localhost:3000/api/contact/${id}`)
        // console.log(result.data.contact)
        return result.data.contact;
    } catch (error) {
        console.error(error)
        return [];
    }
}

export const deleteContactAPI=async (id:string)=>{
    console.log(id);
    await axios.delete(`http://localhost:3000/api/contact/${id}`);
}