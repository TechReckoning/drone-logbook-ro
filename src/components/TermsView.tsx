import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Language } from '@/lib/translations'

interface TermsViewProps {
  lang: Language
}

export function TermsView({ lang }: TermsViewProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            {lang === 'en' ? 'Terms of Service' : 'Termeni și Condiții'}
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
                <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Drone Logbook RO, you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to these terms, please do not use 
                  this application.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Use License</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Permission is granted to use Drone Logbook RO for personal or commercial drone flight 
                  logging purposes. This license shall automatically terminate if you violate any of these 
                  restrictions.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">User Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Maintaining the accuracy of your flight log entries</li>
                  <li>Ensuring all logged flights comply with Romanian and EU aviation regulations</li>
                  <li>Keeping your pilot profile information current and accurate</li>
                  <li>Protecting your device and account access credentials</li>
                  <li>Backing up your flight data as needed</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Regulatory Compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This application is designed to assist with flight logging for UAS (Unmanned Aircraft Systems) 
                  operations in Romania. Users are solely responsible for ensuring their flight operations comply 
                  with all applicable regulations, including but not limited to Romanian Civil Aviation Authority 
                  (AACR) requirements and European Union Aviation Safety Agency (EASA) regulations.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to provide continuous access to Drone Logbook RO, but we do not guarantee that 
                  the service will be uninterrupted or error-free. We reserve the right to modify, suspend, 
                  or discontinue any aspect of the service at any time.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Subscription Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The application offers both Free and Pro subscription tiers:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Free Plan:</strong> Limited to 5 flight entries with watermarked PDF exports</li>
                  <li><strong>Pro Plan:</strong> Unlimited entries and watermark-free PDF exports</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Pro subscription fees are non-refundable. You may cancel your subscription at any time, 
                  and it will remain active until the end of the current billing period.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Data Accuracy Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we provide tools to log and export your flight data, we cannot guarantee the accuracy 
                  or completeness of the information you enter. You are responsible for verifying all data 
                  before submitting it to regulatory authorities or using it for official purposes.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Drone Logbook RO and its operators shall not be liable for any direct, indirect, incidental, 
                  consequential, or punitive damages arising from your use or inability to use the service. 
                  This includes, but is not limited to, data loss, regulatory non-compliance, or operational 
                  issues resulting from the use of this application.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The application interface, design, and underlying code are the intellectual property of 
                  Drone Logbook RO. You retain ownership of all flight data you enter into the application.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Prohibited Uses</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You may not use this application to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Falsify flight records or data</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Attempt to reverse engineer, decompile, or hack the application</li>
                  <li>Use the service for any unlawful purpose</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Modifications to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective 
                  immediately upon posting with an updated "Last updated" date. Your continued use of the 
                  application after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with the laws of 
                  Romania, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us through the 
                  application's support channels.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Acceptarea Termenilor</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Accesând și utilizând Drone Logbook RO, acceptați și sunteți de acord să fiți legat de 
                  termenii și prevederile acestui acord. Dacă nu sunteți de acord cu acești termeni, 
                  vă rugăm să nu utilizați această aplicație.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Licență de Utilizare</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vi se acordă permisiunea de a utiliza Drone Logbook RO pentru înregistrarea zborurilor 
                  cu drona în scop personal sau comercial. Această licență va înceta automat dacă încălcați 
                  oricare dintre aceste restricții.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Responsabilități Utilizator</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sunteți responsabil pentru:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Menținerea acurateței înregistrărilor din jurnalul de zbor</li>
                  <li>Asigurarea că toate zborurile înregistrate respectă reglementările aviatice din România și UE</li>
                  <li>Păstrarea informațiilor din profilul de pilot actualizate și corecte</li>
                  <li>Protejarea dispozitivului și credențialelor de acces la cont</li>
                  <li>Realizarea de copii de siguranță a datelor de zbor după necesitate</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Conformitate Reglementară</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Această aplicație este concepută pentru a asista cu înregistrarea zborurilor pentru operațiuni 
                  UAS (Sisteme Aeriene fără Pilot) în România. Utilizatorii sunt singurii responsabili pentru 
                  asigurarea conformității operațiunilor lor de zbor cu toate reglementările aplicabile, 
                  inclusiv, dar fără a se limita la cerințele Autorității Aeronautice Civile Române (AACR) 
                  și reglementările Agenției Europene pentru Siguranța Aviației (EASA).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Disponibilitatea Serviciului</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ne străduim să oferim acces continuu la Drone Logbook RO, dar nu garantăm că serviciul 
                  va fi neîntrerupt sau fără erori. Ne rezervăm dreptul de a modifica, suspenda sau 
                  întrerupe orice aspect al serviciului în orice moment.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Termeni Abonament</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Aplicația oferă niveluri de abonament Gratuit și Pro:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li><strong>Plan Gratuit:</strong> Limitat la 5 înregistrări cu exporturi PDF cu watermark</li>
                  <li><strong>Plan Pro:</strong> Înregistrări nelimitate și exporturi PDF fără watermark</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Taxele de abonament Pro nu sunt rambursabile. Puteți anula abonamentul în orice moment, 
                  iar acesta va rămâne activ până la sfârșitul perioadei curente de facturare.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Declinarea Responsabilității pentru Acuratețea Datelor</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Deși oferim instrumente pentru înregistrarea și exportul datelor de zbor, nu putem garanta 
                  acuratețea sau completitudinea informațiilor pe care le introduceți. Sunteți responsabil 
                  pentru verificarea tuturor datelor înainte de a le trimite autorităților de reglementare 
                  sau de a le folosi în scopuri oficiale.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Limitarea Răspunderii</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Drone Logbook RO și operatorii săi nu vor fi răspunzători pentru niciun prejudiciu direct, 
                  indirect, incidental, consecvent sau punitiv rezultat din utilizarea sau imposibilitatea 
                  de a utiliza serviciul. Aceasta include, dar nu se limitează la pierderea de date, 
                  neconformitatea reglementară sau probleme operaționale rezultate din utilizarea acestei aplicații.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Proprietate Intelectuală</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Interfața aplicației, designul și codul sursă sunt proprietatea intelectuală a 
                  Drone Logbook RO. Păstrați dreptul de proprietate asupra tuturor datelor de zbor 
                  pe care le introduceți în aplicație.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Utilizări Interzise</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nu puteți utiliza această aplicație pentru:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Falsificarea înregistrărilor sau datelor de zbor</li>
                  <li>Încălcarea oricăror legi sau reglementări aplicabile</li>
                  <li>Încercarea de a ingineri invers, decompila sau hacking-ui aplicația</li>
                  <li>Utilizarea serviciului în orice scop ilegal</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Modificări ale Termenilor</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ne rezervăm dreptul de a modifica acești Termeni și Condiții în orice moment. 
                  Modificările vor intra în vigoare imediat după publicare cu o dată actualizată 
                  "Ultima actualizare". Utilizarea continuă a aplicației după modificări constituie 
                  acceptarea termenilor modificați.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Legea Aplicabilă</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Acești Termeni și Condiții vor fi guvernați și interpretați în conformitate cu legile 
                  României, fără a ține cont de dispozițiile sale privind conflictul de legi.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Informații de Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Dacă aveți întrebări despre acești Termeni și Condiții, vă rugăm să ne contactați 
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
