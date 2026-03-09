import { Post } from "@/src/generated/prisma/client";
import {prisma} from "@/prisma/prisma";
import MyImg from "./MyImg";

type PostBoxProps = {
    post: Post,
    viewOrEdit: string,
}

export default async function PostBox({post, viewOrEdit}: PostBoxProps){
    const image = await prisma.postImage.findFirst({
        where: {postId: post.id}
    });
    
    return(
        <a href={"/post/" + viewOrEdit + "/" + post.id}>
            <div className="flex flex-col items-center shrink-0 bg-gray-400 w-121 h-80 border m-2 overflow-hidden">
                <p className="font-bold">{post.title}</p>
                <p>{post.text}</p>
                {image && <MyImg image={image}></MyImg>}
            </div>
        </a>
    );
}