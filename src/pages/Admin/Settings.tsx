
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, User, Lock, Globe, Bell, FileText, Image } from 'lucide-react';
import AdminLayout from './components/AdminLayout';
import { toast } from 'sonner';

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    // User settings
    username: 'admin',
    email: 'admin@example.com',
    
    // Blog settings
    postsPerPage: 10,
    enableComments: true,
    moderateComments: true,
    
    // Website settings
    siteName: 'Tej Singh Chaudhary',
    siteDescription: 'Cybersecurity & Digital Forensics Expert',
    siteKeywords: 'digital forensics, cyber security, travel industry',
    
    // Notification settings
    emailNotifications: true,
    commentNotifications: true,
  });
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // In a real app, you would fetch the settings from your backend here
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSave = () => {
    setSaving(true);
    
    // Simulate saving to backend
    setTimeout(() => {
      toast.success('Settings saved successfully');
      setSaving(false);
    }, 1000);
  };
  
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="cyber-loader"></div>
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold cyber-heading">Settings</h1>
          
          <button 
            className="cyber-button"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <span className="flex items-center">
                <span className="w-4 h-4 border-2 border-cyber-blue border-t-transparent rounded-full animate-spin mr-2"></span>
                Saving...
              </span>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* User Settings */}
            <div className="cyber-card">
              <div className="flex items-center mb-6">
                <User className="w-5 h-5 mr-2 text-cyber-purple" />
                <h2 className="text-lg font-bold">User Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={settings.username}
                    onChange={handleChange}
                    className="w-full py-2 px-4 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange}
                    className="w-full py-2 px-4 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full py-2 px-4 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple"
                  />
                </div>
              </div>
            </div>
            
            {/* Website Settings */}
            <div className="cyber-card">
              <div className="flex items-center mb-6">
                <Globe className="w-5 h-5 mr-2 text-cyber-blue" />
                <h2 className="text-lg font-bold">Website Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium mb-1">
                    Site Name
                  </label>
                  <input
                    id="siteName"
                    name="siteName"
                    type="text"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="w-full py-2 px-4 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple"
                  />
                </div>
                
                <div>
                  <label htmlFor="siteDescription" className="block text-sm font-medium mb-1">
                    Site Description
                  </label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    rows={2}
                    value={settings.siteDescription}
                    onChange={handleChange}
                    className="w-full py-2 px-4 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple"
                  />
                </div>
                
                <div>
                  <label htmlFor="siteKeywords" className="block text-sm font-medium mb-1">
                    SEO Keywords (comma separated)
                  </label>
                  <input
                    id="siteKeywords"
                    name="siteKeywords"
                    type="text"
                    value={settings.siteKeywords}
                    onChange={handleChange}
                    className="w-full py-2 px-4 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple"
                  />
                </div>
              </div>
            </div>
            
            {/* Blog Settings */}
            <div className="cyber-card">
              <div className="flex items-center mb-6">
                <FileText className="w-5 h-5 mr-2 text-cyber-neon" />
                <h2 className="text-lg font-bold">Blog Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="postsPerPage" className="block text-sm font-medium mb-1">
                    Posts Per Page
                  </label>
                  <input
                    id="postsPerPage"
                    name="postsPerPage"
                    type="number"
                    min="1"
                    max="50"
                    value={settings.postsPerPage}
                    onChange={handleChange}
                    className="w-full py-2 px-4 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="enableComments"
                    name="enableComments"
                    type="checkbox"
                    checked={settings.enableComments}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-cyber-blue focus:ring-cyber-blue rounded bg-cyber-dark/80 border-cyber-purple/30"
                  />
                  <label htmlFor="enableComments" className="ml-2 block text-sm">
                    Enable Comments on Blog Posts
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="moderateComments"
                    name="moderateComments"
                    type="checkbox"
                    checked={settings.moderateComments}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-cyber-blue focus:ring-cyber-blue rounded bg-cyber-dark/80 border-cyber-purple/30"
                  />
                  <label htmlFor="moderateComments" className="ml-2 block text-sm">
                    Moderate Comments Before Publishing
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Notification Settings */}
            <div className="cyber-card">
              <div className="flex items-center mb-6">
                <Bell className="w-5 h-5 mr-2 text-cyber-pink" />
                <h2 className="text-lg font-bold">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="emailNotifications"
                    name="emailNotifications"
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-cyber-blue focus:ring-cyber-blue rounded bg-cyber-dark/80 border-cyber-purple/30"
                  />
                  <label htmlFor="emailNotifications" className="ml-2 block text-sm">
                    Email Notifications
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="commentNotifications"
                    name="commentNotifications"
                    type="checkbox"
                    checked={settings.commentNotifications}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-cyber-blue focus:ring-cyber-blue rounded bg-cyber-dark/80 border-cyber-purple/30"
                  />
                  <label htmlFor="commentNotifications" className="ml-2 block text-sm">
                    Comment Notifications
                  </label>
                </div>
              </div>
            </div>
            
            {/* Media Settings */}
            <div className="cyber-card">
              <div className="flex items-center mb-6">
                <Image className="w-5 h-5 mr-2 text-cyber-purple-light" />
                <h2 className="text-lg font-bold">Media Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-4">
                    Configure how media files are handled and displayed on your website.
                  </p>
                  
                  <button 
                    className="w-full py-2 px-4 border border-cyber-purple/30 rounded-lg text-cyber-purple-light hover:bg-cyber-purple/10 transition-colors text-sm flex items-center justify-center"
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Manage Media Library
                  </button>
                </div>
              </div>
            </div>
            
            {/* System Info */}
            <div className="cyber-card">
              <h2 className="text-lg font-bold mb-4">System Information</h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Version:</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Updated:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Storage Used:</span>
                  <span>15 MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
