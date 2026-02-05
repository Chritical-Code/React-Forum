import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if(session){
        return (
            <div className="flex flex-col items-center">
                <h1 className="font-bold m2">Profile</h1>
                <img className="w-20 h-20 m2" src={session?.user?.image ?? ""}></img>
                <p className="m2">{session?.user?.name}</p>
                <p className="m2">{session?.user?.email}</p>
                <a className="flex items-center justify-center shrink-0 m-1 border h-12 w-20 bg-gray-200 
                    hover:bg-gray-100 hover:border-gray-600 hover:text-gray-600 hover:cursor-pointer" 
                    href="/api/auth/signout">
                    Sign out
                </a>
            </div>
        );
    }
    else{
        return(
            <div className="flex flex-col items-center">
                <p>Must be logged in.</p>
            </div>
        );
    }

}