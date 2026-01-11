import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  Certificate, 
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from '@phosphor-icons/react'
import type { PilotProfile } from '@/lib/types'
import type { Language } from '@/lib/translations'

interface OnboardingFlowProps {
  onComplete: (profile: PilotProfile) => void
  lang: Language
}

const content = {
  en: {
    title: 'Welcome to Drone Logbook RO',
    subtitle: "Let's set up your pilot profile in 3 easy steps",
    steps: [
      {
        title: 'Personal Information',
        description: 'Enter your basic details'
      },
      {
        title: 'Contact Details',
        description: 'How can authorities reach you?'
      },
      {
        title: 'Certification',
        description: 'Your pilot credentials'
      }
    ],
    fields: {
      firstName: 'First Name',
      firstNamePlaceholder: 'John',
      lastName: 'Last Name',
      lastNamePlaceholder: 'Doe',
      address: 'Address',
      addressPlaceholder: 'Street, City, Country',
      mobilePhone: 'Mobile Phone',
      mobilePhonePlaceholder: '+40 712 345 678',
      landlinePhone: 'Landline Phone (Optional)',
      landlinePhonePlaceholder: '+40 21 234 5678',
      dateOfBirth: 'Date of Birth',
      certificateNumber: 'Remote Pilot Certificate Number',
      certificateNumberPlaceholder: 'e.g., RO-UAS-12345'
    },
    actions: {
      next: 'Next',
      back: 'Back',
      finish: 'Complete Setup',
      skip: 'Skip for now'
    },
    completion: {
      title: 'All Set!',
      description: 'Your pilot profile is complete. You can now start logging flights and generate official PDF exports.',
      cta: 'Go to Dashboard'
    },
    validation: {
      required: 'This field is required'
    }
  },
  ro: {
    title: 'Bun venit la Drone Logbook RO',
    subtitle: 'Să configurăm profilul tău de pilot în 3 pași simpli',
    steps: [
      {
        title: 'Informații Personale',
        description: 'Introduceți detaliile de bază'
      },
      {
        title: 'Detalii de Contact',
        description: 'Cum pot autoritățile să vă contacteze?'
      },
      {
        title: 'Certificare',
        description: 'Acreditările dumneavoastră de pilot'
      }
    ],
    fields: {
      firstName: 'Prenume',
      firstNamePlaceholder: 'Ion',
      lastName: 'Nume',
      lastNamePlaceholder: 'Popescu',
      address: 'Adresă',
      addressPlaceholder: 'Stradă, Oraș, Țară',
      mobilePhone: 'Telefon Mobil',
      mobilePhonePlaceholder: '+40 712 345 678',
      landlinePhone: 'Telefon Fix (Opțional)',
      landlinePhonePlaceholder: '+40 21 234 5678',
      dateOfBirth: 'Data Nașterii',
      certificateNumber: 'Număr Certificat Pilot Telecomandă',
      certificateNumberPlaceholder: 'ex: RO-UAS-12345'
    },
    actions: {
      next: 'Următorul',
      back: 'Înapoi',
      finish: 'Finalizează Configurarea',
      skip: 'Omite deocamdată'
    },
    completion: {
      title: 'Totul Gata!',
      description: 'Profilul tău de pilot este complet. Poți începe acum să înregistrezi zboruri și să generezi exporturi PDF oficiale.',
      cta: 'Mergi la Panou'
    },
    validation: {
      required: 'Acest câmp este obligatoriu'
    }
  }
}

export function OnboardingFlow({ onComplete, lang }: OnboardingFlowProps) {
  const t = content[lang]
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  
  const [formData, setFormData] = useState<PilotProfile>({
    firstName: '',
    lastName: '',
    address: '',
    mobilePhone: '',
    landlinePhone: '',
    dateOfBirth: '',
    certificateNumber: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 3
  const progress = ((currentStep + 1) / totalSteps) * 100

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 0) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = t.validation.required
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = t.validation.required
      }
    } else if (step === 1) {
      if (!formData.address.trim()) {
        newErrors.address = t.validation.required
      }
      if (!formData.mobilePhone.trim()) {
        newErrors.mobilePhone = t.validation.required
      }
    } else if (step === 2) {
      if (!formData.dateOfBirth.trim()) {
        newErrors.dateOfBirth = t.validation.required
      }
      if (!formData.certificateNumber.trim()) {
        newErrors.certificateNumber = t.validation.required
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setIsComplete(true)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const handleComplete = () => {
    onComplete(formData)
  }

  const updateField = (field: keyof PilotProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="text-center">
            <CardHeader className="space-y-6 pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mx-auto p-4 bg-primary/10 rounded-full w-fit"
              >
                <CheckCircle size={64} className="text-primary" weight="fill" />
              </motion.div>
              <div>
                <CardTitle className="text-3xl mb-3">{t.completion.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t.completion.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleComplete}
              >
                {t.completion.cta}
                <ArrowRight size={20} className="ml-2" weight="bold" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px),
                            repeating-linear-gradient(90deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="w-full max-w-2xl relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-4">
            {t.steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex-1 text-center ${
                  index <= currentStep ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className="text-xs font-medium text-muted-foreground">
                  {lang === 'en' ? `Step ${index + 1}` : `Pasul ${index + 1}`}
                </div>
                <div className="text-sm font-semibold mt-1">{step.title}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t.steps[currentStep].title}</CardTitle>
                <CardDescription className="text-base">
                  {t.steps[currentStep].description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === 0 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex items-center gap-2">
                        <User size={16} weight="bold" />
                        {t.fields.firstName}
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateField('firstName', e.target.value)}
                        placeholder={t.fields.firstNamePlaceholder}
                        className={errors.firstName ? 'border-destructive' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="flex items-center gap-2">
                        <User size={16} weight="bold" />
                        {t.fields.lastName}
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateField('lastName', e.target.value)}
                        placeholder={t.fields.lastNamePlaceholder}
                        className={errors.lastName ? 'border-destructive' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName}</p>
                      )}
                    </div>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <MapPin size={16} weight="bold" />
                        {t.fields.address}
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        placeholder={t.fields.addressPlaceholder}
                        className={errors.address ? 'border-destructive' : ''}
                      />
                      {errors.address && (
                        <p className="text-sm text-destructive">{errors.address}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mobilePhone" className="flex items-center gap-2">
                        <Phone size={16} weight="bold" />
                        {t.fields.mobilePhone}
                      </Label>
                      <Input
                        id="mobilePhone"
                        type="tel"
                        value={formData.mobilePhone}
                        onChange={(e) => updateField('mobilePhone', e.target.value)}
                        placeholder={t.fields.mobilePhonePlaceholder}
                        className={errors.mobilePhone ? 'border-destructive' : ''}
                      />
                      {errors.mobilePhone && (
                        <p className="text-sm text-destructive">{errors.mobilePhone}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landlinePhone" className="flex items-center gap-2">
                        <Phone size={16} weight="bold" />
                        {t.fields.landlinePhone}
                      </Label>
                      <Input
                        id="landlinePhone"
                        type="tel"
                        value={formData.landlinePhone}
                        onChange={(e) => updateField('landlinePhone', e.target.value)}
                        placeholder={t.fields.landlinePhonePlaceholder}
                      />
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                        <Calendar size={16} weight="bold" />
                        {t.fields.dateOfBirth}
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateField('dateOfBirth', e.target.value)}
                        className={errors.dateOfBirth ? 'border-destructive' : ''}
                      />
                      {errors.dateOfBirth && (
                        <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certificateNumber" className="flex items-center gap-2">
                        <Certificate size={16} weight="bold" />
                        {t.fields.certificateNumber}
                      </Label>
                      <Input
                        id="certificateNumber"
                        value={formData.certificateNumber}
                        onChange={(e) => updateField('certificateNumber', e.target.value)}
                        placeholder={t.fields.certificateNumberPlaceholder}
                        className={errors.certificateNumber ? 'border-destructive' : ''}
                      />
                      {errors.certificateNumber && (
                        <p className="text-sm text-destructive">{errors.certificateNumber}</p>
                      )}
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1"
                    >
                      <ArrowLeft size={20} className="mr-2" weight="bold" />
                      {t.actions.back}
                    </Button>
                  )}
                  <Button
                    onClick={handleNext}
                    className="flex-1"
                  >
                    {currentStep === totalSteps - 1 ? t.actions.finish : t.actions.next}
                    {currentStep < totalSteps - 1 && (
                      <ArrowRight size={20} className="ml-2" weight="bold" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
