import React from "react";
import Providers from "./providers";
import Sidebar from "./Sidebar";
import "../../globals.css"
import "@fontsource/geist/400.css";      // Regular
import "@fontsource/geist/700.css";      // Bold
import "@fontsource/geist-mono/400.css"; // Regular           


export const metadata = {
  title: "School Management",
  description: "Created by Jasmine Sanders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
          <div className="flex">
            <Sidebar/>
            <main className="flex-1 p-6 bg-gray-50 text-black h-screen">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
