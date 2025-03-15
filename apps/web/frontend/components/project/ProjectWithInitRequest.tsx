"use client"
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Project } from "@/app/workspace/[workspaceid]/workspace"; // Update this import path to match your actual Project component location





interface ProjectProps {
    projectId: string;
    sessionUrl: string;
    previewUrl: string;
    workerUrl: string;
  } 
export default function ProjectWithInitRequest({
  projectId,
  sessionUrl,
  previewUrl,
  workerUrl
}: ProjectProps ) {
  const searchParams = useSearchParams();
  const initPrompt = searchParams.get('initPrompt');
  const { getToken } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!initPrompt) return; // Only proceed if there is an initPrompt
    
    (async () => {
      const token = await getToken();
      await axios.post(
        `${workerUrl}/prompt`,
        {
          projectId: projectId,
          prompt: initPrompt,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      router.push(`/project/${projectId}`);
    })();
  }, [projectId, initPrompt, workerUrl, getToken, router]);

  return (
    <Project
      projectId={projectId}
      sessionUrl={sessionUrl}
      previewUrl={previewUrl}
      workerUrl={workerUrl}
    />
  );
}