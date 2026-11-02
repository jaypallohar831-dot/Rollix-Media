/**
 * Pure CSS Ambient Hero Background
 * Zero Three.js / Canvas overhead, 100% Core Web Vitals friendly.
 */
export function HeroBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-[1]"
      aria-hidden="true"
    >
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/10 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[130px] rounded-full translate-x-1/3 translate-y-1/3" />
    </div>
  );
}

export default HeroBackground;
