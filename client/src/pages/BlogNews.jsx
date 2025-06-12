import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogNews = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to fetch blogs');
        setBlogs(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
    document.body.style.overflow = 'unset';
  };

  const featuredArticles = [
    {
      id: 1,
      title: "Hawaii's Aviation Industry: Supporting Emergency Response in Remote Areas",
      category: "Industry Insight",
      date: "December 15, 2024",
      readTime: "5 min read",
      excerpt: "How helicopter services like Vertical Worx play a crucial role in Hawaii's emergency response infrastructure, providing rapid access to remote and mountainous terrain.",
      image: "🚨",
      tags: ["Emergency Response", "Safety", "Community Service"],
      content: `
        <h2>Emergency Response: A Critical Mission</h2>
        <p>In the remote and rugged terrain of Hawaii, traditional emergency response vehicles often face insurmountable challenges. Steep cliffs, dense forests, and isolated locations can make ground-based rescue operations impossible or dangerously time-consuming.</p>
        
        <p>Helicopter services like Vertical Worx have become an integral part of Hawaii's emergency response infrastructure, providing rapid access to areas that would otherwise be unreachable. Our aircraft can reach remote locations in minutes rather than hours, often making the difference between life and death in critical situations.</p>
        
        <h3>Specialized Emergency Capabilities</h3>
        <p>Our emergency response services include:</p>
        <ul>
          <li>Medical evacuations from remote hiking trails and beaches</li>
          <li>Search and rescue operations in mountainous terrain</li>
          <li>Disaster relief supply delivery to isolated communities</li>
          <li>Firefighting support and personnel transport</li>
          <li>Emergency equipment and personnel deployment</li>
        </ul>
        
        <h3>Coordination with Local Authorities</h3>
        <p>We work closely with Hawaii's emergency services, including the Hawaii Fire Department, Coast Guard, and local law enforcement agencies. This coordination ensures seamless integration of our services into existing emergency response protocols.</p>
        
        <p>Our pilots undergo specialized training for emergency operations, including night vision operations, precision landing in challenging terrain, and coordination with ground-based rescue teams.</p>
        
        <h3>Community Impact</h3>
        <p>The availability of helicopter emergency services has significantly improved response times and outcomes for emergencies across the Hawaiian Islands. From medical emergencies on remote beaches to rescue operations on volcanic terrain, our services provide a critical lifeline for residents and visitors alike.</p>
        
        <p>We're proud to serve Hawaii's communities and remain committed to maintaining the highest standards of safety and readiness for emergency response operations.</p>
      `
    },
    {
      id: 2, 
      title: "Understanding FAA Part 133 External Load Operations",
      category: "Technical",
      date: "December 10, 2024",
      readTime: "7 min read",
      excerpt: "A comprehensive guide to FAA Part 133 regulations governing external load operations, including safety protocols and operational requirements for heavy-lift helicopter missions.",
      image: "🚁",
      tags: ["Regulations", "Safety", "Operations"],
      content: `
        <h2>FAA Part 133: The Foundation of External Load Operations</h2>
        <p>FAA Part 133 governs rotorcraft external-load operations, establishing the regulatory framework that ensures safe and efficient heavy-lift helicopter missions. Understanding these regulations is crucial for operators and clients alike.</p>
        
        <h3>Key Regulatory Requirements</h3>
        <p>Part 133 operations require specific certifications and adherence to strict operational standards:</p>
        <ul>
          <li>External-load operator certificate</li>
          <li>Approved rotorcraft-load combinations</li>
          <li>Qualified pilots with external-load endorsements</li>
          <li>Comprehensive operational control procedures</li>
          <li>Detailed risk assessment protocols</li>
        </ul>
        
        <h3>Safety Protocols and Procedures</h3>
        <p>Safety is paramount in external load operations. Our protocols include:</p>
        <ul>
          <li>Pre-flight load calculations and weight distribution analysis</li>
          <li>Comprehensive equipment inspections</li>
          <li>Weather assessment and flight path planning</li>
          <li>Ground crew coordination and communication procedures</li>
          <li>Emergency response planning</li>
        </ul>
        
        <h3>Types of External Load Operations</h3>
        <p>Part 133 covers various external load classifications:</p>
        <ul>
          <li><strong>Class A:</strong> External loads where the external load cannot move freely, cannot be jettisoned, and does not extend below the landing gear</li>
          <li><strong>Class B:</strong> External loads where the external load is jettisonable and is lifted free of land or water during the rotorcraft operation</li>
          <li><strong>Class C:</strong> External loads where the external load is jettisonable and remains in contact with land or water during the rotorcraft operation</li>
          <li><strong>Class D:</strong> External loads where the external load is other than a Class A, B, or C and has been specifically approved by the Administrator</li>
        </ul>
        
        <h3>Operational Excellence at Vertical Worx</h3>
        <p>Our commitment to Part 133 compliance goes beyond minimum requirements. We maintain rigorous training programs, conduct regular safety audits, and continuously update our procedures to reflect industry best practices.</p>
        
        <p>Every external load operation is planned with meticulous attention to detail, ensuring not only regulatory compliance but also the highest levels of safety and efficiency for our clients' projects.</p>
      `
    },
    {
      id: 3,
      title: "Aerial Cinematography in Hawaii: Capturing Paradise from Above",
      category: "Services Spotlight",
      date: "December 5, 2024", 
      readTime: "4 min read",
      excerpt: "Explore how professional aerial cinematography services enhance film and media productions, showcasing Hawaii's natural beauty while meeting strict safety and permit requirements.",
      image: "🎬",
      tags: ["Cinematography", "Film Production", "Hawaii"],
      content: `
        <h2>Capturing Hawaii's Beauty from Above</h2>
        <p>Hawaii's stunning landscapes have made it a premier destination for film and media productions worldwide. From Hollywood blockbusters to documentary films, aerial cinematography plays a crucial role in showcasing the islands' natural beauty and dramatic terrain.</p>
        
        <h3>Professional Aerial Cinematography Services</h3>
        <p>At Vertical Worx, we specialize in providing professional aerial cinematography services that meet the demanding requirements of modern film and media production:</p>
        <ul>
          <li>High-definition and 4K aerial filming capabilities</li>
          <li>Stabilized camera systems for smooth, professional footage</li>
          <li>Experienced pilots trained in precision flying for cinematography</li>
          <li>Coordination with ground crews and production teams</li>
          <li>Flexible scheduling to accommodate production timelines</li>
        </ul>
        
        <h3>Navigating Permits and Regulations</h3>
        <p>Aerial filming in Hawaii requires careful navigation of various permits and regulations:</p>
        <ul>
          <li>FAA filming permits and airspace authorizations</li>
          <li>State of Hawaii filming permits</li>
          <li>National park and protected area permissions</li>
          <li>Environmental impact considerations</li>
          <li>Noise abatement compliance</li>
        </ul>
        
        <p>Our team handles all permit applications and regulatory compliance, ensuring your production can focus on creating stunning content without regulatory delays.</p>
        
        <h3>Safety First in Aerial Filming</h3>
        <p>Safety is our top priority in all aerial cinematography operations. Our safety protocols include:</p>
        <ul>
          <li>Comprehensive pre-flight safety briefings</li>
          <li>Weather monitoring and flight condition assessment</li>
          <li>Equipment safety checks and redundancy systems</li>
          <li>Coordination with air traffic control</li>
          <li>Emergency response procedures</li>
        </ul>
        
        <h3>Showcasing Hawaii's Diverse Landscapes</h3>
        <p>From the volcanic landscapes of the Big Island to the pristine beaches of Maui, our aerial cinematography services have captured Hawaii's diverse beauty for numerous productions. We understand the unique characteristics of each island and can provide expert guidance on optimal filming locations and conditions.</p>
        
        <p>Whether you're producing a commercial, documentary, or feature film, our aerial cinematography services deliver the professional quality and reliability that your production demands.</p>
      `
    }
  ];

  const recentNews = [
    {
      id: 4,
      title: "Vertical Worx Completes Major Construction Support Project on Big Island",
      category: "Company News",
      date: "November 28, 2024",
      excerpt: "Successfully delivered construction materials to remote mountainous location, demonstrating precision external load capabilities.",
      image: "🏗️",
      content: `
        <h2>Major Construction Support Success</h2>
        <p>Vertical Worx recently completed a challenging construction support project on Hawaii's Big Island, successfully delivering over 50 tons of construction materials to a remote mountainous location that was previously inaccessible by ground transportation.</p>
        
        <h3>Project Overview</h3>
        <p>The project involved transporting steel beams, concrete blocks, and specialized construction equipment to a site located 3,000 feet above sea level in rugged volcanic terrain. Traditional ground-based delivery methods would have required building temporary access roads at significant environmental and financial cost.</p>
        
        <h3>Precision External Load Operations</h3>
        <p>Our team executed over 40 individual external load flights over a two-week period, demonstrating our precision capabilities and operational efficiency. Each load was carefully calculated and positioned with pinpoint accuracy, enabling the construction team to maintain their project timeline.</p>
        
        <p>This project showcases our commitment to supporting Hawaii's infrastructure development while minimizing environmental impact through efficient aerial delivery solutions.</p>
      `
    },
    {
      id: 5,
      title: "New Partnership with Island Environmental Institute",
      category: "Company News", 
      date: "November 20, 2024",
      excerpt: "Long-term research support agreement established for environmental monitoring and data collection across Hawaiian Islands.",
      image: "🔬"
    },
    {
      id: 6,
      title: "Hawaii Helicopter Safety: Best Practices for Operators",
      category: "Safety Education",
      date: "November 15, 2024",
      excerpt: "Industry perspective on maintaining perfect safety records through rigorous protocols and continuous training programs.",
      image: "🛡️"
    },
    {
      id: 7,
      title: "Weather Considerations for Hawaiian Island Aviation",
      category: "Education",
      date: "November 10, 2024",
      excerpt: "Understanding unique weather patterns and challenges for helicopter operations across Hawaii's diverse microclimates.",
      image: "🌺"
    },
    {
      id: 8,
      title: "Vertical Worx Supports Documentary Film Production",
      category: "Project Highlight",
      date: "November 5, 2024",
      excerpt: "Aerial cinematography services contribute to award-winning documentary showcasing Hawaii's natural conservation efforts.",
      image: "🎬"
    }
  ];

  const categories = [
    { name: "All Posts", count: 25, active: true },
    { name: "Company News", count: 8, active: false },
    { name: "Industry Insight", count: 6, active: false },
    { name: "Safety Education", count: 5, active: false },
    { name: "Technical", count: 4, active: false },
    { name: "Project Highlights", count: 2, active: false }
  ];

  const educationalResources = [
    {
      title: "Helicopter Safety Guidelines",
      description: "Comprehensive safety protocols for helicopter operations",
      icon: "🛡️",
      downloadLink: "#"
    },
    {
      title: "Weather Assessment Checklist",
      description: "Pre-flight weather evaluation procedures for Hawaiian conditions",
      icon: "🌦️",
      downloadLink: "#"
    },
    {
      title: "Emergency Response Procedures",
      description: "Standard operating procedures for emergency situations",
      icon: "🚨",
      downloadLink: "#"
    },
    {
      title: "Permit Requirements Guide",
      description: "Complete guide to aviation permits and regulations in Hawaii",
      icon: "📋",
      downloadLink: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-orange-500 font-semibold text-lg mb-4">Stay Informed</h3>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Blog & <span className="text-orange-500">News</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
              Aviation industry insights, safety education, company updates, and expert perspectives 
              from Hawaii's premier helicopter service provider.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const newsletterSection = document.querySelector('#newsletter-section');
                if (newsletterSection) {
                  newsletterSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Subscribe to Updates
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Featured <span className="text-orange-600">Articles</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In-depth insights into aviation industry trends, safety practices, 
              and operational excellence from our experienced team.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-600 h-48 flex items-center justify-center">
                  {blog.img ? (
                    <img src={blog.img} alt={blog.title} className="object-cover h-full w-full rounded-2xl" />
                  ) : (
                    <div className="text-8xl">📰</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {blog.type}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {blog.desc?.replace(/<[^>]+>/g, '').slice(0, 120)}...
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags && blog.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openModal(blog)}
                      className="text-orange-600 font-semibold hover:text-orange-800 transition-colors duration-300"
                    >
                      Read More →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News & Categories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 ${
                        category.active 
                          ? 'bg-orange-100 text-orange-800 font-semibold' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-sm">({category.count})</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Educational Resources */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg mt-8"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Resources</h3>
                <div className="space-y-4">
                  {educationalResources.map((resource, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{resource.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm mb-1">
                            {resource.title}
                          </h4>
                          <p className="text-gray-600 text-xs mb-2">
                            {resource.description}
                          </p>
                          <button className="text-orange-600 text-xs font-semibold hover:text-orange-800 transition-colors duration-300">
                            Download →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent News */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Recent News & Updates</h2>
                
                <div className="space-y-6">
                  {recentNews.map((news, index) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{news.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                              {news.category}
                            </span>
                            <span className="text-gray-500 text-sm">{news.date}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {news.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {news.excerpt}
                          </p>
                          <button 
                            onClick={() => openModal(news)}
                            className="text-orange-600 font-semibold hover:text-orange-800 transition-colors duration-300"
                          >
                            Read Full Article →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section id="newsletter-section" className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Stay Connected
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Subscribe to our newsletter for the latest aviation industry insights, safety updates, 
              company news, and educational content delivered directly to your inbox.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex gap-4 mb-6">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-white/70 text-sm">
                No spam, unsubscribe at any time. Privacy policy applies.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Modal */}
      <AnimatePresence>
        {isModalOpen && selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-300"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="flex items-center space-x-4 mb-4">
                  {selectedArticle.img ? (
                    <img src={selectedArticle.img} alt={selectedArticle.title} className="h-16 w-16 object-cover rounded-full border-4 border-white shadow" />
                  ) : (
                    <div className="text-4xl">📰</div>
                  )}
                  <div>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {selectedArticle.type}
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">{selectedArticle.title}</h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <span>{new Date(selectedArticle.createdAt).toLocaleDateString()}</span>
                </div>
                {selectedArticle.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedArticle.tags.map((tag, idx) => (
                      <span key={idx} className="bg-white/20 text-white px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="prose prose-lg max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: selectedArticle.desc || ''
                    }} 
                  />
                </div>
              </div>
              {/* Modal Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Published on {new Date(selectedArticle.createdAt).toLocaleDateString()}
                </div>
                <div className="flex space-x-4">
                  <button className="text-orange-600 hover:text-orange-800 font-semibold transition-colors duration-300">
                    Share Article
                  </button>
                  <button 
                    onClick={closeModal}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogNews; 