"use client"
import Link from 'next/link'

type HeaderButtonProps = {
    text: string,
    link: string,
}

export default function HeaderButton({text, link}: HeaderButtonProps){
    return(
        <Link href={link} className="btn h-8 w-10">
            {text}
        </Link>
    );
}