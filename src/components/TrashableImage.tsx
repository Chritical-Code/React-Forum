'use client';
import Image from 'next/image'
import { PostImage } from "../generated/prisma/client";
import Form from "next/form";
import {deleteImg} from "@/src/actions/deleteImg";

type MyImgProps = {
    image: PostImage,
    reloadImageData: Function,
}

export default function TrashableImage({image, reloadImageData}: MyImgProps){
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        const formData = new FormData(e.currentTarget);
        await deleteImg(formData);
        reloadImageData();
    }
    
    return(
        <div className="flex flex-col items-center w-90 h-51 md:w-120 md:h-67.5 shrink-0 m-0">
            <Image src={image.src} alt="alt text" width={480} height={270} className="border border-black"></Image>

            <Form action={async () => {}} onSubmit={handleSubmit} className="relative bottom-10 -mb-10">
                <input type="hidden" name="imageId" value={image.id}></input>
                <button type="submit" className="btn w-8 h-8 bg-red-700">🗑️</button>
            </Form>
        </div>
            
    );
}