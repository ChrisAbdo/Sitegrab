import React from "react";
import SocialLinks from "./social-links";
import Link from "next/link";
import { CameraIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./mode-toggle";

export default function MainNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-4 lg:px-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          {/* <Link href="/" className="flex items-center">
            <CameraIcon className="h-6 w-6 mr-1" />
            <h1 className="text-xl font-normal">Sitegrab</h1>
          </Link> */}
          <SocialLinks />
        </div>

        <div className="flex justify-end gap-1">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
