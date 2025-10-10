import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { env } from "@/env";
import { emailOTP } from "better-auth/plugins";
import { sendEmail } from "./email";
import { toast } from "sonner";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        const { error } = await sendEmail({
          email,
          subject: "Email Verification",
          text: `Your Otp is ${otp}`,
        });
        if (error) {
          toast.error(error.message || "faild to send otp");
        }
      },
    }),
  ],
});
