import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash, FunnelSimple, MagnifyingGlass, Airplane } from '@phosphor-icons/react'
import { useState, useMemo } from 'react'
import type { FlightEntry, FilterScope } from '@/lib/types'
import type { Language } from '@/lib/translations'
import { t } from '@/lib/translations'
import { minutesToTime, formatDate, getAvailableYears, getMonthName } from '@/lib/helpers'

interface LogbookViewProps {
  entries: FlightEntry[]
  lang: Language
  onAddFlight: () => void
  onEditFlight: (entry: FlightEntry) => void
  onDeleteFlight: (id: string) => void
}

export function LogbookView({ entries, lang, onAddFlight, onEditFlight, onDeleteFlight }: LogbookViewProps) {
  const text = t(lang)
  
  const [filterScope, setFilterScope] = useState<FilterScope>('all')
  const [filterYear, setFilterYear] = useState<string>('')
  const [filterMonth, setFilterMonth] = useState<string>('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const availableYears = getAvailableYears(entries)

  const filteredEntries = useMemo(() => {
    let filtered = [...entries]

    if (filterScope === 'year' && filterYear) {
      filtered = filtered.filter(entry => {
        const year = new Date(entry.date).getFullYear()
        return year === parseInt(filterYear)
      })
    } else if (filterScope === 'month' && filterYear && filterMonth) {
      filtered = filtered.filter(entry => {
        const date = new Date(entry.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        return year === parseInt(filterYear) && month === parseInt(filterMonth)
      })
    } else if (filterScope === 'custom' && fromDate && toDate) {
      const from = new Date(fromDate)
      const to = new Date(toDate)
      filtered = filtered.filter(entry => {
        const date = new Date(entry.date)
        return date >= from && date <= to
      })
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(entry =>
        entry.type.toLowerCase().includes(term) ||
        entry.registration.toLowerCase().includes(term) ||
        entry.route.toLowerCase().includes(term)
      )
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [entries, filterScope, filterYear, filterMonth, fromDate, toDate, searchTerm])

  const totalMinutes = filteredEntries.reduce((sum, entry) => sum + entry.timeMinutes, 0)

  const clearFilters = () => {
    setFilterScope('all')
    setFilterYear('')
    setFilterMonth('')
    setFromDate('')
    setToDate('')
    setSearchTerm('')
  }

  const hasActiveFilters = filterScope !== 'all' || searchTerm !== ''

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
            {text.logbook.title}
          </h1>
          <p className="text-muted-foreground">
            {filteredEntries.length} {lang === 'en' ? 'entries' : 'înregistrări'} · {minutesToTime(totalMinutes)} {text.common.hours}
          </p>
        </div>
        <Button onClick={onAddFlight} className="bg-primary hover:bg-primary/90">
          <Plus size={18} className="mr-2" />
          {text.logbook.addEntry}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FunnelSimple size={20} className="text-primary" />
            {text.logbook.filters}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Select value={filterScope} onValueChange={(value) => setFilterScope(value as FilterScope)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{text.logbook.all}</SelectItem>
                  <SelectItem value="year">{text.logbook.year}</SelectItem>
                  <SelectItem value="month">{text.logbook.month}</SelectItem>
                  <SelectItem value="custom">{text.logbook.custom}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(filterScope === 'year' || filterScope === 'month') && (
              <div className="space-y-2">
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger>
                    <SelectValue placeholder={text.logbook.selectYear} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {filterScope === 'month' && (
              <div className="space-y-2">
                <Select value={filterMonth} onValueChange={setFilterMonth} disabled={!filterYear}>
                  <SelectTrigger>
                    <SelectValue placeholder={text.logbook.selectMonth} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                      <SelectItem key={month} value={month.toString()}>
                        {getMonthName(month, lang)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {filterScope === 'custom' && (
              <>
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    placeholder={text.logbook.from}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    placeholder={text.logbook.to}
                  />
                </div>
              </>
            )}

            <div className="relative lg:col-span-2">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={text.logbook.searchPlaceholder}
                className="pl-10"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              {text.logbook.clearFilters}
            </Button>
          )}
        </CardContent>
      </Card>

      {filteredEntries.length === 0 ? (
        <Card>
          <CardContent className="py-16">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <Airplane size={64} className="text-muted-foreground/30" />
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {hasActiveFilters ? text.logbook.noResults : text.logbook.noEntries}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {hasActiveFilters 
                    ? (lang === 'en' ? 'Try adjusting your filters' : 'Încearcă să ajustezi filtrele')
                    : text.logbook.noEntriesDescription}
                </p>
              </div>
              {hasActiveFilters ? (
                <Button variant="outline" onClick={clearFilters}>
                  {text.logbook.clearFilters}
                </Button>
              ) : (
                <Button onClick={onAddFlight} className="bg-primary hover:bg-primary/90">
                  <Plus size={18} className="mr-2" />
                  {text.logbook.addEntry}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary hover:bg-primary">
                    <TableHead className="text-primary-foreground font-semibold">{text.logbook.year}</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">{text.logbook.month}</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">{text.logbook.day}</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">{text.logbook.type}</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">{text.logbook.registration}</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">{text.logbook.route}</TableHead>
                    <TableHead className="text-primary-foreground font-semibold">{text.logbook.flightTime}</TableHead>
                    <TableHead className="text-primary-foreground font-semibold text-right">{text.logbook.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => {
                    const { year, month, day } = formatDate(entry.date)
                    return (
                      <TableRow key={entry.id} className="hover:bg-secondary/50">
                        <TableCell className="font-medium">{year}</TableCell>
                        <TableCell>{month}</TableCell>
                        <TableCell>{day}</TableCell>
                        <TableCell>{entry.type}</TableCell>
                        <TableCell className="font-mono text-sm">{entry.registration}</TableCell>
                        <TableCell>{entry.route}</TableCell>
                        <TableCell className="font-mono">{minutesToTime(entry.timeMinutes)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => onEditFlight(entry)}
                              className="h-8 w-8 p-0"
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteId(entry.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  <TableRow className="bg-secondary/30 font-semibold hover:bg-secondary/30">
                    <TableCell colSpan={6} className="text-right">{text.logbook.total}:</TableCell>
                    <TableCell className="font-mono">{minutesToTime(totalMinutes)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{text.flight.delete}</AlertDialogTitle>
            <AlertDialogDescription>
              {text.flight.deleteConfirm}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{text.common.cancel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) onDeleteFlight(deleteId)
                setDeleteId(null)
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {text.common.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
