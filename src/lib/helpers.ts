export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

export function timeToMinutes(time: string): number | null {
  const match = time.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return null
  
  const hours = parseInt(match[1], 10)
  const minutes = parseInt(match[2], 10)
  
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null
  }
  
  return hours * 60 + minutes
}

export function validateTimeFormat(time: string): boolean {
  const minutes = timeToMinutes(time)
  return minutes !== null
}

export function formatDate(date: string): { year: number; month: number; day: number } {
  const d = new Date(date)
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate()
  }
}

export function getBucharestTimestamp(): string {
  return new Date().toLocaleString('ro-RO', {
    timeZone: 'Europe/Bucharest',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/(\d{2})\.(\d{2})\.(\d{4}), (\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:$6')
}

export function generateExportId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

export function getMonthName(month: number, lang: 'en' | 'ro'): string {
  const monthNames = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ro: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
  }
  return monthNames[lang][month - 1] || ''
}

export function getCurrentYear(): number {
  return new Date().getFullYear()
}

export function getCurrentMonth(): number {
  return new Date().getMonth() + 1
}

export function getAvailableYears(entries: Array<{ date: string }>): number[] {
  const years = new Set<number>()
  entries.forEach(entry => {
    const year = new Date(entry.date).getFullYear()
    years.add(year)
  })
  return Array.from(years).sort((a, b) => b - a)
}
