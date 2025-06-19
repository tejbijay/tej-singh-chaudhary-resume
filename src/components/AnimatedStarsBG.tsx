import { useEffect, useRef } from 'react';

const STAR_COLORS = [
  'rgba(255,255,255,0.95)',
  'rgba(200,220,255,0.85)',
  'rgba(255,245,200,0.8)',
  'rgba(180,255,255,0.7)'
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const AnimatedStarsBG = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const stars = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Generate stars
    const STAR_COUNT = Math.floor((width * height) / 1200);
    stars.current = Array.from({ length: STAR_COUNT }).map(() => {
      const radius = randomBetween(0.7, 2.2);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: radius,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        twinkle: Math.random() * Math.PI * 2,
        speed: randomBetween(0.0005, 0.0015),
        glow: randomBetween(8, 24)
      };
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars.current) {
        // Twinkle effect
        const twinkle = 0.7 + 0.3 * Math.sin(Date.now() * star.speed + star.twinkle);
        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * twinkle, 0, 2 * Math.PI);
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.glow;
        ctx.fillStyle = star.color;
        ctx.globalAlpha = twinkle;
        ctx.fill();
        ctx.restore();
      }
      animationRef.current = requestAnimationFrame(draw);
    }
    draw();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Re-generate stars for new size
      const STAR_COUNT = Math.floor((width * height) / 1200);
      stars.current = Array.from({ length: STAR_COUNT }).map(() => {
        const radius = randomBetween(0.7, 2.2);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: radius,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          twinkle: Math.random() * Math.PI * 2,
          speed: randomBetween(0.0005, 0.0015),
          glow: randomBetween(8, 24)
        };
      });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
      aria-hidden="true"
    />
  );
};

export default AnimatedStarsBG;
