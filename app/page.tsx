import {prisma} from "@/prisma/prisma";
import PostBox from "@/src/components/post/PostBox";

export default async function Home() {
    const posts = await prisma.post.findMany({
        where :{
            NOT: {title: ""}
        }
    });

    const postBoxes = posts.map((post) => {
        return(
            <PostBox key={post.id} post={post} viewOrEdit="view"></PostBox>
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