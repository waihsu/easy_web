"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function CopyLink({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  const copyLinkToClipboard = async () => {
    try {
      // Copy link to clipboard
      await navigator.clipboard.writeText(link);
      // Update state to indicate link has been copied
      setCopied(true);
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div>
      <p>{link}</p>
      <Button onClick={copyLinkToClipboard} variant={"ghost"} size={"icon"}>
        <Copy />
      </Button>
      {copied && <span>Link copied to clipboard!</span>}
    </div>
  );
}
