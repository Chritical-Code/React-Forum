import {prisma} from "@/prisma/prisma";
import { Post } from "@/src/generated/prisma/client";

export default async function Home() {
    const posts = await prisma.post.findMany();

    const postBoxes = posts.map((post: Post, index) => {
        return(
            <PostBox post={post} key={index}></PostBox>
        );
    });

    return(
        <div className="flex flex-row overflow-hidden">
            <div className="flex flex-col w-1/5">
                <p className="font-bold m-1">Tags</p>
                <Tag text="One"></Tag>
                <Tag text="Two"></Tag>
                <Tag text="Three"></Tag>
                <Tag text="Four"></Tag>
                <Tag text="Five"></Tag>
            </div>

            <div className="flex flex-col w-3/5 items-center overflow-y-scroll">
                {postBoxes}
            </div>
        </div>
    );
}


function PostBox({post}: {post: Post}){
    return(
        <a href={"/post/view/" + post.id}>
            <div className="shrink-0 bg-gray-400 w-2xl h-96 border m-2">
                <p>{post.title}</p>
                <p>{post.text}</p>
            </div>
        </a>
    );
}

type TagProps = {
    text: string
}

function Tag({text}: TagProps){
    return(
        <p className="m-1">{text}</p>
    );
}