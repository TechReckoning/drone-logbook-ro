export interface PilotProfile {
  firstName: string
  lastName: string
  address: string
  mobilePhone: string
  dateOfBirth: string
  certificateNumber: string
  landlinePhone?: string
}

export interface FlightEntry {
  id: string
  date: string
  type: string
  registration: string
  route: string
  timeMinutes: number
}

export interface ExportMetadata {
  id: string
  generatedAt: string
  scope: 'all' | 'year' | 'month' | 'custom'
  fromDate?: string
  toDate?: string
}

export interface AppState {
  isPro: boolean
  language: 'en' | 'ro'
}

export type FilterScope = 'all' | 'year' | 'month' | 'custom'

export interface FilterState {
  scope: FilterScope
  year?: number
  month?: number
  fromDate?: string
  toDate?: string
  searchTerm?: string
}
