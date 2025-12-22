import z from "zod";

const requiredString = z
  .string()
  .trim()
  .min(3, "Must be at least 3 characters");
const optionalString = z.string();

export const passwordSchema = z
  .string()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

export const signInSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
  password: requiredString.min(8),
  rememberMe: z.boolean(),
});

export const signUpSchema = z.object({
  name: requiredString,
  email: z.email({ message: "Please enter a valid email address" }),
  password: passwordSchema,
});

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Business",
  "Finance",
  "Marketing",
  "It & Software",
  "Design",
  "Health & Fitness",
  "Personal Development",
  "Photography",
  "Music",
  "Language Learning",
  "Education & Teaching",
] as const;

export const courseSchema = z.object({
  title: requiredString.max(100, "Title cannot exceed 100 characters"),
  description: requiredString.min(
    10,
    "Description must be at least 10 characters",
  ),
  fileKey: requiredString,
  price: z.number().min(0, "Price cannot be negative"),
  duration: z.number().min(1, "Duration cannot be negative").max(500),
  level: z.enum(courseLevels),
  category: z.enum(courseCategories),
  smallDescription: optionalString.max(
    200,
    "Short description cannot exceed 200 characters",
  ),
  slug: requiredString.regex(
    /^[a-z0-9-]+$/,
    "Slug can only contain lowercase letters, numbers, and hyphens",
  ),
  status: z.enum(courseStatus),
});

export const chapterSchema = z.object({
  name: requiredString,
  courseId: z.string().uuid({ message: "invalid course id" }),
});

export const lessonSchema = z.object({
  name: requiredString,
  courseId: z.string().uuid({ message: "invalid course id" }),
  chapterId: z.string().uuid({ message: "invalid chapter id" }),
  description: optionalString.optional(),
  thumbnailKey: optionalString.optional(),
  videoKey: optionalString.optional(),
});

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
export type LessonSchemaType = z.infer<typeof lessonSchema>;
