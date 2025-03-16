"use client"
import Image from "next/image";
import {Button} from "../components/ui/button" 
import Navbar from "../components/Navbar"
import Hero from "../components/Hero" 
import Footer from "@/components/Footer";
export default function Home() {
  
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        {/* Add a visual divider */}
        <div className="container mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
