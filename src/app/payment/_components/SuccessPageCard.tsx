"use client";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export function SuccessPageCard() {
  const triggierConfetti = () => {
    const end = Date.now() + 1.5 * 1000;
    const colors = ["#6C63FF", "#FF6584", "#FFD369", "#4CC9F0"];

    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
  };

  useEffect(() => {
    triggierConfetti();
  }, []);

  return (
    <Card className="w-full max-w-sm rounded-2xl p-4 shadow-lg">
      <CardContent className="space-y-3 px-3 text-center">
        <div className="mx-auto mt-5 w-fit rounded-full bg-green-200 p-3 dark:bg-green-950/80">
          <CheckIcon className="size-14 text-green-500" />
        </div>
        <CardTitle className="text-2xl">Payment Successfull</CardTitle>
        <CardDescription>
          Thank you! Your payment has been completed successfully.
        </CardDescription>

        <Button
          className="w-full"
          variant="outline"
          onClick={() => window.location.replace("/dashboard")}
        >
          Go To Dashboard
          <ArrowRightIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
