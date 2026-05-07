'use client';
import { useState, useEffect, useRef } from "react";
import type {Post} from "@/src/actions/post/getPosts"
import PostBox from "@/src/components/post/PostBox";
import { getPosts } from "@/src/actions/post/getPosts";

export default function PostBrowser(){
    const [postData, setPostData] = useState<Post[]>([]);
    const cursor = useRef("");
    const boxRef = useRef<HTMLDivElement | null>(null);
    const dontScroll = useRef(false);

    useEffect(() => {
        loadPosts();
    }, []);

    const postBoxes = postData.map((post, index) => {
        return(
            <PostBox key={post.id + index} post={post} viewOrEdit="view"></PostBox>
        );
    });

    async function loadPosts(){
        const newPosts = await getPosts(cursor.current);
        setPostData(postData => [...postData, ...newPosts]);

        if(newPosts.length > 0){
            cursor.current = newPosts[(newPosts.length -1)].id;
        }
    }

    //infinite scroll
    async function handleScroll() {
        if(dontScroll.current){return;}

        const postsDiv = boxRef.current;
        if (!postsDiv) return;

        const isBottom =
        postsDiv.scrollTop + postsDiv.clientHeight >= postsDiv.scrollHeight - 100;

        if (isBottom) {
            dontScroll.current = true;
            await loadPosts();
            dontScroll.current = false;
        }
    };
    
    return(
        <>
            <div ref={boxRef} onScroll={() => handleScroll()} className="flex flex-col items-center h-screen overflow-y-scroll w-full -mb-2">
                {postBoxes}
                <div className="w-full h-2 shrink-0"></div>
            </div>
        </>
    );
}