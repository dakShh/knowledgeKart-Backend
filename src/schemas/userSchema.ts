import { z } from 'zod';

export const userSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
