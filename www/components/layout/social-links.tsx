import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const socialLinks = [
  {
    icon: GitHubLogoIcon,
    href: "https://www.github.com/chrisabdo",
  },
  {
    icon: TwitterLogoIcon,
    href: "https://www.x.com/abdo_eth",
  },
  {
    icon: LinkedInLogoIcon,
    href: "https://www.linkedin.com/in/christopher-abdo/",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-1">
      {socialLinks.map(({ icon: Icon, href }) => (
        <Button key={href} variant="ghost" size="icon" asChild>
          <Link href={href} rel="noopener noreferrer" target="_blank">
            <Icon className="h-[1.2rem] w-[1.2rem]" />
          </Link>
        </Button>
      ))}
    </div>
  );
}
