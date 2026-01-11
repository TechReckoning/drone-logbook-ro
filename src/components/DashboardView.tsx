import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Airplane, User, Download, ChartBar, Plus, Check, Warning } from '@phosphor-icons/react'
import type { PilotProfile, FlightEntry } from '@/lib/types'
import type { Language } from '@/lib/translations'
import { t } from '@/lib/translations'
import { minutesToTime, getCurrentMonth, getCurrentYear } from '@/lib/helpers'

interface DashboardViewProps {
  profile: PilotProfile | null
  entries: FlightEntry[]
  isPro: boolean
  lang: Language
  onAddFlight: () => void
  onViewLogbook: () => void
  onCompleteProfile: () => void
  onDownloadPDF: () => void
}

export function DashboardView({
  profile,
  entries,
  isPro,
  lang,
  onAddFlight,
  onViewLogbook,
  onCompleteProfile,
  onDownloadPDF
}: DashboardViewProps) {
  const text = t(lang)

  const isProfileComplete = profile && profile.firstName && profile.lastName && 
    profile.address && profile.mobilePhone && profile.dateOfBirth && profile.certificateNumber

  const totalFlights = entries.length
  const totalMinutes = entries.reduce((sum, entry) => sum + entry.timeMinutes, 0)
  
  const currentMonth = getCurrentMonth()
  const currentYear = getCurrentYear()
  const thisMonthMinutes = entries
    .filter(entry => {
      const date = new Date(entry.date)
      return date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear
    })
    .reduce((sum, entry) => sum + entry.timeMinutes, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          {text.nav.dashboard}
        </h1>
        <p className="text-muted-foreground">
          {text.app.subtitle}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              {text.dashboard.profileStatus}
              {isProfileComplete ? (
                <Check className="text-primary" size={20} weight="bold" />
              ) : (
                <Warning className="text-accent" size={20} weight="bold" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge variant={isProfileComplete ? "default" : "secondary"} className={isProfileComplete ? "bg-primary" : ""}>
                {isProfileComplete ? text.dashboard.profileComplete : text.dashboard.profileIncomplete}
              </Badge>
              {!isProfileComplete && (
                <Button size="sm" onClick={onCompleteProfile} className="w-full">
                  <User size={16} className="mr-2" />
                  {text.dashboard.completeProfile}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ChartBar size={18} className="text-primary" />
              {text.dashboard.totalFlights}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalFlights}</div>
            {!isPro && (
              <p className="text-xs text-muted-foreground mt-1">
                {totalFlights}/5 {text.billing.entriesUsed}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Airplane size={18} className="text-primary" />
              {text.dashboard.totalTime}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{minutesToTime(totalMinutes)}</div>
            <p className="text-xs text-muted-foreground mt-1">{text.common.hours}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              {text.dashboard.thisMonth}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{minutesToTime(thisMonthMinutes)}</div>
            <p className="text-xs text-muted-foreground mt-1">{text.common.hours}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus size={24} className="text-primary" />
              {text.dashboard.addFlight}
            </CardTitle>
            <CardDescription>
              {lang === 'en' ? 'Log a new flight entry' : 'Înregistrează un zbor nou'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onAddFlight} className="w-full bg-primary hover:bg-primary/90">
              <Plus size={18} className="mr-2" />
              {text.logbook.addEntry}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Airplane size={24} className="text-primary" />
              {text.dashboard.viewLogbook}
            </CardTitle>
            <CardDescription>
              {lang === 'en' ? 'View and manage your flight entries' : 'Vizualizează și gestionează zborurile'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onViewLogbook} variant="outline" className="w-full">
              {text.dashboard.viewLogbook}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all hover:-translate-y-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download size={24} className="text-accent" />
              {text.dashboard.downloadPdf}
            </CardTitle>
            <CardDescription>
              {lang === 'en' 
                ? 'Export your logbook as an official PDF document' 
                : 'Exportă jurnalul ca document PDF oficial'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={onDownloadPDF} 
              disabled={!isProfileComplete}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50"
            >
              <Download size={18} className="mr-2" />
              {text.pdf.generate}
            </Button>
            {!isProfileComplete && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {text.pdf.profileIncomplete}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
