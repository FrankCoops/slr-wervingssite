# Stedelijk Lyceum Rotterdam — website + wervingsapp

Twee ervaringen voor de nieuwe school die in 2027 opent op de Kop van Zuid:

1. **De website** — een moderne, responsive multi-page website (desktop &
   tablet). Losse pagina's met eigen URL's.
2. **De wervingsapp** — de interactieve telefoon-app in een iPhone-frame.
   Mobiele bezoekers worden hier automatisch heen gestuurd.

## Structuur

```
index.html            → homepage van de website
introductie.html      → 01 · Introductie
gebouw.html           → 02 · Het gebouw
kop-van-zuid.html     → 03 · De Kop van Zuid
onderwijs.html        → 04 · De stad als klaslokaal
projecten.html        → 05 · Projecten (interactieve Rotterdam-kaart)
aanmelden.html        → 06 · Aanmelden (formulier)
app.html              → de wervingsapp (Claude Design "DC"-runtime)
Wervingsapp SLR.dc.html → origineel Claude Design-bronbestand (= app.html)

assets/site.css       → design-system + componenten + animaties
assets/site.js        → scroll-reveal, nav, tellers, kaart, formulier
support.js            → DC-runtime voor app.html
fonts/                → Gilroy (Light/Regular/SemiBold/Bold/ExtraBold)
assets/photos/        → foto's van de website
uploads/              → foto's van de school en projectlocaties
```

## Mobiel → app

Elke website-pagina bevat bovenin een klein script dat bezoekers met een
schermbreedte ≤ 820px automatisch doorstuurt naar `app.html` (de telefoon-app).
Desktop- en tabletbezoekers zien de website.

## Snel starten

Statische site — serveer de map met een willekeurige webserver (openen via
`file://` werkt niet vanwege `fetch` in de app en relatieve assets):

```bash
python3 -m http.server 8000
```

Open daarna http://localhost:8000. De website werkt volledig offline; alleen
`app.html` laadt de DC-runtime (React/Babel) van unpkg.com.

## Design

Huisstijl: geel (#ffe500), bijna-zwart (#111) en wit, met de Gilroy-fonts.
Editorial hiërarchie, zwart-wit fotografie met gele accenten, scroll-animaties
en micro-interacties. Alle gedeelde stijl staat in `assets/site.css`.

## Foto's

Een deel van de beelden is nog een tijdelijke stand-in (stock/gegenereerd).
Vervang ze door bestanden met dezelfde naam in `assets/photos/` of `uploads/`.
