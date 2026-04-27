import {prisma} from "@/prisma/prisma";
import PostBox from "@/src/components/PostBox";
import { Post } from "@/src/generated/prisma/client";

type SearchPageProps = {
    searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

export default async function SearchPage({searchParams}: SearchPageProps){
    const resolved = await searchParams;
    const query = String(resolved.q);
    
    const posts = await prisma.post.findMany({
        where:{
            OR:[{text: {contains: query, mode: "insensitive"}}, {title: {contains: query, mode: "insensitive"}}]
        }
    });
    
    const postBoxes = posts.map((post: Post, index) => {
        return(
            <PostBox key={post.id} post={post} viewOrEdit="view"></PostBox>
        );
    });

    return(
        <div className="flex flex-col items-center">
            <h2 className="font-bold text-center">Search Results:</h2>
            
            {postBoxes}
        </div>
    );
}