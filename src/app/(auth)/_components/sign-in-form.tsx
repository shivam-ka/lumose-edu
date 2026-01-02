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
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/password-input";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();

  const params = useSearchParams();
  const redirect = params.get("redirect");
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "super-user@email.com",
      password: "SuperUser@123",
      rememberMe: true,
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

  function onSubmitHandler({ email, password, rememberMe }: SignInValues) {
    startTransition(async () => {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error) {
        toast.error(error.message);
      } else if (data.user) {
        router.replace(redirect ?? "/");
      }
    });
  }

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
            <Image alt="logo" src="/logo.svg" width={30} height={30} />
            Welcome Back !
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

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Remember me</FormLabel>
                  </FormItem>
                )}
              />

              <Button disabled={isPending} type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="flex w-full">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                href={redirect ? `/sign-up?redirect=${redirect}` : "/sign-up"}
                className="text-primary hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>

      <LoadingScreen loading={isPending} text="Please Wait..." />
    </>
  );
}
