"use client";
import { TwitterIcon, LinkedinIcon, DiscordIcon } from "./Icons";

const Footer = () => {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center">
            <HeartIcon className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">lovable</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <DiscordIcon className="h-5 w-5" />
            </a>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/solutions">Solutions</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/changelog">Changelog</FooterLink>
              <FooterLink href="/hire-partner">Hire a Partner</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="/builder-hall-of-fame">Builder Hall of Fame</FooterLink>
              <FooterLink href="/learn">Learn</FooterLink>
              <FooterLink href="/integrations">Integrations</FooterLink>
              <FooterLink href="/affiliates">Affiliates</FooterLink>
              <FooterLink href="/support">Support</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
              <FooterLink href="/report-abuse">Report Abuse</FooterLink>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <a 
        href={href} 
        className="text-white/50 hover:text-white text-sm transition-colors duration-200"
      >
        {children}
      </a>
    </li>
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

export default Footer;
