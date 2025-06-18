
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Image, Save, Trash2, X } from 'lucide-react';
import AdminLayout from './components/AdminLayout';
import { toast } from 'sonner';
import ImageUpload from '@/components/admin/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Mock blog posts data
const blogPostsData = [
  {
    id: 1,
    title: 'Digital Forensics in Modern Cyber Security',
    slug: 'digital-forensics-modern-cyber-security',
    excerpt: 'Exploring the evolving role of digital forensics in addressing current cyber security challenges.',
    content: `
      <p>Digital forensics has become an essential component of modern cybersecurity frameworks, evolving rapidly to address the increasingly sophisticated threat landscape. This article explores the current state of digital forensics and its pivotal role in cybersecurity.</p>
      
      <h2>The Evolution of Digital Forensics</h2>
      <p>Digital forensics has transformed from a niche specialty into a critical discipline that spans across various domains including criminal investigations, corporate security, and national defense. The methodologies and tools used in digital forensics have evolved to keep pace with technological advancements and emerging threats.</p>
      
      <h2>Key Challenges in Modern Digital Forensics</h2>
      <p>Modern digital forensic investigators face numerous challenges, including:</p>
      <ul>
        <li>Encryption technologies that can make data inaccessible</li>
        <li>Cloud computing environments that distribute data across multiple jurisdictions</li>
        <li>IoT devices that create vast new data sources</li>
        <li>Anti-forensic techniques designed to hide or destroy evidence</li>
        <li>The sheer volume of data that must be analyzed</li>
      </ul>
    `,
    image: '/placeholder.svg',
    tags: ['Digital Forensics', 'Cyber Security', 'Data Recovery'],
    status: 'published',
    date: '2024-07-20',
    author: 'Tej Singh Chaudhary',
    readTime: '5 min',
    featured: true
  }
];

const BlogEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id !== 'new';
  
  const [post, setPost] = useState({
    id: 0,
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '/placeholder.svg',
    tags: [] as string[],
    status: 'draft',
    date: new Date().toISOString().split('T')[0],
    author: 'Tej Singh Chaudhary',
    readTime: '5 min',
    featured: false
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');
  
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    if (isEditing) {
      // Simulate API fetch for the specific post
      setTimeout(() => {
        const existingPost = blogPostsData.find(p => p.id === Number(id));
        if (existingPost) {
          setPost(existingPost);
        } else {
          toast.error('Post not found');
          navigate('/admin/blog');
        }
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, [id, isEditing, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPost(prev => ({ ...prev, [name]: checked }));
  };
  
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setPost(prev => ({ 
      ...prev, 
      title: newTitle,
      slug: generateSlug(newTitle)
    }));
  };
  
  const handleImageChange = (imageUrl: string) => {
    setPost(prev => ({ ...prev, image: imageUrl }));
  };
  
  const addTag = () => {
    if (tagInput.trim() && !post.tags.includes(tagInput.trim())) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleSave = () => {
    if (!post.title) {
      toast.error('Title is required');
      return;
    }
    
    if (!post.content) {
      toast.error('Content is required');
      return;
    }
    
    setSaving(true);
    
    // Simulate API call to save the post
    setTimeout(() => {
      if (isEditing) {
        toast.success('Post updated successfully');
      } else {
        toast.success('Post created successfully');
      }
      setSaving(false);
      navigate('/admin/blog');
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
          <h1 className="text-2xl font-bold cyber-heading">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h1>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline"
              className="cyber-button-small border-red-500 text-red-500 hover:bg-red-500/10"
              onClick={() => navigate('/admin/blog')}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            
            <Button 
              className="cyber-button-small"
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
                  <Save className="w-4 h-4 mr-1" />
                  Save {post.status === 'published' ? 'Published' : 'Draft'}
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="cyber-card">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">
                    Title <span className="text-cyber-pink">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={post.title}
                    onChange={handleTitleChange}
                    className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple"
                    placeholder="Enter post title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">
                    Slug <span className="text-cyber-pink">*</span>
                  </Label>
                  <Input
                    id="slug"
                    name="slug"
                    type="text"
                    value={post.slug}
                    onChange={handleChange}
                    className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple"
                    placeholder="post-url-slug"
                  />
                  <p className="text-xs text-gray-400 mt-1">URL-friendly version of the title.</p>
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={post.excerpt}
                    onChange={handleChange}
                    rows={3}
                    className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple"
                    placeholder="Brief summary of the post"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">
                    Content <span className="text-cyber-pink">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    rows={12}
                    className="bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple font-mono text-sm"
                    placeholder="Enter post content (HTML supported)"
                  />
                  <p className="text-xs text-gray-400 mt-1">HTML formatting is supported.</p>
                </div>
              </div>
            </div>
            
            {/* Content preview */}
            <div className="cyber-card">
              <h2 className="text-lg font-bold mb-4">Content Preview</h2>
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="cyber-card">
              <h2 className="text-lg font-bold mb-4">Post Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={post.status}
                    onChange={handleChange}
                    className="w-full py-2 px-4 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="date">Publish Date</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={post.date}
                      onChange={handleChange}
                      className="pl-10 bg-cyber-dark/80 border border-cyber-purple/30 focus:border-cyber-purple"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-purple-light w-4 h-4" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    name="readTime"
                    type="text"
                    value={post.readTime}
                    onChange={handleChange}
                    className="bg-cyber-dark/80 border border-cyber-purple/30 focus:border-cyber-purple"
                    placeholder="5 min"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={post.featured}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-cyber-blue focus:ring-cyber-blue rounded bg-cyber-dark/80 border-cyber-purple/30"
                  />
                  <Label htmlFor="featured" className="ml-2">Featured Post</Label>
                </div>
              </div>
            </div>
            
            <div className="cyber-card">
              <h2 className="text-lg font-bold mb-4">Featured Image</h2>
              <ImageUpload initialImage={post.image} onImageChange={handleImageChange} />
            </div>
            
            <div className="cyber-card">
              <h2 className="text-lg font-bold mb-4">Tags</h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <Input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 bg-cyber-dark/80 border border-cyber-purple/30 rounded-l-lg focus:border-cyber-purple"
                    placeholder="Add a tag"
                  />
                  <Button
                    onClick={addTag}
                    className="rounded-l-none hover:bg-cyber-purple/20"
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-cyber-dark/80 border border-cyber-purple/30 rounded-full px-3 py-1"
                    >
                      <span className="text-sm">{tag}</span>
                      <button 
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-gray-400 hover:text-cyber-pink"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  {post.tags.length === 0 && (
                    <p className="text-sm text-gray-400">No tags added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogEdit;
