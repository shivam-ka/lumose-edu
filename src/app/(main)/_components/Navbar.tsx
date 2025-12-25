import { ThemeToggleButton } from "@/components/theme-toggle-button";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./user-dropdown";
import { getServerSession } from "@/lib/get-sesstion";
import { Button } from "@/components/ui/button";
import { appName } from "@/constant/app";

export default async function Navbar() {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <header className="bg-background/80 sticky top-0 z-50 flex items-center justify-between border-b border-b-neutral-600 px-2 py-4 backdrop-blur-md 2xl:px-20">
      <Link href="/" className="flex items-center gap-2">
        <Image
          className="h-8 w-8 sm:h-10 sm:w-10"
          src="/logo.svg"
          width={45}
          height={45}
          alt="logo"
          draggable={false}
        />
        <h1 className="hidden sm:block sm:text-xl lg:text-2xl">{appName}</h1>
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <Button size="sm" asChild>
            <Link href="/sign-up">Create Account</Link>
          </Button>
        )}

        <ThemeToggleButton
          className="size-7"
          variant="polygon"
          start="center"
        />
      </div>
    </header>
  );
}
