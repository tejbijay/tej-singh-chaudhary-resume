import { useState, useEffect, useRef } from 'react';
import { Shield, Terminal, Database } from 'lucide-react';

const SkillCard = ({ icon, title, skills, color, delay, gradient }: { 
  icon: React.ReactNode; 
  title: string; 
  skills: { name: string; level: number }[];
  color: string;
  delay: number;
  gradient: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
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
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={`cyber-card h-full transition-all duration-700 bg-gradient-to-br ${gradient} border-2 border-white/10 shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay * 0.2}s` }}
    >
      <div className="flex items-center mb-6">
        <div className={`mr-4 p-2.5 rounded-full bg-${color}/10 border border-${color}/30`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-border-yellow">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300 text-border-highlight">{skill.name}</span>
              <span className="text-gray-400">{skill.level}%</span>
            </div>
            <div className="h-1.5 w-full bg-cyber-dark/50 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${color}`}
                style={{
                  width: `${skill.level}%`,
                  animation: `slide-in 1.5s cubic-bezier(0.4, 0, 0.2, 1)`,
                  animationDelay: `${(delay * 100) + (index * 100)}ms`,
                  animationFillMode: 'backwards'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
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
  
  const skillCategories = [
    {
      icon: <Shield className="w-5 h-5 text-cyber-blue" />, // Cyber Security
      title: 'Cyber Security',
      color: 'cyber-blue',
      gradient: 'from-cyber-blue/80 to-cyber-neon/60',
      skills: [
        { name: 'Digital Forensics', level: 90 },
        { name: 'Data Recovery', level: 85 },
        { name: 'Linux Systems', level: 88 },
        { name: 'Shell Scripting', level: 80 }
      ]
    },
    {
      icon: <Terminal className="w-5 h-5 text-cyber-pink" />, // Development
      title: 'Development',
      color: 'cyber-pink',
      gradient: 'from-cyber-pink/80 to-cyber-yellow/60',
      skills: [
        { name: 'PHP', level: 75 },
        { name: 'HTML/CSS', level: 80 },
        { name: 'Database Management', level: 65 },
        { name: 'System Administration', level: 70 }
      ]
    },
    {
      icon: <Database className="w-5 h-5 text-cyber-yellow" />, // Professional
      title: 'Professional',
      color: 'cyber-yellow',
      gradient: 'from-cyber-purple/80 to-cyber-blue/60',
      skills: [
        { name: 'Customer Service', level: 95 },
        { name: 'Problem Solving', level: 85 },
        { name: 'Documentation', level: 80 },
        { name: 'Team Coordination', level: 75 }
      ]
    }
  ];
  
  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 px-6 relative"
    >
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-2">
            <span className="cyber-chip">Expertise Areas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold cyber-heading mb-4 text-border-blue">Technical & Professional Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-neon mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              ref={sectionRef}
              className={`cyber-card h-full transition-all duration-700 bg-gradient-to-br ${category.gradient} border-2 border-white/10 shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <div className={`mr-4 p-2.5 rounded-full bg-${category.color}/10 border border-${category.color}/30`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-border-yellow">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300 text-border-highlight">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-cyber-dark/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${category.color}`}
                        style={{
                          width: `${skill.level}%`,
                          animation: `slide-in 1.5s cubic-bezier(0.4, 0, 0.2, 1)`,
                          animationDelay: `${(index * 100) + (i * 100)}ms`,
                          animationFillMode: 'backwards'
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div 
          className={`mt-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="cyber-card text-center bg-gradient-to-br from-cyber-blue/80 to-cyber-neon/60 border-2 border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Technical Certifications</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gradient-to-br from-cyber-blue/80 to-cyber-neon/60 border-2 border-white/10 rounded-lg p-4 text-center w-full md:w-auto">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-cyber-blue/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-cyber-blue" />
                </div>
                <h4 className="font-mono font-bold text-cyber-blue">IATA Certified</h4>
                <p className="text-sm text-gray-400">GDS Sabre</p>
              </div>
              
              <div className="bg-gradient-to-br from-cyber-pink/80 to-cyber-yellow/60 border-2 border-white/10 rounded-lg p-4 text-center w-full md:w-auto">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-cyber-neon/10 flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-cyber-neon" />
                </div>
                <h4 className="font-mono font-bold text-cyber-neon">Linux Systems</h4>
                <p className="text-sm text-gray-400">Administration</p>
              </div>
              
              <div className="bg-gradient-to-br from-cyber-purple/80 to-cyber-blue/60 border-2 border-white/10 rounded-lg p-4 text-center w-full md:w-auto">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-cyber-pink/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyber-pink" />
                </div>
                <h4 className="font-mono font-bold text-cyber-pink">Digital Forensics</h4>
                <p className="text-sm text-gray-400">Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
