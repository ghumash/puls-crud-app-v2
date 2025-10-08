import { PaginatedResponse } from '@/shared/api'

export type Role = 'Admin' | 'User' | 'Manager'

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
