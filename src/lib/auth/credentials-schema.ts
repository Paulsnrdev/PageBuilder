import { z } from "zod";

// bcrypt only hashes the first 72 bytes of a password; cap input at that
// length so nothing is silently truncated.
const password = z.string().min(8, "Password must be at least 8 characters").max(72);
const email = z.string().trim().toLowerCase().email("Enter a valid email address");

export const loginSchema = z.object({ email, password });

export const signUpSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  email,
  password,
});
