"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatView from "../../../components/workspaceComps/chatview";
import CodeView from "../../../components/workspaceComps/codeview";

export default function WorkspacePage() {
  const { workspaceId } = useParams();
  const [prompt, setPrompt] = useState<string>("");

  useEffect(() => {
    // Retrieve the stored prompt from localStorage if available
    const storedPrompt = localStorage.getItem(`workspace_${workspaceId}`);
    if (storedPrompt) {
      setPrompt(storedPrompt);
    }
    // You could also fetch workspace data from an API here
    // fetchWorkspaceData(workspaceId);
  }, [workspaceId]);

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <ChatView />
        <div className="cols-span-2">
          <CodeView />
        </div>
      </div>
    </div>
  );
}
