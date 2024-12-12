import ContactDataTable from "@/_components/ContactDataTable";
import { dbConnect } from "@/libs/dbConnect";

export default function Home() {
  dbConnect();
  return (
    <div >
       <ContactDataTable/>
    </div>
  );
}
