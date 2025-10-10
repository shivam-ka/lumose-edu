import { Metadata } from "next";
import VerifyRequestForm from "./verify-request-form";

export const metadata: Metadata = {
  title: "Verify Request",
};

export default function Page() {
  return (
    <main className="h-screen w-screen flex items-center justify-center px-4" >
      <VerifyRequestForm />
    </main>
  );
}
