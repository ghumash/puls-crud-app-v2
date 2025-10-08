'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'
import { UsersTable } from '@/widgets/users-table'
import { UserCreateModal } from '@/features/user-create'
import { UserEditModal } from '@/features/user-edit'
import { config } from '@/shared/config'
import { useUsersPage } from '@/app/users/useUsersPage'

export default function UsersPage() {
  const {
    users,
    loading,
    error,
    totalUsers,
    currentPage,
    editingUser,
    createModalOpen,
    editModalOpen,
    handlePageChange,
    handleCreateSuccess,
    handleEditSuccess,
    handleEdit,
    handleRefresh,
    handleEditCancel,
    createModalControls,
  } = useUsersPage()

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Управление пользователями</CardTitle>
        </CardHeader>
        <CardContent>
          <UsersTable
            users={users}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onCreate={createModalControls.setTrue}
            onRefresh={handleRefresh}
            pagination={{
              current: currentPage,
              pageSize: config.pagination.defaultPageSize,
              total: totalUsers,
              onChange: handlePageChange,
            }}
          />
        </CardContent>
      </Card>

      <UserCreateModal
        open={createModalOpen}
        onCancel={createModalControls.setFalse}
        onSuccess={handleCreateSuccess}
      />

      <UserEditModal
        open={editModalOpen}
        user={editingUser}
        onCancel={handleEditCancel}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}
