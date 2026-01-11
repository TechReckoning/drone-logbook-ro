import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TimeInput } from './TimeInput'
import { useState, useEffect } from 'react'
import { timeToMinutes, validateTimeFormat, minutesToTime } from '@/lib/helpers'
import type { FlightEntry } from '@/lib/types'
import type { Language } from '@/lib/translations'
import { t } from '@/lib/translations'

interface FlightDialogProps {
  open: boolean
  onClose: () => void
  onSave: (entry: Omit<FlightEntry, 'id'>) => void
  editEntry?: FlightEntry
  lang: Language
}

export function FlightDialog({ open, onClose, onSave, editEntry, lang }: FlightDialogProps) {
  const text = t(lang)
  
  const [date, setDate] = useState('')
  const [type, setType] = useState('')
  const [registration, setRegistration] = useState('')
  const [route, setRoute] = useState('')
  const [time, setTime] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editEntry) {
      setDate(editEntry.date)
      setType(editEntry.type)
      setRegistration(editEntry.registration)
      setRoute(editEntry.route)
      setTime(minutesToTime(editEntry.timeMinutes))
    } else {
      setDate('')
      setType('')
      setRegistration('')
      setRoute('')
      setTime('')
    }
    setErrors({})
  }, [editEntry, open])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!date) newErrors.date = text.validation.required
    if (!type) newErrors.type = text.validation.required
    if (!registration) newErrors.registration = text.validation.required
    if (!route) newErrors.route = text.validation.required
    if (!time) {
      newErrors.time = text.validation.required
    } else if (!validateTimeFormat(time)) {
      newErrors.time = text.validation.invalidTime
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return

    const timeMinutes = timeToMinutes(time)
    if (timeMinutes === null) return

    onSave({
      date,
      type,
      registration,
      route,
      timeMinutes
    })

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editEntry ? text.flight.editTitle : text.flight.addTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="date">{text.flight.date}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={errors.date ? 'border-destructive' : ''}
            />
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">{text.flight.type}</Label>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="DJI Mini 3 Pro"
              className={errors.type ? 'border-destructive' : ''}
            />
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="registration">{text.flight.registration}</Label>
            <Input
              id="registration"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              placeholder="RO-ABC123"
              className={errors.registration ? 'border-destructive' : ''}
            />
            {errors.registration && (
              <p className="text-sm text-destructive">{errors.registration}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="route">{text.flight.route}</Label>
            <Input
              id="route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              placeholder="Bucharest - Local"
              className={errors.route ? 'border-destructive' : ''}
            />
            {errors.route && (
              <p className="text-sm text-destructive">{errors.route}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">{text.flight.flightTime}</Label>
            <TimeInput
              id="time"
              value={time}
              onChange={setTime}
              error={!!errors.time}
              placeholder={text.flight.flightTimePlaceholder}
            />
            <p className="text-xs text-muted-foreground">
              {text.flight.flightTimeHelper}
            </p>
            {errors.time && (
              <p className="text-sm text-destructive">{errors.time}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {text.common.cancel}
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            {text.common.save}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
