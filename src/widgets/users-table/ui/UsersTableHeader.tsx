'use client'

import { memo } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/ui'
import { UsersTableHeaderProps } from '../model/types'

function UsersTableHeaderComponent({ onCreate }: UsersTableHeaderProps) {
  return (
    <div className="mb-4">
      <Button onClick={onCreate} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Добавить пользователя
      </Button>
    </div>
  )
}

export const UsersTableHeader = memo(UsersTableHeaderComponent)
