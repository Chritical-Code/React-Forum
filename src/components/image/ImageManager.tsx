'use client';
import Form from 'next/form'
import { uploadMedia } from "@/src/actions/image/uploadMedia";
import TrashableImage from "@/src/components/image/TrashableImage";
import { PostImage } from "@/src/generated/prisma/client";
import {getImageData} from "@/src/actions/image/getImageData";
import { useEffect, useState, useRef } from 'react';
import ImageScroller from "./ImageScroller";

type ImageManagerProps = {
    postId: string,
}

export default function ImageManager({postId}: ImageManagerProps){
    const [imageData, setImageData] = useState<PostImage[]>([]);
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        reloadImageData();
    }, []);

    const images = imageData.map((image: PostImage, index) => {
        return(
            <TrashableImage key={index} image={image} reloadImageData={reloadImageData}></TrashableImage>
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

    function handleFileChange(){
        formRef.current?.requestSubmit();
    }
    
    return(
        <>
            <ImageScroller>
                {images}
            </ImageScroller>

            <Form action={async () => {}} onSubmit={handleSubmit} className="flex flex-col items-center mb-10" ref={formRef}>
                <input type="hidden" value={postId} name="postId"></input>
                <label htmlFor="file-upload" className="btn w-24">Add Image</label>
                <input type="file" id="file-upload" name="file" className="hidden" accept="image/*" onChange={() => handleFileChange()} required></input>
            </Form>
        </>
    );
}