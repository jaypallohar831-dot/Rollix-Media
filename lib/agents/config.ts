/**
 * Agent Animation System — Configuration
 *
 * Colors, counts, durations, mobile overrides, and shared types.
 * Every tunable constant lives here so tweaking is trivial.
 */

// ── Agent identity ──

export const AGENT_COLORS = [
  '#A855F7', // violet (lead)
  '#22D3EE', // cyan
  '#F472B6', // pink
  '#FBBF24', // amber
  '#34D399', // emerald
  '#60A5FA', // blue
] as const;

export const AGENT_NAMES = ['α', 'β', 'γ', 'δ', 'ε', 'ζ'] as const;

// ── Selection box styling ──

export const SELECTION = {
  color: '#A855F7',
  handleSize: 6,
  handleColor: '#FFFFFF',
  handleBorderColor: '#A855F7',
  labelBg: '#1A0F33',
  labelColor: '#A855F7',
} as const;

// ── Status pill styling ──

export const PILL = {
  bg: 'rgba(26, 15, 51, 0.85)',
  border: 'rgba(168, 85, 247, 0.4)',
  blur: '12px',
} as const;

// ── Ghost (pre-reveal) state ──

export const GHOST = {
  textOpacity: 0.12,
  imagePlaceholder: '#2A2147',
} as const;

// ── Timing (seconds) ──

export const TIMING = {
  // Phase durations
  bootDuration: 0.8,
  scatterDuration: 0.8,
  blueprintDuration: 1.6,

  // Per-layer build steps
  cursorFly: 0.35,
  selectionGrow: 0.25,
  elementReveal: 0.35,
  selectionFade: 0.2,
  agentStagger: 0.12,

  // Sparkles
  sparklePop: 0.25,
  sparkleMaxDelay: 0.3,

  // Settle
  cursorConverge: 0.5,
  wireframeFade: 0.3,

  // Scan bar
  scanSweep: 0.9,

  // Scroll-driven sections (STEP 3)
  scrollMicroBuild: 1.6,
} as const;

// ── Counts ──

export const COUNTS = {
  desktopAgents: 6,
  mobileAgents: 3,
  sparkles: 12,
  desktopParallelAgents: 3,
  mobileParallelAgents: 2,
  scrollAgentsDesktop: 2,
  scrollAgentsMobile: 1,
} as const;

export const MOBILE_BREAKPOINT = 768;
export const SESSION_KEY = 'ampledia-agents-seen';

// ── Types ──

export type AgentPhase =
  | 'idle'
  | 'boot'
  | 'scatter'
  | 'blueprint'
  | 'build'
  | 'assemble'
  | 'settle'
  | 'done'
  | 'skipped';

export type LayerType = 'text' | 'image' | 'card' | 'logo' | 'input' | 'button';

export interface LayerInfo {
  id: string;
  order: number;
  type: LayerType;
  label: string;
  element: HTMLElement;
  bbox: DOMRect;
}

// ── Runtime helpers ──

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

export function getAgentCount(): number {
  return isMobile() ? COUNTS.mobileAgents : COUNTS.desktopAgents;
}

export function getParallelAgents(): number {
  return isMobile() ? COUNTS.mobileParallelAgents : COUNTS.desktopParallelAgents;
}

/**
 * Seeded pseudo-random for deterministic sparkle / scatter positions.
 * Returns 0–1.
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

