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
    
    return(
        <>
            <h1 className="font-bold text-center">Seed page</h1>

            <Form action={seedUser} className="flex flex-col items-center m-2 border w-90 md:w-120">
                <h2 className="font-bold text-center">Add User</h2>
                <div>
                    <label>Username:</label>
                    <input type="text" className="border m-2" required></input>
                </div>
                <button type="submit" className="btn">Create</button>
            </Form>
            
            <Form action={seedPost} className="flex flex-col items-center m-2 border w-90 md:w-120">
                <h2 className="font-bold text-center">Add Post</h2>
                <div>
                    <label>User:</label>
                    <select name="userId" className="m-2 border p-1" required>
                        {users}
                    </select>
                </div>
                <div>
                    <label>Title:</label>
                    <input name="title" type="text" className="border m-2" required></input>
                </div>
                <div>
                    <label>Text:</label>
                    <textarea name="text" className="border m-2"></textarea>
                </div>
                <div>
                    <input type="file" id="file-upload" name="image" accept="image/*" className=""></input>
                </div>
                <button type="submit" className="btn">Create</button>
            </Form>

            <Form action={seedComment} className="flex flex-col items-center m-2 border w-90 md:w-120">
                <h2 className="font-bold text-center">Add Comment</h2>
                <div>
                    <label>User:</label>
                    <select className="m-2 border p-1" required>
                        <option>test</option>
                    </select>
                </div>
                <div>
                    <label>Post:</label>
                    <select className="m-2 border p-1" required>
                        <option>test</option>
                    </select>
                </div>
                <div>
                    <label>Text:</label>
                    <textarea className="border m-2" required></textarea>
                </div>
                <button type="submit" className="btn">Create</button>
            </Form>
        </>
    );
}