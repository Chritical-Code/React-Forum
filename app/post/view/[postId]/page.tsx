import {prisma} from "@/prisma/prisma";
import MyImg from "@/src/components/image/MyImg";
import ImageScroller from "@/src/components/image/ImageScroller";
import CommentSection from "@/src/components/post/CommentSection";
import { notFound } from "next/navigation";

type ViewPostProps = {
    params: Promise<{
        postId: string
    }>
}

export default async function ViewPost({params}: ViewPostProps){
    const resolved = await params;
    let post, user;

    try{
        post = await prisma.post.findUnique({
            where: {id: resolved.postId}
        });

        user = await prisma.user.findUnique({
            where: {id: post?.authorId}
        });
    }
    catch{notFound();}

    const imageData = await prisma.postImage.findMany({
        where: {postId: resolved.postId}
    });

    const images = imageData.map((image, index) => {
        return(
            <MyImg key={index} image={image}></MyImg>
        );
    });

    return(
        <>
            <div className="flex flex-col items-center mt-2 w-90 md:w-120">
                <a href={"/user/" + user?.id} className="hover:text-gray-600 mb-1">{user?.name}</a>

                <p className="font-bold text-center mb-1">{post?.title}</p>

                {(images.length > 0) && <ImageScroller>
                    {images}
                </ImageScroller>}

                <p className="text-left w-full mt-2">{post?.text}</p>
            </div>

            <CommentSection postId={resolved.postId}></CommentSection>
        </>
    );

}