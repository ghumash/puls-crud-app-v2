'use client'

import { Badge } from '@/shared/ui'
import type { Role } from '@/entities/user'
import { RoleBadgeProps } from '../model/types'

function getRoleBadgeVariant(role: Role): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (role) {
    case 'Admin':
      return 'destructive'
    case 'User':
      return 'secondary'
    case 'Manager':
      return 'default'
    default:
      return 'outline'
  }
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return <Badge variant={getRoleBadgeVariant(role)}>{role}</Badge>
}
