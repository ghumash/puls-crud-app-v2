'use client'

import type { UserForm } from '@/entities/user'
import { createUser } from '../api/createUser'
import { showApiError, showSuccessMessage } from '@/shared/lib'
import { UserFormFields, useUserModal } from '@/features/user-form'
import { UserModal } from '@/shared/ui/custom'

interface UserCreateModalProps {
  open: boolean
  onCancel: () => void
  onSuccess: () => void
}

export function UserCreateModal({ open, onCancel, onSuccess }: UserCreateModalProps) {
  const handleSubmit = async (data: UserForm) => {
    try {
      await createUser(data)
      showSuccessMessage('Пользователь создан')
      onSuccess()
    } catch (error) {
      showApiError(error, 'Ошибка при создании пользователя')
    }
  }

  const {
    control,
    errors,
    isSubmitting,
    handleSubmit: onSubmit,
    handleCancel,
  } = useUserModal({
    onSubmit: handleSubmit,
    onCancel,
  })

  return (
    <UserModal
      open={open}
      title="Добавить пользователя"
      isSubmitting={isSubmitting}
      submitText="Создание"
      onCancel={handleCancel}
      onSubmit={onSubmit}
    >
      <UserFormFields control={control} errors={errors} />
    </UserModal>
  )
}
