"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";

interface LoadingScreenProps {
  loading: boolean;
  text?: string;
}

export default function LoadingScreen({
  loading,
  text = "Loading...",
}: LoadingScreenProps) {
  if (!loading) return null;

  return (
    <div
      className="bg-background/10 fixed inset-0 z-50 flex items-center justify-center"
    >
      <Card className="flex items-center gap-5 rounded-md py-4 pr-12 pl-7 shadow-lg">
        <CardContent className="flex items-center gap-5 p-0">
          <motion.svg
            viewBox="25 25 50 50"
            className="text-primary h-7 w-7"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{
                strokeDasharray: "1, 200",
                strokeDashoffset: 0,
              }}
              animate={{
                strokeDasharray: ["1, 200", "90, 200", "90, 200"],
                strokeDashoffset: [0, -35, -125],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.svg>
          <span className="text-xl capitalize">{text}</span>
        </CardContent>
      </Card>
    </div>
  );
}
