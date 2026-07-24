// ============================================================
// THEME SYSTEM — quick-swap color palettes
// ============================================================
// Each theme defines: accent, accent2, accent3, textDark, textLight,
// surface (dark bg), surfaceLight (light bg), and bg overrides.
// Layouts read from ThemeContext to use these colors.
// Switch themes via ?theme=name query param.
// ============================================================

export const THEMES = {
  // ── Default deco brand ─────────────────────────────────
  deco: {
    name: 'deco',
    accent: '#D0EC1A',
    accent2: '#A595FF',
    accent3: '#FFC116',
    textDark: '#1C1917',
    textLight: '#FAFAF9',
    surface: '#121110',
    surfaceLight: '#FAFAF9',
    heading: '#E7E5E4',
    body: '#A6A09D',
    muted: '#78726E',
    border: '#282524',
    bg: {
      'primary-light': '#D0EC1A',
      'primary-dark': '#07401A',
      'purple-light': '#A595FF',
      'purple-dark': '#151042',
      'yellow-light': '#FFC116',
      'yellow-dark': '#392B02',
      'dc-950': '#121110',
      'dc-900': '#1C1917',
      'dc-50': '#FAFAF9',
      'white': '#FFFFFF',
    },
  },

  // ── Ocean — blue/teal corporate ────────────────────────
  ocean: {
    name: 'ocean',
    accent: '#38BDF8',
    accent2: '#818CF8',
    accent3: '#34D399',
    textDark: '#0F172A',
    textLight: '#F8FAFC',
    surface: '#0F172A',
    surfaceLight: '#F0F9FF',
    heading: '#E2E8F0',
    body: '#94A3B8',
    muted: '#64748B',
    border: '#1E293B',
    bg: {
      'primary-light': '#38BDF8',
      'primary-dark': '#0C4A6E',
      'purple-light': '#818CF8',
      'purple-dark': '#1E1B4B',
      'yellow-light': '#34D399',
      'yellow-dark': '#064E3B',
      'dc-950': '#0F172A',
      'dc-900': '#1E293B',
      'dc-50': '#F8FAFC',
      'white': '#FFFFFF',
    },
  },

  // ── Ember — warm red/orange startup ────────────────────
  ember: {
    name: 'ember',
    accent: '#F97316',
    accent2: '#EF4444',
    accent3: '#FBBF24',
    textDark: '#1C1917',
    textLight: '#FFF7ED',
    surface: '#1C1210',
    surfaceLight: '#FFF7ED',
    heading: '#FED7AA',
    body: '#A8A29E',
    muted: '#78716C',
    border: '#3D2B1F',
    bg: {
      'primary-light': '#F97316',
      'primary-dark': '#7C2D12',
      'purple-light': '#EF4444',
      'purple-dark': '#450A0A',
      'yellow-light': '#FBBF24',
      'yellow-dark': '#78350F',
      'dc-950': '#1C1210',
      'dc-900': '#292524',
      'dc-50': '#FFF7ED',
      'white': '#FFFFFF',
    },
  },

  // ── Midnight — purple/pink creative ────────────────────
  midnight: {
    name: 'midnight',
    accent: '#C084FC',
    accent2: '#F472B6',
    accent3: '#67E8F9',
    textDark: '#1E1033',
    textLight: '#FAF5FF',
    surface: '#13091F',
    surfaceLight: '#FAF5FF',
    heading: '#E9D5FF',
    body: '#A78BFA',
    muted: '#7C3AED',
    border: '#2E1065',
    bg: {
      'primary-light': '#C084FC',
      'primary-dark': '#3B0764',
      'purple-light': '#F472B6',
      'purple-dark': '#500724',
      'yellow-light': '#67E8F9',
      'yellow-dark': '#164E63',
      'dc-950': '#13091F',
      'dc-900': '#1E1033',
      'dc-50': '#FAF5FF',
      'white': '#FFFFFF',
    },
  },

  // ── Forest — earthy green/brown organic ────────────────
  forest: {
    name: 'forest',
    accent: '#4ADE80',
    accent2: '#A3E635',
    accent3: '#FCD34D',
    textDark: '#14120E',
    textLight: '#F0FDF4',
    surface: '#0A120A',
    surfaceLight: '#F0FDF4',
    heading: '#BBF7D0',
    body: '#86EFAC',
    muted: '#4ADE80',
    border: '#1A2E1A',
    bg: {
      'primary-light': '#4ADE80',
      'primary-dark': '#14532D',
      'purple-light': '#A3E635',
      'purple-dark': '#365314',
      'yellow-light': '#FCD34D',
      'yellow-dark': '#713F12',
      'dc-950': '#0A120A',
      'dc-900': '#14201A',
      'dc-50': '#F0FDF4',
      'white': '#FFFFFF',
    },
  },

  // ── Mono — minimal B&W ──────────────────────────
  mono: {
    name: 'mono',
    accent: '#FFFFFF',
    accent2: '#A1A1AA',
    accent3: '#71717A',
    textDark: '#09090B',
    textLight: '#FAFAFA',
    surface: '#09090B',
    surfaceLight: '#FAFAFA',
    heading: '#E4E4E7',
    body: '#A1A1AA',
    muted: '#71717A',
    border: '#27272A',
    bg: {
      'primary-light': '#E4E4E7',
      'primary-dark': '#27272A',
      'purple-light': '#A1A1AA',
      'purple-dark': '#3F3F46',
      'yellow-light': '#D4D4D8',
      'yellow-dark': '#52525B',
      'dc-950': '#09090B',
      'dc-900': '#18181B',
      'dc-50': '#FAFAFA',
      'white': '#FFFFFF',
    },
  },

  // ── Dulcinella Custom Theme ────────────────────────────────
  dulcinella: {
    name: 'dulcinella',
    accent: '#C87FA2',        // accent-pink
    accent2: '#F0D074',       // gold
    accent3: '#8C9595',       // slate-grey
    textDark: '#363F43',      // text-main
    textLight: '#ffffff',     // white
    surface: '#3B384A',       // primary-dark
    surfaceLight: '#FCF6E3',  // bg-cream
    heading: '#3B384A',       // primary-dark
    body: '#363F43',          // text-main
    muted: '#8C9595',         // slate-grey
    border: '#DDE2E5',        // border-light
    bg: {
      'primary-light': '#F4E5EC',// bg-pink
      'primary-dark': '#3B384A', // primary-dark
      'purple-light': '#C87FA2', // accent-pink
      'purple-dark': '#1A2B2B',  // deep-teal
      'yellow-light': '#F0D074', // gold
      'yellow-dark': '#8C9595',  // slate-grey
      'dc-950': '#3B384A',       // primary-dark (surface)
      'dc-900': '#1A2B2B',       // deep-teal (darker surface)
      'dc-50': '#FCF6E3',        // bg-cream (light surface)
      'white': '#ffffff',        // white
      'grey': '#F1F3F5',         // bg-grey
    },
  },
};

export function getTheme(name) {
  return THEMES[name] || THEMES.deco;
}

export function applyTheme(name) {
  const theme = getTheme(name);
  // Could set CSS custom properties if needed
  document.documentElement.style.setProperty('--accent', theme.accent);
  document.documentElement.style.setProperty('--accent2', theme.accent2);
  document.documentElement.style.setProperty('--surface', theme.surface);
  return theme;
}
