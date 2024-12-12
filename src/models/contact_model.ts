import mongoose,{Schema, Document} from "mongoose";

export interface ContactTypes extends Document{
    name:string;
    phone:string;
    email:string;
    address:string;
}

const contactSchema:Schema<ContactTypes>=new Schema(
    {
        name:{type:String,required:true},
        phone:{type:String,required:true},
        email:{type:String,required:true},
        address:{type:String,required:true}
    },
    {
        timestamps:true
    }
)

const ContactModel=mongoose.models.Contact || mongoose.model<ContactTypes>("Contact",contactSchema);
export default ContactModel;