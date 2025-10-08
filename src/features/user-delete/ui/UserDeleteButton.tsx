'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import {
  Button,
  Spinner,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui'
import { deleteUser } from '../api/deleteUser'
import { showApiError, showSuccessMessage } from '@/shared/lib'

interface UserDeleteButtonProps {
  userId: string
  userName: string
  onSuccess: () => void
}

export function UserDeleteButton({ userId, userName, onSuccess }: UserDeleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteUser(userId)
      showSuccessMessage('Пользователь удалён')
      setOpen(false)
      onSuccess()
    } catch (error) {
      showApiError(error, 'Ошибка при удалении пользователя')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Удалить пользователя</h4>
            <p className="text-sm text-muted-foreground">
              Вы уверены, что хотите удалить пользователя &ldquo;{userName}&rdquo;?
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)} disabled={loading}>
              Нет
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner className="size-4" />
                  Удаление...
                </div>
              ) : (
                'Да'
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
