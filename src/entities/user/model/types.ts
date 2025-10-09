import { PaginatedResponse } from '@/shared/api'
import { Control, FieldErrors } from 'react-hook-form'
import { UserForm } from './schema'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: Role
}

export interface UserModalProps {
  open: boolean
  title: string
  children: React.ReactNode
  isSubmitting: boolean
  submitText: string
  onCancel: () => void
  onSubmit: () => void
}

export type UsersResponse = PaginatedResponse<User>

export type Role = 'Admin' | 'User' | 'Manager'

export interface UserFormFieldsProps {
  control: Control<UserForm>
  errors: FieldErrors<UserForm>
}

export interface UseUserModalParams {
  defaultValues?: Partial<UserForm>
  onSubmit: (data: UserForm) => Promise<void>
  onCancel: () => void
}
