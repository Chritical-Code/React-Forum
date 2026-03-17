'use client';
import Form from 'next/form'
import { uploadMedia } from "@/src/actions/uploadMedia";
import TrashableImage from "@/src/components/TrashableImage";
import { PostImage } from "@/src/generated/prisma/client";
import {getImageData} from "@/src/actions/getImageData";
import { useEffect, useState, useRef } from 'react';

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
            <div className="flex flex-col w-120 h-68 overflow-y-scroll overflow-x-hidden border">
                {images}
            </div>

            <Form action={async () => {}} onSubmit={handleSubmit} className="flex flex-col items-center mb-10" ref={formRef}>
                <input type="hidden" value={postId} name="postId"></input>
                <h2 className="font-bold">Add Images:</h2>
                <input type="file" name="image" className="btnf" accept="image/*" onChange={() => handleFileChange()} required></input>
            </Form>
        </>
    );
}