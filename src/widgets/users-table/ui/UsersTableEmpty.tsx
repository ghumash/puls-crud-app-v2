import { Users, Plus, AlertCircle } from 'lucide-react'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  Button,
} from '@/shared/ui'

interface UsersTableEmptyProps {
  onCreate: () => void
  error?: string | null
}

export function UsersTableEmpty({ onCreate, error }: UsersTableEmptyProps) {
  const hasError = Boolean(error)

  return (
    <Empty className="border-2 mt-4">
      <EmptyHeader>
        <EmptyMedia variant="icon">{hasError ? <AlertCircle /> : <Users />}</EmptyMedia>
        <EmptyContent>
          <EmptyTitle>{hasError ? 'Ошибка загрузки данных' : 'Нет пользователей'}</EmptyTitle>
          <EmptyDescription>
            {hasError
              ? error
              : 'Пользователи не найдены. Создайте первого пользователя чтобы начать работу.'}
          </EmptyDescription>
          {!hasError && (
            <Button onClick={onCreate} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Создать пользователя
            </Button>
          )}
        </EmptyContent>
      </EmptyHeader>
    </Empty>
  )
}
