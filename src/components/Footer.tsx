
import { Heart, Code, Github, Linkedin, Mail, X } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="py-10 px-6 relative bg-cyber-dark">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div 
            className="flex items-center cursor-pointer hover:scale-105 transition-transform duration-300 group"
            onClick={scrollToTop}
          >
            <div className="text-xl font-orbitron font-bold text-cyber-purple-light mr-2">Tej</div>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-cyber-dark border border-cyber-purple/30 text-cyber-purple-light hover:bg-cyber-purple/10 transition-all duration-300 hover:scale-110 hover:border-cyber-purple"
              aria-label="Github"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-cyber-dark border border-cyber-purple/30 text-cyber-purple-light hover:bg-cyber-purple/10 transition-all duration-300 hover:scale-110 hover:border-cyber-purple"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#contact" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-cyber-dark border border-cyber-purple/30 text-cyber-purple-light hover:bg-cyber-purple/10 transition-all duration-300 hover:scale-110 hover:border-cyber-purple"
              aria-label="Email"
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
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-cyber-purple/10 pt-8 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center">
            <Code className="h-4 w-4 mr-2 text-cyber-purple-light" />
            Created with <Heart className="h-3 w-3 mx-1 text-cyber-pink" /> | © {currentYear} All Rights Reserved
          </p>
          <p className="mt-2 text-xs">
            Combining cyber security expertise with travel industry professionalism
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
