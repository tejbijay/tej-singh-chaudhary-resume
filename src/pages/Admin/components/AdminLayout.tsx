
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    
    const storedUsername = authService.getUsername();
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Prevent going back to client pages
    window.history.pushState(null, '', window.location.pathname);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-cyber-dark border-r border-cyber-blue/20 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <AdminSidebar username={username} onClose={closeSidebar} />
      </aside>
      
      {/* Main content */}
      <main className={`md:ml-64 transition-all duration-300 min-h-screen flex flex-col`}>
        {/* Header */}
        <header className="bg-cyber-dark/80 backdrop-blur-sm border-b border-cyber-blue/20 sticky top-0 z-30">
          <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
              <button 
                className="md:hidden text-cyber-purple-light"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex-1 md:flex justify-end items-center gap-4">
                <button 
                  className="cyber-button-small"
                  onClick={() => navigate('/admin/blog/new')}
                >
                  New Post
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="flex-1 p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-cyber-dark/30 border-t border-cyber-blue/10 py-4">
          <div className="container mx-auto px-4">
            <div className="text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Admin Panel | Tej Singh Chaudhary</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
