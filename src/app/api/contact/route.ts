import { dbConnect } from "@/libs/dbConnect";
import ContactModel from "@/models/contact_model";
import { NextResponse } from "next/server";

//it is mandatory to return NextResponse otherwise you will face error

export async function GET(){
    try {
        await dbConnect();
        const fetchedContact=await ContactModel.find();
        return NextResponse.json({fetchedContact,status:200});
    } catch (error) {
        console.error("Error in GET Handler",error);
    }
}

export async function POST(req:Request){
    try {
        const {name,phone,email,address}=await req.json();
        console.log(name);
        await dbConnect();
        const newContact = await ContactModel.create({name,phone,email,address});
        return NextResponse.json({msg:"new contact created successfully",data:newContact,status:201});
    } catch (error) {
        console.error("Error in POST Handler",error);
    }
}