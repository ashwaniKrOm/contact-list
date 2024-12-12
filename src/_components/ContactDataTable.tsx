"use client";
import { deleteContactAPI, fetchContactAPI } from '@/app/action';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Define the contact type
interface Contact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

const ContactData = () => {
  const [contacts, setContacts] = useState<Contact[]>([]); // State to hold contacts
  const [loading, setLoading] = useState(true); // State to show loading
  const [error, setError] = useState<null | string>(null); // State to handle errors
  const [elapsedTime, setElapsedTime] = useState(0); // Time in milliseconds

  const fetchContacts = async () => {
    try {
      const result=await fetchContactAPI();
      setContacts(result); // Update state with fetched data
      setLoading(false); // Set loading to false
    } catch (error) {
      setError("Failed to fetch contacts"); // Set error message
      setLoading(false); // Set loading to false in case of error
    }
  };

  const deleteContact=async (id:string)=>{
    try {
        await deleteContactAPI(id);
        alert("Contact Deleted Successfully");
        fetchContacts();
    } catch (error) {
        console.log("Error in deleting Contact",error);
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      const startTime = Date.now();
      timer = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else {
      setElapsedTime(0); // Reset elapsed time when not loading
    }

    // Fetch contacts
    fetchContacts();

    // Cleanup function to clear the timer when the component unmounts or `isLoading` changes
    return () => clearInterval(timer);
  }, [loading]); // Dependency array to trigger effect when `isLoading` changes

  // Conditionally render based on state
  if (loading) return <div className='w-full h-screen flex justify-center place-items-center'>
    <h2 className={`text-3xl font-semibold `} style={{color:`rgb(95,550,${elapsedTime})`}}>Loading...{elapsedTime} ms</h2></div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col m-4 border">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-md font-bold text-gray-500 uppercase">Name</th>
                  <th scope="col" className="px-6 py-3 text-start text-md font-bold text-gray-500 uppercase">Phone</th>
                  <th scope="col" className="px-6 py-3 text-start text-md font-bold text-gray-500 uppercase">Email</th>
                  <th scope="col" className="px-6 py-3 text-start text-md font-bold text-gray-500 uppercase">Address</th>
                  <th scope="col" className="px-6 py-3 text-end text-md font-bold text-gray-500 uppercase">Edit</th>
                  <th scope="col" className="px-6 py-3 text-end text-md font-bold text-gray-500 uppercase">Delete</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length>0 ? contacts.map((contact) => (
                  <tr key={contact._id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{contact.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{contact.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{contact.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <Link type="button" href={`/edit/${contact._id}`} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Edit</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <button type="button" onClick={()=>deleteContact(contact._id)} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Delete</button>
                    </td>
                  </tr>
                )) :
                <div className='w-full flex justify-center text-red-400 text-xl font-semibold '>
                    <h2>No Contacts! Create New Contact</h2>
                </div>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactData;
