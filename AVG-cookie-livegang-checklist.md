# AVG & cookies — livegang-checklist

Stedelijk Lyceum Rotterdam · wervingssite
Laatst bijgewerkt: augustus 2026 · **concept, laten toetsen door bestuur/FG vóór livegang**

Dit is geen juridisch advies. Het is een praktische checklist die hoort bij hoe de site nu technisch is opgezet.

---

## ✅ Al goed geregeld (technisch)

- [x] **Opt-in cookiebanner** op alle pagina's (ook welkom + mobiele app). Weigeren is net zo makkelijk als accepteren.
- [x] **Keuze per categorie** (Noodzakelijk / Analytisch / Marketing), opgeslagen mét versie + datum, altijd te wijzigen via de footer-link "Cookievoorkeuren".
- [x] **Consent-gating:** analytics- en marketingscripts laden pas ná toestemming.
- [x] **Geen verborgen trackers** by default; lettertypes staan lokaal (geen Google Fonts).
- [x] **Meta-pixel voorbereid** (plug-and-play) én het **`Lead`-event** bij een geslaagde aanmelding — beide vuren alleen met marketing-toestemming.
- [x] **Routekaart (Kop van Zuid)** laadt pas ná een klik ("Kaart laden"); tot dan géén contact met externe kaartdiensten.
- [x] **Privacy-akkoord** vermeld onder de verzendknop van het aanmeldformulier.
- [x] Concept-**privacyverklaring** en **cookieverklaring**, gelinkt in de footer.

---

## ⛔ Nog doen vóór livegang

### Content / juridisch
- [ ] Privacy- en cookieverklaring **juridisch laten toetsen** (bestuur / Functionaris Gegevensbescherming).
- [ ] Echte **contactgegevens** invullen: bevoegd gezag + FG/DPO.
- [ ] **Bewaartermijnen** en, zodra pixels live zijn, de **concrete cookies** (naam, plaatser, duur) invullen in de cookieverklaring.
- [ ] Verwerking in het **verwerkingsregister** van de organisatie opnemen; beoordelen of een **DPIA** nodig is (gegevens van kinderen).

### Aanmeldformulier (nu verstuurt het nog niks)
- [ ] Formulier koppelen aan een echt systeem (e-mail/CRM/formulierdienst).
- [ ] **Verwerkersovereenkomst** met die dienst afsluiten.
- [ ] **Grondslag** (toestemming) + **bewaartermijn** vastleggen.
- [ ] Let op: **gegevens van kinderen** (ouder-e-mail wordt gevraagd — goed).

### Hosting
- [ ] Site hosten op een echt domein met **HTTPS**.

### Meta-pixel activeren (voor social media campagnes)
- [ ] Pixel aanmaken in **Meta Events Manager** en **Pixel-ID** ophalen.
- [ ] ID invullen in `assets/cookies.js` → functie `loadMarketing()` → `var META_PIXEL_ID = '';`
- [ ] **Domein verifiëren** in Meta en pixel aan het advertentieaccount koppelen.
- [ ] Testen op de live site met **Meta Pixel Helper** (na "Marketing accepteren"): `PageView` én `Lead` moeten binnenkomen.

---

## Waar staat wat (voor de techneut)

| Onderdeel | Bestand |
|---|---|
| Cookiebanner + consent-logica | `assets/cookies.js` |
| Pixel invullen (Meta / TikTok / GA) | `assets/cookies.js` → `loadMarketing()` / `loadAnalytics()` |
| `Lead`-event bij aanmelding | `assets/site.js` (desktop) + `app.html` (mobiel) |
| Cookieverklaring | `cookies.html` |
| Privacyverklaring | `privacy.html` |
| Routekaart klik-om-te-laden | `kop-van-zuid.html` (onderin het script) |

> Let op: de meet-getallen zijn altijd een **ondergrens** — ad blockers en iOS/Safari-tracking-preventie meten niet iedereen mee. Dat geldt voor elke site.
