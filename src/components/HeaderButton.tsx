"use client"
import Link from 'next/link'

type HeaderButtonProps = {
    text: string,
    link: string,
}

export default function HeaderButton({text, link}: HeaderButtonProps){
    return(
        <Link href={link} className="flex items-center justify-center shrink-0 m-1 border h-8 w-10 hover:border-gray-600 hover:text-gray-600 hover:cursor-pointer">
            {text}
        </Link>
    );
}