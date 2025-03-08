"use client";
import { Button } from "@/components/ui/button";
import { TwitterIcon, LinkedinIcon, DiscordIcon } from "./Icons";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
    )}>
      <div className="container flex justify-between items-center py-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center mr-8">
            <HeartIcon className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">lovable</span>
          </a>
          
          <div className="hidden md:flex space-x-6">
            <NavLink href="/support">Support</NavLink>
            <NavLink href="/careers">Careers</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/launched">Launched</NavLink>
            <NavLink href="/changelog">Changelog</NavLink>
            <NavLink href="/learn">Learn</NavLink>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-3">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <DiscordIcon className="h-5 w-5" />
            </a>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="ghost" className="text-sm">Sign in</Button>
            <Button variant="outline" className="text-sm bg-transparent ">Sign up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
    >
      {children}
    </a>
  );
};

const HeartIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#heart-gradient)"
      />
      <defs>
        <linearGradient id="heart-gradient" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Navbar;
