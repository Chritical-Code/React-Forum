import {prisma} from "@/prisma/prisma";
import { PostImage } from "@/src/generated/prisma/client";
import MyImg from "@/src/components/MyImg";
import ImageScroller from "@/src/components/ImageScroller";
import LikeButton from "@/src/components/LikeButton";

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

    const images = imageData.map((image: PostImage, index) => {
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

            <div className="flex flex-row items-center h-12 w-94 md:w-124 p-2 mt-8 mb-2 shrink-0 border-t border-b">
                <p>Comments - 50</p>
                <div className="flex grow"></div>
                <LikeButton postId={resolved.postId}></LikeButton>
            </div>

            <div className="flex flex-col items-center">
                <Comment username="Username" text="Text"></Comment>
                <Comment username="Username" text="Text"></Comment>
                <Comment username="Username" text="Text"></Comment>
                <Comment username="Username" text="Text"></Comment>
                <Comment username="Username" text="Text"></Comment>
                <Comment username="Username" text="Text"></Comment>
                <Comment username="Username" text="Text"></Comment>
                <Comment username="Username" text="Text"></Comment>
                <Comment username="Username" text="Text"></Comment>
                <Comment username="Username" text="Text"></Comment>
            </div>
        </>
    );

}


type CommentProps = {
    username: string,
    text: string,
}

function Comment({username, text}: CommentProps){
    return(
        <div className="w-90 md:w-120 border-b p-2">
            <p className="font-bold">{username}</p>
            <p className="">{text}</p>
        </div>
    );
}