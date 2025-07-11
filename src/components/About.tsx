import { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-2">
            <span className="cyber-chip">About Me</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold cyber-heading mb-4 text-border-blue">Professional Profile</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-neon mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className={`cyber-card transition-all duration-700 bg-gradient-to-br from-cyber-blue/80 to-cyber-neon/60 border-2 border-white/10 shadow-xl ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <p className="text-gray-300 leading-relaxed text-border-highlight">
                A passionate professional with expertise in cyber security and digital forensics. With a keen interest in data recovery and shell scripting, I combine technical knowledge with customer service excellence.
              </p>
              
              <p className="text-gray-300 leading-relaxed text-border-highlight">
                My experience spans from system administration and PHP development to digital forensics and cyber security research. I am proficient in Linux systems, constantly expanding my knowledge in cyber security techniques and methodologies.
              </p>
              
              <div className="pt-4">
                <h3 className="text-xl font-mono font-semibold mb-3 text-cyber-blue text-border-neon">Key Highlights</h3>
                <ul className="space-y-2">
                  {[
                    'Proficient in Linux systems administration',
                    'Digital forensics and data recovery specialist',
                    'Shell scripting expertise',
                    'Cyber security research and analysis',
                    'Customer service excellence'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-cyber-neon flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-cyber-blue/20 pt-6 mt-6">
                <p className="text-cyber-blue font-mono">
                  "Merging technical expertise with customer service excellence to deliver outstanding results."
                </p>
              </div>
            </div>
          </div>
          
          <div className={`cyber-card transition-all duration-700 bg-gradient-to-br from-cyber-pink/80 to-cyber-yellow/60 border-2 border-white/10 shadow-xl ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 mb-6 flex items-center justify-center mx-auto">
                <div className="w-8 h-8 rounded-full bg-cyber-blue animate-pulse"></div>
              </div>
              <h3 className="text-xl font-mono mb-4 cyber-heading text-border-yellow text-center">Technical Proficiencies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-2xl mx-auto">
                {[
                  {name: 'Digital Forensics', value: 90},
                  {name: 'Linux Systems', value: 85},
                  {name: 'Shell Scripting', value: 80},
                  {name: 'Data Recovery', value: 88},
                  {name: 'Cyber Security', value: 95},
                  {name: 'PHP', value: 75},
                  {name: 'Customer Service', value: 95}
                ].map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs text-border-highlight font-bold">
                      <span>{skill.name}</span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="h-1 w-full bg-cyber-dark/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyber-blue to-cyber-neon"
                        style={{
                          width: `${skill.value}%`,
                          animation: `slide-in 1.5s cubic-bezier(0.4, 0, 0.2, 1)`,
                          animationDelay: `${0.1 * index}s`,
                          animationFillMode: 'backwards'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
