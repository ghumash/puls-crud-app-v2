import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, type UserForm } from '@/entities/user'

const defaultFormValues: UserForm = {
  name: '',
  email: '',
  phone: '',
  role: 'User',
}

export function useUserForm(defaultValues?: Partial<UserForm>) {
  return useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      ...defaultFormValues,
      ...defaultValues,
    },
  })
}
