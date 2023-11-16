// "use client";
// import React from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { useTheme } from "next-themes";
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
// import { Button } from "../ui/button";

// export default function ModeToggle() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         {/* <Button variant="ghost" size="icon" asChild>
//           {theme === "dark" ? (
//             <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
//           ) : (
//             <SunIcon className="h-[1.2rem] w-[1.2rem]" />
//           )}
//         </Button> */}
//         <Button variant="ghost" size="icon">
//           {theme === "dark" ? (
//             <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
//           ) : (
//             <SunIcon className="h-[1.2rem] w-[1.2rem]" />
//           )}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent>Place content for the popover here.</PopoverContent>
//     </Popover>
//   );
// }

"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
