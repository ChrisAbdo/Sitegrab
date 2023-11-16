"use client";
import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export default function Screenshot({
  img,
  loading,
}: {
  img: any;
  loading: any;
}) {
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
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          className={`w-full rounded-md object-cover object-top ${
            loading ? "animate-pulse" : ""
          }`}
          alt="screenshot"
        />
      </motion.div>
    </motion.div>
  );
}
