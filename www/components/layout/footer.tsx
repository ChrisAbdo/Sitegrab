import Link from "next/link";

export const Footer = () => {
  return (
    <div className="text-muted-foreground absolute bottom-0 left-0 flex h-10 w-full items-center justify-between p-4 sm:px-4 sm:py-8">
      <div>
        built by{" "}
        <Link
          href="https://x.com/abdo_eth"
          target="_blank"
          className="hover:underline text-foreground"
        >
          chris abdo
        </Link>
      </div>
    </div>
  );
};
