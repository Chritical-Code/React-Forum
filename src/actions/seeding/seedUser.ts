'use server';
import {prisma} from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';

export async function seedUser(formData: FormData){
    const session = await getServerSession(authOptions);
    const username = String(formData.get("username"));

    const newUser = await prisma.user.create({
        data: {
            name: username,
            email: username + "@email.com"
        }
    });

    redirect("/seed");
}