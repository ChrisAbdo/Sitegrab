"use client";

import React from "react";
import { Badge } from "./ui/badge";
import { CameraIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export default function InfoAndForm({ inputRef, loading }: any) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="space-y-2 sm:space-y-4"
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
        <Badge variant="secondary" className="w-fit font-light">
          v0.1.0
        </Badge>
      </motion.div>
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
        <h1 className="flex items-center leading-6 text-2xl sm:text-4xl font-light">
          <CameraIcon className="h-8 w-8 mr-2" />
          Sitegrab
        </h1>
      </motion.div>
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
        <h1 className="leading-6 text-sm sm:text-lg font-light mb-4">
          take screenshots of sites in seconds
        </h1>
      </motion.div>
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            name="url"
            type="text"
            placeholder="ex: https://chrisabdo.dev"
            className="bg-muted"
            autoComplete="off"
            spellCheck={false}
          />

          {loading ? (
            <Button disabled={loading} className="min-w-[100px]">
              <span className="inline-flex items-center gap-px">
                <span className="animate-blink mx-px h-1.5 w-1.5 rounded-full bg-background"></span>
                <span className="animate-blink animation-delay-200 mx-px h-1.5 w-1.5 rounded-full bg-background"></span>
                <span className="animate-blink animation-delay-[400ms] mx-px h-1.5 w-1.5 rounded-full bg-background"></span>
              </span>
            </Button>
          ) : (
            <Button type="submit" className="min-w-[100px]">
              Screenshot
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
