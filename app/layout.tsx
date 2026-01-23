import Header from "@/src/components/header";

import "./globals.css";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>){
    return(
        <html lang="en">
            <body>
                <Header></Header>

                <div className="w-screen min-h-screen bg-pink-50">
                    {children}
                </div>
            </body>
        </html>
    );
}