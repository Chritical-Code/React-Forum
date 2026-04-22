import {prisma} from "@/prisma/prisma";
import MyImg from "@/src/components/MyImg";
import ImageScroller from "@/src/components/ImageScroller";
import LikeButton from "@/src/components/LikeButton";
import CommentSection from "@/src/components/CommentSection";

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

    const user = await prisma.user.findUnique({
        where: {id: post?.authorId}
    });

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
                <p className="font-bold text-center mb-2">{post?.title}</p>

                <a href={"/user/" + user?.id} className="hover:text-gray-600">{user?.name}</a>

                {(images.length > 0) && <ImageScroller>
                    {images}
                </ImageScroller>}

                <p className="text-left w-full mt-2">{post?.text}</p>
            </div>

            <CommentSection postId={resolved.postId}></CommentSection>
        </>
    );

}