
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Lock, User } from 'lucide-react';
import { authService } from '@/services/authService';
import '@/pages/Admin/AdminStyles.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (authService.isAuthenticated()) {
      navigate('/admin/dashboard');
    }
    
    // Prevent going back to admin pages if not authenticated
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!authService.isAuthenticated()) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const success = authService.login(username, password);
      
      if (success) {
        toast.success('Login successful');
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid username or password');
      }
      
      setIsLoading(false);
    }, 1000); // Simulate API call
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark bg-cyber-grid bg-[length:20px_20px]">
      <div className="absolute inset-0 bg-cyber-grid bg-[length:30px_30px] opacity-10"></div>
      
      <div className="w-full max-w-md px-8 py-10 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 cyber-heading">Admin Login</h1>
          <p className="text-gray-400">Enter your credentials to access the admin panel</p>
        </div>
        
        <div className="cyber-card border-cyber-purple/30 shadow-glow-blue">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    className="cyber-input pl-10"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="cyber-input pl-10"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cyber-button flex items-center justify-center"
            >
              {isLoading ? (
                <span className="cyber-loader inline-block w-5 h-5 border-2"></span>
              ) : (
                "Login"
              )}
            </button>
            
            <div className="text-center text-sm text-gray-400 mt-4">
              <p>Default credentials: admin / password123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
