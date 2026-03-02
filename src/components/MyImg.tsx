import Image from 'next/image'
import { PostImage } from "../generated/prisma/client";
import Form from "next/form";
import {deleteImg} from "@/src/actions/deleteImg";

type MyImgProps = {
    image: PostImage,
    trash: boolean,
}

export default function MyImg({image, trash}: MyImgProps){
    return(
        <div className="flex flex-col items-center w-120 h-68 shrink-0 m-0">
            <Image src={image.src} alt="alt text" width={480} height={270} className="border border-black"></Image>
            {trash && <DeleteImageForm imageId={image.id}></DeleteImageForm>}
        </div>
    );
}

type DeleteImageFormProps = {
    imageId: string,
}

function DeleteImageForm({imageId}: DeleteImageFormProps){
    return(
        <Form action={deleteImg} className="relative bottom-10">
            <input type="hidden" name="imageId" value={imageId}></input>
            <button type="submit" className="btn w-8 h-8 bg-red-700">🗑️</button>
        </Form>
    );
}