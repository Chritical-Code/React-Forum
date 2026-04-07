import { Post } from "@/src/generated/prisma/client";
import {prisma} from "@/prisma/prisma";
import MyImg from "@/src/components/MyImg";

type PostBoxProps = {
    post: Post,
    viewOrEdit: string,
}

export default async function PostBox({post, viewOrEdit}: PostBoxProps){
    const image = await prisma.postImage.findFirst({
        where: {postId: post.id}
    });
    
    return(
        <a href={"/post/" + viewOrEdit + "/" + post.id} className="inline-flex flex-col items-center m-2 p-0 w-90 md:w-120 h-auto">
            <div className="flex flex-col items-center shrink-0 bg-gray-400 w-full h-full border m-2 overflow-hidden">
                <p className="font-bold h-6 w-11/12 overflow-hidden text-center">{post.title}</p>
                <p className="h-6 w-11/12 overflow-hidden text-center">{post.text}</p>
                {image && <MyImg image={image}></MyImg>}
            </div>
        </a>
    );
}