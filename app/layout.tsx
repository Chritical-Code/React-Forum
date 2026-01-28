import Header from "@/src/components/Header";

import "./globals.css";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>){
    return(
        <html lang="en">
            <body className="flex flex-col w-screen h-screen overflow-hidden">
                <Header></Header>

                {children}
            </body>
        </html>
    );
}