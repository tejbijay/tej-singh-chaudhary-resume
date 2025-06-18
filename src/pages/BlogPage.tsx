
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Search, Tag, Clock, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock blog data
const initialBlogPosts = [
  {
    id: 1,
    title: 'Digital Forensics in Modern Cyber Security',
    slug: 'digital-forensics-modern-cyber-security',
    excerpt: 'Exploring the evolving role of digital forensics in addressing current cyber security challenges.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/placeholder.svg',
    author: 'Tej Singh Chaudhary',
    date: '2024-07-20',
    tags: ['Digital Forensics', 'Cyber Security', 'Data Recovery'],
    readTime: '5 min',
    featured: true
  },
  {
    id: 2,
    title: 'Travel Industry Technology Innovations',
    slug: 'travel-industry-technology-innovations',
    excerpt: 'How new technologies are transforming ticketing and reservation systems in the travel industry.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/placeholder.svg',
    author: 'Tej Singh Chaudhary',
    date: '2024-07-15',
    tags: ['Travel Industry', 'GDS Systems', 'Technology'],
    readTime: '4 min',
    featured: false
  },
  {
    id: 3,
    title: 'Linux Shell Scripting for Beginners',
    slug: 'linux-shell-scripting-beginners',
    excerpt: 'A comprehensive guide to getting started with shell scripting in Linux environments.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/placeholder.svg',
    author: 'Tej Singh Chaudhary',
    date: '2024-07-10',
    tags: ['Linux', 'Shell Scripting', 'Programming'],
    readTime: '6 min',
    featured: false
  },
  {
    id: 4,
    title: 'Data Recovery Techniques for SSDs',
    slug: 'data-recovery-techniques-ssds',
    excerpt: 'Advanced methods for recovering data from solid state drives with various types of failures.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/placeholder.svg',
    author: 'Tej Singh Chaudhary',
    date: '2024-07-05',
    tags: ['Data Recovery', 'Storage', 'SSD'],
    readTime: '7 min',
    featured: false
  },
  {
    id: 5,
    title: 'Amadeus vs Sabre: GDS Comparison',
    slug: 'amadeus-vs-sabre-gds-comparison',
    excerpt: 'A detailed comparison of the two leading Global Distribution Systems used in the travel industry.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/placeholder.svg',
    author: 'Tej Singh Chaudhary',
    date: '2024-06-28',
    tags: ['GDS Systems', 'Amadeus', 'Sabre'],
    readTime: '5 min',
    featured: true
  },
  {
    id: 6,
    title: 'Cyber Security Best Practices for Small Businesses',
    slug: 'cyber-security-best-practices-small-businesses',
    excerpt: 'Essential security measures that small businesses should implement to protect their digital assets.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/placeholder.svg',
    author: 'Tej Singh Chaudhary',
    date: '2024-06-20',
    tags: ['Cyber Security', 'Small Business', 'Best Practices'],
    readTime: '8 min',
    featured: false
  }
];

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Extract all unique tags
  const allTags = Array.from(
    new Set(initialBlogPosts.flatMap(post => post.tags))
  );
  
  // Featured post (first one that has featured=true)
  const featuredPost = initialBlogPosts.find(post => post.featured);
  
  // Filter posts based on search term and selected tag
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      let filteredPosts = initialBlogPosts;
      
      if (searchTerm) {
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      if (selectedTag) {
        filteredPosts = filteredPosts.filter(post => 
          post.tags.includes(selectedTag)
        );
      }
      
      setBlogPosts(filteredPosts);
      setLoading(false);
    }, 300);
  }, [searchTerm, selectedTag]);
  
  return (
    <div>
      <Navbar />
      
      <main className="pt-20 pb-20 relative min-h-screen">
        <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5"></div>
        
        {/* Hero section */}
        <div className="relative bg-cyber-dark py-16 md:py-24 px-6">
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold cyber-heading mb-4">
              Blog & Articles
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Insights, guides, and updates on digital forensics, cyber security, 
              and travel industry technologies.
            </p>
            
            <div className="max-w-lg mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full py-3 px-4 pl-10 bg-cyber-dark/80 border border-cyber-purple/30 rounded-lg focus:outline-none focus:border-cyber-purple focus:ring-1 focus:ring-cyber-purple"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-purple-light w-4 h-4" />
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/20 to-cyber-blue/20 opacity-30"></div>
        </div>
        
        {/* Featured post */}
        {featuredPost && (
          <div className="container mx-auto px-6 relative z-10 -mt-8">
            <div className="cyber-card">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <div className="overflow-hidden rounded-lg h-full">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col justify-center">
                  <div className="inline-block mb-2">
                    <span className="cyber-chip bg-cyber-blue/20 text-cyber-blue">Featured Post</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 hover:text-cyber-blue transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>
                  
                  <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-cyber-pink" />
                      <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-cyber-neon" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{featuredPost.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="cyber-chip cursor-pointer hover:bg-cyber-purple/20 hover:text-cyber-purple-light"
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    to={`/blog/${featuredPost.slug}`} 
                    className="cyber-button self-start"
                  >
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Categories */}
        <div className="container mx-auto px-6 mt-12 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Categories</h2>
            {selectedTag && (
              <button 
                className="text-sm text-cyber-blue hover:text-cyber-pink transition-colors"
                onClick={() => setSelectedTag('')}
              >
                Clear Filter
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {allTags.map((tag, index) => (
              <button
                key={index}
                className={`cyber-chip transition-all ${
                  selectedTag === tag 
                    ? 'bg-cyber-blue/20 text-cyber-blue shadow-glow-blue'
                    : 'hover:bg-cyber-dark hover:text-cyber-pink'
                }`}
                onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Blog posts grid */}
        <div className="container mx-auto px-6 mt-8 relative z-10">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="cyber-loader"></div>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="block h-full">
                  <div className="cyber-card hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
                    <div className="overflow-hidden rounded-lg mb-4 relative group">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                      <div className="absolute bottom-2 left-2 bg-cyber-dark/70 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-cyber-neon border border-cyber-neon/30">
                        <div className="flex items-center">
                          <Tag className="w-3 h-3 mr-1" />
                          <span>{post.tags[0]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-cyber-blue transition-colors">
                        {post.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-cyber-pink" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-cyber-neon" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                      
                      <div className="mt-auto flex items-center text-cyber-blue font-mono text-sm hover:text-cyber-purple transition-colors">
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4">
                <Filter className="w-12 h-12 text-cyber-purple/50 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                No articles match your current search or filter criteria.
              </p>
              <button 
                className="cyber-button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
