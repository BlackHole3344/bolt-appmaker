"use client";
import { Button } from "@/components/ui/button";
import { TwitterIcon, LinkedinIcon, DiscordIcon } from "./Icons";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Signup } from "./auth/signUp/signupDialog";

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
            <Code className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">Beyond-Code</span>
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
            <div>
            <Signup/> 
            </div>
            
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

const Code = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 4L4.5 12L9.5 20"
        stroke="url(#code-left)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 4L19.5 12L14.5 20"
        stroke="url(#code-right)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="code-left" x1="4.5" y1="4" x2="9.5" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="0.5" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id="code-right" x1="19.5" y1="4" x2="14.5" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F472B6" />
          <stop offset="0.5" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
    </svg>
  );
};


export default Navbar;
