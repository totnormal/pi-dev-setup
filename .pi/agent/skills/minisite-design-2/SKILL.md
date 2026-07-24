---
name: "minisite-design-2"
description: "Build TARNOVSKI single-page service/minisite catalogs on p.tarnovski.com with the robust v2 design system — solid full-width header (no floating pill), square corners, top-down hero (no center-overflow), sticky scroll-spy rail, and two palettes (teal + wine). Use for any new /[page_name] added to p.tarnovski.com or any TARNOVSKI capabilities/services page."
version: 1
created: "2026-06-22"
updated: "2026-06-22"
disable-model-invocation: true
---
## Diag script (/tmp/diag.js) — run to detect overlaps before + after deploy

```js
const puppeteer=require('puppeteer');
(async()=>{
  const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new'});
  const url=process.argv[2];
  for(const [w,h] of [[1440,900],[1024,768],[390,844]]){
    const p=await b.newPage(); await p.setViewport({width:w,height:h});
    await p.goto(url,{waitUntil:'networkidle2'}); await new Promise(r=>setTimeout(r,500));
    const report=await p.evaluate((vw)=>{
      const rect=sel=>{const e=document.querySelector(sel);if(!e)return null;const r=e.getBoundingClientRect();return{l:Math.round(r.left),t:Math.round(r.top),r:Math.round(r.right),b:Math.round(r.bottom)};};
      const ov=(a,b)=>a&&b&&!(a.r<=b.l||a.l>=b.r||a.b<=b.t||a.t>=b.b);
      const topbar=rect('.topbar'),rail=rect('.rail'),h1=rect('.hero h1'),panel=rect('.hero-panel'),copy=rect('.hero-copy'),cat=rect('.category');
      return{topbarOverlapsH1:topbar&&h1?topbar.b>h1.t:'n/a',panelOverlapsCopy:ov(panel,copy),railOverlapsFirstCat:ov(rail,cat),hOverflow:document.documentElement.scrollWidth-vw};
    },w);
    console.log(`===== ${w}x${h} =====`); console.log(JSON.stringify(report));
    await p.close();
  } await b.close();
})();
// run: NODE_PATH=/Users/andreitarnovski/node_modules node /tmp/diag.js <url>
```

## script.js (verbatim — write once)

```js
// Scroll progress bar
(function(){const pb=document.getElementById('progress');if(pb){const set=()=>{const d=document.documentElement.scrollHeight-window.innerHeight;pb.style.width=(d>0?(window.scrollY/d)*100:0)+'%';};window.addEventListener('scroll',set,{passive:true});window.addEventListener('resize',set);set();}})();
// Reveal on view
(function(){const els=document.querySelectorAll('.reveal');if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));return;}const io=new IntersectionObserver((entries)=>{entries.forEach((e,i)=>{if(e.isIntersecting){e.target.style.transitionDelay=Math.min(i*40,200)+'ms';e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.08,rootMargin:'0px 0px -8% 0px'});els.forEach(el=>io.observe(el));})();
// Scroll-spy
(function(){const sections=document.querySelectorAll('[data-spy]');const links=document.querySelectorAll('.rail a[data-target]');if(!sections.length||!links.length||!('IntersectionObserver'in window))return;const map={};links.forEach(a=>map[a.getAttribute('data-target')]=a);const clear=()=>links.forEach(a=>a.classList.remove('active'));const io=new IntersectionObserver((entries)=>{let best=null;entries.forEach(en=>{if(en.isIntersecting){if(!best||en.intersectionRatio>best.intersectionRatio)best=en;}});if(best){const id=best.target.id;clear();if(map[id])map[id].classList.add('active');}},{rootMargin:'-30% 0px -60% 0px',threshold:[0,.15,.3,.5]});sections.forEach(s=>io.observe(s));const first=sections[0];if(first&&map[first.id])map[first.id].classList.add('active');})();
```

## HTML anatomy (use ABSOLUTE paths /page-name/...)

```
<header class="topbar"><div class="topbar-inner">
  <a class="brand" href="https://tarnovski.com" target="_blank" rel="noopener"><img src="/PAGE/logo.svg" alt="TARNOVSKI"></a>
  <nav class="topnav"><a href="#main">Services</a><a href="#method">Method</a><a href="https://tarnovski.com/contact" target="_blank" rel="noopener">Start a brief <i>↗</i></a></nav>
</div></header>

<section class="hero">
  <div class="hero-wm" aria-hidden="true"><img src="/PAGE/logo.svg" alt=""></div>
  <div class="hero-grid">
    <div class="hero-copy reveal"><span class="tag">…</span><h1>…</h1><p class="lede">…</p>
      <div class="hero-cta"><a class="btn" href="#main">… <i>↓</i></a><a class="btn ghost" href="…">… <i>↗</i></a></div></div>
    <aside class="hero-panel reveal"><div class="panel-logo"><img src="/PAGE/logo.svg" alt="TARNOVSKI"></div>
      <div class="metric"><b>N</b><span>label</span></div> … </aside>
  </div>
</section>

<nav class="rail"><div class="rail-inner">
  <a href="#SLUG" data-target="SLUG"><b>01</b><span>Name</span></a> …
</div></nav>

<main id="main">
  <section class="intro reveal"><span class="kicker">…</span><h2>…</h2><p>…</p></section>
  <!-- optional method band (wine pages) -->
  <section class="method" id="method"><div class="method-inner">
    <div class="method-card reveal"><span class="mnum">M01</span><h3>…</h3><p>…</p></div> … </div></section>

  <!-- one section.category per service; id MUST match a rail data-target -->
  <section class="category reveal" id="SLUG" data-spy>
    <header class="cat-head"><span class="kicker">Service 01</span>
      <div class="cat-head-row"><h2>Name</h2><span class="count">N deliverables</span></div>
      <p class="cat-sub">…</p></header>
    <div class="grid">
      <article class="card reveal"><div class="card-top"><span class="card-num">S01·D01</span></div>
        <h3>Deliverable</h3><p class="purpose">…</p>
        <details><summary>Deliverable details</summary><dl><dt>…</dt><dd>…</dd></dl></details>
      </article> … </div>
  </section>

  <!-- teal pages: .evidence band | wine pages: .scope note -->
  <section class="evidence" id="evidence"><div class="ev-inner reveal">…<div class="ev-tags"><span>…</span></div></div></section>
  <!-- OR -->
  <section class="scope reveal"><div class="scope-inner"><h3>Scope at a glance</h3><p>…</p><ul><li>…</li></ul></div></section>
</main>

<footer class="footer">
  <div class="footer-top"><div class="footer-brand"><img src="/PAGE/logo.svg" alt="TARNOVSKI"></div>
    <div class="footer-lead"><h2>…</h2><p>…</p><p class="footer-contact">…</p></div></div>
  <nav class="footer-menu">{13 tarnovski.com menu links, each target="_blank"}</nav>
  <p class="copyright">© …</p>
</footer>
```

tarnovski.com menu: About /about, What We Do /services, Brand Strategy /services/brand-strategy, Brand Consultancy /services/brand-consultancy, Rebranding /services/rebranding, Brand Identity /services/brand-identity, Packaging Design /services/packaging-design, Communication Strategy /services/communication-strategy, Naming /services/naming, PR Campaigns /services/pr-projects, Works /case-studies, Insights /insights, Contact /contact.

## PALETTE A — TEAL (corporate default; /services)

```css
:root{
  --dark:#1a2b2b; --dark-2:#243838; --dark-3:#0f1a1a;
  --gold:#f0d074; --gold-dim:#c9ab50; --gold-pale:#f7e9b0;
  --mauve:#c87fa2;
  --gray:#bac5cb; --gray-2:#8f9b9b;
  --line:#dde3e7; --line-2:#e9eeef;
  --paper:#f8fafa; --ink:#10201f; --mid:#3a5050;
}
/* palette-specific selectors (teal): */
.hero{background:var(--dark)}
.hero::before{background:radial-gradient(60% 55% at 78% 8%,rgba(240,208,116,.14),transparent 60%),radial-gradient(55% 50% at 4% 96%,rgba(200,127,162,.1),transparent 55%)}
.topbar{background:rgba(15,26,26,.96)}
.btn{background:var(--gold);color:var(--dark)} .btn i{background:rgba(26,43,43,.16)}
.method-card .mnum{color:var(--mauve)}            /* teal uses mauve instead of --rose */
.rail a.active{background:var(--dark);color:var(--gold)}
.footer-menu a:hover{background:var(--gold);color:var(--dark)}
.card:hover{box-shadow:0 20px 44px rgba(26,43,43,.1)}
.evidence::before{content:"TARNOVSKI";position:absolute;right:-3vw;bottom:-3vw;font-family:var(--d);font-weight:800;font-size:clamp(120px,20vw,300px);color:rgba(240,208,116,.045)}
```
(teal page has .evidence band instead of .method/.scope)

## PALETTE B — WINE (winery / F&B; /services-wine)

```css
:root{
  --wine:#1c1416; --wine-2:#28191c; --wine-3:#120b0c;
  --burgundy:#5a2730;
  --gold:#f0d074; --gold-dim:#c9ab50; --gold-pale:#f7e9b0;
  --rose:#c87fa2;
  --gray:#c2b8ba; --gray-2:#8f8488;
  --line:#e3dcdd; --line-2:#efe9ea;
  --paper:#f9f5f3; --ink:#211519; --mid:#46323a;
}
/* palette-specific selectors (wine): */
.hero{background:var(--wine)}
.hero::before{background:radial-gradient(60% 55% at 78% 8%,rgba(90,39,48,.55),transparent 60%),radial-gradient(55% 50% at 4% 96%,rgba(200,127,162,.16),transparent 55%),radial-gradient(40% 40% at 50% 40%,rgba(240,208,116,.08),transparent 60%)}
.topbar{background:rgba(18,11,12,.96)}
.btn{background:var(--gold);color:var(--wine)} .btn i{background:rgba(28,20,22,.16)}
.method-card .mnum{color:var(--rose)}
.rail a.active{background:var(--wine);color:var(--gold)}
.footer-menu a:hover{background:var(--gold);color:var(--wine)}
.card:hover{box-shadow:0 20px 44px rgba(28,20,22,.1)}
.hero h1 em{font-style:normal;color:var(--gold)}
```
(wine page has .method band + .scope note; no .evidence band)

## STRUCTURAL CSS (shared, palette-agnostic — ZERO border-radius)

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@300;400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
:root{
  --d:'Barlow Semi Condensed',sans-serif; --b:'Barlow',sans-serif;
  --ease:cubic-bezier(.32,.72,0,1);
  --header-h:64px; --rail-h:56px; --max:1180px;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{background:var(--paper);color:var(--ink);font-family:var(--b);font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%;display:block} a{color:inherit} ul{list-style:none}
:focus-visible{outline:2px solid var(--gold);outline-offset:3px}

.skip{position:absolute;left:12px;top:10px;z-index:999;padding:8px 12px;background:var(--dark,var(--wine));color:var(--gold);font-family:var(--d);font-size:11px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(240,208,116,.35);transform:translateY(-160%);transition:transform .2s}
.skip:focus{transform:translateY(0)}
.grain{position:fixed;inset:0;pointer-events:none;z-index:60;opacity:.03;mix-blend-mode:multiply;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.progress{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,var(--gold),var(--gold-pale));z-index:120}

.topbar{position:fixed;top:0;left:0;right:0;z-index:100;height:var(--header-h);border-bottom:1px solid rgba(240,208,116,.18);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.topbar-inner{max-width:var(--max);height:100%;margin:0 auto;padding:0 clamp(16px,4vw,32px);display:flex;align-items:center;justify-content:space-between;gap:20px}
.brand{display:inline-flex;align-items:center;text-decoration:none;flex-shrink:0;padding:10px 0} .brand img{height:28px;width:auto}
.topnav{display:flex;align-items:center;gap:2px;flex-shrink:0}
.topnav a{display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-family:var(--d);font-size:12.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gray);padding:10px 14px;transition:color .5s var(--ease)}
.topnav a i{font-style:normal;opacity:.7} .topnav a:hover{color:var(--gold)}

.hero{position:relative;color:#fff;padding-top:var(--header-h);overflow:hidden;isolation:isolate}
.hero::before{content:"";position:absolute;inset:0;z-index:0}
.hero-wm{position:absolute;left:3vw;right:3vw;top:46%;transform:translateY(-50%);opacity:.05;filter:brightness(2.2) saturate(0);pointer-events:none;z-index:0;width:94%} .hero-wm img{width:100%;height:auto}
.hero-grid{position:relative;z-index:1;max-width:var(--max);margin:0 auto;padding:clamp(40px,7vw,84px) clamp(20px,5vw,32px) clamp(48px,7vw,84px);display:grid;grid-template-columns:minmax(0,1.3fr) minmax(280px,.7fr);gap:clamp(32px,5vw,64px);align-items:start}
.tag,.kicker{display:inline-flex;width:max-content;align-items:center;font-family:var(--d);font-size:10.5px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(240,208,116,.25);padding:7px 13px;background:rgba(240,208,116,.06)}
.hero-copy{min-width:0}
.hero h1{font-family:var(--d);font-weight:800;text-transform:uppercase;letter-spacing:.02em;line-height:.92;font-size:clamp(38px,6vw,86px);margin:24px 0 22px}
.lede{max-width:44ch;font-size:clamp(18px,1.7vw,21px);line-height:1.45;color:var(--gray)}
.hero-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
.btn{display:inline-flex;align-items:center;gap:12px;text-decoration:none;font-family:var(--d);font-weight:700;font-size:13px;letter-spacing:.09em;text-transform:uppercase;padding:9px 9px 9px 20px;transition:background .5s var(--ease)}
.btn i{display:grid;place-items:center;width:30px;height:30px;font-style:normal}
.btn:hover{background:var(--gold-pale)} .btn.ghost{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.2)} .btn.ghost i{background:rgba(255,255,255,.1)}
.hero-panel{position:relative;background:rgba(255,255,255,.05);border:1px solid rgba(240,208,116,.18)}
.panel-logo{background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.02));padding:32px 28px 26px} .panel-logo img{margin:0 auto;height:40px;filter:brightness(1.6)}
.metric{display:flex;align-items:flex-end;justify-content:space-between;gap:14px;padding:18px 24px;border-top:1px solid rgba(240,208,116,.13)}
.metric b{font-family:var(--d);font-size:clamp(30px,3.6vw,46px);line-height:.9;color:var(--gold)}
.metric span{font-family:var(--d);text-transform:uppercase;letter-spacing:.12em;color:var(--gray);font-size:11px;text-align:right;line-height:1.3}

.rail{position:sticky;top:var(--header-h);z-index:50;background:rgba(248,250,250,.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--line);border-top:1px solid var(--line)}
.rail-inner{max-width:var(--max);margin:0 auto;padding:0 clamp(16px,4vw,32px);display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;height:var(--rail-h);align-items:center} .rail-inner::-webkit-scrollbar{display:none}
.rail a{flex:0 0 auto;display:inline-flex;align-items:center;gap:9px;text-decoration:none;padding:9px 14px;border:1px solid transparent;font-family:var(--d);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--mid);white-space:nowrap;transition:all .35s var(--ease)}
.rail a b{font-weight:800;color:var(--gold-dim);font-size:11px}
.rail a:hover{background:#fff;border-color:var(--line);color:var(--ink)}
.rail a.active b{color:var(--gold-pale)}

.intro{max-width:var(--max);margin:0 auto;padding:clamp(48px,7vw,88px) clamp(20px,5vw,32px) 28px}
.intro h2{font-family:var(--d);font-weight:800;text-transform:uppercase;letter-spacing:.03em;line-height:1.02;font-size:clamp(30px,4.4vw,60px);color:var(--ink);max-width:20ch;margin:20px 0}
.intro p{max-width:60ch;font-size:clamp(16px,1.5vw,19px);color:var(--mid)}

.method{background:var(--dark-2,var(--wine-2));color:#fff;border-top:1px solid rgba(240,208,116,.14);border-bottom:1px solid rgba(240,208,116,.14)}
.method-inner{max-width:var(--max);margin:0 auto;padding:clamp(36px,5vw,56px) clamp(20px,5vw,32px);display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:26px}
.method-card h3{font-family:var(--d);font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:17px;color:var(--gold);margin:8px 0 10px} .method-card p{color:var(--gray);font-size:14.5px;line-height:1.5} .method-card .mnum{font-family:var(--d);font-size:11px;font-weight:800;letter-spacing:.18em}

.category{max-width:var(--max);margin:0 auto;padding:clamp(32px,5vw,52px) clamp(20px,5vw,32px);scroll-margin-top:calc(var(--header-h) + var(--rail-h) + 12px)}
.cat-head{border-top:2px solid var(--ink);padding-top:18px;margin-bottom:26px}
.cat-head-row{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap}
.cat-head h2{font-family:var(--d);font-weight:800;text-transform:uppercase;letter-spacing:.03em;line-height:1.04;font-size:clamp(26px,3.6vw,46px);color:var(--ink);max-width:20ch}
.cat-head .count{font-family:var(--d);font-weight:700;text-transform:uppercase;letter-spacing:.14em;font-size:12px;color:var(--gold-dim);white-space:nowrap;padding-bottom:6px}
.cat-sub{max-width:62ch;color:var(--mid);font-size:16.5px;margin-top:10px}

.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:14px}
.card{background:#fff;border:1px solid var(--line);padding:24px;display:flex;flex-direction:column;transition:border-color .5s var(--ease),box-shadow .5s var(--ease)}
.card:hover{border-color:rgba(240,208,116,.7)}
.card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.card-num{font-family:var(--d);font-weight:800;font-size:11px;letter-spacing:.18em;color:var(--gold-dim);background:rgba(240,208,116,.12);padding:5px 11px}
.card h3{font-family:var(--d);font-weight:700;text-transform:uppercase;letter-spacing:.03em;line-height:1.08;font-size:clamp(19px,1.9vw,24px);color:var(--ink)}
.purpose{margin-top:12px;font-size:15px;line-height:1.5;flex:1}
.card details{margin-top:16px;border-top:1px solid var(--line-2);padding-top:4px}
.card summary{cursor:pointer;list-style:none;padding:13px 0;font-family:var(--d);font-weight:700;font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);display:flex;justify-content:space-between;align-items:center} .card summary::-webkit-details-marker{display:none}
.card summary::after{content:"+";color:var(--gold-dim);font-size:16px;font-weight:800} .card details[open] summary::after{content:"–"}
.card dl{display:grid;grid-template-columns:125px 1fr;gap:9px 16px;padding:2px 0 8px;font-size:14px;line-height:1.45}
.card dt{font-family:var(--d);font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--gold-dim);font-size:10px;padding-top:1px} .card dd{color:var(--mid)}

.scope{background:var(--paper);max-width:var(--max);margin:0 auto;padding:clamp(32px,5vw,52px) clamp(20px,5vw,32px) 0}
.scope-inner{background:#fff;border:1px solid var(--line);border-left:4px solid var(--gold);padding:28px 30px}
.scope-inner h3{font-family:var(--d);font-weight:800;text-transform:uppercase;letter-spacing:.04em;font-size:21px;color:var(--ink);margin-bottom:12px} .scope-inner p{color:var(--mid);max-width:68ch}
.scope-inner ul{margin-top:12px;padding-left:0;display:grid;gap:8px} .scope-inner li{color:var(--mid);position:relative;padding-left:24px;font-size:15px} .scope-inner li::before{content:"";position:absolute;left:0;top:.6em;width:14px;height:2px;background:var(--gold)}

.evidence{background:var(--dark,var(--wine));color:#fff;padding:clamp(56px,8vw,104px) clamp(20px,5vw,64px);position:relative;overflow:hidden;isolation:isolate}
.ev-inner{position:relative;z-index:1;max-width:var(--max);margin:0 auto}
.evidence h2{font-family:var(--d);font-weight:800;text-transform:uppercase;letter-spacing:.03em;line-height:1.02;font-size:clamp(30px,4.4vw,58px);color:#fff;max-width:18ch;margin:20px 0}
.evidence p{max-width:62ch;color:var(--gray);font-size:clamp(16px,1.5vw,19px)} .ev-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:26px} .ev-tags span{font-family:var(--d);font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(240,208,116,.25);padding:8px 14px;background:rgba(240,208,116,.05)}

.footer{background:var(--dark-3,var(--wine-3));color:#fff;padding:clamp(48px,7vw,80px) clamp(20px,5vw,64px) 36px}
.footer-top{max-width:var(--max);margin:0 auto;display:grid;grid-template-columns:minmax(220px,.5fr) minmax(0,1fr);gap:clamp(28px,5vw,56px);align-items:start;padding-bottom:44px;border-bottom:1px solid rgba(240,208,116,.14)}
.footer-brand img{height:44px;filter:brightness(1.6)}
.footer-lead h2{font-family:var(--d);font-weight:800;text-transform:uppercase;letter-spacing:.03em;line-height:1.04;font-size:clamp(26px,3.4vw,44px);color:var(--gold);max-width:22ch} .footer-lead p{color:var(--gray);margin-top:18px;max-width:54ch}
.footer-contact{margin-top:16px!important;font-size:14.5px} .footer-contact a{color:var(--gold-pale);text-decoration:none} .footer-contact a:hover{text-decoration:underline}
.footer-menu{max-width:var(--max);margin:22px auto 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:1px;background:rgba(240,208,116,.12);border:1px solid rgba(240,208,116,.12)}
.footer-menu a{display:flex;align-items:center;justify-content:space-between;gap:10px;text-decoration:none;color:var(--gray);background:var(--dark-3,var(--wine-3));padding:16px 18px;font-family:var(--d);text-transform:uppercase;letter-spacing:.1em;font-size:11.5px;font-weight:600;transition:background .35s var(--ease),color .35s var(--ease)} .footer-menu a i{font-style:normal;color:var(--gold-dim)}
.copyright{max-width:var(--max);margin:26px auto 0;font-size:12px;color:var(--gray-2);letter-spacing:.04em}

.reveal{opacity:0;transform:translateY(28px);transition:opacity .8s var(--ease),transform .8s var(--ease)} .reveal.in{opacity:1;transform:none}

@media (max-width:980px){.hero-grid{grid-template-columns:1fr;gap:36px}}
@media (max-width:720px){:root{--header-h:58px}.topnav a:not(:last-child){display:none}.brand img{height:24px}.hero h1{font-size:clamp(34px,10vw,52px)}.footer-top{grid-template-columns:1fr}.footer-menu{grid-template-columns:1fr 1fr}}
@media (max-width:520px){.card{padding:20px}.card dl{grid-template-columns:1fr;gap:4px}.card dt{margin-top:8px}.hero-cta .btn{flex:1;justify-content:center}.metric{padding:14px 18px}.footer-menu{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{transition:none!important;animation:none!important}.reveal{opacity:1;transform:none}}
```

## Deploy (p.tarnovski.com only)

Repo: /Users/andreitarnovski/Documents/Playground/p.tarnovski.com (has deploy.sh). After editing/adding a page:
1. `vercel deploy --prod --yes`
2. Get latest prod uid: `GET https://api.vercel.com/v6/deployments?projectId=prj_01J5q1Y7rqDRL1ooCbVyd3kfBF4X&teamId=team_gCvSQJhwvAAjTvvk0Jt2q5K0&limit=1&target=production`
3. Re-point alias: `POST https://api.vercel.com/v9/now/deployments/{uid}/aliases?teamId=...` body `{"alias":"p.tarnovski.com"}` with header Authorization: Bearer $VERCEL_TOKEN
4. Verify all sibling pages still 200.