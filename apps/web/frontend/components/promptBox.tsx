
"use client"
import { useAuth } from "@clerk/nextjs";
import { useInstantTransition, useScroll } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation'; 
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios"

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

const PromptBox = () => {

    const [isInputFocused , setIsInputFocused] = useState(false) ; 
    const [prompt , setPrompt] = useState("") 
    const [SignedIn , setSignedIn] = useState(false) ; 
    const [type, setType] = useState<"REACT" | "REACT_NATIVE" | "NEXT_JS">(
        "NEXT_JS"
      ); 

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const router = useRouter() 

    const {getToken} = useAuth() ; 

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
    <div
          className="max-w-2xl mx-auto mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div
            className={cn(
              "relative prompt-box glass-effect backdrop-blur-md bg-white/5 border border-white/10 rounded-lg transition-all duration-300 overflow-hidden",
              isInputFocused ? "border-white/30 shadow-lg" : "border-white/10"
            )}
          >
            {/* Standard glass shine animation */}

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="glass-shine"></div>
            </div>
          </div>
          {/* Hover-triggered glass animation */}
          <div
            className={cn(
              "relative prompt-box glass-effect backdrop-blur-md bg-white/5 border border-white/10 rounded-lg transition-all duration-300 overflow-hidden",
              isInputFocused ? "border-white/30 shadow-lg" : "border-white/10"
            )}
          >
            {/* Subtle box shine */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="box-shine"></div>
            </div>

            <textarea
              ref={textareaRef}
              placeholder="Ask Beyond-code to create a landing page..."
              className="w-full bg-transparent text-white/90 p-4 outline-none resize-none min-h-[100px]"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={handlePromptChange}
              value={prompt}
              rows={1}
            />

            <div className="flex justify-between items-center p-3 border-t border-white/10">
              <div className="flex flex-row gap-2 mb-4">
                <Button
                  variant={type === "REACT" ? "default" : "outline"}
                  onClick={() => setType("REACT")}
                >
                  React
                </Button>
                <Button
                  variant={type === "NEXT_JS" ? "default" : "outline"}
                  onClick={() => setType("NEXT_JS")}
                >
                  NextJS
                </Button>
                <Button
                  variant={type === "REACT_NATIVE" ? "default" : "outline"}
                  onClick={() => setType("REACT_NATIVE")}
                >
                  React Native
                </Button>
              </div>

              <div className="flex space-x-2">
                <div className="button-wrapper relative overflow-hidden">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs bg-transparent border-white/20 hover:bg-white/10 hover:text-white z-10 relative"
                  >
                    <AttachIcon className="h-4 w-4 mr-1" /> Attach
                  </Button>
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="button-shine"></div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex space-x-3">
                  <div className="button-wrapper relative overflow-hidden">
                    <Button
                      variant="default"
                      size="sm"
                      className="text-xs bg-white/10 hover:bg-white/20 text-white z-10 relative"
                      onClick={handleGenerate}
                    >
                      Generate
                    </Button>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="button-shine"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AlertDialog open={SignedIn} onOpenChange={setSignedIn}>
          <AlertDialogContent className="border-2 border-teal-400/10 bg-teal-950/90 text-white/70 rounded-xl">
            <AlertDialogHeader>
              <div className="flex items-center gap-2">
                <ChevronRight className="text-teal-400/60" />
                <AlertDialogTitle className="">
                  You are not signed in
                </AlertDialogTitle>
                <div></div>
              </div>
              <AlertDialogDescription className="text-white/80">
                Please sign in to access this feature. Your data is safe and
                will not be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer text-white hover:text-teal-400 focus-visible:outline-none focus-visible:ring-0">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="cursor-pointer text-white hover:text-teal-400">
                Sign in
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div
          className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.7s" }}
        ></div>
        </section>
  ) ; 
  

}

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
export default PromptBox;
