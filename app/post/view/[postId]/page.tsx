import {prisma} from "@/prisma/prisma";
import { PostImage } from "@/src/generated/prisma/client";
import MyImg from "@/src/components/MyImg";

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
        return(
            <MyImg key={index} image={image}></MyImg>
        );
    });

    return(
        <div className="flex flex-col items-center">
            <p className="font-bold w-90 md:w-120 text-center">{post?.title}</p>

            <div className="flex flex-col w-90 h-51 md:w-120 md:h-67.5 overflow-y-scroll overflow-x-hidden border m-0 items-center">
                {images}
            </div>

            <p className="w-90 md:w-120">{post?.text}</p>
        </div>
    );

}