import {prisma} from "@/prisma/prisma";
import { PostImage } from "@/src/generated/prisma/client";
import MyImg from "@/src/components/MyImg";
import ImageScroller from "@/src/components/ImageScroller";

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

            <ImageScroller>
                {images}
            </ImageScroller>

            <p className="w-90 md:w-120">{post?.text}</p>
        </div>
    );

}