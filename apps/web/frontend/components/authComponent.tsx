// components/AuthControls.tsx
"use client";
import { SignInButton, SignUpButton, SignedIn, SignedOut, useClerk , UserButton} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export function AuthControls() {
  const { signOut } = useClerk();
  
  return (
    <div className="flex items-center gap-2 z-50">
      <UserButton showName/> 
      <SignedOut>
        <SignInButton mode="modal">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button variant="outline" size="sm">
            Sign Up
          </Button>
        </SignUpButton>
      </SignedOut>
      
      
    </div>
  );
}