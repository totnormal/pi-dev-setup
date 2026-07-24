import { h, render } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import htm from 'htm';
import { BG_HEX, TEXT_COLOR, demo, dulcinellaStrategy } from './data.js';
import { LAYOUTS } from './layouts.js';
import { THEMES, getTheme } from './themes.js';
import { ThemeContext } from './context.js';

const html = htm.bind(h);

const BASE_W = 1920;
const BASE_H = 1080;

// ============================================================
// Hash URL helpers — everything lives in the hash fragment
// #/deck-slug?slide=3&theme=ocean
// ============================================================

function parseHash() {
  const hash = location.hash.slice(2) || ''; // remove "#/"
  const qIdx = hash.indexOf('?');
  const slug = qIdx >= 0 ? hash.slice(0, qIdx) : hash;
  const params = qIdx >= 0 ? new URLSearchParams(hash.slice(qIdx + 1)) : new URLSearchParams();
  return { slug, params };
}

function buildHash(slug, params) {
  const qs = params.toString();
  return '#/' + slug + (qs ? '?' + qs : '');
}

// ============================================================
// HOOKS
// ============================================================

function useScale() {
  const [scale, setScale] = useState(1);
  const update = useCallback(() => {
    const sx = window.innerWidth / BASE_W;
    const sy = window.innerHeight / BASE_H;
    setScale(Math.min(sx, sy));
  }, []);
  useEffect(() => { update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update); }, [update]);
  return scale;
}

function useNav(total, deckSlug) {
  const getInitialSlide = () => {
    const { params } = parseHash();
    const s = params.get('slide');
    if (s) {
      const n = parseInt(s, 10);
      if (!isNaN(n) && n >= 0 && n <= total) return n;
    }
    return 0;
  };

  const [cur, setCur] = useState(getInitialSlide);
  const [busy, setBusy] = useState(false);

  // Sync slide number to hash URL
  useEffect(() => {
    const { slug, params } = parseHash();
    params.set('slide', String(cur));
    history.replaceState(null, '', buildHash(slug, params));
  }, [cur]);

  const go = useCallback((i) => {
    if (busy || i < 0 || i > total) return;
    setBusy(true);
    setCur(i);
    setTimeout(() => setBusy(false), 120);
  }, [busy, total]);
  const next = useCallback(() => go(cur + 1), [cur, go]);
  const prev = useCallback(() => go(cur - 1), [cur, go]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  return { cur, go, next, prev, total };
}

// ============================================================
// PRESENTATION SHELL
// ============================================================

function Presentation({ data, themeName }) {
  const scale = useScale();
  const nav = useNav(data.slides.length);
  const [minimap, setMinimap] = useState(false);
  const containerRef = useRef(null);
  const theme = getTheme(themeName || data.theme || 'deco');

  // Animate items on slide change — only top-level .animate-item elements
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const all = el.querySelectorAll('.animate-item');
    all.forEach(i => i.classList.remove('animated'));
    const top = [...all].filter(item => !item.parentElement.closest('.animate-item'));
    const nested = [...all].filter(item => item.parentElement.closest('.animate-item'));
    const tid = setTimeout(() => {
      top.forEach((item, i) => setTimeout(() => item.classList.add('animated'), i * 40));
      nested.forEach(item => item.classList.add('animated'));
    }, 30);
    return () => clearTimeout(tid);
  }, [nav.cur]);

  // Cover slide
  const firstSlide = data.slides[0] || {};
  const coverBgKey = firstSlide.backgroundColor || 'primary-light';
  const coverBg = theme.bg[coverBgKey] || BG_HEX[coverBgKey] || theme.accent;
  const coverDark = firstSlide.textColor === 'dark';
  const coverTextColor = coverDark ? (theme.textDark || '#1C1917') : (theme.textLight || '#FAFAF9');

  return html`
    <${ThemeContext.Provider} value=${theme}>
      <div style=${{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>

        <!-- Scaled container -->
        <div style=${{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
          <div ref=${containerRef} style=${{ width: `${BASE_W}px`, height: `${BASE_H}px`, position: 'relative', overflow: 'hidden', borderRadius: '6px' }}>

            <!-- Cover (slide 0) -->
            <div style=${{ position: 'absolute', inset: 0, background: coverBg, opacity: nav.cur === 0 ? 1 : 0, pointerEvents: nav.cur === 0 ? 'auto' : 'none', transition: 'opacity 0.2s ease', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              ${data.logo && html`<img src=${data.logo} alt="logo" style=${{ position: 'absolute', top: '48px', left: '80px', height: '28px', filter: coverDark ? 'none' : 'invert(1)' }} />`}
              <h1 class="animate-item" style=${{ fontSize: '96px', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-2px', color: coverTextColor, textAlign: 'center', maxWidth: '1400px' }}>${data.title}</h1>
              <p class="animate-item" style=${{ fontSize: '28px', marginTop: '18px', color: coverDark ? 'rgba(28,25,23,0.4)' : 'rgba(250,249,249,0.4)' }}>${data.subtitle}</p>
              ${firstSlide.tag && html`<span class="animate-item" style=${{ position: 'absolute', bottom: '48px', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: coverDark ? 'rgba(28,25,23,0.3)' : 'rgba(250,249,249,0.3)' }}>${firstSlide.tag}</span>`}
            </div>

            <!-- Content slides — only render nearby slides for performance -->
            ${data.slides.map((slide, i) => {
              const idx = i + 1;
              const active = nav.cur === idx;
              // Only mount slides within 1 of current for performance
              if (Math.abs(nav.cur - idx) > 1) return null;
              const bgKey = slide.backgroundColor || 'dc-950';
              const bg = theme.bg[bgKey] || BG_HEX[bgKey] || '#121110';
              const Layout = LAYOUTS[slide.layout];
              return html`
                <div key=${i} style=${{ position: 'absolute', inset: 0, background: bg, opacity: active ? 1 : 0, pointerEvents: active ? 'auto' : 'none', transition: 'opacity 0.2s ease' }}>
                  ${Layout ? html`<${Layout} slide=${slide} isActive=${active} />` : html`
                    <div class="flex flex-col justify-center items-center h-full" style=${{ padding: '80px' }}>
                      <h2 class="animate-item" style=${{ fontSize: '36px', fontWeight: 600, color: '#FAFAF9', textAlign: 'center' }}>${slide.title}</h2>
                      ${slide.subtitle && html`<p class="animate-item" style=${{ fontSize: '18px', color: 'rgba(250,249,249,0.4)', marginTop: '16px' }}>${slide.subtitle}</p>`}
                    </div>`}
                </div>`;
            })}
          </div>
        </div>

        <!-- Progress bar -->
        <div style=${{ position: 'fixed', right: '8px', top: '50%', transform: 'translateY(-50%)', width: '3px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', zIndex: 50 }}>
          <div style=${{ width: '100%', height: `${(nav.cur / nav.total) * 100}%`, background: theme.accent, borderRadius: '2px', transition: 'height 0.35s ease' }} />
        </div>

        <!-- Navigation controls -->
        <div style=${{ position: 'fixed', bottom: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 100 }}>
          <${NavBtn} icon="grid_view" onClick=${() => setMinimap(!minimap)} accent=${theme.accent} />
          <${NavBtn} icon="first_page" onClick=${() => nav.go(0)} accent=${theme.accent} />
          <${NavBtn} icon="chevron_left" onClick=${nav.prev} disabled=${nav.cur === 0} accent=${theme.accent} />
          <span style=${{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontFamily: 'monospace', minWidth: '44px', textAlign: 'center' }}>${nav.cur}/${nav.total}</span>
          <${NavBtn} icon="chevron_right" onClick=${nav.next} disabled=${nav.cur === nav.total} accent=${theme.accent} />
        </div>

        <!-- Minimap -->
        ${minimap && html`<${Minimap} data=${data} nav=${nav} onClose=${() => setMinimap(false)} accent=${theme.accent} />`}
      </div>
    <//>`;
}

function NavBtn({ icon, onClick, disabled, accent }) {
  return html`<button onClick=${onClick} disabled=${disabled}
    style=${{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '6px', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.3 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
    <span class="material-symbols-sharp" style=${{ fontSize: '18px', fontVariationSettings: "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 48", lineHeight: 1 }}>${icon}</span>
  </button>`;
}

function Minimap({ data, nav, onClose, accent = '#D0EC1A' }) {
  return html`
    <div style=${{ position: 'fixed', top: 0, right: 0, width: '300px', height: '100vh', background: 'rgba(18,17,16,0.95)', borderLeft: '1px solid rgba(255,255,255,0.1)', zIndex: 200, display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)' }}>
      <div style=${{ padding: '18px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style=${{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>${data.title}</span>
        <button onClick=${onClose} style=${{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '16px' }}>\u00D7</button>
      </div>
      <div style=${{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        <button onClick=${() => nav.go(0)} style=${{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginBottom: '3px', background: nav.cur === 0 ? accent + '1f' : 'transparent', color: nav.cur === 0 ? accent : 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Cover</button>
        ${data.slides.map((s, i) => html`
          <button key=${i} onClick=${() => nav.go(i + 1)}
            style=${{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', marginBottom: '3px', background: nav.cur === i + 1 ? accent + '1f' : 'transparent', color: nav.cur === i + 1 ? accent : 'rgba(255,255,255,0.5)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style=${{ color: 'rgba(255,255,255,0.25)', fontSize: '10px', minWidth: '18px' }}>${i + 1}</span>
            <span style=${{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>${s.title}</span>
          </button>`)}
      </div>
    </div>`;
}

// ============================================================
// ROUTER — hash-based, zero dependencies
// ============================================================

const DECKS = {
  'demo': demo,
  'dulcinella-strategy': dulcinellaStrategy,
};

function Router() {
  const [routeState, setRouteState] = useState(() => parseHash());
  useEffect(() => {
    const handler = () => setRouteState(parseHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const { slug, params } = routeState;
  const themeName = params.get('theme') || undefined;

  const deck = DECKS[slug];
  if (deck) return html`<${Presentation} key=${slug + '-' + (themeName || '')} data=${deck} themeName=${themeName} />`;

  // Landing page
  const themeNames = Object.keys(THEMES);
  return html`
    <div style=${{ width: '100vw', height: '100vh', background: '#0A0A09', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <h1 style=${{ fontSize: '56px', fontWeight: 600, color: '#FAFAF9', marginBottom: '8px', letterSpacing: '-1px' }}>Zero-Build Slides</h1>
      <p style=${{ fontSize: '15px', color: 'rgba(250,249,249,0.35)', marginBottom: '44px' }}>Presentations powered by 4 plain JS files. No npm, no build step.</p>
      <a href="#/demo" style=${{ width: '420px', borderRadius: '14px', overflow: 'hidden', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.2s ease, border-color 0.2s ease' }}
        onMouseEnter=${e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.borderColor = 'rgba(208,236,26,0.3)'; }}
        onMouseLeave=${e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
        <div style=${{ height: '140px', background: '#6366F1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <span style=${{ fontSize: '28px', fontWeight: 600, color: '#FAFAF9' }}>Template Showcase</span>
          <span style=${{ fontSize: '13px', color: 'rgba(250,249,249,0.4)', marginTop: '4px' }}>${demo.slides.length} slides</span>
        </div>
        <div style=${{ padding: '16px 20px', background: 'rgba(255,255,255,0.03)' }}>
          <p style=${{ fontSize: '13px', color: 'rgba(250,249,249,0.45)', lineHeight: 1.5 }}>How this project works, all slide templates demonstrated, and the theming system</p>
        </div>
      </a>

      <!-- Theme switcher -->
      <div style=${{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <span style=${{ fontSize: '11px', color: 'rgba(250,249,249,0.25)', textTransform: 'uppercase', letterSpacing: '1px' }}>Try a theme</span>
        <div style=${{ display: 'flex', gap: '8px' }}>
          ${themeNames.map(name => {
            const t = THEMES[name];
            return html`<a
              href=${'#/demo?theme=' + name}
              style=${{
                width: '36px', height: '36px', borderRadius: '50%',
                background: t.accent, border: '2px solid rgba(255,255,255,0.15)',
                cursor: 'pointer', position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none',
              }}
              title=${name}>
              <span style=${{ fontSize: '10px', fontWeight: 600, color: t.textDark || '#1C1917' }}>${name[0].toUpperCase()}</span>
            </a>`;
          })}
        </div>
      </div>

      <!-- Install as skill -->
      <div style=${{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', maxWidth: '480px' }}>
        <span style=${{ fontSize: '11px', color: 'rgba(250,249,249,0.25)', textTransform: 'uppercase', letterSpacing: '1px' }}>Install as Claude Code skill</span>
        <code style=${{ fontSize: '14px', color: '#D0EC1A', background: 'rgba(208,236,26,0.08)', padding: '12px 24px', borderRadius: '8px', border: '1px solid rgba(208,236,26,0.15)', fontFamily: "'Commit Mono', ui-monospace, monospace", letterSpacing: '-0.3px' }}>bunx @decocms/zero-build-slides</code>
        <p style=${{ fontSize: '13px', color: 'rgba(250,249,249,0.35)', textAlign: 'center', lineHeight: 1.6 }}>Installs the skill so your agent knows how to create and edit slide decks. Works with Claude Code, Cursor, Copilot, and 40+ agents.</p>
      </div>

      <!-- Links -->
      <div style=${{ marginTop: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <a href="#/dulcinella-strategy" style=${{ fontSize: '14px', color: '#D0EC1A', textDecoration: 'underline', transition: 'color 0.15s ease' }}>View Dulcinella Strategy Deck</a>
      </div>
      <div style=${{ marginTop: '32px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <a href="https://github.com/decocms/zero-build-slides" target="_blank" rel="noopener"
          style=${{ fontSize: '13px', color: 'rgba(250,249,249,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.15s ease' }}
          onMouseEnter=${e => e.currentTarget.style.color = 'rgba(250,249,249,0.7)'}
          onMouseLeave=${e => e.currentTarget.style.color = 'rgba(250,249,249,0.4)'}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          GitHub
        </a>
        <a href="https://www.npmjs.com/package/@decocms/zero-build-slides" target="_blank" rel="noopener"
          style=${{ fontSize: '13px', color: 'rgba(250,249,249,0.4)', textDecoration: 'none', transition: 'color 0.15s ease' }}
          onMouseEnter=${e => e.currentTarget.style.color = 'rgba(250,249,249,0.7)'}
          onMouseLeave=${e => e.currentTarget.style.color = 'rgba(250,249,249,0.4)'}>
          npm
        </a>
      </div>
    </div>`;
}

// ============================================================
// MOUNT
// ============================================================

render(html`<${Router} />`, document.getElementById('root'));
