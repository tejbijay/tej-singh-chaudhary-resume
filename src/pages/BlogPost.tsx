
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, Clock, ArrowLeft, Share2 } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, you would fetch the specific blog post by slug from your backend
    // For now, we're using mock data
    
    // Mock function to simulate an API call
    const fetchPost = async () => {
      setLoading(true);
      try {
        // In production, you would replace this with a real API call
        // const response = await fetch(`/api/blog-posts/${slug}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockPost = {
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
            
            <h2>Integration with Cybersecurity Operations</h2>
            <p>Digital forensics is increasingly integrated into broader cybersecurity operations, contributing to threat intelligence, incident response, and vulnerability management. This integration allows organizations to not only investigate security incidents after they occur but also to proactively identify and mitigate potential threats.</p>
            
            <h2>The Future of Digital Forensics</h2>
            <p>Looking ahead, digital forensics will continue to evolve with advancements in artificial intelligence and machine learning, which promise to automate and enhance the analysis of large datasets. Additionally, as new technologies emerge, digital forensic methodologies will adapt to address novel challenges in areas such as cryptocurrency, decentralized systems, and quantum computing.</p>
            
            <p>In conclusion, digital forensics remains a critical discipline in the cybersecurity landscape, continuously adapting to address new challenges and leverage emerging technologies in the ongoing battle against cyber threats.</p>
          `,
          image: '/placeholder.svg',
          author: 'Tej Singh Chaudhary',
          date: '2024-07-20',
          tags: ['Digital Forensics', 'Cyber Security', 'Data Recovery'],
          readTime: '5 min'
        };
        
        // Simulate API delay
        setTimeout(() => {
          if (slug === mockPost.slug) {
            setPost(mockPost);
          } else {
            // If slug doesn't match, we'd normally show a not found page
            // For demo purposes, we'll just show the mock post
            setPost(mockPost);
          }
          setLoading(false);
        }, 500);
        
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug]);
  
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="cyber-loader"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!post) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog" className="cyber-button">
            Return to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      
      <main className="pt-20 pb-20 relative">
        <div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5"></div>
        
        {/* Hero section */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
            <div className="container mx-auto">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-cyber-purple-light hover:text-cyber-blue mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold cyber-heading mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-300 space-x-4 md:space-x-6">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-cyber-blue" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-cyber-pink" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-cyber-neon" />
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-8">
              <div className="cyber-card">
                <article>
                  <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
                
                <div className="mt-8 pt-6 border-t border-cyber-blue/20">
                  <div className="flex flex-wrap items-center justify-between">
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                      {post.tags.map((tag: string, index: number) => (
                        <span key={index} className="cyber-chip">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-cyber-dark border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10 transition-all duration-300"
                        aria-label="Share"
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: post.title,
                              text: post.excerpt,
                              url: window.location.href
                            }).catch(err => console.error('Error sharing:', err));
                          } else {
                            navigator.clipboard.writeText(window.location.href)
                              .then(() => alert('Link copied to clipboard!'))
                              .catch(err => console.error('Error copying to clipboard:', err));
                          }
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="cyber-card sticky top-24">
                <h3 className="text-xl font-bold mb-4">About the Author</h3>
                <div className="flex items-center mb-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="Tej Singh Chaudhary" 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{post.author}</h4>
                    <p className="text-sm text-gray-400">Digital Forensics & Travel Expert</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Passionate professional with expertise in cyber security, digital forensics, and travel industry operations. Specializing in system analysis, data recovery, and sales coordination.
                </p>
                
                <h3 className="text-xl font-bold mt-8 mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Travel Industry Technology Innovations',
                      date: 'July 15, 2024',
                      slug: 'travel-industry-technology-innovations'
                    },
                    {
                      title: 'Linux Shell Scripting for Beginners',
                      date: 'July 10, 2024',
                      slug: 'linux-shell-scripting-beginners'
                    }
                  ].map((relatedPost, index) => (
                    <Link key={index} to={`/blog/${relatedPost.slug}`} className="block">
                      <div className="p-3 rounded-lg hover:bg-cyber-dark/50 transition-colors">
                        <h4 className="font-semibold text-sm hover:text-cyber-blue transition-colors line-clamp-1">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <Calendar className="w-3 h-3 mr-1 text-cyber-pink" />
                          <span>{relatedPost.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
