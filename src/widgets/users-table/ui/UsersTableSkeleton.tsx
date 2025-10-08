import { memo } from 'react'
import { Plus } from 'lucide-react'
import {
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui'

function UsersTableSkeletonComponent() {
  const skeletonRows = Array.from({ length: 10 }, (_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="h-4 w-8" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-16 rounded-full" />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </TableCell>
    </TableRow>
  ))

  return (
    <div>
      <div className="mb-4">
        <Button disabled className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Добавить пользователя
        </Button>
      </div>

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
        <TableBody>{skeletonRows}</TableBody>
      </Table>
    </div>
  )
}

export const UsersTableSkeleton = memo(UsersTableSkeletonComponent)
