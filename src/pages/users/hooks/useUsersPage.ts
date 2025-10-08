'use client'

import { useState, useEffect, useCallback } from 'react'
import { getUsers, type User } from '@/entities/user'
import { showApiError } from '@/shared/lib'
import { useToggle } from '@/shared/hooks'
import { config } from '@/shared/config'

export function useUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [createModalOpen, createModalControls] = useToggle(false)
  const [editModalOpen, editModalControls] = useToggle(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const fetchUsers = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const response = await getUsers(page, config.pagination.defaultPageSize)
      setUsers(response.data)
      setTotalUsers(response.total)
    } catch (error) {
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
    // Data
    users,
    loading,
    totalUsers,
    currentPage,
    editingUser,
    
    // Modal states
    createModalOpen,
    editModalOpen,
    
    // Handlers
    handlePageChange,
    handleCreateSuccess,
    handleEditSuccess,
    handleEdit,
    handleRefresh,
    handleEditCancel,
    
    // Modal controls
    createModalControls,
  }
}
