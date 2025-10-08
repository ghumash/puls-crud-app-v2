'use client'

import { memo } from 'react'
import { Edit } from 'lucide-react'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui'
import { UserDeleteButton } from '@/features/user-delete'
import { formatPhoneForDisplay } from '@/shared/lib'
import { RoleBadge } from './RoleBadge'
import { TablePagination } from './TablePagination'
import { UsersDesktopTableProps } from '../model/types'

function UsersDesktopTableComponent({
  users,
  onEdit,
  onRefresh,
  pagination,
}: UsersDesktopTableProps) {
  return (
    <div className="hidden md:block">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Имя</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead className="w-32">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-mono text-sm">{user.id}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{formatPhoneForDisplay(user.phone)}</TableCell>
                <TableCell>
                  <RoleBadge role={user.role} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(user)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <UserDeleteButton userId={user.id} userName={user.name} onSuccess={onRefresh} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination {...pagination} />
    </div>
  )
}

export const UsersDesktopTable = memo(UsersDesktopTableComponent)
