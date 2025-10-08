import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

interface sendEmailInterface {
  email: string;
  subject: string;
  text: string;
}

export async function sendEmail({ email, subject, text }: sendEmailInterface) {
  try {
    const result = await resend.emails.send({
      from: "Lumose <onboarding@resend.dev>",
      to: [email],
      subject: `Lumose | ${subject}`,
      text: `${text}`,
    });
    return result;
  } catch (error) {
    console.error("Resend error:", error);
    throw error;
  }
}
