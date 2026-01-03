import { Metadata } from "next";

export const appName = "Lumose Edu.";

export const metaData: Metadata = {
  title: {
    default: `${appName} - Your online learning platform`,
    template: `%s - ${appName}`,
  },
  description: `${appName} - Your online learning platform for growth and skill development.`,
  robots: {
    index: true,
    follow: true,
    noimageindex: false,
  },
  twitter: {
    card: "summary_large_image",
    title: `${appName} - Your online learning platform`,
    description: `${appName} - Your online learning platform for growth and skill development.`,
  },
};
