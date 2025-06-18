
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import { 
  BarChart, 
  Edit, 
  Eye, 
  FileText, 
  LayoutDashboard, 
  MessageSquare, 
  Plus, 
  Settings, 
  Users 
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    pendingComments: 0,
    totalUsers: 0
  });
  
  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // Simulate fetching dashboard data
    setTimeout(() => {
      setStats({
        totalPosts: 6,
        totalViews: 1528,
        pendingComments: 3,
        totalUsers: 12
      });
      setLoading(false);
    }, 500);
  }, [navigate]);
  
  // Recent posts (mock data)
  const recentPosts = [
    {
      id: 1,
      title: 'Digital Forensics in Modern Cyber Security',
      slug: 'digital-forensics-modern-cyber-security',
      date: '2024-07-20',
      views: 342,
      comments: 5
    },
    {
      id: 2,
      title: 'Travel Industry Technology Innovations',
      slug: 'travel-industry-technology-innovations',
      date: '2024-07-15',
      views: 215,
      comments: 2
    },
    {
      id: 3,
      title: 'Linux Shell Scripting for Beginners',
      slug: 'linux-shell-scripting-beginners',
      date: '2024-07-10',
      views: 180,
      comments: 1
    }
  ];
  
  // Recent activities (mock data)
  const recentActivities = [
    {
      id: 1,
      action: 'Post published',
      target: 'Digital Forensics in Modern Cyber Security',
      time: '2 days ago',
      user: 'Admin'
    },
    {
      id: 2,
      action: 'Comment approved',
      target: 'Travel Industry Technology Innovations',
      time: '3 days ago',
      user: 'Admin'
    },
    {
      id: 3,
      action: 'Profile updated',
      target: 'Admin profile',
      time: '5 days ago',
      user: 'Admin'
    },
    {
      id: 4,
      action: 'Post draft saved',
      target: 'Understanding GDS Systems',
      time: '1 week ago',
      user: 'Admin'
    }
  ];
  
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
          <h1 className="text-2xl font-bold cyber-heading">Dashboard</h1>
          
          <button 
            className="cyber-button-small"
            onClick={() => navigate('/admin/blog/new')}
          >
            <Plus className="w-4 h-4 mr-1" />
            New Post
          </button>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="cyber-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm font-mono">Total Posts</p>
                <h3 className="text-3xl font-bold mt-2">{stats.totalPosts}</h3>
              </div>
              <div className="bg-blue-500/10 p-2 rounded-full">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-400">
              <span className="text-green-500 mr-1">↑ 2</span> from last month
            </div>
          </div>
          
          <div className="cyber-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm font-mono">Total Views</p>
                <h3 className="text-3xl font-bold mt-2">{stats.totalViews}</h3>
              </div>
              <div className="bg-purple-500/10 p-2 rounded-full">
                <Eye className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-400">
              <span className="text-green-500 mr-1">↑ 18%</span> from last month
            </div>
          </div>
          
          <div className="cyber-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm font-mono">Pending Comments</p>
                <h3 className="text-3xl font-bold mt-2">{stats.pendingComments}</h3>
              </div>
              <div className="bg-yellow-500/10 p-2 rounded-full">
                <MessageSquare className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-400">
              <span className="text-red-500 mr-1">↑ 1</span> from yesterday
            </div>
          </div>
          
          <div className="cyber-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm font-mono">Registered Users</p>
                <h3 className="text-3xl font-bold mt-2">{stats.totalUsers}</h3>
              </div>
              <div className="bg-green-500/10 p-2 rounded-full">
                <Users className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-400">
              <span className="text-green-500 mr-1">↑ 3</span> from last month
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent posts */}
          <div className="lg:col-span-2">
            <div className="cyber-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Recent Posts</h2>
                <button 
                  className="text-sm text-cyber-blue hover:text-cyber-purple transition-colors"
                  onClick={() => navigate('/admin/blog')}
                >
                  View All
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cyber-blue/10">
                      <th className="py-2 px-2 text-left text-xs text-gray-400 font-mono">Title</th>
                      <th className="py-2 px-2 text-left text-xs text-gray-400 font-mono">Date</th>
                      <th className="py-2 px-2 text-left text-xs text-gray-400 font-mono">Views</th>
                      <th className="py-2 px-2 text-left text-xs text-gray-400 font-mono">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPosts.map((post) => (
                      <tr key={post.id} className="border-b border-cyber-blue/10 hover:bg-cyber-blue/5">
                        <td className="py-3 px-2">
                          <div className="font-semibold">{post.title}</div>
                        </td>
                        <td className="py-3 px-2 text-sm text-gray-400">
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1 text-cyber-purple" />
                            <span>{post.views}</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center space-x-2">
                            <button 
                              className="p-1 hover:text-cyber-blue transition-colors"
                              onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1 hover:text-cyber-neon transition-colors"
                              onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Recent activity */}
          <div className="lg:col-span-1">
            <div className="cyber-card h-full">
              <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 border-b border-cyber-blue/10 pb-4">
                    <div className="bg-cyber-dark/50 p-2 rounded-full">
                      <Settings className="w-4 h-4 text-cyber-blue" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">{activity.action}</span>
                        {' '}<span className="text-gray-400">{activity.target}</span>
                      </p>
                      <div className="text-xs text-gray-400 mt-1 flex items-center space-x-2">
                        <span>{activity.time}</span>
                        <span>•</span>
                        <span>{activity.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
