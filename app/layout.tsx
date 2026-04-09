import Header from "@/src/components/Header";
import "./globals.css";
import AuthWrapper from "@/src/components/AuthWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forum",
    keywords: "Forum, React, NextJS",
    description: "A forum built in React/NextJS",
    authors: [{name: "Chritical-Code"}],
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>){
    return(
        <html lang="en">
            <body className="flex flex-col w-screen h-screen overflow-hidden items-center">
                <AuthWrapper>
                    <Header></Header>
                    {children}
                </AuthWrapper>
            </body>
        </html>
    );
}