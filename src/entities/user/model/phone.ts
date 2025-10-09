import { parsePhoneNumberWithError, CountryCode } from 'libphonenumber-js'

const DEFAULT_COUNTRY: CountryCode = 'RU'
const DEFAULT_FORMAT = '+7xxx1234567'

export function normalizePhone(phone: string, country: CountryCode = DEFAULT_COUNTRY): string {
  if (!phone) return phone

  try {
    const phoneNumber = parsePhoneNumberWithError(phone, country)
    return phoneNumber.format('E.164')
  } catch {
    return phone
  }
}

export function isValidPhone(phone: string, country: CountryCode = DEFAULT_COUNTRY): boolean {
  if (!phone) return false

  try {
    const phoneNumber = parsePhoneNumberWithError(phone, country)

    return phoneNumber.isValid() && phoneNumber.country === country
  } catch {
    return false
  }
}

export function formatPhoneForDisplay(
  phone: string,
  country: CountryCode = DEFAULT_COUNTRY
): string {
  if (!phone) return phone

  try {
    const phoneNumber = parsePhoneNumberWithError(phone, country)
    return phoneNumber.formatNational()
  } catch {
    return phone
  }
}

export function getPhoneValidationMessage(country: CountryCode = DEFAULT_COUNTRY): string {
  if (country === 'RU') {
    return `Введите корректный российский номер. Проверьте код оператора/города после +7. Формат: ${DEFAULT_FORMAT}`
  }
  return `Некорректный формат телефона для страны ${country}`
}

export function getPhonePlaceholder(country: CountryCode = DEFAULT_COUNTRY): string {
  if (country === 'RU') {
    return DEFAULT_FORMAT
  }
  return 'Введите телефон'
}
