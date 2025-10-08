import { toast } from 'sonner'

interface ApiErrorResponse {
  message: string
}

function getErrorMessage(error: unknown, defaultMessage = 'Произошла ошибка'): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const apiError = error as { response?: { data?: ApiErrorResponse } }
    return apiError.response?.data?.message || defaultMessage
  }

  if (error instanceof Error) {
    return error.message
  }

  return defaultMessage
}

export function showApiError(error: unknown, defaultMessage?: string): void {
  const errorMessage = getErrorMessage(error, defaultMessage)
  toast.error(errorMessage)
}

export function showSuccessMessage(text: string): void {
  toast.success(text)
}
