import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  adminId: z.string().min(1).optional(),
  imageUrl: z.string().min(1).optional(),
  price: z.string().min(1)
});
