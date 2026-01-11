import type { PilotProfile, FlightEntry, ExportMetadata } from './types'
import { minutesToTime, formatDate, getBucharestTimestamp, generateExportId } from './helpers'
import type { Language } from './translations'

export async function generatePDF(
  profile: PilotProfile,
  entries: FlightEntry[],
  scope: string,
  isPro: boolean,
  lang: Language
): Promise<void> {
  const metadata: ExportMetadata = {
    id: generateExportId(),
    generatedAt: getBucharestTimestamp(),
    scope: scope as any
  }

  const html = generateHTMLForPDF(profile, entries, metadata, isPro, lang)
  
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Please allow popups to download PDF')
    return
  }

  printWindow.document.write(html)
  printWindow.document.close()
  
  setTimeout(() => {
    printWindow.print()
  }, 500)
}

function generateHTMLForPDF(
  profile: PilotProfile,
  entries: FlightEntry[],
  metadata: ExportMetadata,
  isPro: boolean,
  lang: Language
): string {
  const t = lang === 'en' ? {
    pilotProfile: 'Pilot Profile',
    flightLogbook: 'Flight Logbook',
    generatedOn: 'Generated on',
    exportId: 'Export ID',
    firstName: 'First Name',
    lastName: 'Last Name',
    address: 'Address',
    mobilePhone: 'Mobile Phone',
    landlinePhone: 'Landline Phone',
    dateOfBirth: 'Date of Birth',
    certificateNumber: 'Certificate Number',
    year: 'Year',
    month: 'Month',
    day: 'Day',
    type: 'Type',
    registration: 'Registration',
    route: 'Route',
    flightTime: 'Flight Time',
    total: 'Total',
    page: 'Page',
    watermark: 'FREE PLAN - Upgrade at dronelogbook.ro'
  } : {
    pilotProfile: 'Profil Pilot',
    flightLogbook: 'Jurnal de Zbor',
    generatedOn: 'Generat la',
    exportId: 'ID Export',
    firstName: 'Prenume',
    lastName: 'Nume',
    address: 'Adresă',
    mobilePhone: 'Telefon Mobil',
    landlinePhone: 'Telefon Fix',
    dateOfBirth: 'Data Nașterii',
    certificateNumber: 'Număr Certificat',
    year: 'An',
    month: 'Lună',
    day: 'Zi',
    type: 'Tip',
    registration: 'Înmatriculare',
    route: 'Traseu',
    flightTime: 'Timp Zbor',
    total: 'Total',
    page: 'Pagina',
    watermark: 'PLAN GRATUIT - Upgrade la dronelogbook.ro'
  }

  const totalMinutes = entries.reduce((sum, entry) => sum + entry.timeMinutes, 0)

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Drone Logbook Export</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    @page {
      size: A4;
      margin: 20mm;
    }
    
    body {
      font-family: 'Inter', 'Arial', sans-serif;
      font-size: 10pt;
      line-height: 1.4;
      color: #1a1a1a;
    }
    
    h1 {
      font-family: 'Space Grotesk', 'Arial', sans-serif;
      font-size: 18pt;
      font-weight: 600;
      margin-bottom: 10mm;
      color: #3557B0;
      border-bottom: 2px solid #3557B0;
      padding-bottom: 5mm;
    }
    
    h2 {
      font-family: 'Space Grotesk', 'Arial', sans-serif;
      font-size: 14pt;
      font-weight: 600;
      margin: 8mm 0 4mm 0;
      color: #424852;
    }
    
    .profile-section {
      page-break-after: always;
    }
    
    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5mm;
      margin-bottom: 10mm;
    }
    
    .profile-field {
      margin-bottom: 4mm;
    }
    
    .profile-label {
      font-weight: 600;
      color: #424852;
      font-size: 9pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 2mm;
    }
    
    .profile-value {
      font-size: 11pt;
      padding: 3mm;
      background: #f5f7fa;
      border-left: 3px solid #3557B0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 5mm;
    }
    
    thead {
      background: #3557B0;
      color: white;
    }
    
    th {
      font-family: 'Space Grotesk', 'Arial', sans-serif;
      font-weight: 600;
      text-align: left;
      padding: 3mm;
      font-size: 9pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    td {
      padding: 2.5mm 3mm;
      border-bottom: 1px solid #e5e7eb;
    }
    
    tbody tr:nth-child(even) {
      background: #f9fafb;
    }
    
    .total-row {
      font-weight: 600;
      background: #f5f7fa !important;
      border-top: 2px solid #3557B0;
    }
    
    .footer {
      position: fixed;
      bottom: 10mm;
      left: 20mm;
      right: 20mm;
      border-top: 1px solid #e5e7eb;
      padding-top: 3mm;
      font-size: 8pt;
      color: #6b7280;
      display: flex;
      justify-content: space-between;
    }
    
    .watermark {
      color: #D7843A;
      font-weight: 600;
    }
    
    @media print {
      .footer {
        position: running(footer);
      }
      
      thead {
        display: table-header-group;
      }
      
      tr {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="profile-section">
    <h1>${t.pilotProfile}</h1>
    
    <div class="profile-grid">
      <div class="profile-field">
        <div class="profile-label">${t.firstName}</div>
        <div class="profile-value">${profile.firstName}</div>
      </div>
      
      <div class="profile-field">
        <div class="profile-label">${t.lastName}</div>
        <div class="profile-value">${profile.lastName}</div>
      </div>
      
      <div class="profile-field">
        <div class="profile-label">${t.dateOfBirth}</div>
        <div class="profile-value">${profile.dateOfBirth}</div>
      </div>
      
      <div class="profile-field">
        <div class="profile-label">${t.certificateNumber}</div>
        <div class="profile-value">${profile.certificateNumber}</div>
      </div>
      
      <div class="profile-field">
        <div class="profile-label">${t.mobilePhone}</div>
        <div class="profile-value">${profile.mobilePhone}</div>
      </div>
      
      ${profile.landlinePhone ? `
      <div class="profile-field">
        <div class="profile-label">${t.landlinePhone}</div>
        <div class="profile-value">${profile.landlinePhone}</div>
      </div>
      ` : ''}
      
      <div class="profile-field" style="grid-column: 1 / -1;">
        <div class="profile-label">${t.address}</div>
        <div class="profile-value">${profile.address}</div>
      </div>
    </div>
  </div>
  
  <h1>${t.flightLogbook}</h1>
  
  <table>
    <thead>
      <tr>
        <th>${t.year}</th>
        <th>${t.month}</th>
        <th>${t.day}</th>
        <th>${t.type}</th>
        <th>${t.registration}</th>
        <th>${t.route}</th>
        <th>${t.flightTime}</th>
      </tr>
    </thead>
    <tbody>
      ${entries.map(entry => {
        const { year, month, day } = formatDate(entry.date)
        return `
        <tr>
          <td>${year}</td>
          <td>${month}</td>
          <td>${day}</td>
          <td>${entry.type}</td>
          <td>${entry.registration}</td>
          <td>${entry.route}</td>
          <td>${minutesToTime(entry.timeMinutes)}</td>
        </tr>
        `
      }).join('')}
      <tr class="total-row">
        <td colspan="6" style="text-align: right; padding-right: 5mm;">${t.total}:</td>
        <td>${minutesToTime(totalMinutes)}</td>
      </tr>
    </tbody>
  </table>
  
  <div class="footer">
    <div>
      ${t.generatedOn}: ${metadata.generatedAt} (Europe/Bucharest)<br>
      ${t.exportId}: ${metadata.id}
    </div>
    ${!isPro ? `<div class="watermark">${t.watermark}</div>` : ''}
  </div>
</body>
</html>
  `
}
