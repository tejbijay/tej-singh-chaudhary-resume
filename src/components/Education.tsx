import { useState, useEffect, useRef } from 'react';
import { GraduationCap, CalendarDays, School } from 'lucide-react';

const Education = () => {
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
  
  const educations = [
    {
      degree: 'Certified Cyber Security Analyst',
      institution: 'CyberSec Institute',
      period: 'July 2024',
      description: 'Professional certification in cyber security, digital forensics, and incident response.'
    },
    {
      degree: 'Bachelor in Computing',
      institution: 'XYZ College (IJK University)',
      period: 'Graduated 2020',
      description: 'Comprehensive education in computing principles, programming, system design, and information technology fundamentals with focus on practical applications.'
    },
    {
      degree: 'Higher Secondary Education',
      institution: 'Higher Secondary Board',
      period: 'Completed 2014',
      description: 'Science-focused curriculum with specialization in computer science and mathematics, developing analytical and problem-solving skills.'
    },
    {
      degree: 'School Education',
      institution: 'ABC School',
      period: 'Completed 2008',
      description: 'Foundation education with strong emphasis on academic excellence and extracurricular activities.'
    }
  ];
  
  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="py-20 px-6 relative"
    >
      <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-2">
            <span className="cyber-chip">Learning Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold cyber-heading mb-4">Education & Certifications</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-neon mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educations.map((edu, index) => (
            <div 
              key={index}
              className={`transition-all duration-700 delay-${index * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="cyber-card group h-full hover:rotate-1 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start">
                  <div className="mr-4 p-2 rounded-full bg-cyber-dark border border-cyber-blue/30 group-hover:scale-110 transition-transform duration-500 group-hover:border-cyber-blue/70">
                    <GraduationCap className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-cyber-blue transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center text-gray-400 mb-1">
                      <School className="w-4 h-4 mr-2 text-cyber-pink" />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="flex items-center text-gray-400 mb-3">
                      <CalendarDays className="w-4 h-4 mr-2 text-cyber-neon" />
                      <span>{edu.period}</span>
                    </div>
                    <p className="text-gray-300">{edu.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 cyber-card text-center hover:scale-[1.02] transition-all duration-500">
          <h3 className="text-xl font-bold mb-4 cyber-heading">Continuous Learning</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Always committed to expanding knowledge in cyber security, digital forensics, and information security systems through self-directed learning, online courses, and professional development.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              'Digital Forensics', 'Linux Administration', 'Shell Scripting', 
              'Data Recovery', 'Network Security', 'Cyber Threat Analysis', 'Web Security'
            ].map((topic, i) => (
              <span 
                key={i} 
                className="cyber-chip hover:rotate-3 transition-transform"
                style={{animationDelay: `${i * 0.1}s`}}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
