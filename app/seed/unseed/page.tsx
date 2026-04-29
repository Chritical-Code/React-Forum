import {prisma} from "@/prisma/prisma";
import { unseedComment } from "@/src/actions/seeding/unseedComment";
import { unseedPost } from "@/src/actions/seeding/unseedPost";
import { unseedUser } from "@/src/actions/seeding/unseedUser";
import Form from "next/form";

export default async function Unseed(){
    const userData = await prisma.user.findMany();
    const users = userData.map((user) => {
        return(
            <option key={user.id} value={user.id}>{user.name}</option>
        );
    });

    const postData = await prisma.post.findMany();
    const posts = postData.map((post) => {
        return(
            <option key={post.id} value={post.id}>{post.title}</option>
        );
    });

    const commentData = await prisma.comment.findMany();
    const comments = commentData.map((comment) => {
        return(
            <option key={comment.id} value={comment.id}>{comment.text}</option>
        );
    });

    return(
        <>
            <h1 className="font-bold text-center">Unseed page</h1>

            <Form action={unseedUser} className="flex flex-col items-center m-2 border w-90 md:w-120">
                <h2 className="font-bold text-center">Remove User</h2>
                <div className="flex items-center">
                    <label>Username:</label>
                    <select name="userId" className="m-2 border p-1" required>
                        {users}
                    </select>
                </div>
                <button type="submit" className="btn bg-red-600 hover:bg-red-500">Delete</button>
            </Form>

            <Form action={unseedPost} className="flex flex-col items-center m-2 border w-90 md:w-120">
                <h2 className="font-bold text-center">Remove Post</h2>
                <div className="flex items-center">
                    <label>Username:</label>
                    <select name="postId" className="m-2 border p-1" required>
                        {posts}
                    </select>
                </div>
                <button type="submit" className="btn bg-red-600 hover:bg-red-500">Delete</button>
            </Form>

            <Form action={unseedComment} className="flex flex-col items-center m-2 border w-90 md:w-120">
                <h2 className="font-bold text-center">Remove Comment</h2>
                <div className="flex items-center">
                    <label>Username:</label>
                    <select name="commentId" className="m-2 border p-1 max-w-60 md:max-w-90 overflow-hidden" required>
                        {comments}
                    </select>
                </div>
                <button type="submit" className="btn bg-red-600 hover:bg-red-500">Delete</button>
            </Form>
        </>
    );
}