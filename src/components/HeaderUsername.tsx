"use client";
import {useSession} from "next-auth/react";

export default function HeaderUsername(){
    const {data: session, status} = useSession()

    if(status === "authenticated"){
        return(
            <Link text={session.user?.name ?? ""} link={"/user"}/>
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