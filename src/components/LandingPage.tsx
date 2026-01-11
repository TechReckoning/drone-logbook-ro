import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Fan, AirplaneTakeoff, FileText, ShieldCheck, Clock, ChartBar } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { Language } from '@/lib/translations'

interface LandingPageProps {
  onGetStarted: () => void
  lang: Language
  toggleLanguage: () => void
}

const content = {
  en: {
    hero: {
      title: 'Professional UAS Flight Logbook',
      subtitle: 'Keep compliant with Romanian aviation regulations. Track your drone flights, manage your pilot profile, and generate official PDF logbooks.',
      cta: 'Get Started Free',
      learnMore: 'Learn More'
    },
    features: {
      title: 'Everything You Need to Stay Compliant',
      items: [
        {
          icon: AirplaneTakeoff,
          title: 'Flight Logging',
          description: 'Log flights with date, aircraft type, registration, route, and flight time in minutes'
        },
        {
          icon: FileText,
          title: 'PDF Export',
          description: 'Generate official logbook PDFs with timestamps and unique export IDs for AACR compliance'
        },
        {
          icon: ShieldCheck,
          title: 'Pilot Profile',
          description: 'Store your certification details, contact information, and credentials securely'
        },
        {
          icon: Clock,
          title: 'Time Tracking',
          description: 'Automatic flight time calculations and monthly summaries at a glance'
        },
        {
          icon: ChartBar,
          title: 'Statistics',
          description: 'View total flights, total hours, and monthly activity trends instantly'
        },
        {
          icon: Fan,
          title: 'Romanian Standards',
          description: 'Built specifically for Romanian UAS pilots following AACR guidelines'
        }
      ]
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      free: {
        title: 'Free',
        price: '€0',
        period: '/forever',
        description: 'Perfect for getting started',
        features: [
          'Up to 5 flight entries',
          'Pilot profile management',
          'Basic PDF export',
          'Flight statistics',
          'Bilingual support (EN/RO)'
        ],
        cta: 'Start Free'
      },
      pro: {
        title: 'Pro',
        price: '€3.99',
        period: '/month',
        yearlyPrice: '€29',
        yearlyPeriod: '/year',
        description: 'For professional pilots',
        features: [
          'Unlimited flight entries',
          'Watermark-free PDF exports',
          'Advanced filtering & search',
          'Custom date range exports',
          'Priority support'
        ],
        cta: 'Upgrade to Pro',
        popular: 'Most Popular'
      }
    },
    footer: {
      tagline: 'Professional flight logging for Romanian UAS pilots',
      rights: '© 2024 Drone Logbook RO. All rights reserved.'
    }
  },
  ro: {
    hero: {
      title: 'Jurnal Profesional de Zbor UAS',
      subtitle: 'Rămâi în conformitate cu reglementările aviatice românești. Urmărește zborurile cu drona, gestionează profilul de pilot și generează jurnale PDF oficiale.',
      cta: 'Începe Gratuit',
      learnMore: 'Află Mai Mult'
    },
    features: {
      title: 'Tot Ce Ai Nevoie Pentru Conformitate',
      items: [
        {
          icon: AirplaneTakeoff,
          title: 'Înregistrare Zboruri',
          description: 'Înregistrează zboruri cu dată, tip aeronavă, înmatriculare, traseu și timp de zbor'
        },
        {
          icon: FileText,
          title: 'Export PDF',
          description: 'Generează PDF-uri oficiale cu timestamp-uri și ID-uri unice de export pentru conformitate AACR'
        },
        {
          icon: ShieldCheck,
          title: 'Profil Pilot',
          description: 'Stochează securizat detaliile certificării, informații de contact și acreditări'
        },
        {
          icon: Clock,
          title: 'Urmărire Timp',
          description: 'Calcul automat al timpului de zbor și rezumate lunare rapid accesibile'
        },
        {
          icon: ChartBar,
          title: 'Statistici',
          description: 'Vezi total zboruri, ore totale și tendințe de activitate lunară instant'
        },
        {
          icon: Fan,
          title: 'Standarde Românești',
          description: 'Construit specific pentru piloți UAS din România urmând ghidurile AACR'
        }
      ]
    },
    pricing: {
      title: 'Prețuri Simple și Transparente',
      free: {
        title: 'Gratuit',
        price: '€0',
        period: '/permanent',
        description: 'Perfect pentru început',
        features: [
          'Până la 5 înregistrări de zbor',
          'Gestionare profil pilot',
          'Export PDF de bază',
          'Statistici de zbor',
          'Suport bilingv (EN/RO)'
        ],
        cta: 'Începe Gratuit'
      },
      pro: {
        title: 'Pro',
        price: '€3.99',
        period: '/lună',
        yearlyPrice: '€29',
        yearlyPeriod: '/an',
        description: 'Pentru piloți profesioniști',
        features: [
          'Înregistrări nelimitate',
          'Export PDF fără watermark',
          'Filtrare și căutare avansată',
          'Exporturi interval personalizat',
          'Suport prioritar'
        ],
        cta: 'Upgrade la Pro',
        popular: 'Cel Mai Popular'
      }
    },
    footer: {
      tagline: 'Înregistrare profesională de zboruri pentru piloți UAS din România',
      rights: '© 2024 Drone Logbook RO. Toate drepturile rezervate.'
    }
  }
}

export function LandingPage({ onGetStarted, lang, toggleLanguage }: LandingPageProps) {
  const t = content[lang]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative">
        <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="p-2 bg-primary rounded-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Fan size={28} className="text-primary-foreground" weight="bold" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-foreground tracking-tight">
                    Drone Logbook RO
                  </h1>
                  <p className="text-xs text-muted-foreground">UAS Pilot Flight Log</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="font-semibold"
              >
                {lang === 'en' ? '🇬🇧 EN' : '🇷🇴 RO'}
              </Button>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-20 md:py-32">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              {t.hero.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <AirplaneTakeoff size={24} className="mr-2" weight="bold" />
                {t.hero.cta}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {t.hero.learnMore}
              </Button>
            </div>
          </motion.div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.features.title}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {t.features.items.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                        <Icon size={32} className="text-primary" weight="bold" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 bg-muted/50">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.pricing.title}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl">{t.pricing.free.title}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{t.pricing.free.price}</span>
                    <span className="text-muted-foreground">{t.pricing.free.period}</span>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {t.pricing.free.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {t.pricing.free.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" weight="bold" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    size="lg"
                    onClick={onGetStarted}
                  >
                    {t.pricing.free.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-primary border-2 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {t.pricing.pro.popular}
                </div>
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl">{t.pricing.pro.title}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{t.pricing.pro.price}</span>
                    <span className="text-muted-foreground">{t.pricing.pro.period}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {lang === 'en' ? 'or ' : 'sau '}{t.pricing.pro.yearlyPrice}{t.pricing.pro.yearlyPeriod}
                  </div>
                  <CardDescription className="text-base mt-2">
                    {t.pricing.pro.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {t.pricing.pro.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" weight="bold" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={onGetStarted}
                  >
                    {t.pricing.pro.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <footer className="border-t bg-card">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                {t.footer.tagline}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.rights}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
