
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        scrolled ? "bg-cyber-dark/90 backdrop-blur-lg shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="relative group cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={scrollToTop}
        >
          <span className="text-xl font-orbitron font-bold text-cyber-purple-light">Tej</span>
          <div className="absolute inset-0 bg-cyber-purple/10 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="cyber-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  if (element) {
                    window.scrollTo({
                      top: element.getBoundingClientRect().top + window.scrollY - 100,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-cyber-purple-light" />
          ) : (
            <Menu className="h-6 w-6 text-cyber-purple-light" />
          )}
        </button>
      </div>
      
      {/* Mobile Nav */}
      <div 
        className={cn(
          "fixed inset-0 bg-cyber-dark/95 backdrop-blur-lg z-40 transition-all duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="h-full flex flex-col items-center justify-center relative">
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-cyber-dark border border-cyber-purple/30 text-cyber-purple-light hover:bg-cyber-purple/10 transition-all duration-300"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          
          <ul className="space-y-6 text-center">
            {navLinks.map((link) => (
              <li key={link.name} className="py-2">
                <a 
                  href={link.href}
                  className="text-xl font-orbitron hover:text-cyber-purple-light transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const element = document.querySelector(link.href);
                    if (element) {
                      window.scrollTo({
                        top: element.getBoundingClientRect().top + window.scrollY - 100,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
