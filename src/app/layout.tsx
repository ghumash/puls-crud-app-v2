import type { Metadata } from 'next'
import { Toaster } from '@/shared/ui'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'PULS CRUD - Управление пользователями',
  description: 'Production-уровень CRUD-приложение на Next.js с FSD архитектурой',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
