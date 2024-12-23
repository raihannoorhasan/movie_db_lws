import { z } from "zod";

// Define a Zod schema for validation
export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First Name must be at least 2 characters long."),
    lastName: z
      .string()
      .min(2, "Last Name must be at least 2 characters long."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "Password confirmation must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });
