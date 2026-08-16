/* ============================================================
   Stedelijk Lyceum Rotterdam, cookie-toestemming (AVG / cookiewet)
   - Opt-in: niks niet-noodzakelijks laadt vóór toestemming
   - Weigeren net zo makkelijk als accepteren
   - Keuze per categorie, altijd te wijzigen via [data-cookie-open]
   ============================================================ */
(function () {
  'use strict';
  var KEY = 'slrCookieConsent';
  var VERSION = 1; // hoog dit op als het cookiebeleid wezenlijk verandert -> banner vraagt opnieuw

  function read() {
    try { var v = JSON.parse(localStorage.getItem(KEY)); return (v && v.v === VERSION) ? v : null; }
    catch (e) { return null; }
  }

  /* ---------- integratie-haken: scripts laden PAS na toestemming ---------- */
  var loadedA = false, loadedM = false;
  function loadAnalytics() {
    if (loadedA) return; loadedA = true;
    /* >>> PLAK HIER JE ANALYTICS (laadt alleen na 'analytisch'-toestemming). Voorbeeld Google Analytics:
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || []; function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
    <<< */
  }
  function loadMarketing() {
    if (loadedM) return; loadedM = true;

    /* ====== META (FACEBOOK/INSTAGRAM) PIXEL ======
       Voor jullie social media campagnes. Laadt ALLEEN nadat de bezoeker 'marketing' heeft geaccepteerd.
       STAP 1: haal je Pixel ID op in Meta Events Manager (business.facebook.com/events_manager) -> een reeks cijfers.
       STAP 2: zet dat ID hieronder tussen de aanhalingstekens. Zolang dit leeg is, gebeurt er niets.  */
    var META_PIXEL_ID = ''; // <-- bijv. '1234567890123456'

    if (META_PIXEL_ID) {
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', META_PIXEL_ID);
      fbq('track', 'PageView');
      // Tip: een conversie meten (bijv. na een aanmelding) doe je met:  fbq('track','Lead');
    }

    /* Andere campagnepixels (TikTok, Google Ads, LinkedIn) kun je hier op dezelfde manier toevoegen. */
  }
  function apply(v) { if (v.analytics) loadAnalytics(); if (v.marketing) loadMarketing(); }

  function save(a, m) {
    var v = { v: VERSION, necessary: true, analytics: !!a, marketing: !!m, ts: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
    apply(v);
    hide();
  }

  /* ---------- UI ---------- */
  var root = null;
  function injectStyle() {
    if (document.getElementById('ckb-style')) return;
    var css =
      '.ckb{position:fixed;left:0;right:0;bottom:0;z-index:99999;display:flex;justify-content:center;padding:16px;pointer-events:none;font-family:Gilroy,system-ui,sans-serif;animation:ckbUp .45s cubic-bezier(.19,1,.22,1)}' +
      '@keyframes ckbUp{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}' +
      '.ckb__card{pointer-events:auto;background:#fff;color:#111;max-width:780px;width:100%;box-sizing:border-box;box-shadow:0 14px 44px rgba(0,0,0,.30);border:1px solid #e6e4df;padding:22px 22px 20px}' +
      '.ckb__t{font-weight:800;text-transform:uppercase;font-size:13px;letter-spacing:.08em;margin:0 0 10px}' +
      '.ckb__b{font-weight:400;font-size:14px;line-height:1.55;color:#3f3d39;margin:0 0 16px}' +
      '.ckb__b a{color:#111;box-shadow:inset 0 -.12em 0 #ffe500;text-decoration:none}' +
      '.ckb__row{display:flex;flex-wrap:wrap;gap:10px;align-items:center}' +
      '.ckb__btn{font-family:inherit;cursor:pointer;border:0;font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:.04em;padding:14px 22px;transition:transform .12s,background .2s,color .2s}' +
      '.ckb__btn--y{background:#111;color:#fff}.ckb__btn--y:hover{background:#000}' +
      '.ckb__btn--o{background:#fff;color:#111;border:1px solid #111}.ckb__btn--o:hover{background:#ffe500;border-color:#ffe500}' +
      '.ckb__btn--t{background:transparent;color:#6b6963;padding:14px 6px;margin-left:auto}.ckb__btn--t:hover{color:#111}' +
      '.ckb__set{margin:2px 0 16px;display:none;border-top:1px solid #eceae6;padding-top:6px}' +
      '.ckb__set.is-on{display:block}' +
      '.ckb__cat{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid #f0efec}' +
      '.ckb__cat b{display:block;font-size:14px;font-weight:800}' +
      '.ckb__cat span{display:block;font-size:12.5px;color:#6b6963;line-height:1.45;margin-top:3px}' +
      '.ckb__sw{margin-top:3px;flex:none;width:18px;height:18px;accent-color:#111}' +
      '@media(max-width:560px){.ckb{padding:0}.ckb__card{border-left:0;border-right:0;border-bottom:0;padding:20px 18px}.ckb__btn--t{margin-left:0}}';
    var st = document.createElement('style'); st.id = 'ckb-style'; st.textContent = css;
    document.head.appendChild(st);
  }

  function build() {
    injectStyle();
    var wrap = document.createElement('div');
    wrap.className = 'ckb';
    wrap.innerHTML =
      '<div class="ckb__card" role="dialog" aria-label="Cookievoorkeuren" aria-live="polite">' +
      '<p class="ckb__t">Cookies op onze site</p>' +
      '<p class="ckb__b">We gebruiken noodzakelijke cookies om de site te laten werken. Met jouw toestemming plaatsen we ook analytische en marketingcookies, onder andere om onze social media campagnes te meten. <a href="cookies.html">Lees onze cookieverklaring</a>.</p>' +
      '<div class="ckb__set" data-set>' +
        '<div class="ckb__cat"><input type="checkbox" class="ckb__sw" checked disabled><div><b>Noodzakelijk</b><span>Altijd aan. Nodig om de site goed te laten werken; hiervoor is geen toestemming nodig.</span></div></div>' +
        '<div class="ckb__cat"><input type="checkbox" class="ckb__sw" data-cat="analytics"><div><b>Analytisch</b><span>Anoniem meten hoe de site gebruikt wordt, zodat we ’m kunnen verbeteren.</span></div></div>' +
        '<div class="ckb__cat"><input type="checkbox" class="ckb__sw" data-cat="marketing"><div><b>Marketing</b><span>Voor onze social media campagnes en het meten van advertenties (bijv. Meta- of TikTok-pixel).</span></div></div>' +
      '</div>' +
      '<div class="ckb__row">' +
        '<button class="ckb__btn ckb__btn--y" data-all type="button">Alles accepteren</button>' +
        '<button class="ckb__btn ckb__btn--o" data-nec type="button">Alleen noodzakelijk</button>' +
        '<button class="ckb__btn ckb__btn--t" data-toggle type="button">Instellingen</button>' +
      '</div>' +
      '<div class="ckb__row" data-saverow style="display:none;margin-top:12px">' +
        '<button class="ckb__btn ckb__btn--y" data-save type="button">Mijn voorkeuren opslaan</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    root = wrap;

    wrap.querySelector('[data-all]').addEventListener('click', function () { save(true, true); });
    wrap.querySelector('[data-nec]').addEventListener('click', function () { save(false, false); });
    wrap.querySelector('[data-toggle]').addEventListener('click', function () {
      var set = wrap.querySelector('[data-set]'); var srow = wrap.querySelector('[data-saverow]');
      var on = set.classList.toggle('is-on'); srow.style.display = on ? 'flex' : 'none';
    });
    wrap.querySelector('[data-save]').addEventListener('click', function () {
      var a = wrap.querySelector('[data-cat="analytics"]').checked;
      var m = wrap.querySelector('[data-cat="marketing"]').checked;
      save(a, m);
    });
  }

  function show(openSettings) {
    if (!root) build();
    root.style.display = 'flex';
    var stored = read();
    var a = root.querySelector('[data-cat="analytics"]'), m = root.querySelector('[data-cat="marketing"]');
    if (a) a.checked = stored ? !!stored.analytics : false;
    if (m) m.checked = stored ? !!stored.marketing : false;
    if (openSettings) {
      root.querySelector('[data-set]').classList.add('is-on');
      root.querySelector('[data-saverow]').style.display = 'flex';
    }
  }
  function hide() { if (root) root.style.display = 'none'; }

  // publieke API + footer-link ("Cookievoorkeuren")
  window.slrCookies = { open: function () { show(true); }, reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} show(false); } };
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-cookie-open]');
    if (t) { e.preventDefault(); show(true); }
  });

  function init() {
    var v = read();
    if (v) { apply(v); }        // eerder gemaakte keuze toepassen (scripts laden indien toegestaan)
    else { show(false); }       // nog geen keuze -> toon banner
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
