import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useState, useEffect } from 'react'
import type { PilotProfile } from '@/lib/types'
import type { Language } from '@/lib/translations'
import { t } from '@/lib/translations'
import { User, SignOut, Trash } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ProfileViewProps {
  profile: PilotProfile | null
  onSave: (profile: PilotProfile) => void
  onLogout: () => void
  onDeleteAccount: () => void
  lang: Language
}

export function ProfileView({ profile, onSave, onLogout, onDeleteAccount, lang }: ProfileViewProps) {
  const text = t(lang)
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const [landlinePhone, setLandlinePhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [certificateNumber, setCertificateNumber] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '')
      setLastName(profile.lastName || '')
      setAddress(profile.address || '')
      setMobilePhone(profile.mobilePhone || '')
      setLandlinePhone(profile.landlinePhone || '')
      setDateOfBirth(profile.dateOfBirth || '')
      setCertificateNumber(profile.certificateNumber || '')
    }
  }, [profile])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!firstName.trim()) newErrors.firstName = text.validation.required
    if (!lastName.trim()) newErrors.lastName = text.validation.required
    if (!address.trim()) newErrors.address = text.validation.required
    if (!mobilePhone.trim()) newErrors.mobilePhone = text.validation.required
    if (!dateOfBirth) newErrors.dateOfBirth = text.validation.required
    if (!certificateNumber.trim()) newErrors.certificateNumber = text.validation.required

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return

    const updatedProfile: PilotProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      address: address.trim(),
      mobilePhone: mobilePhone.trim(),
      landlinePhone: landlinePhone.trim() || undefined,
      dateOfBirth,
      certificateNumber: certificateNumber.trim()
    }

    onSave(updatedProfile)
    toast.success(lang === 'en' ? 'Profile saved successfully' : 'Profil salvat cu succes')
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          {text.profile.title}
        </h1>
        <p className="text-muted-foreground">
          {text.profile.description}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={24} className="text-primary" />
            {text.profile.title}
          </CardTitle>
          <CardDescription>
            {lang === 'en' 
              ? 'Required for official PDF exports compliant with AACR standards' 
              : 'Necesar pentru exporturi PDF oficiale conforme cu standardele AACR'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">{text.profile.firstName} *</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={errors.firstName ? 'border-destructive' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">{text.profile.lastName} *</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={errors.lastName ? 'border-destructive' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">{text.profile.address} *</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={errors.address ? 'border-destructive' : ''}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobilePhone">{text.profile.mobilePhone} *</Label>
              <Input
                id="mobilePhone"
                type="tel"
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
                placeholder="+40 xxx xxx xxx"
                className={errors.mobilePhone ? 'border-destructive' : ''}
              />
              {errors.mobilePhone && (
                <p className="text-sm text-destructive">{errors.mobilePhone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="landlinePhone">
                {text.profile.landlinePhone} ({text.profile.optional})
              </Label>
              <Input
                id="landlinePhone"
                type="tel"
                value={landlinePhone}
                onChange={(e) => setLandlinePhone(e.target.value)}
                placeholder="+40 xxx xxx xxx"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">{text.profile.dateOfBirth} *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={errors.dateOfBirth ? 'border-destructive' : ''}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificateNumber">{text.profile.certificateNumber} *</Label>
              <Input
                id="certificateNumber"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                placeholder="RO-XXXX-XXXX"
                className={errors.certificateNumber ? 'border-destructive' : ''}
              />
              {errors.certificateNumber && (
                <p className="text-sm text-destructive">{errors.certificateNumber}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              {text.profile.save}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="text-lg">{text.profile.accountManagement}</CardTitle>
          <CardDescription>
            {lang === 'en' 
              ? 'Manage your account settings and data' 
              : 'Gestionează setările și datele contului'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background rounded-lg">
                <SignOut size={20} className="text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{text.profile.logout}</h3>
                <p className="text-xs text-muted-foreground">
                  {lang === 'en' 
                    ? 'Sign out from your account' 
                    : 'Deconectează-te din cont'}
                </p>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  {text.profile.logoutButton}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{text.profile.logoutConfirm}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {text.profile.logoutDescription}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{text.common.cancel}</AlertDialogCancel>
                  <AlertDialogAction onClick={onLogout}>
                    {text.profile.logoutButton}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-background rounded-lg">
                <Trash size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-destructive">{text.profile.deleteAccount}</h3>
                <p className="text-xs text-muted-foreground">
                  {lang === 'en' 
                    ? 'Permanently remove all your data' 
                    : 'Șterge permanent toate datele tale'}
                </p>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  {text.profile.deleteButton}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{text.profile.deleteConfirm}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {text.profile.deleteDescription}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{text.common.cancel}</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onDeleteAccount}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {text.profile.deleteButton}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
