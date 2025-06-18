
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Home, 
  LayoutDashboard, 
  LogOut, 
  MessageSquare, 
  Settings, 
  Upload, 
  User, 
  X 
} from 'lucide-react';
import { authService } from '@/services/authService';

interface AdminSidebarProps {
  username: string;
  onClose: () => void;
}

const AdminSidebar = ({ username, onClose }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin/dashboard',
    },
    {
      title: 'Blog Posts',
      icon: <FileText className="w-5 h-5" />,
      path: '/admin/blog',
    },
    {
      title: 'Comments',
      icon: <MessageSquare className="w-5 h-5" />,
      path: '/admin/comments',
    },
    {
      title: 'Media',
      icon: <Upload className="w-5 h-5" />,
      path: '/admin/media',
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
    },
  ];
  
  return (
    <>
      <div className="p-4 border-b border-cyber-blue/20 flex items-center justify-between">
        <Link to="/admin/dashboard" className="text-xl font-bold cyber-heading">
          Admin Panel
        </Link>
        <button 
          className="md:hidden text-cyber-purple-light"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-cyber-blue/10 text-cyber-blue border-l-2 border-cyber-blue'
                  : 'hover:bg-cyber-blue/5 text-gray-300 hover:text-cyber-blue'
              }`}
              onClick={onClose}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-cyber-blue/20">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-cyber-blue" />
          </div>
          <div>
            <div className="font-medium">{username || 'Admin'}</div>
            <div className="text-xs text-gray-400">Administrator</div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Link 
            to="/admin/dashboard"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Admin Home
          </Link>
          
          <button 
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-cyber-pink transition-colors flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
