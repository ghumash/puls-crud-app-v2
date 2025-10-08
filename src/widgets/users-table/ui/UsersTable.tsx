'use client'

import { memo } from 'react'
import { UsersTableSkeleton } from './UsersTableSkeleton'
import { UsersTableProps } from '../model/types'
import { UsersMobileCards } from './UsersMobileCards'
import { UsersDesktopTable } from './UsersDesktopTable'
import { UsersTableHeader } from './UsersTableHeader'

function UsersTableComponent({
  users,
  loading,
  onEdit,
  onCreate,
  onRefresh,
  pagination,
}: UsersTableProps) {
  if (loading) {
    return <UsersTableSkeleton />
  }

  const paginationProps = {
    current: pagination.current,
    pageSize: pagination.pageSize,
    total: pagination.total,
    onChange: pagination.onChange,
  }

  return (
    <div>
      <UsersTableHeader onCreate={onCreate} />

      <UsersDesktopTable
        users={users}
        onEdit={onEdit}
        onRefresh={onRefresh}
        pagination={paginationProps}
      />

      <UsersMobileCards
        users={users}
        onEdit={onEdit}
        onRefresh={onRefresh}
        pagination={paginationProps}
      />
    </div>
  )
}

export const UsersTable = memo(UsersTableComponent)
