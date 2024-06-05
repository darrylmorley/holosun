"use client";

import { Share } from "lucide-react";

const ShareButton = ({ title, text, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      console.error("Web Share API not supported");
    }
  };

  return (
    <span
      onClick={handleShare}
      className="flex items-center gap-2"
    >
      <Share /> Share
    </span>
  );
};

export default ShareButton;
