import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCapIcon, LockKeyholeOpenIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="from-background to-muted relative flex min-h-[90vh] flex-col items-center justify-center bg-gradient-to-b px-4 text-center md:px-12 lg:px-24">
        <div className="max-w-3xl space-y-6">
          <Badge
            variant="secondary"
            className="border-border gap-2 border-1 px-4 py-1 text-sm"
          >
            <LockKeyholeOpenIcon />
            Unlock Knowledge
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Unlock Knowledge,{" "}
            <span className="text-primary">
              Elevate Your Learning Experience
            </span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl">
            Advance your skills, explore emerging technologies, and stay ahead
            of the curve with our expertly curated learning resources and tools.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/sign-in">Get Started</Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/courses">
                <GraduationCapIcon />
                Browse Courses
              </Link>
            </Button>
          </div>
        </div>
        <div className="from-background absolute right-0 bottom-0 h-10 w-full bg-gradient-to-t to-transparent" />
      </section>
    </>
  );
}
