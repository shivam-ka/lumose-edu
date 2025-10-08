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
import { signInSchema, SignInValues } from "@/lib/validation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Please Wait...");

  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });

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

  async function onSubmitHandler({ email }: SignInValues) {
    setLoadingText("Sending...");
    setIsLoading(true);

    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    if (error) {
      toast.error(error.message || "Faild to Send Email");
      console.error(error);
    } else {
      router.push(`/verify-email?email=${email}`);
      form.reset();
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
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="border-muted hover:bg-muted/30 flex w-full items-center justify-center gap-2"
            type="button"
            disabled={isLoading}
            onClick={() => handleSocialSignIn("google")}
          >
            <GoogleIcon className="size-5" />
            Sign in with Google
          </Button>

          <div className="relative flex items-center py-2">
            <div className="border-border flex-grow border-t" />
            <span className="text-muted-foreground mx-3 text-xs">
              Or Continue with Email
            </span>
            <div className="border-border flex-grow border-t" />
          </div>

          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(onSubmitHandler)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="focus-visible:ring-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading} type="submit" className="w-full">
                Continue with Email
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <p className="text-muted-foreground w-full text-sm">
            Don&rsquo;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>

      <LoadingScreen loading={isLoading} text={loadingText} />
    </>
  );
}
