import { seedUser } from "@/src/actions/seeding/seedUser";
import { seedComment } from "@/src/actions/seeding/seedComment";
import { seedPost } from "@/src/actions/seeding/seedPost";
import {prisma} from "@/prisma/prisma";
import Form from "next/form";

export default async function SeedPage(){
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
    
    return(
        <>
            <h1 className="font-bold text-center">Seed page</h1>

            <Form action={seedUser} className="flex flex-col items-center m-2 border w-90 md:w-120">
                <h2 className="font-bold text-center">Add User</h2>
                <div className="flex items-center">
                    <label>Username:</label>
                    <input type="text" name="username" className="border m-2" required></input>
                </div>
                <button type="submit" className="btn">Create</button>
            </Form>
            
            <Form action={seedPost} className="flex flex-col items-center m-2 border w-90 md:w-120">
                <h2 className="font-bold text-center">Add Post</h2>
                <div className="flex items-center">
                    <label>User:</label>
                    <select name="userId" className="m-2 border p-1" required>
                        {users}
                    </select>
                </div>
                <div className="flex items-center">
                    <label>Title:</label>
                    <input name="title" type="text" className="border m-2" required></input>
                </div>
                <div className="flex items-center">
                    <label>Text:</label>
                    <textarea name="text" className="border m-2"></textarea>
                </div>
                <div className="flex items-center justify-center w-90 md:w-120">
                    <label>Image: </label>
                    <input type="file" id="file-upload" name="file" accept="image/*" className="text-center border w-60 overflow-hidden m-2"></input>
                </div>
                <button type="submit" className="btn">Create</button>
            </Form>

            <Form action={seedComment} className="flex flex-col items-center m-2 border w-90 md:w-120">
                <h2 className="font-bold text-center">Add Comment</h2>
                <div className="flex items-center">
                    <label>User:</label>
                    <select name="userId" className="m-2 border p-1" required>
                        {users}
                    </select>
                </div>
                <div className="flex items-center">
                    <label>Post:</label>
                    <select name="postId" className="m-2 border p-1" required>
                        {posts}
                    </select>
                </div>
                <div className="flex items-center">
                    <label>Text:</label>
                    <textarea name="text" className="border m-2" required></textarea>
                </div>
                <button type="submit" className="btn">Create</button>
            </Form>
        </>
    );
}