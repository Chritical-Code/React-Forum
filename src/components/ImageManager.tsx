'use client';
import Form from 'next/form'
import { uploadMedia } from "@/src/actions/uploadMedia";
import MyImg from "@/src/components/MyImg";
import { PostImage } from "@/src/generated/prisma/client";
import {getImageData} from "@/src/actions/getImageData";
import { useEffect, useState } from 'react';

type ImageManagerProps = {
    postId: string,
}

export default function ImageManager({postId}: ImageManagerProps){
    const [imageData, setImageData] = useState<PostImage[]>([]);

    useEffect(() => {
        reloadImageData();
    }, []);

    const images = imageData.map((image: PostImage, index) => {
        return(
            <MyImg key={index} image={image} trash={true}></MyImg>
        );
    });

    async function reloadImageData(){
        setImageData( await getImageData({postId}));
    }

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        const formData = new FormData(e.currentTarget);
        await uploadMedia(formData);
        reloadImageData();
    }
    
    return(
        <>
            <div className="flex flex-col w-120 h-68 overflow-y-scroll overflow-x-hidden border">
                {images}
            </div>

            <Form action={async () => {}} onSubmit={handleSubmit} className="flex">
                <input type="hidden" value={postId} name="postId"></input>
                <input type="file" name="image" className="btnf" accept="image/*" required></input>
                <button type="submit" className="btn">Upload</button>
            </Form>

            <button onClick={() => {reloadImageData()}} className="btn">Refresh</button>
        </>
    );
}