'use client'

import { useState, useEffect, useCallback } from 'react'
import { getUsers, type User } from '@/entities/user'
import { showApiError } from '@/shared/lib'
import { useToggle } from '@/shared/hooks'
import { config } from '@/shared/config'

export function useUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [createModalOpen, createModalControls] = useToggle(false)
  const [editModalOpen, editModalControls] = useToggle(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true)
    setError(null)
    try {
      const response = await getUsers(page, config.pagination.defaultPageSize)
      setUsers(response.data)
      setTotalUsers(response.total)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Ошибка при загрузке пользователей'
      setError(errorMessage)
      setUsers([])
      setTotalUsers(0)
      showApiError(error, 'Ошибка при загрузке пользователей')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage, fetchUsers])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleCreateSuccess = () => {
    createModalControls.setFalse()
    fetchUsers(currentPage)
  }

  const handleEditSuccess = () => {
    editModalControls.setFalse()
    setEditingUser(null)
    fetchUsers(currentPage)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    editModalControls.setTrue()
  }

  const handleRefresh = () => {
    fetchUsers(currentPage)
  }

  const handleEditCancel = () => {
    editModalControls.setFalse()
    setEditingUser(null)
  }

  return {
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
  }
}
