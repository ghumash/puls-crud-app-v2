import type { Role } from './types'

export const ROLES: readonly Role[] = ['Admin', 'Manager', 'User'] as const

export const ROLE_OPTIONS = ROLES.map((role) => ({
  value: role,
  label: role,
}))
