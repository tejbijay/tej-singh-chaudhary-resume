import { useEffect, useRef } from 'react';

const ROCKET_SVG = `
<svg width="36" height="96" viewBox="0 0 36 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Nose cone -->
  <polygon points="18,4 10,24 26,24" fill="#fde047" stroke="#facc15" stroke-width="1.5"/>
  <!-- Body -->
  <rect x="10" y="24" width="16" height="48" rx="8" fill="#e5e7eb" stroke="#38bdf8" stroke-width="2"/>
  <!-- Window -->
  <ellipse cx="18" cy="38" rx="4" ry="6" fill="#38bdf8" stroke="#fff" stroke-width="1.5"/>
  <!-- Fins -->
  <polygon points="10,72 2,92 18,80" fill="#f472b6" stroke="#fde047" stroke-width="1.5"/>
  <polygon points="26,72 34,92 18,80" fill="#f472b6" stroke="#fde047" stroke-width="1.5"/>
  <!-- Flame (animated) -->
  <g id="flame">
    <ellipse cx="18" cy="90" rx="5" ry="12" fill="#facc15" opacity="0.7">
      <animate attributeName="ry" values="12;18;12" dur="0.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.7;1;0.7" dur="0.5s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="18" cy="96" rx="2.5" ry="6" fill="#f472b6" opacity="0.6">
      <animate attributeName="ry" values="6;10;6" dur="0.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.6;1;0.6" dur="0.5s" repeatCount="indefinite"/>
    </ellipse>
  </g>
</svg>
`;

const ROCKET_LENGTH = 96;
const ROCKET_WIDTH = 36;
const FLAME_OFFSET = 84; // y offset from top of SVG for the flame center

const AnimatedRocket = () => {
  const rocketRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  // Rocket state
  const state = useRef({
    t: 0,
    x: 100,
    y: 100,
    angle: 0,
    vx: 1.2,
    vy: 0.8,
    va: 0.01
  });
  const trail = useRef<{x: number, y: number, alpha: number}[]>([]);

  useEffect(() => {
    const canvas = trailCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);

    const animate = () => {
      let { t, x, y, angle, vx, vy, va } = state.current;
      t += 0.012;
      // Curved, wobbly path
      x += vx + Math.sin(t * 1.2) * 1.5;
      y += vy + Math.cos(t * 1.1) * 1.2;
      angle = Math.atan2(vy + Math.cos(t * 1.1) * 1.2, vx + Math.sin(t * 1.2) * 1.5);
      // Bounce off edges
      if (x < 0 || x > width - ROCKET_WIDTH) vx *= -1;
      if (y < 0 || y > height - ROCKET_LENGTH) vy *= -1;
      // Update state
      state.current = { t, x, y, angle, vx, vy, va };
      // Calculate flame (engine) position
      const flameX = x + ROCKET_WIDTH / 2 + Math.sin(angle + Math.PI / 2) * (FLAME_OFFSET - ROCKET_LENGTH / 2);
      const flameY = y + FLAME_OFFSET + Math.cos(angle + Math.PI / 2) * (FLAME_OFFSET - ROCKET_LENGTH / 2);
      // Add to trail
      trail.current.push({ x: flameX, y: flameY, alpha: 1 });
      if (trail.current.length > 80) trail.current.shift();
      // Fade trail
      for (let i = 0; i < trail.current.length; i++) {
        trail.current[i].alpha *= 0.97;
      }
      // Draw trail
      ctx.clearRect(0, 0, width, height);
      for (const p of trail.current) {
        ctx.save();
        ctx.globalAlpha = p.alpha * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(200,200,200,0.5)';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
      // Move rocket
      if (rocketRef.current) {
        rocketRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${angle + Math.PI / 2}rad)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={trailCanvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      <div
        ref={rocketRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ROCKET_WIDTH,
          height: ROCKET_LENGTH,
          zIndex: 10,
          pointerEvents: 'none',
          background: 'none',
        }}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: ROCKET_SVG }}
      />
    </>
  );
};

export default AnimatedRocket;
