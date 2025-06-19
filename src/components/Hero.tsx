import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      container.style.setProperty('--mouse-x', `${x * 20}px`);
      container.style.setProperty('--mouse-y', `${y * 20}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px'
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-cyber-purple-light/30 to-transparent opacity-30"
            style={{
              top: `${10 + i * 10}%`,
              animation: `slide-in 2s ease-out forwards`,
              animationDelay: `${i * 0.1}s`,
              transform: 'translateX(-100%)'
            }}
          ></div>
        ))}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-cyber-purple-light/30 to-transparent opacity-30"
            style={{
              left: `${10 + i * 10}%`,
              animation: `fade-in 2s ease-out forwards`,
              animationDelay: `${i * 0.1}s`,
              opacity: 0
            }}
          ></div>
        ))}
      </div>
      
      <div 
        className="relative z-10 container px-6 text-center"
        style={{
          transform: `translate(calc(var(--mouse-x) * -1), calc(var(--mouse-y) * -1))`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div className="profile-container float">
          <img 
            src="/photo.jpeg" 
            alt="Profile Photo" 
            className="profile-image object-cover w-40 h-40 rounded-full mx-auto shadow-lg border-4 border-cyber-blue"
          />
        </div>
        
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-extrabold font-orbitron mb-6 bg-gradient-to-r from-cyber-blue via-cyber-neon to-cyber-pink text-transparent bg-clip-text drop-shadow-lg">Tej Singh Chaudhary</h2>
        
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 font-orbitron tracking-tight">
          <span className="block cyber-heading">Cyber Security</span>
          <span className="block mt-2">& Digital Forensics</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
          Passionate professional with expertise in cyber security, digital forensics, and information security operations. Specializing in system analysis, data recovery, and security coordination.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a 
            href="#contact" 
            className="cyber-button"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#contact');
              if (element) {
                window.scrollTo({
                  top: element.getBoundingClientRect().top + window.scrollY - 100,
                  behavior: 'smooth'
                });
              }
            }}
          >
            Get In Touch
          </a>
          <a 
            href="#experience" 
            className="flex items-center text-cyber-purple-light hover:text-cyber-blue gap-2 group transition-colors font-orbitron py-3"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#experience');
              if (element) {
                window.scrollTo({
                  top: element.getBoundingClientRect().top + window.scrollY - 100,
                  behavior: 'smooth'
                });
              }
            }}
          >
            View Experience
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
      
      <a 
        href="#about"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center animate-bounce"
        aria-label="Scroll down"
        onClick={(e) => {
          e.preventDefault();
          const element = document.querySelector('#about');
          if (element) {
            window.scrollTo({
              top: element.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
          }
        }}
      >
        <ChevronDown className="h-8 w-8 text-cyber-purple-light" />
      </a>
      
      <div className="scan-line"></div>
    </div>
  );
};

export default Hero;
