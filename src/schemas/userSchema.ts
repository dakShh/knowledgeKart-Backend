import { z } from 'zod';

export const userSchema = z.object({
  firstName: z
    .string({ required_error: 'firstname is required' })
    .min(1, { message: 'firstname is required' }),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
});
