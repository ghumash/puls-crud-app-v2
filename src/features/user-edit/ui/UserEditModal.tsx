'use client'

import { useMemo } from 'react'
import { UserModal, UserFormFields, useUserModal, type UserForm, type User } from '@/entities/user'
import { updateUser } from '../api/updateUser'
import { showApiError, showSuccessMessage } from '@/shared/lib'
import { getUserFormData } from '../lib/mappers'

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
