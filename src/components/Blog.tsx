import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar, User, Tag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock blog data (this would come from your backend in production)
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
		readTime: '5 min'
	},
	{
		id: 2,
		title: 'Linux Shell Scripting for Beginners',
		slug: 'linux-shell-scripting-beginners',
		excerpt: 'A comprehensive guide to getting started with shell scripting in Linux environments.',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		image: '/placeholder.svg',
		author: 'Tej Singh Chaudhary',
		date: '2024-07-10',
		tags: ['Linux', 'Shell Scripting', 'Programming'],
		readTime: '6 min'
	}
];

const Blog = () => {
	const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// In a real application, you would fetch blog posts from your backend here
		// Example:
		// const fetchBlogPosts = async () => {
		//   try {
		//     const response = await fetch('/api/blog-posts');
		//     const data = await response.json();
		//     setBlogPosts(data);
		//   } catch (error) {
		//     console.error('Error fetching blog posts:', error);
		//   }
		// };
		// fetchBlogPosts();

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

	return (
		<section
			id="blog"
			ref={sectionRef}
			className="py-20 px-6 relative"
		>
			<div className="absolute inset-0 bg-cyber-grid bg-[length:20px_20px] opacity-5"></div>

			<div className="container mx-auto relative z-10">
				<div className="text-center mb-16">
					<div className="inline-block mb-2">
						<span className="cyber-chip">Insights & Knowledge</span>
					</div>
					<h2 className="text-3xl md:text-4xl font-bold cyber-heading mb-4">Blog & Articles</h2>
					<div className="w-20 h-1 bg-gradient-to-r from-cyber-blue to-cyber-neon mx-auto"></div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{blogPosts.map((post, index) => (
						<div
							key={post.id}
							className={`transition-all duration-700 delay-${index * 100} ${
								isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
							}`}
						>
							<Link to={`/blog/${post.slug}`} className="block h-full">
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
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<Link
						to="/blog"
						className="cyber-button inline-flex items-center"
					>
						View All Articles
						<ArrowRight className="w-4 h-4 ml-2" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Blog;
