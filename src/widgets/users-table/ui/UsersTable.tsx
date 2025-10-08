'use client'

import { memo } from 'react'
import { UsersTableSkeleton } from './UsersTableSkeleton'
import { UsersTableEmpty } from './UsersTableEmpty'
import { UsersTableProps } from '../model/types'
import { UsersMobileCards } from './UsersMobileCards'
import { UsersDesktopTable } from './UsersDesktopTable'
import { UsersTableHeader } from './UsersTableHeader'

function UsersTableComponent({
  users,
  loading,
  error,
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

  if (!users || users.length === 0) {
    return (
      <div>
        <UsersTableHeader onCreate={onCreate} />
        <UsersTableEmpty onCreate={onCreate} error={error} />
      </div>
    )
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
