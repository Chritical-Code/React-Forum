import {prisma} from "@/prisma/prisma";
import PostBox from "@/src/components/PostBox";
import { Post } from "@/src/generated/prisma/client";

export default async function Home() {
    const posts = await prisma.post.findMany();

    const postBoxes = posts.map((post: Post, index) => {
        return(
            <PostBox key={index} post={post} viewOrEdit="view"></PostBox>
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

type TagProps = {
    text: string
}

function Tag({text}: TagProps){
    return(
        <p className="m-1">{text}</p>
    );
}