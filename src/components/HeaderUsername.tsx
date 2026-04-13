import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/prisma/prisma";

export default async function HeaderUsername(){
    const session = await getServerSession(authOptions);

    if(session){
        return(
            <Link text={session?.user.name ?? ""} link={"/user"}/>
        ); 
    }
    else{
        return(
            <Link text="Sign in" link="/api/auth/signin" />
        );
    }
}

type LinkProps = {
    text: string,
    link: string,
}

function Link({text, link}: LinkProps){
    return(
        <a href={link} className="whitespace-nowrap max-w-24 md:max-w-48 overflow-hidden m-0 hover:border-gray-600 hover:text-gray-600 hover:cursor-pointer">
            {text}
        </a>
    );
}