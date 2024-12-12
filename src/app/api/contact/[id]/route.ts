import { dbConnect } from "@/libs/dbConnect";
import ContactModel from "@/models/contact_model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req:Request,{params}:{params:{id:string}}){
    try {
        const id= params.id;
        await dbConnect();
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({ error: "Invalid url dynamic ID" }, { status: 400 });
        }

        const contact=await ContactModel.findById(id);
        
        if (!contact) {
            return NextResponse.json({ error: "Contact not found" }, { status: 404 });
        }
        return NextResponse.json({contact})
    } catch (error) {
        console.log("Error in dynamic GET Handler",error);
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        await dbConnect();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        await ContactModel.findByIdAndDelete(id);
        return NextResponse.json({ msg: "Contact Deleted Successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error in DELETE Handler", error);
        return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
    }
}

    
    // console.log(payload.id)
    // console.log(res.params.id);
    // console.log(payload);
  
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const updatedData = await req.json();
        await dbConnect();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const updatedContact = await ContactModel.findByIdAndUpdate(id, updatedData, { new: true, overwrite: true });
        
        if (!updatedContact) {
            return NextResponse.json({ error: "Contact not found" }, { status: 404 });
        }

        return NextResponse.json({ msg: "Contact Updated Successfully", updatedContact }, { status: 200 });
    } catch (error) {
        console.log("Error in PUT Handler", error);
        return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
    }
}