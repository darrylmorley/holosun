"use client";

import { Share } from "lucide-react";

const ShareButton = ({ title, text, url, itemID }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
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
      data-umami-event={`share-button-item-${itemID}`}
    >
      <Share /> Share
    </span>
  );
};

export default ShareButton;
