'use client'

import { Controller } from 'react-hook-form'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'
import { ROLE_OPTIONS } from '../model/constants'
import { normalizePhone, getPhonePlaceholder } from '../model/phone'
import { UserFormFieldsProps } from '../model/types'
import { FormField } from './FormField'

export function UserFormFields({ control, errors }: UserFormFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField label="Имя" error={errors.name?.message}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Введите имя" />}
        />
      </FormField>

      <FormField label="Email" error={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} placeholder="example@email.com" />}
        />
      </FormField>

      <FormField label="Телефон" error={errors.phone?.message}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={getPhonePlaceholder()}
              onBlur={(e) => {
                const normalized = normalizePhone(e.target.value)
                field.onChange(normalized)
                field.onBlur()
              }}
            />
          )}
        />
      </FormField>

      <FormField label="Роль" error={errors.role?.message}>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map(({ value, label }: { value: string; label: string }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>
    </div>
  )
}
