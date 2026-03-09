import Image from 'next/image'
import { PostImage } from "../generated/prisma/client";

type MyImgProps = {
    image: PostImage,
}

export default function MyImg({image}: MyImgProps){
    return(
        <Image src={image.src} alt="alt text" width={480} height={270} className="border border-black"></Image>
    );
}