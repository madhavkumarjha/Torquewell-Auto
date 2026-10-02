# Torquewell Auto — 7-Minute Pitch & Walkthrough Script

This script guides the presenter through the live interactive demonstration of Torquewell Auto in exactly 7 minutes, highlighting the 8 signature features and brand value architecture.

---

## ⏱️ Timeline & Presentation Flow

### 0:00–0:30 · Home Hero & Help-First
- **Action:** Open `http://localhost:5173/` (Home). Note the initial lug-nut loader and settle animation.
- **Narrative:** *"A worried driver lands here with an unfamiliar dashboard light or strange noise. Within seconds, they know where to turn. The prominent 'Help now' and 'Book' pills are reachable in one click from anywhere on the platform."*
- **Interaction:** Point out the calibrated torque dial badge (`140 N·m · CLICK VERIFIED`), the Click Guarantee, and the 4 immediate triage route tiles.

### 0:30–1:30 · Drive-In to Drive-Out Story
- **Action:** Scroll to the Drive-In to Drive-Out section (`/` or click 'How It Works').
- **Narrative:** *"Watch a vehicle's entire journey — from lift arrival to handover — with verifiable evidence generated at every step."*
- **Interaction:** Step through the 9 stages. Toggle between exploded car layers (Chassis, Brakes, Suspension, Electric Powertrain) and demonstrate the Calm Mode static fallback.

### 1:30–2:45 · Symptom & Warning-Light Guide → Symptom Sheet
- **Action:** Navigate to `/guide` (or press `⌘K` → type `Guide`).
- **Narrative:** *"Can I still drive it? The number one question drivers ask, answered with deterministic safety logic."*
- **Interaction:** Select a symptom (e.g. Squealing brakes) + Warning Light (Brake system). Show how red flags trigger immediate roadside stop guidance. Open the **Printable Symptom Sheet** in both English and Hindi.

### 2:45–4:00 · Proof Report + Fair-Price Breakdown
- **Action:** Navigate to `/proof` and `/prices`.
- **Narrative:** *"See the worn part, the micrometer measurement, and the pricing logic before authorising a repair."*
- **Interaction:**
  1. On `/proof`, click the Donut Chart slices to filter findings (Now: 1, Soon: 3, Watch: 3). Open the **Photo Compare Modal** to contrast worn brake pads (2.5 mm) against factory new benchmark parts (12.0 mm).
  2. On `/prices`, toggle the parts tier (TorqueSpec OE vs OE-Equivalent vs Aftermarket) to show how warranties change dynamically.
  3. Toggle **"Only what is needed now"** to show instant recalculation excluding non-urgent items.

### 4:00–5:00 · The Mileage Map
- **Action:** Navigate to `/mileage-map`.
- **Narrative:** *"Plan ahead and know what can safely wait."*
- **Interaction:** Move the odometer slider from 0 to 120,000 km. Switch powertrain from Petrol to EV to show how spark plugs vanish and battery coolant/SOH appears. Open the **Roadmap PDF export** and download the `.ics` calendar reminder.

### 5:00–5:45 · Bay Board & Bay Crew
- **Action:** Navigate to `/journey` and `/crew`.
- **Narrative:** *"Where is my car right now, and who is working on it?"*
- **Interaction:**
  1. On `/journey`, click **"Simulate Bay Progress"** to trigger real-time toast telemetry. Switch to full-screen **TV / Kiosk Mode**.
  2. On `/crew`, inspect the blueprint workshop floor plan and accessible Org Hierarchy tree (`role="tree"`).

### 5:45–6:15 · Garage Portal & Know Your Car
- **Action:** Navigate to `/portal` and `/know`.
- **Narrative:** *"A permanent digital logbook customers keep, and technical education that makes them confident owners."*
- **Interaction:**
  1. On `/portal`, show client Sam Carter (`TW68 AKZ`), pending repair authorizations, and the Risk Acknowledgement modal triggered when declining safety items.
  2. On `/know`, switch between ICE, Hybrid, and EV in the **Car Anatomy Visualizer**, use the **Tyre Tread Coin Check** slider, and demonstrate the 3-tier reading depth (`30s` / `3m` / `deep`).

### 6:15–6:45 · Global Controls & Command Palette
- **Action:** Press `⌘K` (or click search in navbar).
- **Narrative:** *"Engineered for every driver, every market, and every accessibility need."*
- **Interaction:** Toggle language (English ↔ Hindi), toggle distance units (Metric km ↔ Imperial miles), toggle theme (Bay Night Dark ↔ Shop Paper Light), and enable **Calm Mode**.

### 6:45–7:00 · Close: "Proof, not promises."
- **Narrative:** *"Torquewell replaces the anxiety of automotive servicing with precision torque and verified evidence. The entire platform is 100% white-label ready and config-driven."*

---

## 🛡️ Live Backup Plan
If any browser tab or local network interruption occurs:
1. Press `⌘K` or click the search palette icon in the top right to instantly jump to any route.
2. The entire platform operates with **zero external API dependencies** and runs 100% offline from browser cache.
