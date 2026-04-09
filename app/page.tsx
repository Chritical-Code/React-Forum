import {prisma} from "@/prisma/prisma";
import PostBox from "@/src/components/PostBox";
import { Post } from "@/src/generated/prisma/client";

export default async function Home() {
    const posts = await prisma.post.findMany({
        where :{
            NOT: {title: ""}
        }
    });

    const postBoxes = posts.map((post: Post, index) => {
        return(
            <PostBox key={index} post={post} viewOrEdit="view"></PostBox>
        );
    });

    return(
        <>
            {postBoxes}
        </>
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