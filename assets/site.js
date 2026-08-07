/* ============================================================
   Stedelijk Lyceum Rotterdam — website interactions
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- nav: solid / hide / progress ---------- */
  function initNav() {
    var nav = document.querySelector('.nav');
    var bar = document.querySelector('.progress');
    var hasHero = document.body.hasAttribute('data-hero');
    var burger = nav && nav.querySelector('.nav__burger');
    var last = 0;
    if (burger) {
      burger.addEventListener('click', function () { nav.classList.toggle('is-open'); });
      nav.querySelectorAll('.nav__menu a').forEach(function (a) {
        a.addEventListener('click', function () { nav.classList.remove('is-open'); });
      });
    }
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (nav) {
        if (hasHero && y < 40) {
          nav.classList.add('nav--top'); nav.classList.remove('nav--solid');
        } else {
          nav.classList.add('nav--solid'); nav.classList.remove('nav--top');
        }
        if (y > 260 && y > last && !nav.classList.contains('is-open')) nav.classList.add('nav--hidden');
        else nav.classList.remove('nav--hidden');
      }
      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      }
      last = y;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- count up ---------- */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    function run(el) {
      var raw = el.getAttribute('data-count');
      var target = parseInt(raw, 10);
      if (reduce || isNaN(target)) { el.textContent = raw; return; }
      var dur = 1200, t0 = null;
      function tick(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * e);
        if (p < 1) requestAnimationFrame(tick); else el.textContent = raw;
      }
      requestAnimationFrame(tick);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.4 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- hero parallax ---------- */
  function initParallax() {
    if (reduce) return;
    var bgs = document.querySelectorAll('[data-parallax]');
    if (!bgs.length) return;
    var ticking = false;
    function upd() {
      var y = window.pageYOffset;
      bgs.forEach(function (b) {
        b.style.transform = 'scale(1.08) translateY(' + (y * 0.14) + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(upd); ticking = true; }
    }, { passive: true });
  }

  /* ---------- interactive Rotterdam map ---------- */
  var PROJECTS = [
    { id: 'binnenrotte', nr: '00', name: 'De Binnenrotte', periode: 'Introductie', meta: 'Waar Rotterdam is gesticht',
      photo: 'uploads/Pagina_Binnenrotte.png', x: 0.43, y: 0.31,
      teaser: 'De plek waar Rotterdam eeuwen geleden is gesticht. Je eerste mini-project.',
      lijnen: ['Je leert over de geschiedenis van de stad.', 'Je onderzoekt waarom de stad juist op die plek is gesticht.', 'Je bekijkt wat je nog terugziet van het verleden.'] },
    { id: 'maas', nr: '01', name: 'De Maas', periode: 'Periode 1', meta: 'De rivier dwars door de stad',
      photo: 'uploads/DeMaas.jpg', x: 0.46, y: 0.45,
      teaser: 'De brede rivier die dwars door Rotterdam stroomt.',
      lijnen: ['Je vaart over de Maas en praat met schippers.', 'Je ontdekt welke dieren in en rond de rivier leven.', 'Je bedenkt nieuwe manieren om de rivier over te steken.'] },
    { id: 'oranjeboom', nr: '02', name: 'De Oranjeboomstraat', periode: 'Periode 2', meta: 'Feijenoord: industrie en cultuur',
      photo: 'uploads/Oranjeboomstraat.jpg', x: 0.66, y: 0.55,
      teaser: 'Een lange straat in Feijenoord, vernoemd naar een bierbrouwerij.',
      lijnen: ['Je onderzoekt het industriele verleden van de wijk.', 'Je ontdekt de typisch Rotterdamse cultuur.', 'Je ontwerpt zelf iets nieuws voor een plek in de straat.'] },
    { id: 'stadionpark', nr: '03', name: 'Stadionpark', periode: 'Periode 3', meta: 'De Kuip en een nieuwe wijk',
      photo: 'uploads/Stadionpark.jpg', x: 0.66, y: 0.74,
      teaser: 'De Kuip, midden in de wijk. Op wedstrijddagen tienduizenden bezoekers.',
      lijnen: ['Rond het stadion wordt een compleet nieuwe wijk gebouwd.', 'Je onderzoekt hoe bewoners invloed hadden op de plannen.', 'Je bekijkt hoe de toekomst van het gebied eruitziet.'] },
    { id: 'pier', nr: '04', name: 'Wilhelminapier & Katendrecht', periode: 'Periode 4', meta: 'Direct naast onze school',
      photo: 'uploads/Wilhelminapier.jpg', x: 0.42, y: 0.57,
      teaser: 'Twee buurten tegenover elkaar, met de Rijnhaven ertussen.',
      lijnen: ['Musea, foodhallen, een bioscoop, hotels en meer.', 'Je onderzoekt voor wie deze buurt wordt gebouwd.', 'Je bedenkt wat er nog ontbreekt in de nieuwe Rijnhaven.'] }
  ];
  var SCHOOL = { x: 0.55, y: 0.60 };
  var AR = 402 / 376;

  function initMap() {
    var map = document.querySelector('.map');
    if (!map) return;
    var cap = document.querySelector('.mapcap');
    var pct = function (v) { return (v * 100) + '%'; };

    // connecting rays
    PROJECTS.forEach(function (p) {
      var dxf = p.x - SCHOOL.x, dyf = p.y - SCHOOL.y;
      var ang = Math.atan2(dyf, dxf * AR) * 180 / Math.PI;
      var len = Math.sqrt(dxf * dxf + (dyf / AR) * (dyf / AR)) * 100;
      var l = document.createElement('div');
      l.className = 'map__line';
      l.style.left = pct(SCHOOL.x); l.style.top = pct(SCHOOL.y);
      l.style.width = len + '%'; l.style.transform = 'rotate(' + ang + 'deg)';
      map.appendChild(l);
    });
    // spots
    var spots = [];
    PROJECTS.forEach(function (p) {
      var s = document.createElement('a');
      s.className = 'map__spot'; s.href = p.id + '.section';
      s.setAttribute('data-id', p.id);
      s.style.left = pct(p.x); s.style.top = pct(p.y);
      s.innerHTML = '<div class="map__dot">' + p.nr + '</div><div class="map__tag">' + p.name + '</div>';
      s.addEventListener('mouseenter', function () { setHot(p.id); });
      s.addEventListener('click', function (e) { e.preventDefault(); setHot(p.id); });
      map.appendChild(s); spots.push(s);
    });
    // school pin
    var pin = document.createElement('div');
    pin.className = 'map__pin'; pin.style.left = pct(SCHOOL.x); pin.style.top = pct(SCHOOL.y);
    pin.innerHTML = '<b>SLR</b><i></i>';
    map.appendChild(pin);

    var cards = document.querySelectorAll('.proj[data-id]');
    cards.forEach(function (c) {
      c.addEventListener('mouseenter', function () { setHot(c.getAttribute('data-id')); });
    });

    function setHot(id) {
      spots.forEach(function (s) { s.classList.toggle('is-hot', s.getAttribute('data-id') === id); });
      cards.forEach(function (c) { c.classList.toggle('is-hot', c.getAttribute('data-id') === id); });
      var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
      if (cap && p) {
        cap.querySelector('.mapcap__m').textContent = p.periode + ' · ' + p.meta;
        cap.querySelector('.mapcap__n').textContent = p.name;
        cap.querySelector('.mapcap__t').textContent = p.teaser;
        cap.querySelector('.mapcap__l').innerHTML = p.lijnen.map(function (t) { return '<li>' + t + '</li>'; }).join('');
      }
    }
    setHot('binnenrotte');
  }

  /* ---------- signup form ---------- */
  function initForm() {
    var form = document.querySelector('[data-form]');
    if (!form) return;
    var chips = form.querySelectorAll('.chip');
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.classList.remove('is-on'); });
        c.classList.add('is-on');
      });
    });
    var submit = form.querySelector('[data-submit]');
    submit.addEventListener('click', function () {
      var ok = true;
      form.querySelectorAll('[data-required]').forEach(function (f) {
        var inp = f.querySelector('input');
        var v = (inp.value || '').trim();
        var bad = !v;
        if (inp.type === 'email') bad = !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(v);
        f.classList.toggle('invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) return;
      var voor = (form.querySelector('[data-voornaam]').value || 'tot snel').trim();
      var advies = (form.querySelector('.chip.is-on') || {}).textContent || 'Weet ik nog niet';
      var done = document.querySelector('[data-done]');
      form.style.display = 'none';
      if (done) {
        done.querySelector('[data-done-naam]').textContent = voor + '.';
        done.querySelector('[data-done-advies]').textContent = advies;
        done.hidden = false;
        done.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      }
    });
  }

  /* ---------- year ' ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal(); initNav(); initCounters(); initParallax(); initMap(); initForm();
    var y = document.querySelector('[data-year]'); if (y) y.textContent = new Date().getFullYear();
  });
})();
