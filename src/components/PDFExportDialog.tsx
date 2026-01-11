import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { getAvailableYears, getMonthName } from '@/lib/helpers'
import type { FlightEntry, FilterScope } from '@/lib/types'
import type { Language } from '@/lib/translations'
import { t } from '@/lib/translations'
import { Download } from '@phosphor-icons/react'

interface PDFExportDialogProps {
  open: boolean
  onClose: () => void
  onExport: (scope: FilterScope, year?: number, month?: number, fromDate?: string, toDate?: string) => void
  entries: FlightEntry[]
  lang: Language
}

export function PDFExportDialog({ open, onClose, onExport, entries, lang }: PDFExportDialogProps) {
  const text = t(lang)
  
  const [scope, setScope] = useState<FilterScope>('all')
  const [year, setYear] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [error, setError] = useState('')

  const availableYears = getAvailableYears(entries)

  useEffect(() => {
    if (open) {
      setScope('all')
      setYear('')
      setMonth('')
      setFromDate('')
      setToDate('')
      setError('')
    }
  }, [open])

  const handleExport = () => {
    setError('')

    if (scope === 'year' && !year) {
      setError(text.validation.required)
      return
    }

    if (scope === 'month' && (!year || !month)) {
      setError(text.validation.required)
      return
    }

    if (scope === 'custom') {
      if (!fromDate || !toDate) {
        setError(text.validation.required)
        return
      }
      if (new Date(fromDate) > new Date(toDate)) {
        setError(text.validation.dateRange)
        return
      }
    }

    const exportYear = year ? parseInt(year) : undefined
    const exportMonth = month ? parseInt(month) : undefined

    onExport(scope, exportYear, exportMonth, fromDate || undefined, toDate || undefined)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download size={24} className="text-primary" />
            {text.pdf.title}
          </DialogTitle>
          <DialogDescription>
            {text.pdf.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>{text.pdf.scope}</Label>
            <Select value={scope} onValueChange={(value) => setScope(value as FilterScope)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{text.pdf.all}</SelectItem>
                <SelectItem value="year">{text.pdf.year}</SelectItem>
                <SelectItem value="month">{text.pdf.month}</SelectItem>
                <SelectItem value="custom">{text.pdf.custom}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {scope === 'year' && (
            <div className="space-y-2">
              <Label>{text.pdf.selectYear}</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder={text.pdf.selectYear} />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map(y => (
                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {scope === 'month' && (
            <>
              <div className="space-y-2">
                <Label>{text.pdf.selectYear}</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue placeholder={text.pdf.selectYear} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map(y => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{text.pdf.selectMonth}</Label>
                <Select value={month} onValueChange={setMonth} disabled={!year}>
                  <SelectTrigger>
                    <SelectValue placeholder={text.pdf.selectMonth} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                      <SelectItem key={m} value={m.toString()}>
                        {getMonthName(m, lang)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {scope === 'custom' && (
            <>
              <div className="space-y-2">
                <Label>{text.pdf.from}</Label>
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>{text.pdf.to}</Label>
                <Input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </>
          )}

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {text.common.cancel}
          </Button>
          <Button onClick={handleExport} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Download size={18} className="mr-2" />
            {text.pdf.generate}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
