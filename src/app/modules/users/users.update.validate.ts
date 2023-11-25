import { z } from 'zod';
const userUpdateSchemaValidate = z.object({
  userId: z.number().optional(),
  username: z.string().min(3).optional(),
  password: z.string().min(6).optional(),
  fullName: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  }),
  age: z.number().optional(),
  email: z.string().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string().optional()),

  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
  }),
});
export default userUpdateSchemaValidate;
