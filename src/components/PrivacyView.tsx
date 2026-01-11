import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Language } from '@/lib/translations'

interface PrivacyViewProps {
  lang: Language
}

export function PrivacyView({ lang }: PrivacyViewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            {lang === 'en' ? 'Privacy Policy' : 'Politica de Confidențialitate'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {lang === 'en' ? 'Last updated: ' : 'Ultima actualizare: '}
            {new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'ro-RO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </CardHeader>
        <CardContent className="space-y-6 text-foreground">
          {lang === 'en' ? (
            <>
              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy explains how Drone Logbook RO handles your information. 
                  We are committed to protecting your privacy and ensuring your data remains secure.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Data Storage</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All your data is stored locally on your device. This includes your pilot profile, 
                  flight entries, and application preferences. We do not transmit, store, or process 
                  any of your personal information on external servers.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The application collects the following information, which is stored exclusively on your device:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Pilot profile information (name, address, phone numbers, date of birth, certificate number)</li>
                  <li>Flight log entries (date, time, location, aircraft details, flight purpose, observations)</li>
                  <li>Application settings and preferences</li>
                  <li>Subscription status (Pro/Free tier)</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information is used solely for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Displaying your flight logbook and statistics</li>
                  <li>Generating PDF exports of your flight logs</li>
                  <li>Maintaining your application preferences</li>
                  <li>Providing the core functionality of the flight logging application</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Since all data is stored locally on your device, you have full control over your information. 
                  We recommend keeping your device secure with appropriate passwords and security measures.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This application does not integrate with any third-party analytics, tracking, or advertising services.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Data Deletion</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You can delete your data at any time by clearing your browser's local storage or 
                  by deleting entries individually within the application. This action is irreversible.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be reflected 
                  with an updated "Last updated" date at the top of this page.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us through the 
                  application's support channels.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Introducere</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Această Politică de Confidențialitate explică modul în care Drone Logbook RO gestionează 
                  informațiile dvs. Ne angajăm să vă protejăm confidențialitatea și să asigurăm securitatea datelor.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Stocarea Datelor</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Toate datele dvs. sunt stocate local pe dispozitivul dvs. Acestea includ profilul de pilot, 
                  înregistrările de zbor și preferințele aplicației. Nu transmitem, stocăm sau procesăm 
                  niciuna dintre informațiile dvs. personale pe servere externe.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Informații pe Care le Colectăm</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Aplicația colectează următoarele informații, care sunt stocate exclusiv pe dispozitivul dvs.:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Informații profil pilot (nume, adresă, numere de telefon, data nașterii, număr certificat)</li>
                  <li>Înregistrări jurnal de zbor (dată, oră, locație, detalii aeronavă, scop zbor, observații)</li>
                  <li>Setări și preferințe ale aplicației</li>
                  <li>Status abonament (Pro/Gratuit)</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Cum Folosim Informațiile Dvs.</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Informațiile dvs. sunt folosite exclusiv pentru:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Afișarea jurnalului de zbor și a statisticilor</li>
                  <li>Generarea de exporturi PDF ale jurnalelor de zbor</li>
                  <li>Menținerea preferințelor aplicației</li>
                  <li>Furnizarea funcționalității de bază a aplicației de înregistrare a zborurilor</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Securitatea Datelor</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Deoarece toate datele sunt stocate local pe dispozitivul dvs., aveți control complet 
                  asupra informațiilor dvs. Recomandăm să vă protejați dispozitivul cu parole și măsuri 
                  de securitate adecvate.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Servicii Terțe</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Această aplicație nu se integrează cu niciun serviciu terț de analiză, urmărire sau publicitate.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Ștergerea Datelor</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Puteți șterge datele dvs. oricând prin ștergerea stocării locale a browserului sau 
                  prin ștergerea înregistrărilor individual în aplicație. Această acțiune este ireversibilă.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Modificări ale Acestei Politici</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Putem actualiza această Politică de Confidențialitate din când în când. Orice modificări 
                  vor fi reflectate cu o dată actualizată "Ultima actualizare" în partea de sus a acestei pagini.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă aveți întrebări despre această Politică de Confidențialitate, vă rugăm să ne contactați 
                  prin canalele de asistență ale aplicației.
                </p>
              </section>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
