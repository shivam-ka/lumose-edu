"use client";

import LoadingScreen from "@/components/loading-screen";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function VerifyRequestForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Please Wait...");
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const params = useSearchParams();
  const email = params.get("email") as string;
  const redirect = params.get("redirect");

  async function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();

    if (!email || email.length < 6) {
      toast.error("Invalid Request");
    }

    setLoadingText("verifying Otp");
    setIsLoading(true);

    const { error } = await authClient.signIn.emailOtp({
      email,
      otp,
    });

    if (error) {
      console.error(error);
      toast.error(error.message || "something went wrong");
    } else {
      router.push(redirect ?? "/");
    }

    setIsLoading(false);
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
            <Image alt="logo" src="/logo.svg" width={30} height={30} />
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Enter the OTP sent to your email to sign in
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={onSubmitHandler} className="space-y-6">
            <InputOTP
              value={otp}
              onChange={(value) => setOtp(value)}
              maxLength={6}
            >
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <InputOTPGroup key={item} className="mx-auto">
                  <InputOTPSlot
                    className="h-10 w-10 text-xl sm:h-12 sm:w-12"
                    index={item}
                  />
                </InputOTPGroup>
              ))}
            </InputOTP>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || otp.length < 6}
            >
              Submit
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <p className="text-muted-foreground w-full text-sm">
            Didn&rsquo;t receive the code?{" "}
            <Link
              href="sign-in"
              className="text-primary font-medium hover:underline"
            >
              Resend OTP
            </Link>
          </p>
        </CardFooter>
      </Card>
      <LoadingScreen loading={isLoading} text={loadingText} />
    </>
  );
}
