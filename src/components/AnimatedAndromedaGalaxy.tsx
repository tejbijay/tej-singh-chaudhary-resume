import { useEffect, useRef } from 'react';

// This component draws a spinning, glowing Andromeda galaxy using canvas
const AnimatedAndromedaGalaxy = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
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

    let t = 0;
    function drawGalaxy() {
      ctx.clearRect(0, 0, width, height);
      // Smaller galaxy, right side
      const cx = width * 0.87;
      const cy = height * 0.32;
      const arms = 35;
      const stars = 500;
      const a = 0.007; // spiral tightness
      const spin = t * 0.000000000000025; // extremely slow spin
      // Glow core
      const galaxyRadius = 60;
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, galaxyRadius);
      gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
      gradient.addColorStop(0.2, 'rgba(255,255,200,0.5)');
      gradient.addColorStop(0.5, 'rgba(180,200,255,0.15)');
      gradient.addColorStop(1, 'rgba(0,0,20,0)');
      ctx.save();
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, galaxyRadius, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 40;
      ctx.fill();
      ctx.restore();
      // Spiral arms
      for (let i = 0; i < stars; i++) {
        const arm = i % arms;
        const theta = (i / stars) * Math.PI * 2 * arms + arm * (Math.PI * 2 / arms) + spin;
        const r = 12 + 55 * Math.pow(i / stars, 0.7) + Math.random() * 3;
        const x = cx + Math.cos(theta + a * Math.log(r)) * r;
        const y = cy + Math.sin(theta + a * Math.log(r)) * r;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 0.8 + 0.2, 0, 2 * Math.PI);
        ctx.globalAlpha = 0.5 + 0.5 * Math.random();
        ctx.fillStyle = `rgba(${200 + Math.floor(Math.random()*55)},${200 + Math.floor(Math.random()*55)},${255},1)`;
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 4 + Math.random() * 6;
        ctx.fill();
        ctx.restore();
      }
      t += 1;
      animationRef.current = requestAnimationFrame(drawGalaxy);
    }
    drawGalaxy();
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
        zIndex: 1,
        pointerEvents: 'none',
        background: 'transparent',
      }}
      aria-hidden="true"
    />
  );
};

export default AnimatedAndromedaGalaxy;
