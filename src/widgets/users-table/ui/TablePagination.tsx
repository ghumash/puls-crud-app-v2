'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui'
import { TablePaginationProps } from '../model/types'

export function TablePagination({ current, pageSize, total, onChange }: TablePaginationProps) {
  if (total <= pageSize) return null

  const totalPages = Math.ceil(total / pageSize)
  const isFirstPage = current <= 1
  const isLastPage = current >= totalPages

  const getVisiblePages = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).filter((page) => {
      return page === 1 || page === totalPages || (page >= current - 1 && page <= current + 1)
    })
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onChange(current - 1)}
              className={isFirstPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {visiblePages.map((page, index, array) => (
            <PaginationItem key={page}>
              {index > 0 && array[index - 1] !== page - 1 && <PaginationEllipsis />}
              <PaginationLink
                onClick={() => onChange(page)}
                isActive={page === current}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => onChange(current + 1)}
              className={isLastPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
