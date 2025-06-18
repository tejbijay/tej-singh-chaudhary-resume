
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-react';
import AdminLayout from './components/AdminLayout';
import { toast } from 'sonner';

// Mock blog posts data
const initialBlogPosts = [
  {
    id: 1,
    title: 'Digital Forensics in Modern Cyber Security',
    slug: 'digital-forensics-modern-cyber-security',
    excerpt: 'Exploring the evolving role of digital forensics in addressing current cyber security challenges.',
    status: 'published',
    date: '2024-07-20',
    views: 342,
    comments: 5
  },
  {
    id: 2,
    title: 'Travel Industry Technology Innovations',
    slug: 'travel-industry-technology-innovations',
    excerpt: 'How new technologies are transforming ticketing and reservation systems in the travel industry.',
    status: 'published',
    date: '2024-07-15',
    views: 215,
    comments: 2
  },
  {
    id: 3,
    title: 'Linux Shell Scripting for Beginners',
    slug: 'linux-shell-scripting-beginners',
    excerpt: 'A comprehensive guide to getting started with shell scripting in Linux environments.',
    status: 'published',
    date: '2024-07-10',
    views: 180,
    comments: 1
  },
  {
    id: 4,
    title: 'Data Recovery Techniques for SSDs',
    slug: 'data-recovery-techniques-ssds',
    excerpt: 'Advanced methods for recovering data from solid state drives with various types of failures.',
    status: 'published',
    date: '2024-07-05',
    views: 156,
    comments: 0
  },
  {
    id: 5,
    title: 'Amadeus vs Sabre: GDS Comparison',
    slug: 'amadeus-vs-sabre-gds-comparison',
    excerpt: 'A detailed comparison of the two leading Global Distribution Systems used in the travel industry.',
    status: 'published',
    date: '2024-06-28',
    views: 420,
    comments: 7
  },
  {
    id: 6,
    title: 'Cyber Security Best Practices for Small Businesses',
    slug: 'cyber-security-best-practices-small-businesses',
    excerpt: 'Essential security measures that small businesses should implement to protect their digital assets.',
    status: 'draft',
    date: '2024-06-20',
    views: 0,
    comments: 0
  },
  {
    id: 7,
    title: 'Understanding Threat Intelligence',
    slug: 'understanding-threat-intelligence',
    excerpt: 'How organizations can leverage threat intelligence to enhance their security posture.',
    status: 'draft',
    date: '2024-06-15',
    views: 0,
    comments: 0
  }
];

const BlogList = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // Simulate API fetch
    setTimeout(() => {
      setBlogPosts(initialBlogPosts);
      setLoading(false);
    }, 500);
  }, [navigate]);
  
  // Filter posts based on search term and status
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleDeletePost = (id: number) => {
    // In a real application, you would make an API call to delete the post
    if (window.confirm('Are you sure you want to delete this post?')) {
      setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      toast.success('Post deleted successfully');
    }
  };
  
  const handleNewPost = () => {
    navigate('/admin/blog/new');
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold cyber-heading">Blog Posts</h1>
            <p className="text-gray-400">Manage your blog content</p>
          </div>
          
          <button 
            className="cyber-button self-start"
            onClick={handleNewPost}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </button>
        </div>
        
        <div className="cyber-card">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="w-full py-2 px-4 pl-10 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-purple-light w-4 h-4" />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-4 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple appearance-none w-full md:w-48"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          
          <div className="overflow-x-auto rounded-lg border border-cyber-blue/20">
            <table className="w-full">
              <thead className="bg-cyber-dark/50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs text-gray-400 font-mono">Title</th>
                  <th className="py-3 px-4 text-left text-xs text-gray-400 font-mono">Status</th>
                  <th className="py-3 px-4 text-left text-xs text-gray-400 font-mono">Date</th>
                  <th className="py-3 px-4 text-left text-xs text-gray-400 font-mono">Views</th>
                  <th className="py-3 px-4 text-left text-xs text-gray-400 font-mono">Comments</th>
                  <th className="py-3 px-4 text-center text-xs text-gray-400 font-mono">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="border-t border-cyber-blue/10 hover:bg-cyber-blue/5">
                      <td className="py-3 px-4">
                        <div className="font-semibold">{post.title}</div>
                        <div className="text-xs text-gray-400 mt-1 line-clamp-1">{post.excerpt}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          post.status === 'published' 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {post.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1 text-cyber-purple" />
                          <span>{post.views}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{post.comments}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button 
                            className="p-1 hover:text-cyber-blue transition-colors" 
                            title="Edit"
                            onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1 hover:text-cyber-neon transition-colors" 
                            title="View"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1 hover:text-cyber-pink transition-colors" 
                            title="Delete"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      No posts found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredPosts.length} of {blogPosts.length} posts
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogList;
