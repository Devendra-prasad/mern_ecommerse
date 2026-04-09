import { z } from "zod";

export const updateUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
  avatar: z.string().url("Invalid avatar URL").optional(),
});
