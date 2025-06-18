import { useState, useEffect, useRef } from 'react';
import { CalendarDays, MapPin, Briefcase } from 'lucide-react';

const Experience = () => {
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
  
  const experiences = [
    {
      title: 'Cyber Security Analyst',
      company: 'CyberSec Solutions',
      period: 'Sep 2024 - Present',
      location: 'Remote',
      description: [
        'Conduct digital forensics investigations and incident response',
        'Analyze and mitigate cyber threats and vulnerabilities',
        'Develop and implement security policies and procedures',
        'Perform penetration testing and vulnerability assessments',
        'Collaborate with teams to improve security posture'
      ]
    },
    {
      title: 'Linux Systems Administrator',
      company: 'TechOps Inc.',
      period: '2016 - 2018',
      location: 'Remote',
      description: [
        'Managed Linux servers and system infrastructure',
        'Automated tasks using shell scripting',
        'Monitored and maintained system security',
        'Provided technical support and troubleshooting',
        'Documented system configurations and procedures'
      ]
    },
    {
      title: 'PHP Freelance Developer',
      company: 'Self-employed',
      period: '2014 - 2015',
      location: 'Remote',
      description: [
        'Developed custom web applications and websites using PHP',
        'Designed and implemented database structures for web applications',
        'Created responsive user interfaces and integrated third-party APIs',
        'Collaborated with clients to understand requirements and deliver solutions',
        'Performed testing, debugging, and maintenance of web applications'
      ]
    }
  ];
  
  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 px-6 relative"
    >
      {/* Remove animated background for this section to avoid color/animation clash */}
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-2">
            <span className="cyber-chip">Career Path</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold cyber-heading mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-neon mx-auto"></div>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-cyber-blue/20 transform md:translate-x-px"></div>
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col md:flex-row items-start">
                  {/* Timeline dot with animation */}
                  <div 
                    className="absolute left-0 md:left-1/2 w-5 h-5 bg-cyber-dark border-2 border-cyber-blue rounded-full transform -translate-x-1/2 translate-y-1 z-10 shadow-[0_0_10px_rgba(51,195,240,0.5)] animate-pulse"
                    style={{animationDuration: '2s'}}
                  ></div>
                  {/* Date indicator for mobile */}
                  <div className="md:hidden pl-8 pb-4">
                    <div className="flex items-center text-sm text-cyber-blue font-mono">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      {exp.period}
                    </div>
                  </div>
                  {/* Date for desktop */}
                  <div className="hidden md:block w-1/2 pr-12 text-right">
                    <div className="inline-flex items-center bg-cyber-dark/50 border border-cyber-blue/20 rounded-full px-3 py-1 hover:scale-105 hover:border-cyber-blue/50 transition-all duration-300">
                      <CalendarDays className="w-4 h-4 mr-2 text-cyber-blue" />
                      <span className="text-sm font-mono text-cyber-blue">{exp.period}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="pl-8 md:pl-12 md:w-1/2">
                    <div className={`cyber-card group hover:rotate-1 transition-all duration-500 bg-gradient-to-br ${index % 3 === 0 ? 'from-cyber-blue/80 to-cyber-neon/60' : index % 3 === 1 ? 'from-cyber-pink/80 to-cyber-yellow/60' : 'from-cyber-purple/80 to-cyber-blue/60'} border-2 border-white/10 shadow-xl`}> 
                      <h3 className="text-xl font-bold mb-1 group-hover:text-cyber-blue transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <div className="mb-4">
                        <div className="flex items-center text-gray-100 mb-1 group-hover:text-cyber-purple-light/80 transition-colors duration-300">
                          <Briefcase className="w-4 h-4 mr-2 text-cyber-blue group-hover:scale-110 transition-transform duration-300" />
                          <span>{exp.company}</span>
                        </div>
                        <div className="flex items-center text-gray-100 group-hover:text-cyber-pink/80 transition-colors duration-300">
                          <MapPin className="w-4 h-4 mr-2 text-cyber-pink group-hover:scale-110 transition-transform duration-300" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                      <ul className="space-y-2 text-gray-100">
                        {exp.description.map((item, i) => (
                          <li 
                            key={i} 
                            className="flex items-start hover:translate-x-1 transition-transform duration-300 hover:text-white"
                            style={{transitionDelay: `${i * 50}ms`}}
                          >
                            <span className="text-cyber-neon mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
