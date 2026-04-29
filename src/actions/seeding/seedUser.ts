'use server';
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function seedUser(formData: FormData){
    const session = await getServerSession(authOptions);
    const title = String(formData.get("title"));
}