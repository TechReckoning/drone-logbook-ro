import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Fan, AirplaneTakeoff, FileText, ShieldCheck, Clock, ChartBar } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { Language } from '@/lib/translations'

interface LandingPageProps {
  onGetStarted: () => void
  lang: Language
  toggleLanguage: () => void
  onPrivacyClick?: () => void
  onTermsClick?: () => void
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
      monthly: {
        title: 'Pro Monthly',
        price: '€3.99',
        period: '/month',
        description: 'Flexible monthly billing',
        features: [
          'Unlimited flight entries',
          'Watermark-free PDF exports',
          'Advanced filtering & search',
          'Custom date range exports',
          'Priority support'
        ],
        cta: 'Start Monthly'
      },
      yearly: {
        title: 'Pro Yearly',
        price: '€29',
        period: '/year',
        description: 'Best value for professionals',
        savings: 'Save €19/year',
        features: [
          'Unlimited flight entries',
          'Watermark-free PDF exports',
          'Advanced filtering & search',
          'Custom date range exports',
          'Priority support',
          '2 months free'
        ],
        cta: 'Start Yearly',
        popular: 'Most Popular'
      }
    },
    footer: {
      tagline: 'Professional flight logging for Romanian UAS pilots',
      rights: '© 2024 Drone Logbook RO. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
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
      monthly: {
        title: 'Pro Lunar',
        price: '€3.99',
        period: '/lună',
        description: 'Facturare lunară flexibilă',
        features: [
          'Înregistrări nelimitate',
          'Export PDF fără watermark',
          'Filtrare și căutare avansată',
          'Exporturi interval personalizat',
          'Suport prioritar'
        ],
        cta: 'Începe Lunar'
      },
      yearly: {
        title: 'Pro Anual',
        price: '€29',
        period: '/an',
        description: 'Cea mai bună valoare',
        savings: 'Economisești €19/an',
        features: [
          'Înregistrări nelimitate',
          'Export PDF fără watermark',
          'Filtrare și căutare avansată',
          'Exporturi interval personalizat',
          'Suport prioritar',
          '2 luni gratuite'
        ],
        cta: 'Începe Anual',
        popular: 'Cel Mai Popular'
      }
    },
    footer: {
      tagline: 'Înregistrare profesională de zboruri pentru piloți UAS din România',
      rights: '© 2024 Drone Logbook RO. Toate drepturile rezervate.',
      privacy: 'Politica de Confidențialitate',
      terms: 'Termeni și Condiții'
    }
  }
}

export function LandingPage({ onGetStarted, lang, toggleLanguage, onPrivacyClick, onTermsClick }: LandingPageProps) {
  const t = content[lang]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <motion.div 
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[80px]"
        animate={{
          x: [-200, -150, -200],
          y: [-200, -250, -200],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="drone-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <motion.circle 
              cx="50" 
              cy="50" 
              r="2" 
              fill="currentColor"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.circle 
              cx="20" 
              cy="30" 
              r="1.5" 
              fill="currentColor"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle 
              cx="80" 
              cy="70" 
              r="1.5" 
              fill="currentColor"
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#drone-pattern)" />
      </svg>
      
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

        <section className="container mx-auto px-4 py-20 md:py-32 relative">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
                delay: i * 2,
              }}
            >
              <Fan size={24 + Math.random() * 32} weight="bold" />
            </motion.div>
          ))}
          
          <motion.div 
            className="max-w-4xl mx-auto text-center relative z-10"
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

        <section id="features" className="container mx-auto px-4 py-20 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M 0 100 Q 200 50, 400 100 T 800 100"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              <motion.path
                d="M 800 200 Q 600 150, 400 200 T 0 200"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
          </div>
          
          <motion.div 
            className="text-center mb-16 relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.features.title}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
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
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardHeader>
                      <motion.div 
                        className="p-3 bg-primary/10 rounded-lg w-fit mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon size={32} className="text-primary" weight="bold" />
                      </motion.div>
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

        <section className="container mx-auto px-4 py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
          
          <motion.div 
            className="text-center mb-16 relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.pricing.title}
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full backdrop-blur-sm bg-card/80">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full backdrop-blur-sm bg-card/80">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl">{t.pricing.monthly.title}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{t.pricing.monthly.price}</span>
                    <span className="text-muted-foreground">{t.pricing.monthly.period}</span>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {t.pricing.monthly.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {t.pricing.monthly.features.map((feature, index) => (
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
                    {t.pricing.monthly.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full border-primary border-2 relative overflow-hidden backdrop-blur-sm bg-card/80 shadow-xl">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"
                  animate={{
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
                  {t.pricing.yearly.popular}
                </div>
                <CardHeader className="pb-8 relative z-10">
                  <CardTitle className="text-2xl">{t.pricing.yearly.title}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{t.pricing.yearly.price}</span>
                    <span className="text-muted-foreground">{t.pricing.yearly.period}</span>
                  </div>
                  <div className="text-sm font-semibold text-primary mt-1">
                    {t.pricing.yearly.savings}
                  </div>
                  <CardDescription className="text-base mt-2">
                    {t.pricing.yearly.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                  <ul className="space-y-3">
                    {t.pricing.yearly.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" weight="bold" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full shadow-lg" 
                    size="lg"
                    onClick={onGetStarted}
                  >
                    {t.pricing.yearly.cta}
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
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onPrivacyClick}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t.footer.privacy}
                </Button>
                <div className="w-px h-4 bg-border" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onTermsClick}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t.footer.terms}
                </Button>
              </div>
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
