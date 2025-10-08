'use client'

import { memo } from 'react'
import { Edit, Phone, Mail } from 'lucide-react'
import { Button, Card } from '@/shared/ui'
import { RoleBadge } from './RoleBadge'
import { TablePagination } from './TablePagination'
import { UserDeleteButton } from '@/features/user-delete'
import { formatPhoneForDisplay } from '@/shared/lib'
import { UserCardProps, UsersMobileCardsProps } from '../model/types'

function UserCard({ user, onEdit, onRefresh }: UserCardProps) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-3">
        <span className="font-medium">{user.name}</span>
        <RoleBadge role={user.role} />
      </div>
      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>ID: {user.id}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>{formatPhoneForDisplay(user.phone)}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(user)}
          className="flex items-center gap-1"
        >
          <Edit className="h-4 w-4" />
          Редактировать
        </Button>
        <UserDeleteButton userId={user.id} userName={user.name} onSuccess={onRefresh} />
      </div>
    </Card>
  )
}

function UsersMobileCardsComponent({
  users,
  onEdit,
  onRefresh,
  pagination,
}: UsersMobileCardsProps) {
  return (
    <div className="md:hidden space-y-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onEdit={onEdit} onRefresh={onRefresh} />
      ))}

      <TablePagination {...pagination} />
    </div>
  )
}

export const UsersMobileCards = memo(UsersMobileCardsComponent)
