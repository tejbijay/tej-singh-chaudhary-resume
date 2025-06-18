import React, { useEffect, useRef } from 'react';

const generateStars = (count, width, height) => {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.5 + 1.5, // bigger stars
    speed: Math.random() * 0.7 + 0.3,
    color: `hsl(${Math.random() * 360}, 100%, ${80 + Math.random() * 20}%)`, // even brighter
    twinkle: Math.random() * 100
  }));
};

const generateNebulas = (count, width, height) => {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height * 0.7,
    r: 120 + Math.random() * 180,
    color: `hsla(${Math.random() * 360}, 100%, 70%, 0.18)`
  }));
};

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const height = typeof window !== 'undefined' ? window.innerHeight : 1080;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let stars = generateStars(160, width, height);
    let nebulas = generateNebulas(3, width, height);
    let shootingStar = null;
    let shootingTimer = 0;
    let gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0a1931'); // deep blue
    gradient.addColorStop(0.4, '#185adb'); // blue
    gradient.addColorStop(0.7, '#31326f'); // muted purple
    gradient.addColorStop(1, '#e7eaf6'); // very light blue/white

    const drawNebula = (x, y, r, color) => {
      ctx.save();
      let grad = ctx.createRadialGradient(x, y, r * 0.2, x, y, r);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'transparent');
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    };

    const animate = (frame = 0) => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
      // Draw nebulas
      nebulas.forEach(n => drawNebula(n.x, n.y, n.r, n.color));
      // Draw stars
      ctx.save();
      stars.forEach(star => {
        ctx.globalAlpha = 0.7 + 0.2 * Math.sin((frame + star.twinkle) * 0.03);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
        star.x += star.speed;
        if (star.x > width) star.x = 0;
      });
      ctx.restore();
      // Shooting star
      if (shootingStar) {
        ctx.save();
        ctx.strokeStyle = shootingStar.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.len * shootingStar.vx, shootingStar.y - shootingStar.len * shootingStar.vy);
        ctx.stroke();
        shootingStar.x += shootingStar.vx * 14;
        shootingStar.y += shootingStar.vy * 14;
        shootingStar.len *= 0.96;
        if (shootingStar.x > width || shootingStar.y > height || shootingStar.len < 5) shootingStar = null;
        ctx.restore();
      } else if (Math.random() < 0.018 && shootingTimer < 0) {
        const color = `hsl(${Math.random() * 360}, 100%, 90%)`;
        shootingStar = {
          x: Math.random() * width * 0.7 + width * 0.2,
          y: Math.random() * height * 0.2 + height * 0.1,
          vx: Math.random() * 0.7 + 0.7,
          vy: Math.random() * 0.2 + 0.1,
          len: Math.random() * 70 + 50,
          color
        };
        shootingTimer = 100;
      }
      shootingTimer--;
      animationRef.current = requestAnimationFrame(() => animate(frame + 1)) as unknown as undefined;
    };
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default AnimatedBackground;
