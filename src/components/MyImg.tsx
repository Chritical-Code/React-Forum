import Image from 'next/image'
import { PostImage } from "../generated/prisma/client";

type MyImgProps = {
    image: PostImage,
}

export default function MyImg({image}: MyImgProps){
    return(
        <div className="flex flex-col items-center w-90 h-51 md:w-120 md:h-67.5 shrink-0 m-0">
            {<Image src={image.src} alt={image.id} width={480} height={270} className="border border-black"></Image>}
        </div>
    );
}