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
import Image from "next/image";
import { useTransition } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { PasswordInput } from "@/components/password-input";

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();

  const params = useSearchParams();
  const redirect = params.get("redirect");
  const router = useRouter();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function handleSocialSignIn(provider: "google" | "github") {
    startTransition(async () => {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: redirect ?? "/",
      });

      if (error) {
        toast.error(error.message);
        console.error(error);
      }
    });
  }

  function onSubmitHandler(values: SignUpValues) {
    startTransition(async () => {
      const { data, error } = await authClient.signUp.email({
        ...values,
      });

      if (error) {
        toast.error(error.message);
        console.error(error);
      } else if (data.user) {
        router.replace(redirect || "/");
      }
    });
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
            <Image alt="logo" src="/logo.svg" width={30} height={30} />
            Create Account !
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Create account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="border-muted hover:bg-muted/30 flex w-full items-center justify-center gap-2"
            type="button"
            disabled={isPending}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Name</FormLabel>
                    <FormControl>
                      <Input
                        type="name"
                        placeholder="your name"
                        className="focus-visible:ring-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="password"
                        className="focus-visible:ring-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isPending} type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex w-full">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
      <LoadingScreen loading={isPending} text="Please Wait..." />
    </>
  );
}
