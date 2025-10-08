import z from "zod";

export const signInSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
});

export type SignInValues = z.infer<typeof signInSchema>;
