import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface TimeInputProps {
  value: string
  onChange: (value: string) => void
  error?: boolean
  placeholder?: string
  id?: string
}

export function TimeInput({ value, onChange, error, placeholder = 'HH:MM', id }: TimeInputProps) {
  const [localValue, setLocalValue] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/[^\d:]/g, '')
    
    if (input.length === 2 && !input.includes(':') && localValue.length < input.length) {
      input = input + ':'
    }
    
    if (input.length > 5) {
      input = input.substring(0, 5)
    }
    
    setLocalValue(input)
    onChange(input)
  }

  const handleBlur = () => {
    if (localValue.length > 0 && localValue.length < 5) {
      const parts = localValue.split(':')
      if (parts.length === 1 && parts[0].length <= 2) {
        const formatted = parts[0].padStart(2, '0') + ':00'
        setLocalValue(formatted)
        onChange(formatted)
      } else if (parts.length === 2) {
        const formatted = parts[0].padStart(2, '0') + ':' + (parts[1] || '00').padStart(2, '0')
        setLocalValue(formatted)
        onChange(formatted)
      }
    }
  }

  return (
    <Input
      id={id}
      type="text"
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      maxLength={5}
      className={cn(
        'font-mono',
        error && 'border-destructive focus-visible:ring-destructive'
      )}
    />
  )
}
