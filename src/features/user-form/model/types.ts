import { Control, FieldErrors } from 'react-hook-form'
import { UserForm } from '@/entities/user'

export interface UserFormFieldsProps {
  control: Control<UserForm>
  errors: FieldErrors<UserForm>
}

export interface UseUserModalParams {
  defaultValues?: Partial<UserForm>
  onSubmit: (data: UserForm) => Promise<void>
  onCancel: () => void
}
