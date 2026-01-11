import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Check } from '@phosphor-icons/react'
import type { Language } from '@/lib/translations'
import { t } from '@/lib/translations'

interface BillingViewProps {
  isPro: boolean
  entriesCount: number
  lang: Language
  onUpgrade: () => void
}

export function BillingView({ isPro, entriesCount, lang, onUpgrade }: BillingViewProps) {
  const text = t(lang)

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          {text.billing.title}
        </h1>
        <p className="text-muted-foreground">
          {lang === 'en' 
            ? 'Manage your subscription and billing' 
            : 'Gestionează abonamentul și facturarea'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard size={24} className="text-primary" />
              {text.billing.currentPlan}
            </span>
            <Badge variant={isPro ? "default" : "secondary"} className={isPro ? "bg-accent text-accent-foreground" : ""}>
              {isPro ? text.billing.pro : text.billing.free}
            </Badge>
          </CardTitle>
          <CardDescription>
            {isPro ? text.billing.proDescription : text.billing.freeDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isPro && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {entriesCount}/5 {text.billing.entriesUsed}
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(entriesCount / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {!isPro && (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-2">{text.billing.pricing}</h2>
            <p className="text-muted-foreground">
              {lang === 'en' 
                ? 'Upgrade to Pro for unlimited entries and professional exports' 
                : 'Upgrade la Pro pentru înregistrări nelimitate și exporturi profesionale'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {text.billing.monthly}
                  <Badge variant="outline">€3.99</Badge>
                </CardTitle>
                <CardDescription>
                  {text.billing.perMonth}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check size={20} className="text-primary flex-shrink-0" weight="bold" />
                    <span className="text-sm">{text.billing.unlimitedEntries}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={20} className="text-primary flex-shrink-0" weight="bold" />
                    <span className="text-sm">{text.billing.noWatermark}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={20} className="text-primary flex-shrink-0" weight="bold" />
                    <span className="text-sm">{text.billing.customRanges}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={20} className="text-primary flex-shrink-0" weight="bold" />
                    <span className="text-sm">{text.billing.prioritySupport}</span>
                  </div>
                </div>
                <Button onClick={onUpgrade} className="w-full bg-primary hover:bg-primary/90">
                  {text.billing.upgrade}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent hover:shadow-xl transition-all relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                BEST VALUE
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {text.billing.yearly}
                  <Badge className="bg-accent text-accent-foreground">€29</Badge>
                </CardTitle>
                <CardDescription>
                  {text.billing.perYear} · {lang === 'en' ? 'Save 39%' : 'Economisește 39%'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check size={20} className="text-accent flex-shrink-0" weight="bold" />
                    <span className="text-sm">{text.billing.unlimitedEntries}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={20} className="text-accent flex-shrink-0" weight="bold" />
                    <span className="text-sm">{text.billing.noWatermark}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={20} className="text-accent flex-shrink-0" weight="bold" />
                    <span className="text-sm">{text.billing.customRanges}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check size={20} className="text-accent flex-shrink-0" weight="bold" />
                    <span className="text-sm">{text.billing.prioritySupport}</span>
                  </div>
                </div>
                <Button onClick={onUpgrade} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {text.billing.upgrade}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-secondary/30">
            <CardContent className="py-6">
              <p className="text-sm text-center text-muted-foreground">
                {lang === 'en' 
                  ? 'This is a demo application. Payment processing is simulated for demonstration purposes.' 
                  : 'Aceasta este o aplicație demo. Procesarea plăților este simulată în scop demonstrativ.'}
              </p>
            </CardContent>
          </Card>
        </>
      )}

      {isPro && (
        <Card className="bg-accent/10 border-accent">
          <CardContent className="py-8">
            <div className="text-center space-y-2">
              <Check size={48} className="text-accent mx-auto mb-4" weight="bold" />
              <h3 className="text-xl font-bold">
                {lang === 'en' ? 'You\'re a Pro member!' : 'Ești membru Pro!'}
              </h3>
              <p className="text-muted-foreground">
                {lang === 'en' 
                  ? 'Enjoy unlimited flight entries and professional PDF exports' 
                  : 'Bucură-te de înregistrări nelimitate și exporturi PDF profesionale'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
