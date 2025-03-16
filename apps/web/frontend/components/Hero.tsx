"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { motion } from "motion/react";
import axios from "axios";
import { CREATE_PROJECT } from "@/config/project";
import { auth } from "@clerk/nextjs/server";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import dotenv from "dotenv" 
import PromptBox from "./promptBox"
dotenv.config() 

const Hero = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [type, setType] = useState<"REACT" | "REACT_NATIVE" | "NEXT_JS">(
    "NEXT_JS"
  );
  const [SignedIn, setSignedIn] = useState(false);
  const { getToken } = useAuth();

  // auto-resize textarea
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
    window.addEventListener("resize", resizeTextarea);
    return () => window.removeEventListener("resize", resizeTextarea);
  }, []);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    resizeTextarea();
  };

  const handleGenerate = async () => {
    if (prompt.trim()) {
      const token = await getToken();

      if (!token) {
        setSignedIn(true);
        return;
      }

      console.log(token);
      
      const response = await axios.post(
        `http://localhost:4000/project` ,
        {
          title: prompt.trim(), 
          description: "good",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );



      const projectId = response.data.projectId;
      // Store the prompt in localStorage if needed
      localStorage.setItem(`workspace_${projectId}`, prompt);

      // Navigate to the dynamic workspace route
      router.push(`/workspace/${projectId}`);
    }
  };

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent z-[-2]"></div>

      <div className="container mx-auto px-4 pt-16 text-center">
        <div className="relative overflow-hidden inline-block">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up bg-gradient-to-t from-white/20 to-white bg-clip-text text-transparent z-10 relative"
            style={{ animationDelay: "0.1s" }}
          >
            Idea to app in seconds.
          </h1>
        </div>

        <p
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 animate-fade-in-up font-medium"
          style={{ animationDelay: "0.3s" }}
        >
          Beyond-code is your superhuman full stack engineer. Start for free
          today.
        </p>
       <PromptBox/> 

        <div>
          <ProjectTypeButton label="Personal website" />
          <ProjectTypeButton label="Slidev presentation" />
          <ProjectTypeButton label="3D product viewer" />
          <ProjectTypeButton label="Recharts dashboard" />
        </div>
      </div>
    </section>
  );
};

const ProjectTypeButton = ({ label }: { label: string }) => (
  <button className="px-3 py-2 text-sm rounded-full bg-black/30 border border-white/10 text-white/80 hover:bg-black/50 hover:text-white transition-all duration-300 flex items-center glass-effect relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="glass-shine"></div>
    </div>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="hover-glass-shine"></div>
    </div>
    {label} <ArrowUpIcon className="h-3 w-3 ml-1 inline" />
  </button>
);

const AttachIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
);

const ImportIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v12" />
    <path d="m8 11 4 4 4-4" />
    <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ArrowUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

export default Hero;
