import Header from "@/src/components/Header";

import "./globals.css";
import AuthWrapper from "@/src/components/AuthWrapper";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>){
    return(
        <html lang="en">
            <body className="flex flex-col w-screen h-screen overflow-hidden">
                <AuthWrapper>
                    <Header></Header>
                    {children}
                </AuthWrapper>
            </body>
        </html>
    );
}