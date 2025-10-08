'use client'

import { useMemo } from 'react'
import { type UserForm, type User, UserModal } from '@/entities/user'
import { updateUser } from '../api/updateUser'
import { showApiError, showSuccessMessage, getUserFormData } from '@/shared/lib'
import { UserFormFields, useUserModal } from '@/features/user-form'

interface UserEditModalProps {
  open: boolean
  user: User | null
  onCancel: () => void
  onSuccess: () => void
}

export function UserEditModal({ open, user, onCancel, onSuccess }: UserEditModalProps) {
  const defaultValues = useMemo(() => (user ? getUserFormData(user) : undefined), [user])

  const handleSubmit = async (data: UserForm) => {
    if (!user) return

    try {
      await updateUser(user.id, data)
      showSuccessMessage('Пользователь обновлён')
      onSuccess()
    } catch (error) {
      showApiError(error, 'Ошибка при обновлении пользователя')
    }
  }

  const {
    control,
    errors,
    isSubmitting,
    handleSubmit: onSubmit,
    handleCancel,
  } = useUserModal({
    defaultValues,
    onSubmit: handleSubmit,
    onCancel,
  })

  return (
    <UserModal
      open={open}
      title="Редактировать пользователя"
      isSubmitting={isSubmitting}
      submitText="Сохранение"
      onCancel={handleCancel}
      onSubmit={onSubmit}
    >
      <UserFormFields control={control} errors={errors} />
    </UserModal>
  )
}
