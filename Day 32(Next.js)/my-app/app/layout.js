import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/Components/Navbar.js'
import Footer from '@/Components/Footer.js'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My App",
  description: "Developed by Muhammad Furqan",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        <div className="font-bold text-2xl text-center mt-5 h-[80vh]">
        {children}
        </div>
        <Footer/>
        </body>
    </html>
  );
}
