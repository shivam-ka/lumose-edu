import { Metadata } from "next";
import { SignUpForm } from "./sign-up-form";


export const metadata: Metadata = {
  title: "Create Account",
};

export default function SingInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
        <SignUpForm />
    </main>
  );
}
