import { h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import htm from 'htm';
import { ThemeContext } from './context.js';

const html = htm.bind(h);

// ============================================================
// Color utilities — theme-aware with fallbacks
// ============================================================

function useThemeColors() {
  const theme = useContext(ThemeContext);
  if (!theme) return {
    accent: '#D0EC1A', accent2: '#A595FF', accent3: '#FFC116',
    heading: '#E7E5E4', body: '#A6A09D', muted: '#78726E', border: '#282524',
    surface: '#121110', hoverBg: 'rgba(208,236,26,0.06)',
  };
  return {
    accent: theme.accent, accent2: theme.accent2, accent3: theme.accent3,
    heading: theme.heading, body: theme.body, muted: theme.muted, border: theme.border,
    surface: theme.surface, hoverBg: theme.accent + '0f',
  };
}

// Legacy maps removed — all layouts now use useThemeColors()

// ============================================================
// Shared helpers
// ============================================================

function Icon({ icon, size = 24, className = '' }) {
  return html`<span class="material-symbols-sharp ${className}"
    style=${{ fontSize: `${size}px`, fontVariationSettings: "'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 48", lineHeight: 1, userSelect: 'none' }}>
    ${icon}
  </span>`;
}

function HighlightText({ text }) {
  const parts = text.split('||');
  return html`<span>${parts.map((p, i) =>
    i % 2 === 1
      ? html`<em style=${{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>${p}</em>`
      : html`<span>${p}</span>`
  )}</span>`;
}

function CountUp({ end, suffix = '', isActive, delay = 0 }) {
  const [count, setCount] = useState(0);
  const [ran, setRan] = useState(false);
  useEffect(() => {
    if (isActive && !ran) {
      const tid = setTimeout(() => {
        setRan(true);
        const t0 = Date.now();
        const go = () => {
          const p = Math.min((Date.now() - t0) / 2000, 1);
          const e = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(e * end));
          if (p < 1) requestAnimationFrame(go); else setCount(end);
        };
        requestAnimationFrame(go);
      }, delay);
      return () => clearTimeout(tid);
    }
  }, [isActive, ran]);
  useEffect(() => { if (!isActive) { setRan(false); setCount(0); } }, [isActive]);
  return html`<span>${count.toLocaleString()}${suffix}</span>`;
}

// ============================================================
// TITLE SLIDE — section headers, intro/outro
// ============================================================

function TitleSlide({ slide }) {
  const tc = useThemeColors();
  const dark = slide.textColor === 'dark';
  const tocItems = slide.items || [];
  const hasToc = tocItems.length > 0 && slide.slideNumber;

  if (!hasToc) {
    // Centered variant — cover-style
    return html`
      <div class="flex flex-col items-center justify-center h-full w-full relative" style=${{ padding: '96px' }}>
        ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
          style=${{ fontSize: '11px', marginBottom: '24px', color: dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)' }}>
          ${slide.tag}
        </span>`}
        <h1 class="animate-item text-center leading-none"
          style=${{ fontSize: '140px', fontWeight: 600, letterSpacing: '-3px', maxWidth: '1400px', lineHeight: 1, color: dark ? (tc.textDark || '#1C1917') : (tc.textLight || '#FAFAF9') }}>
          ${slide.title}
        </h1>
        ${slide.subtitle && html`<p class="animate-item text-center"
          style=${{ fontSize: '24px', marginTop: '32px', opacity: 0.5, color: dark ? (tc.textDark || '#1C1917') : (tc.textLight || '#FAFAF9') }}>
          ${slide.subtitle}
        </p>`}
      </div>`;
  }

  // Section slide — TOC-style with bottom-aligned 180px title
  const textCol = dark ? (tc.textDark || '#1C1917') : (tc.textLight || '#FAFAF9');
  const dimCol = dark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)';
  return html`
    <div class="flex flex-col h-full w-full" style=${{ padding: '64px 80px' }}>
      <!-- TOC at top -->
      <div class="animate-item" style=${{ marginBottom: 'auto' }}>
        <div style=${{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          ${tocItems.map((item, i) => {
            const num = String(i + 1).padStart(2, '0');
            const isCurrent = slide.slideNumber === num;
            return html`
              <div style=${{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style=${{ fontSize: '15px', width: '24px', color: isCurrent ? textCol : dimCol }}>${num}</span>
                <span style=${{ fontSize: '15px', color: isCurrent ? textCol : dimCol }}>${item.title}</span>
              </div>`;
          })}
        </div>
      </div>
      <!-- Title at bottom -->
      <div style=${{ marginTop: 'auto' }}>
        ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
          style=${{ fontSize: '11px', marginBottom: '16px', color: dimCol }}>
          ${slide.tag}
        </span>`}
        <h1 class="animate-item leading-none"
          style=${{ fontSize: '180px', fontWeight: 600, letterSpacing: '-4px', color: textCol }}>
          ${slide.title}
        </h1>
        ${slide.subtitle && html`<p class="animate-item"
          style=${{ fontSize: '18px', marginTop: '20px', opacity: 0.5, color: textCol }}>
          ${slide.subtitle}
        </p>`}
      </div>
    </div>`;
}

// ============================================================
// DINNER THESIS — big statement + bullet proof points
// ============================================================

function DinnerThesisSlide({ slide }) {
  const tc = useThemeColors();
  const bullets = slide.items?.[0]?.bullets || [];
  return html`
    <div class="flex flex-col justify-center h-full w-full" style=${{ padding: '80px 96px' }}>
      ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
        style=${{ fontSize: '12px', marginBottom: '32px', color: tc.muted }}>${slide.tag}</span>`}
      <h1 class="animate-item" style=${{ fontSize: '44px', fontWeight: 600, lineHeight: 1.15, color: tc.heading, maxWidth: '900px', marginBottom: '48px' }}>
        ${slide.title}
      </h1>
      <div style=${{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        ${bullets.map(b => html`
          <p class="animate-item" style=${{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(250,249,249,0.7)', paddingLeft: '24px', borderLeft: `2px solid ${tc.accent}4d` }}>
            ${b.text}
          </p>`)}
      </div>
    </div>`;
}

// ============================================================
// MARKET SIGNALS FUNNEL — chevron shapes + per-stage cards
// ============================================================

function MarketSignalsFunnelSlide({ slide }) {
  const tc = useThemeColors();
  const [hoveredArticle, setHoveredArticle] = useState(null);

  const stageNames = ['Aquisição', 'Conversão', 'Operação', 'Suporte'];
  const stageIcons = { 'Aquisição': 'ads_click', 'Conversão': 'conversion_path', 'Operação': 'precision_manufacturing', 'Suporte': 'support_agent' };
  const stageStyles = [
    { bg: tc.accent + '1f', text: tc.accent, border: tc.accent + '40' },
    { bg: tc.accent2 + '1f', text: tc.accent2, border: tc.accent2 + '40' },
    { bg: tc.accent3 + '1f', text: tc.accent3, border: tc.accent3 + '40' },
    { bg: tc.accent + '14', text: tc.accent, border: tc.accent + '2e' },
  ];

  const stages = (slide.items || []).filter(item => stageNames.includes(item.title));
  const articles = (slide.items || []).filter(item => !stageNames.includes(item.title));
  const getArticlesForStage = (name) => articles.filter(a => a.subtitle === name);
  const chevronSize = 22;

  return html`
    <div class="flex flex-col h-full w-full" style=${{ padding: '64px 80px' }}>
      <!-- Header -->
      <div style=${{ marginBottom: '40px' }}>
        ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
          style=${{ fontSize: '12px', marginBottom: '12px', color: tc.muted }}>${slide.tag}</span>`}
        <h2 class="animate-item" style=${{ fontSize: '32px', lineHeight: 1.15, color: tc.heading, letterSpacing: '-0.5px' }}>
          ${slide.title}
        </h2>
      </div>

      <!-- Funnel chevrons -->
      <div class="animate-item" style=${{ display: 'flex', marginBottom: '36px' }}>
        ${stages.map((stage, i) => {
          const isFirst = i === 0;
          const isLast = i === stages.length - 1;
          const style = stageStyles[i];
          return html`
            <div style=${{
              flex: 1, height: '64px', backgroundColor: style.bg,
              display: 'flex', alignItems: 'center',
              paddingLeft: isFirst ? '28px' : `${chevronSize + 16}px`,
              paddingRight: '16px', gap: '12px',
              marginLeft: isFirst ? '0' : `-${chevronSize}px`,
              clipPath: isFirst
                ? `polygon(0 0, calc(100% - ${chevronSize}px) 0, 100% 50%, calc(100% - ${chevronSize}px) 100%, 0 100%)`
                : isLast
                ? `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${chevronSize}px 50%)`
                : `polygon(0 0, calc(100% - ${chevronSize}px) 0, 100% 50%, calc(100% - ${chevronSize}px) 100%, 0 100%, ${chevronSize}px 50%)`,
              position: 'relative', zIndex: stages.length - i,
            }}>
              <${Icon} icon=${stageIcons[stage.title] || 'category'} size=${28} className="" />
              <span style=${{ fontSize: '18px', fontWeight: 500, color: style.text, letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>${stage.title}</span>
            </div>`;
        })}
      </div>

      <!-- Content columns: insights + article cards -->
      <div class="flex-1" style=${{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', alignContent: 'start' }}>
        ${stages.map((stage, stageIdx) => {
          const style = stageStyles[stageIdx];
          const stageArticles = getArticlesForStage(stage.title);
          return html`
            <div class="animate-item" style=${{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <!-- Key insight (highlighted bullets) -->
              ${stage.bullets?.filter(b => b.highlight).map(b => html`
                <p style=${{ fontSize: '21px', lineHeight: 1.35, color: style.text, letterSpacing: '-0.3px' }}>${b.text}</p>
              `)}
              <!-- Supporting context -->
              ${stage.bullets?.filter(b => !b.highlight).map(b => html`
                <p style=${{ fontSize: '16px', lineHeight: 1.4, color: tc.body }}>${b.text}</p>
              `)}
              <!-- Article cards with left border + icon badge -->
              ${stageArticles.map((article, j) => {
                const key = `${stageIdx}-${j}`;
                return html`
                  <a href=${article.value} target="_blank" rel="noopener noreferrer"
                    style=${{
                      textDecoration: 'none', padding: '20px 24px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: hoveredArticle === key ? style.border : tc.border,
                      backgroundColor: hoveredArticle === key ? style.bg : 'transparent',
                      borderLeft: `3px solid ${style.border}`,
                      display: 'flex', flexDirection: 'column', cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter=${() => setHoveredArticle(key)}
                    onMouseLeave=${() => setHoveredArticle(null)}>
                    <!-- Icon -->
                    ${article.label && html`<${Icon} icon=${article.label} size=${32} className="" />`}
                    <!-- Badge -->
                    <div style=${{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: article.label ? '12px' : 0, marginBottom: '10px' }}>
                      <span class="font-mono uppercase" style=${{ fontSize: '10px', color: style.text, padding: '3px 10px', border: `1px solid ${style.border}`, borderRadius: '4px', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>${article.title}</span>
                      <${Icon} icon="open_in_new" size=${14} className="text-dc-600" />
                    </div>
                    ${article.bullets?.[0] && html`<p style=${{ fontSize: '16px', lineHeight: 1.4, color: tc.heading }}>${article.bullets[0].text}</p>`}
                  </a>`;
              })}
            </div>`;
        })}
      </div>
    </div>`;
}

// ============================================================
// DINNER FEATURES — card grid with 1:1 video + grayscale hover
// ============================================================

function DinnerFeaturesSlide({ slide }) {
  const tc = useThemeColors();
  const [hoveredCard, setHoveredCard] = useState(null);
  const items = slide.items || [];
  const cols = items.length;

  return html`
    <div class="flex flex-col h-full w-full" style=${{ padding: '80px 96px' }}>
      <!-- Header -->
      <div style=${{ marginBottom: cols > 3 ? '32px' : '48px' }}>
        ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
          style=${{ fontSize: '12px', marginBottom: '16px', color: tc.muted, letterSpacing: '0.2em' }}>${slide.tag}</span>`}
        <h2 class="animate-item" style=${{ fontSize: '32px', lineHeight: 1.15, color: tc.heading, letterSpacing: '-0.5px' }}>
          ${slide.title}
        </h2>
      </div>

      <!-- Cards grid -->
      <div class="flex-1 animate-item" style=${{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: cols > 3 ? '16px' : '24px' }}>
        ${items.map((item, index) => html`
          <div class="animate-item"
            style=${{
              borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
              border: '1px solid', cursor: 'pointer',
              borderColor: hoveredCard === index ? tc.accent : tc.border,
              backgroundColor: hoveredCard === index ? tc.hoverBg : 'transparent',
              padding: item.label ? '0' : '40px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter=${() => setHoveredCard(index)}
            onMouseLeave=${() => setHoveredCard(null)}>
            ${item.label ? html`
              <!-- Card with video/image -->
              <!-- 1:1 aspect video area -->
              <div style=${{ position: 'relative', width: '100%', aspectRatio: '1/1', flexShrink: 0 }}>
                ${item.label.includes('.mp4') ? html`
                  <video src=${item.label} autoplay muted loop playsinline
                    style=${{
                      width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top',
                      transformOrigin: 'top center',
                      transform: hoveredCard === index ? 'scale(1.07)' : 'scale(1)',
                      filter: hoveredCard === index ? 'grayscale(0)' : 'grayscale(1)',
                      transition: 'all 0.5s ease',
                    }} />
                ` : html`
                  <img src=${item.label} alt=${item.title || ''}
                    style=${{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transformOrigin: 'top center',
                      transform: hoveredCard === index ? 'scale(1.07)' : 'scale(1)',
                      filter: hoveredCard === index ? 'grayscale(0)' : 'grayscale(1)',
                      transition: 'all 0.5s ease',
                    }} />
                `}
                <!-- Gradient shadow over bottom of video -->
                <div style=${{
                  position: 'absolute', bottom: 0, left: '-2px', right: '-2px', height: '60%',
                  background: `linear-gradient(to top, ${hoveredCard === index ? tc.surface : tc.surface}, ${hoveredCard === index ? tc.surface + 'd9' : tc.surface + 'd9'} 35%, transparent 100%)`,
                  transition: 'all 0.3s ease',
                }} />
              </div>
              <!-- Text content overlapping into video -->
              <div style=${{
                display: 'flex', flexDirection: 'column', flex: 1, position: 'relative',
                padding: '30px 40px 40px', marginTop: '-30px', zIndex: 1,
                background: `linear-gradient(to bottom, transparent, ${hoveredCard === index ? tc.surface : tc.surface} 30px)`,
              }}>
                ${item.subtitle && html`<span class="font-mono uppercase"
                  style=${{
                    fontSize: '13px', marginBottom: '20px', letterSpacing: '0.15em',
                    color: hoveredCard === index ? tc.accent : tc.body,
                    transition: 'color 0.3s ease',
                  }}>[${item.subtitle}]</span>`}
                <p style=${{ fontSize: '32px', lineHeight: 1.3, letterSpacing: '-0.5px', color: tc.heading }}>${item.title}</p>
                ${item.bullets && html`<div style=${{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  ${item.bullets.map(b => html`
                    <p style=${{ fontSize: '16px', lineHeight: 1.4, color: tc.body, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style=${{ fontSize: '10px', marginTop: '5px', flexShrink: 0, color: tc.accent }}>✳︎</span>
                      <span><${HighlightText} text=${b.text} /></span>
                    </p>`)}
                </div>`}
              </div>
            ` : html`
              <!-- Card without video (icon-only) -->
              <div style=${{ marginBottom: item.bullets ? '20px' : '40px', color: tc.accent }}>
                <${Icon} icon=${item.value || 'smart_toy'} size=${cols > 3 ? (item.bullets ? 80 : 160) : (item.bullets ? 140 : 288)} />
              </div>
              ${item.subtitle && html`<span class="font-mono uppercase"
                style=${{
                  fontSize: '13px', marginBottom: item.bullets ? '16px' : '24px', letterSpacing: '0.15em',
                  color: hoveredCard === index ? tc.accent : tc.body,
                  transition: 'color 0.3s ease',
                }}>[${item.subtitle}]</span>`}
              <p style=${{ fontSize: cols > 3 ? (item.bullets ? '22px' : '28px') : (item.bullets ? '32px' : '40px'), lineHeight: 1.3, letterSpacing: '-0.5px', color: tc.heading }}>${item.title}</p>
              ${item.bullets && html`<div style=${{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                ${item.bullets.map(b => html`
                  <p style=${{ fontSize: '16px', lineHeight: 1.4, color: tc.body, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style=${{ fontSize: '10px', marginTop: '5px', flexShrink: 0, color: tc.accent }}>✳︎</span>
                    <span><${HighlightText} text=${b.text} /></span>
                  </p>`)}
              </div>`}
            `}
          </div>`)}
      </div>
    </div>`;
}

// ============================================================
// DINNER DEMO — 40%/60% split with stacked icon cards
// ============================================================

function DinnerDemoSlide({ slide }) {
  const tc = useThemeColors();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const items = slide.items || [];

  return html`
    <div class="flex h-full w-full" style=${{ padding: '80px 96px', gap: '16px' }}>
      <!-- Left side: header + stacked cards (40%) -->
      <div style=${{
        display: 'flex', flexDirection: 'column', minWidth: 0,
        flex: isFullscreen ? '0 0 0%' : '0 0 40%',
        opacity: isFullscreen ? 0 : 1, overflow: 'hidden',
        transition: 'all 0.5s ease',
      }}>
        ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
          style=${{ fontSize: '12px', marginBottom: '16px', color: tc.muted, letterSpacing: '0.2em' }}>${slide.tag}</span>`}
        <h2 class="animate-item" style=${{ fontSize: '32px', lineHeight: 1.15, color: tc.heading, letterSpacing: '-0.5px' }}>${slide.title}</h2>
        ${slide.subtitle && html`<p class="animate-item" style=${{ fontSize: '17px', marginTop: '12px', marginBottom: '32px', color: tc.body }}>${slide.subtitle}</p>`}
        <!-- Stacked cards -->
        ${items.length > 0 && html`
          <div style=${{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            ${items.map((item, idx) => html`
              <div class="animate-item" style=${{
                display: 'flex', flexDirection: 'column', borderRadius: '12px',
                border: `1px solid ${tc.border}`, flex: 1, padding: '28px 32px',
              }}>
                <!-- Icon -->
                <div style=${{ marginBottom: '12px', color: idx === 0 ? tc.body : tc.accent }}>
                  <${Icon} icon=${idx === 0 ? 'skull' : 'smart_toy'} size=${48} />
                </div>
                <!-- Badge -->
                <span class="font-mono uppercase" style=${{
                  fontSize: '13px', marginBottom: '16px', letterSpacing: '0.15em',
                  color: idx === 0 ? tc.muted : tc.accent,
                }}>${item.title}</span>
                <!-- Bullets -->
                ${item.bullets && html`<div style=${{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  ${item.bullets.map(b => html`
                    <p style=${{ fontSize: '22px', lineHeight: 1.4, color: tc.heading, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style=${{ fontSize: '14px', marginTop: '4px', flexShrink: 0, color: idx === 0 ? tc.muted : tc.accent }}>✳︎</span>
                      <span>${b.text}</span>
                    </p>`)}
                </div>`}
              </div>`)}
          </div>`}
      </div>

      <!-- Right side: video (58%) -->
      <div class="animate-item" style=${{
        flex: isFullscreen ? '1 1 100%' : '0 0 58%',
        borderRadius: '12px', border: `1px solid ${tc.border}`, overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', background: 'rgba(255,255,255,0.02)',
        transition: 'all 0.5s ease',
      }}>
        ${slide.backgroundImage ? html`
          ${slide.backgroundImage.includes('.mp4') ? html`
            <video src=${slide.backgroundImage} autoplay muted loop playsinline
              style=${{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left' }} />
          ` : html`
            <img src=${slide.backgroundImage} alt="" style=${{ width: '100%', height: '100%', objectFit: 'cover' }} />
          `}
        ` : html`
          <div style=${{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <span style=${{ fontSize: '64px', lineHeight: 1, color: '#56524E' }}>▶</span>
            <span class="font-mono uppercase" style=${{ fontSize: '12px', letterSpacing: '0.1em', color: '#56524E' }}>Live demo</span>
          </div>
        `}
        <!-- Fullscreen toggle -->
        <button onClick=${() => setIsFullscreen(!isFullscreen)}
          style=${{
            position: 'absolute', bottom: '16px', right: '16px',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '8px', border: '1px solid #44403C',
            background: 'rgba(18,17,16,0.8)', cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}>
          <${Icon} icon=${isFullscreen ? 'close_fullscreen' : 'open_in_full'} size=${20} className="text-dc-400" />
        </button>
      </div>
    </div>`;
}

// ============================================================
// DINNER ADMIN CASES — two columns: blog 2x2 + quotes
// ============================================================

function DinnerAdminCasesSlide({ slide }) {
  const tc = useThemeColors();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null);

  const blogPosts = (slide.items || []).filter(i => i.subtitle === 'blog');
  const quotes = (slide.items || []).filter(i => i.subtitle !== 'blog');
  const [leftTitle, rightTitle] = (slide.slideNumber || '').split('|');

  return html`
    <div class="flex flex-col h-full w-full" style=${{ padding: '80px 96px' }}>
      <!-- Header -->
      <div style=${{ marginBottom: '32px' }}>
        ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
          style=${{ fontSize: '12px', marginBottom: '16px', color: tc.muted, letterSpacing: '0.2em' }}>${slide.tag}</span>`}
        <h2 class="animate-item" style=${{ fontSize: '32px', lineHeight: 1.15, color: tc.heading, letterSpacing: '-0.5px' }}>${slide.title}</h2>
      </div>

      <!-- Two columns -->
      <div class="flex-1 animate-item" style=${{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <!-- Left: Blog posts 2x2 -->
        <div style=${{ borderRadius: '12px', border: `1px solid ${tc.border}`, padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <span class="font-mono uppercase" style=${{ fontSize: '11px', marginBottom: '8px', color: tc.muted, letterSpacing: '0.15em' }}>PRODUCT UPDATES</span>
          ${leftTitle && html`<p style=${{ fontSize: '20px', lineHeight: 1.3, marginBottom: '16px', letterSpacing: '-0.3px', color: tc.accent }}>${leftTitle}</p>`}
          <div class="flex-1" style=${{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            ${blogPosts.map((post, i) => html`
              <a href=${post.value} target="_blank" rel="noopener noreferrer"
                style=${{
                  textDecoration: 'none', borderRadius: '8px', overflow: 'hidden',
                  border: '1px solid', display: 'flex', flexDirection: 'column',
                  borderColor: hoveredPost === i ? tc.accent : tc.border,
                  backgroundColor: hoveredPost === i ? tc.hoverBg : 'transparent',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                }}
                onMouseEnter=${() => setHoveredPost(i)}
                onMouseLeave=${() => setHoveredPost(null)}>
                ${post.label && html`<div style=${{ width: '100%', aspectRatio: '1200/630', overflow: 'hidden', flexShrink: 0 }}>
                  <img src=${post.label} alt=${post.title || ''} style=${{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>`}
                <div style=${{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style=${{ fontSize: '17px', lineHeight: 1.25, fontWeight: 500, marginBottom: '6px', letterSpacing: '-0.3px', color: tc.heading }}>${post.title}</p>
                  ${post.bullets?.[0] && html`<p style=${{ fontSize: '14px', lineHeight: 1.35, color: tc.body, flex: 1 }}>${post.bullets[0].text}</p>`}
                  <span style=${{ display: 'flex', alignItems: 'center', fontSize: '12px', color: tc.accent, gap: '4px', marginTop: '8px' }}>
                    Read more <${Icon} icon="arrow_forward" size=${14} />
                  </span>
                </div>
              </a>`)}
          </div>
        </div>

        <!-- Right: Quotes -->
        <div style=${{ borderRadius: '12px', border: `1px solid ${tc.border}`, padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <span class="font-mono uppercase" style=${{ fontSize: '11px', marginBottom: '8px', color: tc.muted, letterSpacing: '0.15em' }}>CASES ENTREGUES</span>
          ${rightTitle && html`<p style=${{ fontSize: '20px', lineHeight: 1.3, marginBottom: '20px', letterSpacing: '-0.3px', color: tc.accent }}>${rightTitle}</p>`}
          <div style=${{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            ${quotes.map((item, i) => html`
              <div style=${{
                borderRadius: '8px', border: '1px solid', flex: 1, padding: '24px 28px',
                display: 'flex', flexDirection: 'column', cursor: 'pointer',
                borderColor: hoveredCard === i ? tc.accent : tc.border,
                backgroundColor: hoveredCard === i ? tc.hoverBg : 'transparent',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter=${() => setHoveredCard(i)}
                onMouseLeave=${() => setHoveredCard(null)}>
                ${item.bullets?.[0] && html`
                  <p style=${{ flex: 1, fontSize: '28px', lineHeight: 1.3, letterSpacing: '-0.4px', color: hoveredCard === i ? '#fafaf9' : tc.muted, transition: 'color 0.3s ease' }}>
                    \u201C${item.bullets[0].text.includes('||') ? html`
                      <span>${item.bullets[0].text.split('||')[0]}</span>
                      <span style=${{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: '32px', color: hoveredCard === i ? tc.accent : '#fafaf9', transition: 'color 0.3s ease' }}>${item.bullets[0].text.split('||')[1]}</span>
                      <span>${item.bullets[0].text.split('||')[2] || ''}</span>
                    ` : html`${item.bullets[0].text}`}\u201D
                  </p>`}
                ${item.title && html`<span style=${{ fontSize: '16px', marginTop: '12px', color: hoveredCard === i ? tc.body : tc.muted, transition: 'color 0.3s ease' }}>${item.title}</span>`}
              </div>`)}
          </div>
        </div>
      </div>
    </div>`;
}

// ============================================================
// DINNER ROADMAP — 3 strategic direction cards
// ============================================================

function DinnerRoadmapSlide({ slide }) {
  const tc = useThemeColors();
  const items = slide.items || [];

  return html`
    <div class="flex flex-col h-full w-full" style=${{ padding: '80px 96px' }}>
      <div style=${{ marginBottom: '48px' }}>
        ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
          style=${{ fontSize: '12px', marginBottom: '16px', color: tc.muted, letterSpacing: '0.2em' }}>${slide.tag}</span>`}
        <h2 class="animate-item" style=${{ fontSize: '32px', lineHeight: 1.15, color: tc.heading, letterSpacing: '-0.5px' }}>${slide.title}</h2>
      </div>
      <div style=${{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '24px', flex: 1 }}>
        ${items.map(item => html`
          <div class="animate-item" style=${{
            background: 'transparent', borderRadius: '12px', padding: '40px',
            border: `1px solid ${tc.border}`, display: 'flex', flexDirection: 'column',
          }}>
            ${item.value && html`<div style=${{ color: tc.accent, marginBottom: '20px' }}><${Icon} icon=${item.value} size=${48} /></div>`}
            ${item.subtitle && html`<span class="font-mono uppercase"
              style=${{ fontSize: '13px', letterSpacing: '0.15em', color: tc.body, marginBottom: '16px' }}>[${item.subtitle}]</span>`}
            <h3 style=${{ fontSize: '28px', fontWeight: 600, color: tc.heading, marginBottom: '20px', lineHeight: 1.3, letterSpacing: '-0.3px' }}>${item.title}</h3>
            <div style=${{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              ${item.bullets?.map(b => html`
                <p style=${{ fontSize: '16px', lineHeight: 1.4, color: tc.body, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style=${{ fontSize: '10px', marginTop: '5px', flexShrink: 0, color: tc.accent }}>✳︎</span>
                  <span><${HighlightText} text=${b.text} /></span>
                </p>`)}
            </div>
          </div>`)}
      </div>
    </div>`;
}

// ============================================================
// DINNER CTA — call to action with cards
// ============================================================

function DinnerCTASlide({ slide }) {
  const tc = useThemeColors();
  const items = slide.items || [];

  return html`
    <div class="flex flex-col justify-center h-full w-full" style=${{ padding: '80px 96px' }}>
      ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
        style=${{ fontSize: '12px', marginBottom: '28px', color: 'rgba(250,249,249,0.35)', letterSpacing: '0.2em' }}>${slide.tag}</span>`}
      <h2 class="animate-item" style=${{ fontSize: '40px', fontWeight: 600, lineHeight: 1.15, color: '#FAFAF9', marginBottom: '14px', whiteSpace: 'pre-line', maxWidth: '700px' }}>${slide.title}</h2>
      ${slide.slideNumber && html`<p class="animate-item" style=${{ fontSize: '15px', color: 'rgba(250,249,249,0.4)', marginBottom: '40px', whiteSpace: 'pre-line', lineHeight: 1.6, maxWidth: '600px' }}>${slide.slideNumber}</p>`}
      <div style=${{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '24px' }}>
        ${items.map(item => html`
          <div class="animate-item" style=${{
            borderRadius: '12px', padding: '28px 32px',
            border: `1px solid ${tc.border}`, background: 'transparent',
          }}>
            <div style=${{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              ${item.value && html`<div style=${{ color: tc.accent }}><${Icon} icon=${item.value} size=${32} /></div>`}
              ${item.subtitle && html`<span class="font-mono uppercase" style=${{ fontSize: '11px', letterSpacing: '0.15em', color: tc.body }}>[${item.subtitle}]</span>`}
            </div>
            <h3 style=${{ fontSize: '22px', fontWeight: 600, color: tc.heading, marginBottom: '12px', lineHeight: 1.3, letterSpacing: '-0.3px' }}>${item.title}</h3>
            ${item.bullets?.[0] && html`<p style=${{ fontSize: '16px', lineHeight: 1.5, color: tc.body }}>${item.bullets[0].text}</p>`}
          </div>`)}
      </div>
    </div>`;
}

// ============================================================
// TIMELINE — Q1-Q4 horizontal timeline
// ============================================================

function TimelineSlide({ slide }) {
  const tc = useThemeColors();
  const items = slide.items || [];
  return html`
    <div class="flex flex-col h-full w-full" style=${{ padding: '80px 96px' }}>
      ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
        style=${{ fontSize: '12px', marginBottom: '40px', color: tc.muted, letterSpacing: '0.2em' }}>${slide.tag}</span>`}
      <div class="animate-item" style=${{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style=${{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
        <div style=${{ display: 'flex', width: '100%', justifyContent: 'space-between', position: 'relative' }}>
          ${items.map((item, i) => {
            const above = i % 2 === 0;
            return html`
              <div style=${{ flex: 1, position: 'relative', height: '380px' }}>
                <div style=${{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style=${{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)' }} />
                  <div style=${{ width: '7px', height: '7px', borderRadius: '50%', background: tc.accent }} />
                </div>
                <div style=${{ position: 'absolute', left: 0, ...(above ? { bottom: 'calc(50% + 30px)' } : { top: 'calc(50% + 30px)' }), display: 'flex', flexDirection: 'column' }}>
                  <h3 class="animate-item" style=${{ fontSize: '44px', marginBottom: '10px', lineHeight: 1, color: tc.accent }}>${item.title}</h3>
                  ${item.bullets?.map(b => html`<p class="animate-item" style=${{ fontSize: '18px', lineHeight: 1.4, color: b.highlight ? tc.accent : tc.body, fontWeight: b.highlight ? 500 : 400 }}>${b.text}</p>`)}
                </div>
              </div>`;
          })}
        </div>
      </div>
    </div>`;
}

// ============================================================
// INVESTOR CONTENT SLIDES — hardcoded data
// ============================================================

function RetrospectiveIntroSlide({ slide }) {
  const tc = useThemeColors();
  const sections = [
    { n: '01', t: 'Results', s: 'What concretely happened', c: tc.accent },
    { n: '02', t: 'Learnings', s: 'What we learned from it', c: tc.accent2 },
    { n: '03', t: 'Direction', s: 'Where we\u2019re headed', c: tc.accent3 },
    { n: '04', t: 'Priorities', s: 'What we focus on in 2026', c: tc.accent },
    { n: '05', t: 'Asks', s: 'How you can help', c: tc.accent },
  ];
  return html`
    <div class="flex flex-col h-full w-full" style=${{ padding: '80px 96px' }}>
      <h1 class="animate-item" style=${{ fontSize: '56px', fontWeight: 600, lineHeight: 1.1, color: '#FAFAF9', marginBottom: '56px' }}>${slide.title}</h1>
      <div style=${{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        ${sections.map(s => html`
          <div class="animate-item" style=${{ display: 'flex', alignItems: 'baseline', gap: '24px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <span style=${{ fontSize: '14px', color: s.c, fontWeight: 500, minWidth: '32px' }}>${s.n}</span>
            <span style=${{ fontSize: '22px', fontWeight: 500, color: '#FAFAF9', minWidth: '140px' }}>${s.t}</span>
            <span style=${{ fontSize: '15px', color: tc.body }}>${s.s}</span>
          </div>`)}
      </div>
    </div>`;
}

function RetrospectiveStatsSlide({ slide, isActive }) {
  const tc = useThemeColors();
  const stats = [
    { l: 'Total Sites', v: 847 }, { l: 'Commits', v: 42300, s: '+' }, { l: 'Content Publishes', v: 18750, s: '+' },
    { l: 'Developer Commits', v: 31200, s: '+' }, { l: 'Unique Authors', v: 1243 }, { l: 'Developers', v: 526 },
  ];
  return html`
    <div class="flex flex-col h-full w-full" style=${{ padding: '80px 96px' }}>
      <h2 class="animate-item" style=${{ fontSize: '36px', fontWeight: 600, color: '#FAFAF9', marginBottom: '44px' }}>${slide.title}</h2>
      <div style=${{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', flex: 1, alignContent: 'center' }}>
        ${stats.map((st, i) => html`
          <div class="animate-item" style=${{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '28px', border: `1px solid ${tc.border}`, textAlign: 'center' }}>
            <div style=${{ fontSize: '44px', fontWeight: 300, color: tc.accent, lineHeight: 1, marginBottom: '10px' }}>
              <${CountUp} end=${st.v} suffix=${st.s || ''} isActive=${isActive} delay=${i * 150} />
            </div>
            <div style=${{ fontSize: '13px', color: tc.body, textTransform: 'uppercase', letterSpacing: '1px' }}>${st.l}</div>
          </div>`)}
      </div>
    </div>`;
}

function InvestorGenericSlide({ slide, title, items }) {
  const tc = useThemeColors();
  return html`
    <div class="flex flex-col h-full w-full" style=${{ padding: '80px 96px' }}>
      ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
        style=${{ fontSize: '12px', marginBottom: '16px', color: tc.muted, letterSpacing: '0.2em' }}>${slide.tag}</span>`}
      <h2 class="animate-item" style=${{ fontSize: '32px', fontWeight: 600, color: tc.heading, marginBottom: slide.subtitle ? '6px' : '40px', lineHeight: 1.2, letterSpacing: '-0.5px' }}>${title || slide.title}</h2>
      ${slide.subtitle && html`<p class="animate-item" style=${{ fontSize: '17px', color: tc.body, marginBottom: '36px' }}>${slide.subtitle}</p>`}
      <div style=${{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1, justifyContent: 'center' }}>
        ${items.map((item, i) => html`
          <div class="animate-item" style=${{ display: 'flex', gap: '18px', alignItems: 'flex-start', paddingBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            ${item.num != null && html`<span style=${{ fontSize: '44px', fontWeight: 200, color: tc.accent + '40', lineHeight: 1, minWidth: '44px' }}>${String(item.num).padStart(2, '0')}</span>`}
            ${item.accent && html`<div style=${{ width: '4px', height: '44px', background: item.accent, borderRadius: '2px', flexShrink: 0, marginTop: '4px' }} />`}
            <div>
              <h3 style=${{ fontSize: '20px', fontWeight: 600, color: tc.heading, marginBottom: '6px' }}>${item.title}</h3>
              <p style=${{ fontSize: '14px', color: tc.body, lineHeight: 1.6 }}>${item.desc}</p>
            </div>
          </div>`)}
      </div>
    </div>`;
}

function InvestorCardsSlide({ slide, cards }) {
  const tc = useThemeColors();
  return html`
    <div class="flex flex-col h-full w-full" style=${{ padding: '80px 96px' }}>
      ${slide.tag && html`<span class="animate-item font-mono uppercase tracking-widest block"
        style=${{ fontSize: '12px', marginBottom: '16px', color: tc.muted, letterSpacing: '0.2em' }}>${slide.tag}</span>`}
      <h2 class="animate-item" style=${{ fontSize: '32px', fontWeight: 600, color: tc.heading, marginBottom: slide.subtitle ? '6px' : '40px', lineHeight: 1.2, letterSpacing: '-0.5px' }}>${slide.title}</h2>
      ${slide.subtitle && html`<p class="animate-item" style=${{ fontSize: '17px', color: tc.body, marginBottom: '36px' }}>${slide.subtitle}</p>`}
      <div style=${{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(cards.length, 3)}, 1fr)`, gap: '24px', flex: 1, alignContent: 'center' }}>
        ${cards.map(c => html`
          <div class="animate-item" style=${{
            background: 'transparent', borderRadius: '14px', padding: '28px',
            border: `1px solid ${tc.border}`,
            borderTop: c.topColor ? `3px solid ${c.topColor}` : undefined,
          }}>
            ${c.badge && html`<span class="font-mono uppercase" style=${{ fontSize: '10px', letterSpacing: '1.5px', color: tc.accent, fontWeight: 500 }}>${c.badge}</span>`}
            ${c.metric && html`<div style=${{ fontSize: '40px', fontWeight: 300, color: tc.accent, lineHeight: 1, marginBottom: '8px', marginTop: c.badge ? '8px' : 0 }}>${c.metric}</div>`}
            <h3 style=${{ fontSize: '18px', fontWeight: 600, color: tc.heading, marginBottom: '8px', lineHeight: 1.3, marginTop: c.badge && !c.metric ? '10px' : 0 }}>${c.title}</h3>
            <p style=${{ fontSize: '13px', color: tc.body, lineHeight: 1.6 }}>${c.desc}</p>
          </div>`)}
      </div>
    </div>`;
}

// ============================================================
// LAYOUT REGISTRY
// ============================================================

export const LAYOUTS = {
  'title': TitleSlide,
  'dinner-thesis': DinnerThesisSlide,
  'market-signals-funnel': MarketSignalsFunnelSlide,
  'dinner-features': DinnerFeaturesSlide,
  'dinner-demo': DinnerDemoSlide,
  'dinner-admin-cases': DinnerAdminCasesSlide,
  'dinner-roadmap': DinnerRoadmapSlide,
  'dinner-cta': DinnerCTASlide,
  'timeline': TimelineSlide,
  'retrospective-intro': RetrospectiveIntroSlide,
  'retrospective-stats': RetrospectiveStatsSlide,

  // Investor-specific layouts with hardcoded content
  'retrospective-top-sites': (p) => InvestorGenericSlide({ ...p, items: [
    { accent: '#D0EC1A', title: 'superfrete.com', desc: '1,247 commits \u2022 Top publisher' },
    { accent: '#D0EC1A', title: 'gupy.io', desc: '983 commits \u2022 Fastest growth' },
    { accent: '#D0EC1A', title: 'als.com', desc: '876 commits \u2022 US market leader' },
    { accent: '#D0EC1A', title: 'farm.com.br', desc: '743 commits \u2022 Fashion vertical' },
    { accent: '#D0EC1A', title: 'technos.com.br', desc: '612 commits' },
  ]}),
  'retrospective-contributors': (p) => InvestorCardsSlide({ ...p, cards: [
    { title: 'Maria S.', desc: 'superfrete.com \u2022 324 publishes', metric: '324' },
    { title: 'Jo\u00e3o P.', desc: 'gupy.io \u2022 287 publishes', metric: '287' },
    { title: 'Ana L.', desc: 'farm.com.br \u2022 245 publishes', metric: '245' },
    { title: 'Carlos M.', desc: 'als.com \u2022 198 publishes', metric: '198' },
    { title: 'Riley T.', desc: 'als.com \u2022 176 publishes', metric: '176' },
    { title: 'Pedro H.', desc: 'granado.com.br \u2022 165 publishes', metric: '165' },
  ]}),
  'revenue-resilience': (p) => InvestorCardsSlide({ ...p, cards: [
    { title: 'Revenue Growth', metric: '+32%', desc: 'Year-over-year' },
    { title: 'Customer Retention', metric: '94%', desc: 'Net revenue retention' },
    { title: 'Traffic Resilience', metric: '99.9%', desc: 'Uptime during Black Friday' },
  ]}),
  'operational-wins': (p) => InvestorCardsSlide({ ...p, cards: [
    { title: 'Deployment Speed', metric: '3x faster', desc: 'CI/CD pipeline improvements' },
    { title: 'Support Tickets', metric: '-45%', desc: 'Self-service tooling adoption' },
    { title: 'Onboarding Time', metric: '3 days', desc: 'Down from 2 weeks' },
  ]}),
  'product-platform': (p) => InvestorGenericSlide({ ...p, items: [
    { accent: '#D0EC1A', title: 'MCP Mesh', desc: 'Open-source MCP router. 2000+ GitHub stars in first month.' },
    { accent: '#D0EC1A', title: 'AI-Native CMS', desc: 'Full admin rewrite with AI chat, agents, and MCP integrations.' },
    { accent: '#D0EC1A', title: 'deco.chat Enterprise', desc: 'Multi-model AI platform adopted by 12+ enterprise clients.' },
  ]}),
  'organizational-maturity': (p) => InvestorGenericSlide({ ...p, items: [
    { num: 1, title: 'Smaller, focused teams', desc: 'Moved from 6 squads to 3 high-impact pods with clear ownership' },
    { num: 2, title: 'Async-first culture', desc: 'Reduced meetings 60%. Written proposals became the default.' },
    { num: 3, title: 'AI-augmented workflows', desc: 'Every team member uses AI tools daily. 2x individual output.' },
  ]}),
  'learnings-execution': (p) => InvestorGenericSlide({ ...p, items: [
    { accent: '#D0EC1A', title: 'Ship weekly, validate daily', desc: 'Quarterly launches \u2192 weekly releases. Customer feedback loop: months \u2192 days.' },
    { accent: '#D0EC1A', title: 'Kill faster', desc: 'Sunset 3 products in 2025. Each time, the team got stronger by focusing.' },
    { accent: '#D0EC1A', title: 'Automate the boring parts', desc: '40% of QA automated. Zero-touch deploys. Engineers build, not babysit.' },
  ]}),
  'learnings-product': (p) => InvestorGenericSlide({ ...p, items: [
    { accent: '#A595FF', title: 'CMS is the wedge, AI is the platform', desc: 'Customers came for the CMS. They stay for AI. CMS = distribution channel.' },
    { accent: '#A595FF', title: 'MCP changes everything', desc: 'Model Context Protocol unlocked composability. Betting on open standards paid off.' },
    { accent: '#A595FF', title: 'Agents > Features', desc: 'Customers want autonomous agents, not more buttons. Product = orchestration layer.' },
  ]}),
  'q1-validation': (p) => InvestorCardsSlide({ ...p, cards: [
    { badge: 'Validating', title: 'AI Agents for E-commerce', desc: 'Blog Post Generator, Vitrine Organizer, Performance agents. 8 pilot customers.' },
    { badge: 'Growing', title: 'deco Studio Platform', desc: 'Multi-model chat + MCP integrations. 12 enterprise clients onboarded.' },
    { badge: 'Launched', title: 'Open Source MCP Mesh', desc: 'Community-driven adoption. 2K+ GitHub stars. Building ecosystem moat.' },
  ]}),
  'our-approach': (p) => InvestorGenericSlide({ ...p, items: [
    { num: 1, title: 'Build with customers, not for them', desc: 'Every agent co-designed with a pilot customer. Ship to production together.' },
    { num: 2, title: 'Open by default', desc: 'MCP Mesh is open source. Standard integrations. No vendor lock-in.' },
    { num: 3, title: 'Revenue follows value', desc: 'Agents deliver measurable ROI. Pricing tied to outcomes, not seats.' },
  ]}),
  'priorities-2026': (p) => InvestorCardsSlide({ ...p, cards: [
    { topColor: '#D0EC1A', title: 'Scale AI Agents', desc: '10 production agents by Q3. Blog, Vitrine, Performance, Email, Pricing, Ads, Support.' },
    { topColor: '#A595FF', title: 'Platform Revenue', desc: 'deco Studio becomes the default AI platform for e-commerce ops teams.' },
    { topColor: '#FFC116', title: 'Community & Ecosystem', desc: 'MCP Mesh growth. Developer community. Open source contributions.' },
    { topColor: '#D0EC1A', title: 'International Expansion', desc: 'US market entry through Al\u2019s success story. LATAM consolidation.' },
  ]}),
  'our-asks': (p) => InvestorGenericSlide({ ...p, items: [
    { accent: '#D0EC1A', title: 'Introductions', desc: 'Connect us with e-commerce leaders frustrated with their tooling. US market especially.' },
    { accent: '#D0EC1A', title: 'Strategic guidance', desc: 'Enterprise sales cycles. Pricing strategy for AI agents (outcome-based vs. subscription).' },
    { accent: '#D0EC1A', title: 'Follow-on potential', desc: 'Raising in Q3 2026. Early conversations welcome. Our metrics tell the story.' },
  ]}),
};
