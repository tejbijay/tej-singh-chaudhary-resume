import { useState, useEffect, useRef } from 'react';
import { Send, AtSign, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
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
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        
        toast({
          title: "Message Sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
          duration: 5000,
        });
        
        // Reset submitted state after a delay
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 px-6 relative"
    >
      <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-2">
            <span className="cyber-chip">Get in Touch</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold cyber-heading mb-4 text-border-blue">Contact Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-neon mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Have a project in mind or want to connect? Feel free to reach out using the form below
            and I'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div 
            className={`cyber-card transition-all duration-700 bg-gradient-to-br from-cyber-purple/80 to-cyber-blue/60 border-2 border-white/10 shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold mb-2 text-border-yellow" htmlFor="name">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`cyber-input ${errors.name ? 'border-cyber-pink' : ''}`}
                    placeholder="Your name"
                    disabled={isSubmitting || submitted}
                  />
                  {errors.name && (
                    <div className="mt-1 flex items-center text-cyber-pink text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-bold mb-2 text-border-yellow" htmlFor="email">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AtSign className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`cyber-input pl-10 ${errors.email ? 'border-cyber-pink' : ''}`}
                    placeholder="your.email@example.com"
                    disabled={isSubmitting || submitted}
                  />
                  {errors.email && (
                    <div className="mt-1 flex items-center text-cyber-pink text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-bold mb-2 text-border-yellow" htmlFor="message">Message</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="w-5 h-5 text-gray-500" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className={`cyber-input pl-10 resize-none ${errors.message ? 'border-cyber-pink' : ''}`}
                    placeholder="Type your message here..."
                    disabled={isSubmitting || submitted}
                  ></textarea>
                  {errors.message && (
                    <div className="mt-1 flex items-center text-cyber-pink text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="cyber-button w-full"
                  disabled={isSubmitting || submitted}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : submitted ? (
                    <span className="flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div 
            className={`mt-12 text-center transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block cyber-chip text-sm px-4">
              <span className="mr-2">•</span>
              <span className="font-mono">Available for new opportunities</span>
              <span className="ml-2">•</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
