import z from 'zod'

export const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required.').default(''),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required.').default(''),
  dateOfBirth: z.string().min(1, 'Date of birth is required.').default(''),
  age: z.number().min(1, 'Age is required.').default(0),
})
