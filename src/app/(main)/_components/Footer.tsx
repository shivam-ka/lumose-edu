import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  SendHorizontalIcon,
} from "lucide-react";
import { appName } from "@/constant/app";

const socialLinks = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Twitter", icon: Twitter, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "GDPR Compliance", href: "/gdpr" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{appName}</h3>
            <p className="text-muted-foreground text-sm">
              Leading solutions for modern businesses. We provide innovative
              tools and services to help you grow.
            </p>

            <div className="flex gap-4">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <Button key={label} variant="ghost" size="icon" asChild>
                  <Link href={href} aria-label={label}>
                    <Icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <FooterLinks title="Quick Links" links={quickLinks} />
          <FooterLinks title="Legal" links={legalLinks} />

          <div className="space-y-4">
            <h4 className="font-semibold">Stay Updated</h4>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for the latest updates.
            </p>

            <form className="space-y-2">
              <div className="flex gap-2">
                <Input type="email" placeholder="Your email" />
                <Button type="submit" size="icon">
                  <SendHorizontalIcon className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-muted-foreground text-xs">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {appName} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
