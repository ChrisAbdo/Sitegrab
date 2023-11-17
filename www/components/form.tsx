"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import copy from "copy-to-clipboard";
import InfoAndForm from "./info-and-form";
import Screenshot from "./screenshot";
import { Button } from "./ui/button";
import { DownloadIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

const placeholder = {
  url: "chrisabdo.dev",
};

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const Form = () => {
  const [img, setImg] = useState<any>();
  const [endpoint, setEndpoint] = useState(`${apiUrl}?url=${placeholder.url}`);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const start = Date.now();

    const form = new FormData(e.target);
    const upload = form.get("upload");

    try {
      const res = await fetch(endpoint);
      const file = await res[upload ? "text" : "blob"]();
      const obj = upload ? file : URL.createObjectURL(file as Blob);

      const end = Date.now() - start;

      setImg(obj);

      toast.success(`Done in ${end / 1000} s`);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    inputRef?.current?.focus?.();
  }, [inputRef]);

  const [copying, setCopying] = useState(0);

  const onCopy = useCallback(() => {
    copy(endpoint);
    setCopying((c) => c + 1);
    toast.success("Copied to clipboard!");
    setTimeout(() => {
      setCopying((c) => c - 1);
    }, 2000);
  }, [endpoint]);

  return (
    <form
      onSubmit={submit}
      onChange={({ target }: any) => {
        setEndpoint((prev) => {
          const curr = new URL(prev);
          const params = new URLSearchParams(curr.search);

          params.set(target.name, target.checked || target.value);

          if (target.type == "checkbox" && !target.checked)
            params.delete(target.name);

          curr.search = params.toString();

          return curr.href;
        });
      }}
      className="flex w-full flex-col space-y-2 sm:space-y-4"
    >
      <InfoAndForm inputRef={inputRef} loading={loading} />

      <div className="group relative max-h-[24rem] w-full grow overflow-y-scroll rounded-md bg-gray-100 shadow-sm">
        {img ? <Screenshot img={img} loading={loading} /> : null}

        <Button
          disabled={!img}
          className={`absolute right-2 top-2 ml-auto`}
          type="button"
          variant="secondary"
          size="icon"
        >
          {/* <DownloadIcon className="h-[1.2rem] w-[1.2rem]" href={img} /> */}
          <a download className="no-underline" href={img}>
            <DownloadIcon className="h-[1.2rem] w-[1.2rem]" href={img} />
          </a>
        </Button>
      </div>

      {img ? (
        <code
          className="px-2 py-3 rounded-md font-mono text-sm relative cursor-copy border flex items-center bg-background"
          onClick={onCopy}
        >
          <pre className="text-xs font-mono whitespace-pre-wrap">
            <code className="language-html">{endpoint}</code>
          </pre>

          <Button
            aria-label="Copy code"
            size="icon"
            variant="secondary"
            type="button"
            className="absolute top-5 right-0.5 transform -translate-y-1/2 cursor-pointer flex justify-center items-center"
          >
            <MotionConfig transition={{ duration: 0.15 }}>
              <AnimatePresence initial={false} mode="wait">
                {copying ? (
                  <motion.div
                    animate="visible"
                    exit="hidden"
                    initial="hidden"
                    key="check"
                    variants={variants}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      shapeRendering="geometricPrecision"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    animate="visible"
                    exit="hidden"
                    initial="hidden"
                    key="copy"
                    variants={variants}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      shapeRendering="geometricPrecision"
                    >
                      <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionConfig>
          </Button>
        </code>
      ) : null}
    </form>
  );
};
