import { Metadata } from "next";
import SignInForm from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SingInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <SignInForm />
    </main>
  );
}
