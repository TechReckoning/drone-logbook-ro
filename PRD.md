# Drone Logbook RO - Product Requirements Document

A professional electronic logbook application for Romanian UAS (drone) remote pilots that enables comprehensive flight logging, pilot profile management, and official PDF export generation compliant with AACR standards.

**Experience Qualities:**
1. **Professional** - Interface projects authority and compliance, resembling official aviation documentation with clear structure and formal presentation
2. **Efficient** - Pilots can log flights quickly with minimal friction, smart defaults, and keyboard-friendly inputs
3. **Trustworthy** - Data integrity is paramount with validation, clear feedback, and permanent timestamps that inspire confidence

**Complexity Level**: Light Application (multiple features with basic state)
This is a focused data management tool with CRUD operations, filtering, and export functionality. While it handles structured aviation data and PDF generation, it remains a single-user application without complex multi-view navigation or real-time collaboration features.

## Essential Features

### Landing Page & First-Time Experience
- **Functionality**: Professional marketing page introducing the app with features, pricing, and call-to-action for new users
- **Purpose**: Convert visitors into users by clearly communicating value proposition and compliance benefits
- **Trigger**: First visit to the application (no previous session data)
- **Progression**: View hero section with title/subtitle → Scroll to features section → Review pricing plans → Click "Get Started" → Landing dismissed, onboarding begins
- **Success criteria**: Clear value communication, responsive design, smooth animations, bilingual support (EN/RO toggle)

### Onboarding Flow
- **Functionality**: Multi-step guided wizard collecting pilot profile information with validation and progress indication
- **Purpose**: Ensure complete profile setup before first use, reducing friction later when generating PDFs
- **Trigger**: User clicks "Get Started" from landing page
- **Progression**: Step 1 (Personal): First/Last name → Step 2 (Contact): Address, Mobile, Landline → Step 3 (Certification): DOB, Certificate # → Completion screen → Dashboard
- **Success criteria**: 3-step flow with progress bar, field validation, back/next navigation, data persists on completion, completion celebration screen

### Pilot Profile Management
- **Functionality**: Captures and stores pilot identification and certification details required for official logbook exports
- **Purpose**: Ensures PDF exports contain complete pilot information meeting regulatory standards
- **Trigger**: User accesses "Profile" section from dashboard (or completes onboarding)
- **Progression**: View empty profile card → Click "Complete Profile" → Fill bilingual form (First/Last name, Address, Phone, DOB, Certificate #) → Validate → Save → Profile complete badge appears
- **Success criteria**: All required fields validated, profile persists, PDF export becomes available

### Flight Entry Logging
- **Functionality**: Add, edit, and delete individual flight records with AACR-compliant fields (Date, Type, Registration, Route, Flight Time)
- **Purpose**: Maintain accurate chronological record of all UAS operations
- **Trigger**: User clicks "Add Flight" from dashboard or logbook page
- **Progression**: Click Add Flight → Dialog opens → Enter date, type, registration, route, time (HH:MM format) → Validate time (00:00-23:59) → Save → Entry appears in table sorted by date
- **Success criteria**: Entry stored with date parsed to year/month/day, time converted to minutes, appears immediately in sorted table

### Advanced Filtering & Search
- **Functionality**: Filter logbook by year, month, custom date range; search by type, registration, or route
- **Purpose**: Quickly locate specific flights or analyze activity within time periods
- **Trigger**: User interacts with filter controls above logbook table
- **Progression**: Select filter type (Year/Month/Custom) → Choose value or date range → Table updates instantly → Total time recalculates → Clear filters to reset
- **Success criteria**: Table shows only matching entries, totals reflect filtered set, filters combine logically

### Statistics Dashboard
- **Functionality**: Real-time aggregation showing total flights, total flight time, and current month's flight time
- **Purpose**: Provides quick operational overview and activity insights
- **Trigger**: Automatically visible on dashboard
- **Progression**: User views dashboard → Cards display: total flights count, total time (HH:MM), this month's time → Updates automatically when entries change
- **Success criteria**: Numbers accurate, month calculation uses current date, format is HH:MM for times

### PDF Export with Timestamps
- **Functionality**: Generate downloadable PDF containing pilot profile and filtered logbook entries
- **Trigger**: User clicks "Download PDF" button
- **Progression**: Click Download PDF → Modal opens → Select scope (All/Year/Month/Custom) → Click Generate → PDF created with: Page 1 = Profile, Pages 2+ = Entries table → Footer shows timestamp (Europe/Bucharest) & Export ID → PDF downloads
- **Success criteria**: Multi-page PDF, headers repeat, footer on every page with unique Export ID and Bucharest timezone timestamp, profile on first page, entries tabulated

### Entry Limit System
- **Functionality**: Enforce 5-entry maximum for free tier with upgrade prompt
- **Purpose**: Demonstrates premium value proposition
- **Trigger**: User attempts to add 6th entry
- **Progression**: Add 6th entry → Warning appears → Entry blocked → "Upgrade to Pro" message displayed with pricing (€3.99/mo or €29/yr)
- **Success criteria**: Cannot exceed 5 entries, clear upgrade path shown, Pro mode (simulated) removes limit

## Edge Case Handling

- **First-Time User**: Show landing page with features and pricing, then guide through onboarding wizard before accessing main app
- **Returning User**: Skip landing page and onboarding if already completed, go straight to dashboard
- **Empty Logbook State**: Display friendly illustration and "Add Your First Flight" CTA when no entries exist
- **Incomplete Profile Export**: Disable PDF button with tooltip "Complete your pilot profile first" when profile fields are missing
- **Invalid Time Format**: Show inline error for time inputs not matching HH:MM or exceeding 23:59, prevent save
- **No Matching Filters**: Display "No flights found" message when filters return zero results, with "Clear Filters" button
- **Entry Limit Reached**: Show full-screen overlay when attempting 6th entry, explaining Pro benefits
- **Date Range Validation**: Ensure "from" date is before "to" date in custom range filters, show error otherwise
- **Onboarding Exit**: User can refresh and will resume from dashboard if onboarding was completed; state persists

## Design Direction

The design should evoke **professional aviation documentation** with a modern digital twist. Think official flight manuals, pilot licenses, and certification documents - structured, authoritative, and meticulous. The interface must feel **serious and dependable** while remaining approachable for recreational pilots. Incorporate subtle aviation aesthetics (navigation instruments, altitude indicators, flight paths) without becoming themed or playful. Colors should suggest **sky, precision, and trust** - aviation blues with crisp contrasts and technical accents.

## Color Selection

An aviation-inspired palette balancing authoritative blues with high-contrast readability and technical orange accents.

- **Primary Color**: Aviation Blue (oklch(0.45 0.15 250)) - Represents sky, flight, and aviation authority; used for primary actions and navigation elements
- **Secondary Colors**: 
  - Sky Neutral (oklch(0.96 0.01 250)) - Subtle background tint maintaining aviation theme
  - Technical Gray (oklch(0.30 0.01 250)) - Dark navy-gray for secondary UI elements
- **Accent Color**: Flight Orange (oklch(0.68 0.18 45)) - High-visibility aviation safety orange for CTAs, alerts, and important timestamps
- **Foreground/Background Pairings**:
  - Primary (Aviation Blue #3557B0): White text (#FFFFFF) - Ratio 5.2:1 ✓
  - Accent (Flight Orange #D7843A): Black text (#1A1A1A) - Ratio 6.8:1 ✓
  - Background (Sky Neutral #F5F7FA): Technical Gray (#424852) - Ratio 10.5:1 ✓
  - Card (White #FFFFFF): Technical Gray (#424852) - Ratio 12.1:1 ✓

## Font Selection

Typography should convey **precision, legibility, and technical authority** appropriate for documentation that may be presented to aviation authorities.

- **Primary**: "Space Grotesk" - A technical sans-serif with geometric precision and excellent readability at all sizes, perfect for data tables and forms
- **Secondary**: "Inter" - For body text and UI elements where maximum clarity is required
- **Typographic Hierarchy**:
  - H1 (Page Title): Space Grotesk Bold/32px/tight letter spacing (-0.02em)
  - H2 (Section Headers): Space Grotesk SemiBold/24px/normal spacing
  - H3 (Card Titles): Space Grotesk Medium/18px/normal spacing
  - Body (Paragraph): Inter Regular/16px/1.5 line height
  - Table Headers: Space Grotesk Medium/14px/uppercase/wide spacing (0.05em)
  - Table Data: Inter Regular/14px/tabular numbers
  - Labels: Inter Medium/14px/normal spacing
  - Small/Meta: Inter Regular/12px/muted color

## Animations

Animations should feel **precise and purposeful** like cockpit instruments - smooth, immediate feedback with subtle mechanical precision. No playful bounces or elastic effects.

- **Landing Page**: Hero section fades in with subtle upward motion (20px), feature cards stagger in on scroll with 100ms delay between each
- **Onboarding**: Steps transition with slide animation (exit left, enter right), progress bar animates smoothly, completion check icon scales in with spring physics
- **Micro-interactions**: Button presses have subtle scale (0.98) with 100ms duration and ease-out timing
- **Data Entry**: Form inputs scale focus ring in 200ms with slight glow effect suggesting instrument illumination
- **Modal Transitions**: Dialogs fade + scale from center (0.95 to 1.0) over 250ms, creating sense of depth
- **Table Updates**: New rows fade in from top with 300ms stagger, existing rows shift smoothly
- **Stats Counters**: Numbers animate up with spring physics when values change (framer-motion spring preset)
- **PDF Generation**: Progress indicator uses linear sweep animation suggesting scanning/compilation

## Component Selection

- **Components**:
  - **Card**: Primary container for dashboard sections (Profile status, Stats, Quick actions) with hover lift effect
  - **Dialog**: For Add/Edit Flight forms and PDF export options modal
  - **Table**: Core logbook display with sticky header, row hover states, and zebra striping
  - **Button**: Primary (filled), Secondary (outline), Ghost (icon-only) variants with consistent sizing
  - **Input**: Text fields with floating labels for forms, specialized time input with HH:MM mask
  - **Select**: Dropdowns for Year/Month filters and aircraft type selection
  - **Badge**: Status indicators (Profile Complete, Pro User, Entry Count)
  - **Tabs**: Switching between Dashboard, Logbook, Profile, and Billing views
  - **Alert**: Warnings for incomplete profile or entry limit reached
  - **Popover**: Quick stats tooltips and filter explanations
  - **Calendar**: Date picker for flight date and custom range selection (react-day-picker)

- **Customizations**:
  - **Time Input Component**: Custom masked input enforcing HH:MM format with real-time validation
  - **PDF Preview Component**: Custom document preview before download with page thumbnails
  - **Entry Limit Overlay**: Full-screen custom component showing upgrade benefits with pricing cards
  - **Bilingual Toggle**: Custom language switcher component (EN/RO flag icons)

- **States**:
  - **Buttons**: Rest → Hover (slight lift, shadow increase) → Active (scale 0.98) → Disabled (50% opacity, no pointer)
  - **Inputs**: Rest → Focus (blue ring, slight scale) → Error (red ring, shake animation) → Success (green check icon)
  - **Table Rows**: Rest → Hover (background sky-neutral) → Selected (blue border-left accent)
  - **Cards**: Rest → Hover (shadow increase, subtle lift transform) - interactive cards only

- **Icon Selection**:
  - Airplane (logbook/flights), User (profile), Calendar (date filters), Clock (time fields), Download (PDF export), Plus (add entry), Pencil (edit), Trash (delete), FunnelSimple (filters), MagnifyingGlass (search), ChartBar (statistics), CreditCard (billing), Warning (alerts), Check (validation success)

- **Spacing**:
  - Container padding: px-6 py-8 (desktop), px-4 py-6 (mobile)
  - Card internal spacing: p-6
  - Form field gaps: gap-4 (16px) vertical
  - Table cell padding: px-4 py-3
  - Section spacing: mb-8 between major sections
  - Button padding: px-4 py-2 (default), px-6 py-3 (large)

- **Mobile**:
  - Dashboard cards stack vertically on <768px with full width
  - Logbook table switches to card-based layout on mobile (each entry becomes a card showing all fields vertically)
  - Filters collapse into a Sheet drawer with Apply/Clear actions
  - Sticky "Add Flight" FAB in bottom-right on mobile
  - Date range picker adapts to single-column calendar layout
  - PDF export modal becomes full-screen sheet on mobile
