"use client";
import { TwitterIcon, LinkedinIcon, DiscordIcon } from "./Icons";

const Footer = () => {
  return (
    <footer className="bg-black py-16 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex items-center">
            <Code className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">Beyond-code</span>
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

export default Footer;
