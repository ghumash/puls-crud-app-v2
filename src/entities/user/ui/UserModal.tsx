'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Spinner,
} from '@/shared/ui'
import { UserModalProps } from '../model/types'

export function UserModal({
  open,
  title,
  children,
  isSubmitting,
  submitText,
  onCancel,
  onSubmit,
}: UserModalProps) {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="py-4">{children}</div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Отменить
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner className="size-4" />
                {submitText}...
              </div>
            ) : (
              submitText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
