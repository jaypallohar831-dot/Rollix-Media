'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { isReducedMotion } from '@/lib/motion';
import {
  SESSION_KEY,
  type AgentPhase,
  type LayerInfo,
  getAgentCount,
} from '@/lib/agents/config';
import { measureLayers, buildIntroTimeline, setupScrollDrivenAgentBuild } from '@/lib/agents/timeline';

interface UseAgentSequenceReturn {
  phase: AgentPhase;
  layers: LayerInfo[];
  revealedCount: number;
  totalCount: number;
  agentCount: number;
  isPillVisible: boolean;
  skip: () => void;
  replay: () => void;
  closePill: () => void;
  registerCursorRef: (index: number, el: HTMLDivElement | null) => void;
  registerSelectionRef: (id: string, el: HTMLDivElement | null) => void;
  wireframeRef: React.RefObject<HTMLDivElement | null>;
  sparkleContainerRef: React.RefObject<HTMLDivElement | null>;
  faintLogoRef: React.RefObject<HTMLDivElement | null>;
  pillRef: React.RefObject<HTMLDivElement | null>;
}

export function useAgentSequence(containerRef?: React.RefObject<HTMLElement | null>): UseAgentSequenceReturn {
  const [phase, setPhase] = useState<AgentPhase>('idle');
  const [layers, setLayers] = useState<LayerInfo[]>([]);
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [isPillVisible, setIsPillVisible] = useState<boolean>(true);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const cursorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const selectionBoxRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const wireframeRef = useRef<HTMLDivElement | null>(null);
  const sparkleContainerRef = useRef<HTMLDivElement | null>(null);
  const faintLogoRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);

  const agentCount = getAgentCount();

  const registerCursorRef = useCallback((index: number, el: HTMLDivElement | null) => {
    cursorRefs.current[index] = el;
  }, []);

  const registerSelectionRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      selectionBoxRefs.current.set(id, el);
    } else {
      selectionBoxRefs.current.delete(id);
    }
  }, []);

  const instantRevealAll = useCallback((targetLayers: LayerInfo[]) => {
    targetLayers.forEach((l) => {
      gsap.killTweensOf(l.element);
      gsap.set(l.element, { opacity: 1, y: 0, clearProps: 'all' });
    });
    cursorRefs.current.forEach((c) => {
      if (c) {
        gsap.killTweensOf(c);
        gsap.set(c, { opacity: 0, scale: 0 });
      }
    });
    if (wireframeRef.current) {
      gsap.killTweensOf(wireframeRef.current);
      gsap.set(wireframeRef.current, { opacity: 0 });
    }
  }, []);

  const skip = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    const measured = measureLayers(containerRef?.current);
    instantRevealAll(measured);
    setPhase('skipped');
    setRevealedCount(measured.length);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, 'true');
    }
  }, [containerRef, instantRevealAll]);

  const closePill = useCallback(() => {
    setIsPillVisible(false);
  }, []);

  const startSequence = useCallback((measuredLayers: LayerInfo[]) => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setRevealedCount(0);
    setPhase('boot');

    const tl = buildIntroTimeline({
      layers: measuredLayers,
      cursorRefs: cursorRefs.current,
      selectionBoxRefs: selectionBoxRefs.current,
      pillRef: pillRef.current,
      wireframeRef: wireframeRef.current,
      sparkleContainerRef: sparkleContainerRef.current,
      faintLogoRef: faintLogoRef.current,
      onPhaseChange: (p) => setPhase(p as AgentPhase),
      onLayerRevealed: (c) => setRevealedCount(c),
      onComplete: () => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_KEY, 'true');
        }
      },
    });

    timelineRef.current = tl;
    tl.play();
  }, []);

  const replay = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(SESSION_KEY);
    }
    const freshLayers = measureLayers(containerRef?.current);
    setLayers(freshLayers);
    startSequence(freshLayers);
  }, [containerRef, startSequence]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check reduced motion & previous session storage flag
    const hasSeen = sessionStorage.getItem(SESSION_KEY) === 'true';
    const reduced = isReducedMotion();

    const measured = measureLayers(containerRef?.current);
    setLayers(measured);

    if (reduced || hasSeen) {
      instantRevealAll(measured);
      setPhase('done');
      setRevealedCount(measured.length);
      return;
    }

    // Launch sequence with a brief delay for clean initial paint and ref mounting
    const timer = setTimeout(() => {
      startSequence(measured);
    }, 250);

    // Escape key listener for skipping
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Setup ScrollTrigger-driven agent build for below-the-fold sections
    const cleanupScroll = setupScrollDrivenAgentBuild({
      layers: measured,
      cursorRefs: cursorRefs.current,
      selectionBoxRefs: selectionBoxRefs.current,
      onLayerRevealed: (c) => setRevealedCount(c),
      currentCountRef: { current: Math.min(12, measured.length) },
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      cleanupScroll();
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    phase,
    layers,
    revealedCount,
    totalCount: layers.length,
    agentCount,
    isPillVisible,
    skip,
    replay,
    closePill,
    registerCursorRef,
    registerSelectionRef,
    wireframeRef,
    sparkleContainerRef,
    faintLogoRef,
    pillRef,
  };
}

