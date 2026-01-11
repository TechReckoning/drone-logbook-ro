import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { DashboardView } from '@/components/DashboardView'
import { LogbookView } from '@/components/LogbookView'
import { ProfileView } from '@/components/ProfileView'
import { BillingView } from '@/components/BillingView'
import { PrivacyView } from '@/components/PrivacyView'
import { FlightDialog } from '@/components/FlightDialog'
import { PDFExportDialog } from '@/components/PDFExportDialog'
import { UpgradeDialog } from '@/components/UpgradeDialog'
import { generatePDF } from '@/lib/pdf'
import type { PilotProfile, FlightEntry, FilterScope } from '@/lib/types'
import type { Language } from '@/lib/translations'
import { t } from '@/lib/translations'
import { Fan } from '@phosphor-icons/react'

function App() {
  const [profile, setProfile] = useKV<PilotProfile | null>('pilot-profile', null)
  const [entries, setEntries] = useKV<FlightEntry[]>('flight-entries', [])
  const [isPro, setIsPro] = useKV<boolean>('is-pro', false)
  const [lang, setLang] = useKV<Language>('language', 'en')

  const [activeTab, setActiveTab] = useState('dashboard')
  const [flightDialogOpen, setFlightDialogOpen] = useState(false)
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false)
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<FlightEntry | undefined>()

  const currentLang = lang || 'en'
  const currentEntries = entries || []
  const currentIsPro = isPro || false
  const text = t(currentLang)

  const handleSaveProfile = (updatedProfile: PilotProfile) => {
    setProfile(updatedProfile)
  }

  const handleAddFlight = () => {
    if (!currentIsPro && currentEntries.length >= 5) {
      setUpgradeDialogOpen(true)
      return
    }
    setEditingEntry(undefined)
    setFlightDialogOpen(true)
  }

  const handleEditFlight = (entry: FlightEntry) => {
    setEditingEntry(entry)
    setFlightDialogOpen(true)
  }

  const handleSaveFlight = (flightData: Omit<FlightEntry, 'id'>) => {
    if (editingEntry) {
      setEntries((currentEntries) =>
        (currentEntries || []).map((entry) =>
          entry.id === editingEntry.id ? { ...flightData, id: editingEntry.id } : entry
        )
      )
      toast.success(currentLang === 'en' ? 'Flight updated' : 'Zbor actualizat')
    } else {
      const newEntry: FlightEntry = {
        ...flightData,
        id: Date.now().toString()
      }
      setEntries((currentEntries) => [...(currentEntries || []), newEntry])
      toast.success(currentLang === 'en' ? 'Flight added' : 'Zbor adăugat')
    }
  }

  const handleDeleteFlight = (id: string) => {
    setEntries((currentEntries) => (currentEntries || []).filter((entry) => entry.id !== id))
    toast.success(currentLang === 'en' ? 'Flight deleted' : 'Zbor șters')
  }

  const handleExportPDF = (
    scope: FilterScope,
    year?: number,
    month?: number,
    fromDate?: string,
    toDate?: string
  ) => {
    if (!profile) {
      toast.error(text.pdf.profileIncomplete)
      return
    }

    let filteredEntries = [...currentEntries]

    if (scope === 'year' && year) {
      filteredEntries = filteredEntries.filter(entry => {
        const entryYear = new Date(entry.date).getFullYear()
        return entryYear === year
      })
    } else if (scope === 'month' && year && month) {
      filteredEntries = filteredEntries.filter(entry => {
        const date = new Date(entry.date)
        return date.getFullYear() === year && date.getMonth() + 1 === month
      })
    } else if (scope === 'custom' && fromDate && toDate) {
      const from = new Date(fromDate)
      const to = new Date(toDate)
      filteredEntries = filteredEntries.filter(entry => {
        const date = new Date(entry.date)
        return date >= from && date <= to
      })
    }

    filteredEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    generatePDF(profile, filteredEntries, scope, currentIsPro, currentLang)
    toast.success(currentLang === 'en' ? 'PDF generation started' : 'Generare PDF inițiată')
  }

  const handleUpgrade = () => {
    setIsPro(true)
    setUpgradeDialogOpen(false)
    toast.success(currentLang === 'en' ? 'Upgraded to Pro!' : 'Upgrade la Pro!')
  }

  const toggleLanguage = () => {
    setLang((currentLang) => (currentLang || 'en') === 'en' ? 'ro' : 'en')
  }

  const isProfileComplete = profile && profile.firstName && profile.lastName && 
    profile.address && profile.mobilePhone && profile.dateOfBirth && profile.certificateNumber

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Fan size={28} className="text-primary-foreground" weight="bold" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">
                  {text.app.title}
                </h1>
                <p className="text-xs text-muted-foreground">{text.app.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="font-semibold"
              >
                {currentLang === 'en' ? '🇬🇧 EN' : '🇷🇴 RO'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-8">
            <TabsTrigger value="dashboard">{text.nav.dashboard}</TabsTrigger>
            <TabsTrigger value="logbook">{text.nav.logbook}</TabsTrigger>
            <TabsTrigger value="profile">{text.nav.profile}</TabsTrigger>
            <TabsTrigger value="billing">{text.nav.billing}</TabsTrigger>
            <TabsTrigger value="privacy">{text.nav.privacy}</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardView
              profile={profile || null}
              entries={currentEntries}
              isPro={currentIsPro}
              lang={currentLang}
              onAddFlight={handleAddFlight}
              onViewLogbook={() => setActiveTab('logbook')}
              onCompleteProfile={() => setActiveTab('profile')}
              onDownloadPDF={() => {
                if (!isProfileComplete) {
                  toast.error(text.pdf.profileIncomplete)
                  setActiveTab('profile')
                  return
                }
                setPdfDialogOpen(true)
              }}
            />
          </TabsContent>

          <TabsContent value="logbook">
            <LogbookView
              entries={currentEntries}
              lang={currentLang}
              onAddFlight={handleAddFlight}
              onEditFlight={handleEditFlight}
              onDeleteFlight={handleDeleteFlight}
            />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileView
              profile={profile || null}
              onSave={handleSaveProfile}
              lang={currentLang}
            />
          </TabsContent>

          <TabsContent value="billing">
            <BillingView
              isPro={currentIsPro}
              entriesCount={currentEntries.length}
              lang={currentLang}
              onUpgrade={handleUpgrade}
            />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacyView lang={currentLang} />
          </TabsContent>
        </Tabs>
      </main>

      <FlightDialog
        open={flightDialogOpen}
        onClose={() => setFlightDialogOpen(false)}
        onSave={handleSaveFlight}
        editEntry={editingEntry}
        lang={currentLang}
      />

      <PDFExportDialog
        open={pdfDialogOpen}
        onClose={() => setPdfDialogOpen(false)}
        onExport={handleExportPDF}
        entries={currentEntries}
        lang={currentLang}
      />

      <UpgradeDialog
        open={upgradeDialogOpen}
        onClose={() => setUpgradeDialogOpen(false)}
        lang={currentLang}
      />

      <Toaster position="top-center" />
    </div>
  )
}

export default App