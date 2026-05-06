import PostBrowser from "@/src/components/post/PostBrowser";

export default async function Home() {
    return(
        <>
            <h1 className="font-bold">Posts</h1>

            <PostBrowser></PostBrowser>
        </>
    );
}