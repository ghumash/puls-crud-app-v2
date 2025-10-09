import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, type UserForm } from '../schema'

const defaultFormValues: UserForm = {
  name: '',
  email: '',
  phone: '',
  role: 'User',
}

export function useUserForm(defaultValues?: Partial<UserForm>) {
  return useForm<UserForm>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      ...defaultFormValues,
      ...defaultValues,
    },
  })
}
