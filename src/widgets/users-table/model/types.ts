import { Role, User } from '@/entities/user'

export interface UsersTableProps {
  users: User[]
  loading: boolean
  onEdit: (user: User) => void
  onCreate: () => void
  onRefresh: () => void
  pagination: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize?: number) => void
  }
}

export interface RoleBadgeProps {
  role: Role
}

export interface TablePaginationProps {
  current: number
  pageSize: number
  total: number
  onChange: (page: number) => void
}

export interface UsersDesktopTableProps {
  users: User[]
  onEdit: (user: User) => void
  onRefresh: () => void
  pagination: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number) => void
  }
}

export interface UsersMobileCardsProps {
  users: User[]
  onEdit: (user: User) => void
  onRefresh: () => void
  pagination: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number) => void
  }
}

export interface UserCardProps {
  user: User
  onEdit: (user: User) => void
  onRefresh: () => void
}

export interface UsersTableHeaderProps {
  onCreate: () => void
}