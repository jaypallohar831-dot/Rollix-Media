/**
 * Agent Animation System — GSAP Timeline Builder
 * 
 * Measures all DOM elements with [data-agent-layer] once and constructs
 * master intro timelines using GPU-composited transforms and opacity.
 */
import gsap from 'gsap';
import {
  TIMING,
  type LayerInfo,
  type LayerType,
  isMobile,
  getAgentCount,
  getParallelAgents,
  seededRandom,
} from './config';

/**
 * Scans DOM for all [data-agent-layer] elements and caches their bboxes.
 * Reads layout once to avoid layout thrashing during animation.
 */
export function measureLayers(container?: HTMLElement | null): LayerInfo[] {
  if (typeof window === 'undefined') return [];

  const root = container || document;
  const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-agent-layer]'));

  const layers: LayerInfo[] = elements.map((el) => {
    const id = el.getAttribute('data-agent-layer') || 'unnamed';
    const order = parseInt(el.getAttribute('data-agent-order') || '999', 10);
    const type = (el.getAttribute('data-agent-type') || 'text') as LayerType;
    const label = el.getAttribute('data-agent-label') || id;
    const bbox = el.getBoundingClientRect();

    return {
      id,
      order,
      type,
      label,
      element: el,
      bbox,
    };
  });

  // Sort sequentially by defined order
  layers.sort((a, b) => a.order - b.order);
  return layers;
}

export interface BuildIntroParams {
  layers: LayerInfo[];
  cursorRefs: (HTMLDivElement | null)[];
  selectionBoxRefs: Map<string, HTMLDivElement>;
  pillRef: HTMLElement | null;
  wireframeRef: HTMLElement | null;
  sparkleContainerRef: HTMLElement | null;
  faintLogoRef?: HTMLElement | null;
  onPhaseChange?: (phase: string) => void;
  onLayerRevealed?: (count: number) => void;
  onComplete?: () => void;
}

/**
 * Builds the comprehensive S1 - S6 master timeline.
 */
export function buildIntroTimeline({
  layers,
  cursorRefs,
  selectionBoxRefs,
  pillRef,
  wireframeRef,
  sparkleContainerRef,
  faintLogoRef,
  onPhaseChange,
  onLayerRevealed,
  onComplete,
}: BuildIntroParams): gsap.core.Timeline {
  const masterTl = gsap.timeline({
    paused: true,
    onComplete: () => {
      onPhaseChange?.('done');
      onComplete?.();
    },
  });

  const agentCount = getAgentCount();
  const parallelWorkers = getParallelAgents();
  const activeCursors = cursorRefs.slice(0, agentCount).filter(Boolean) as HTMLDivElement[];

  const cx = typeof window !== 'undefined' ? window.innerWidth / 2 : 720;
  const cy = typeof window !== 'undefined' ? window.innerHeight / 2 : 450;

  // ─────────────────────────────────────────────────────────────
  // Initial Setup: Set Ghost State on target elements & hide cursors
  // ─────────────────────────────────────────────────────────────
  layers.forEach((l) => {
    gsap.set(l.element, { opacity: 0.12, willChange: 'opacity, transform' });
  });

  // Center cluster for cursors
  activeCursors.forEach((c, i) => {
    const offsetAngle = (i / agentCount) * Math.PI * 2;
    const ox = cx + Math.cos(offsetAngle) * 35;
    const oy = cy + Math.sin(offsetAngle) * 35;
    gsap.set(c, {
      x: ox,
      y: oy,
      scale: 0.5,
      opacity: 0,
      transformOrigin: 'top left',
    });
  });

  if (pillRef) {
    gsap.set(pillRef, { y: 32, opacity: 0 });
  }
  if (wireframeRef) {
    gsap.set(wireframeRef, { opacity: 0 });
  }

  // ─────────────────────────────────────────────────────────────
  // S1: BOOT (0.0s - 0.8s)
  // ─────────────────────────────────────────────────────────────
  masterTl.addLabel('s1-boot', 0);
  masterTl.call(() => onPhaseChange?.('boot'), [], 's1-boot');

  // Pill slides up
  if (pillRef) {
    masterTl.to(
      pillRef,
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      's1-boot+=0.1'
    );
  }

  // Faint logo watermark pops in center
  if (faintLogoRef) {
    masterTl.fromTo(
      faintLogoRef,
      { opacity: 0, scale: 0.9 },
      { opacity: 0.15, scale: 1, duration: 0.6, ease: 'power2.out' },
      's1-boot+=0.1'
    );
  }

  // Cursors fade & scale in clustered
  masterTl.to(
    activeCursors,
    {
      opacity: 1,
      scale: 1,
      duration: 0.45,
      stagger: 0.05,
      ease: 'back.out(1.5)',
    },
    's1-boot+=0.2'
  );

  // ─────────────────────────────────────────────────────────────
  // S2: SCATTER (0.8s - 1.6s)
  // ─────────────────────────────────────────────────────────────
  masterTl.addLabel('s2-scatter', TIMING.bootDuration);
  masterTl.call(() => onPhaseChange?.('scatter'), [], 's2-scatter');

  // Cursors scatter to screen quadrants
  activeCursors.forEach((c, i) => {
    const targetX = 80 + seededRandom(i * 11 + 3) * (window.innerWidth - 200);
    const targetY = 80 + seededRandom(i * 17 + 7) * (window.innerHeight - 240);
    const wobbleRot = (seededRandom(i * 5) - 0.5) * 16;

    masterTl.to(
      c,
      {
        x: targetX,
        y: targetY,
        rotation: wobbleRot,
        duration: 0.7,
        ease: 'power3.out',
      },
      's2-scatter'
    );
  });

  // Sparkles pop and fade
  if (sparkleContainerRef && !isMobile()) {
    const sparkleEls = sparkleContainerRef.querySelectorAll('.agent-sparkle');
    masterTl.to(
      sparkleEls,
      {
        opacity: 0.8,
        scale: 1,
        duration: 0.25,
        stagger: {
          each: 0.03,
          from: 'random',
        },
        ease: 'power1.out',
      },
      's2-scatter+=0.1'
    );
    masterTl.to(
      sparkleEls,
      {
        opacity: 0,
        scale: 0,
        duration: 0.25,
        stagger: {
          each: 0.02,
          from: 'random',
        },
        ease: 'power1.in',
      },
      's2-scatter+=0.4'
    );
  }

  if (faintLogoRef) {
    masterTl.to(faintLogoRef, { opacity: 0, duration: 0.4 }, 's2-scatter+=0.2');
  }

  // ─────────────────────────────────────────────────────────────
  // S3: BLUEPRINT (1.6s - 3.2s)
  // ─────────────────────────────────────────────────────────────
  masterTl.addLabel('s3-blueprint', TIMING.bootDuration + TIMING.scatterDuration);
  masterTl.call(() => onPhaseChange?.('blueprint'), [], 's3-blueprint');

  // Wireframe fades in
  if (wireframeRef) {
    masterTl.to(wireframeRef, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 's3-blueprint');
    const scanBar = wireframeRef.querySelector('#agent-scan-bar');
    if (scanBar) {
      masterTl.fromTo(
        scanBar,
        { opacity: 0, y: 0 },
        { opacity: 1, y: 300, duration: 0.9, ease: 'power1.inOut' },
        's3-blueprint+=0.1'
      );
      masterTl.to(scanBar, { opacity: 0, duration: 0.2 }, 's3-blueprint+=0.9');
    }
  }

  // ─────────────────────────────────────────────────────────────
  // S4 & S5: BUILD & ASSEMBLE (3.2s - 7.5s)
  // ─────────────────────────────────────────────────────────────
  const buildStartTime = TIMING.bootDuration + TIMING.scatterDuration + TIMING.blueprintDuration;
  masterTl.addLabel('s4-build', buildStartTime);
  masterTl.call(() => onPhaseChange?.('build'), [], 's4-build');

  let currentRevealed = 0;

  // Distribute layers among parallel agent workers
  layers.forEach((layer, idx) => {
    const workerIndex = idx % parallelWorkers;
    const cursor = activeCursors[workerIndex];
    const selectionBox = selectionBoxRefs.get(layer.id);

    const layerStartTime = buildStartTime + idx * (TIMING.cursorFly * 0.7);

    // 1. Agent flies to layer top-left
    if (cursor) {
      masterTl.to(
        cursor,
        {
          x: layer.bbox.left + window.scrollX,
          y: layer.bbox.top + window.scrollY,
          rotation: 0,
          duration: TIMING.cursorFly,
          ease: 'power2.inOut',
        },
        layerStartTime
      );
    }

    // 2. Selection rectangle draws around bbox
    if (selectionBox) {
      masterTl.fromTo(
        selectionBox,
        {
          opacity: 0,
          scaleX: 0,
          scaleY: 0,
          x: layer.bbox.left + window.scrollX,
          y: layer.bbox.top + window.scrollY,
          width: layer.bbox.width,
          height: layer.bbox.height,
        },
        {
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          duration: TIMING.selectionGrow,
          ease: 'power2.out',
        },
        layerStartTime + TIMING.cursorFly * 0.8
      );
    }

    // 3. Reveal element from ghost state (opacity 0.12 -> 1, subtle y lift)
    masterTl.to(
      layer.element,
      {
        opacity: 1,
        y: 0,
        duration: TIMING.elementReveal,
        ease: 'power2.out',
        onStart: () => {
          currentRevealed += 1;
          onLayerRevealed?.(currentRevealed);
        },
      },
      layerStartTime + TIMING.cursorFly * 0.8 + 0.1
    );

    // 4. Selection box fades
    if (selectionBox) {
      masterTl.to(
        selectionBox,
        {
          opacity: 0,
          duration: TIMING.selectionFade,
          ease: 'power1.out',
        },
        layerStartTime + TIMING.cursorFly + TIMING.selectionGrow
      );
    }
  });

  // ─────────────────────────────────────────────────────────────
  // S6: SETTLE (7.5s - 9.0s)
  // ─────────────────────────────────────────────────────────────
  const settleStartTime = buildStartTime + layers.length * (TIMING.cursorFly * 0.7) + 0.5;
  masterTl.addLabel('s6-settle', settleStartTime);
  masterTl.call(() => onPhaseChange?.('settle'), [], 's6-settle');

  // Wireframe fades out
  if (wireframeRef) {
    masterTl.to(wireframeRef, { opacity: 0, duration: TIMING.wireframeFade }, 's6-settle');
  }

  // All agents converge to primary CTA or center and vanish
  activeCursors.forEach((c) => {
    masterTl.to(
      c,
      {
        x: cx,
        y: cy + 120,
        scale: 0,
        opacity: 0,
        duration: TIMING.cursorConverge,
        ease: 'power2.in',
      },
      's6-settle'
    );
  });

  return masterTl;
}

