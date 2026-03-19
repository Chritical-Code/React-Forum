import Header from "@/src/components/Header";

import "./globals.css";
import AuthWrapper from "@/src/components/AuthWrapper";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>){
    return(
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </head>
            
            <body className="flex flex-col w-screen h-screen overflow-hidden items-center">
                <AuthWrapper>
                    <Header></Header>
                    {children}
                </AuthWrapper>
            </body>
        </html>
    );
}