'use client';
import MyImg from "@/src/components/image/MyImg";
import type { Post } from "@/src/actions/post/getPosts";

type PostBoxProps = {
    post: Post,
    viewOrEdit: string,
}

export default function PostBox({post, viewOrEdit}: PostBoxProps){
    return(
        <a href={"/post/" + viewOrEdit + "/" + post.id} className="inline-flex flex-col items-center m-2 p-0 w-90 md:w-120 h-auto">
            <div className="flex flex-col items-center shrink-0 bg-gray-400 w-full h-full border overflow-hidden">
                <p className="font-bold h-6 w-11/12 overflow-hidden text-center">{post.title}</p>
                <p className="h-6 w-11/12 overflow-hidden text-center">{post.text}</p>
                {post.postImages[0] && <MyImg image={post.postImages[0]}></MyImg>}
            </div>
        </a>
    );
}