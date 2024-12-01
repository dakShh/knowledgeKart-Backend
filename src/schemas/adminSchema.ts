import { z } from 'zod';

export const adminSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});
