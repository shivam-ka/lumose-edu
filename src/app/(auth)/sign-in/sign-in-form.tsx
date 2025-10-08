"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
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
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSocialSignIn(provider: "google" | "github") {
    setIsLoading(true);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Image alt="logo" src="/logo.svg" width={30} height={30} />
            Welcom Back !
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            disabled={isLoading}
            onClick={() => handleSocialSignIn("google")}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-500">
            Don&rsquo;t have an account?{" "}
            <Link href="/signup" className="text-primary/80 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
      <LoadingScreen loading={isLoading} text="please wait..." />
    </>
  );
}
