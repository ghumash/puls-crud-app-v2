import { z } from 'zod'
import { getPhoneValidationMessage, isValidPhone } from './phone'

const TEMP_EMAIL_DOMAINS = [
  'tempmail.org',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'yopmail.com',
  'temp-mail.org',
  'throwaway.email',
  'maildrop.cc',
  'getnada.com',
  'mohmal.com',
  'dispostable.com',
  'trashmail.com',
]

const normalizeName = (name: string): string => {
  return name
    .normalize('NFC')
    .trim()
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(50, 'Максимум 50 символов')
    .regex(
      /^[а-яёА-ЯЁa-zA-Z\s'-]+$/,
      'Имя может содержать только буквы, пробелы, дефисы и апострофы'
    )
    .transform(normalizeName),

  email: z
    .string()
    .trim()
    .min(5, 'Email слишком короткий')
    .max(150, 'Email слишком длинный')
    .email('Некорректный формат email')
    .refine((email) => {
      const domain = email.split('@')[1]?.toLowerCase()
      return !TEMP_EMAIL_DOMAINS.includes(domain)
    }, 'Временные email-адреса не допускаются')
    .transform((email) => email.toLowerCase()),

  phone: z.string().refine((phone) => isValidPhone(phone), getPhoneValidationMessage()),

  role: z.enum(['Admin', 'User', 'Manager'], {
    message: 'Выберите роль',
  }),
})

export type UserForm = z.infer<typeof userSchema>
