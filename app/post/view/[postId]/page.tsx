import {prisma} from "@/prisma/prisma";
import { PostImage } from "@/src/generated/prisma/client";
import Image from 'next/image'

type ViewPostProps = {
    params: Promise<{
        postId: string
    }>
}

export default async function ViewPost({params}: ViewPostProps){
    const resolved = await params;

    const post = await prisma.post.findUnique({
        where: {id: resolved.postId}
    });

    const imageData = await prisma.postImage.findMany({
        where: {postId: resolved.postId}
    });

    const images = imageData.map((image: PostImage, index) => {
        console.log("image src: " + image.src);
        return(
            <Image key={index} src={image.src} alt="alt text" width={480} height={270} className="border border-black"></Image>
        );
    });

    return(
        <div className="flex flex-col items-center text-center">
            <p className="font-bold">{post?.title}</p>

            <div className="flex flex-col w-120 h-68 overflow-y-scroll overflow-x-hidden border m-0">
                {images}
            </div>

            <p>{post?.text}</p>
        </div>
    );

}