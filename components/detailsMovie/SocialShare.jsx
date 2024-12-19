"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SocialShare() {
  const pathname = usePathname();
  const currentURL = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;
  const shareText = "Check out this awesome movie!";

  // Social Media Share URLs
  const socialPlatforms = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentURL
      )}`,
      icon: "http://facebook.com/favicon.ico",
    },
    {
      name: "X",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentURL
      )}&text=${encodeURIComponent(shareText)}`,
      icon: "http://x.com/favicon.ico",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentURL
      )}`,
      icon: "http://linkedin.com/favicon.ico",
    },
    // {
    //   name: "WhatsApp",
    //   url: `https://wa.me/?text=${encodeURIComponent(
    //     `${shareText} ${currentURL}`
    //   )}`,
    //   icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    // },
  ];

  const openShareLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mb-6">
      <h3 className="text-gray-400 mb-2">Share on social media</h3>
      <div className="flex flex-wrap gap-4">
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => openShareLink(platform.url)}
            className="text-center cursor-pointer"
            aria-label={`Share on ${platform.name}`}
          >
            <Image
              width={32}
              height={32}
              src={platform.icon}
              alt={platform.name}
              className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
            />
            <p className="text-sm">{platform.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
