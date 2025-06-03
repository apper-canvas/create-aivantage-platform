import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { serviceService } from '../services'
import { testimonialService } from '../services'
import { caseStudyService } from '../services'
import { blogPostService } from '../services'

const Home = () => {
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [caseStudies, setCaseStudies] = useState([])
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [servicesData, testimonialsData, caseStudiesData, blogData] = await Promise.all([
          serviceService.getAll(),
          testimonialService.getAll(),
          caseStudyService.getAll(),
          blogPostService.getAll()
        ])
        
        setServices(servicesData || [])
        setTestimonials(testimonialsData?.filter(t => t?.featured) || [])
        setCaseStudies(caseStudiesData?.slice(0, 3) || [])
        setBlogPosts(blogData?.filter(b => b?.featured)?.slice(0, 3) || [])
      } catch (err) {
        setError(err?.message || 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (testimonials?.length > 0) {
      const interval = setInterval(() => {
        setActiveTestimonial(prev => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [testimonials])

  if (loading) {
    return (
<div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-surface-600">Loading Dreamwares...</p>
      </div>
    </div>
  )
}

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertTriangle" className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-surface-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
<div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gradient">Dreamwares</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'About', 'Case Studies', 'Blog', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-surface-700 hover:text-primary transition-colors font-medium"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="btn-electric text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 opacity-60"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8"
            >
              <span className="text-gradient">Empowering Businesses</span>
              <br />
              <span className="text-surface-800">with Cutting-Edge</span>
              <br />
              <span className="text-gradient">AI Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-surface-600 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto"
            >
              Transform your business with our comprehensive AI services including machine learning, 
              natural language processing, computer vision, and strategic AI consulting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-electric text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-electric hover:shadow-glow transition-all duration-300 w-full sm:w-auto">
                Start Your AI Journey
                <ApperIcon name="ArrowRight" className="ml-2 h-5 w-5 inline" />
              </button>
              <button className="text-primary border-2 border-primary px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 w-full sm:w-auto">
                Watch Demo
                <ApperIcon name="Play" className="ml-2 h-5 w-5 inline" />
              </button>
            </motion.div>
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { icon: 'Brain', position: 'top-1/4 left-1/4', delay: 0 },
              { icon: 'Eye', position: 'top-1/3 right-1/4', delay: 1 },
              { icon: 'MessageSquare', position: 'bottom-1/3 left-1/6', delay: 2 },
              { icon: 'BarChart3', position: 'bottom-1/4 right-1/6', delay: 3 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1, delay: item.delay }}
                className={`absolute ${item.position} hidden lg:block animate-float`}
                style={{ animationDelay: `${item.delay}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <ApperIcon name={item.icon} className="h-8 w-8 text-primary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-surface-800 mb-4 md:mb-6">
              Our <span className="text-gradient">AI Services</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto">
              Comprehensive AI solutions tailored to transform your business operations and drive innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {services?.map((service, index) => (
              <motion.div
                key={service?.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="floating-card bg-gradient-to-br from-surface-50 to-white p-6 md:p-8 rounded-2xl border border-surface-200 shadow-card group"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={service?.icon || 'Zap'} className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-surface-800 mb-3 md:mb-4">
                  {service?.title || 'AI Service'}
                </h3>
                
                <p className="text-surface-600 mb-4 md:mb-6 line-clamp-3">
                  {service?.description || 'Advanced AI solutions for your business'}
                </p>

                <div className="space-y-2 mb-4 md:mb-6">
                  {service?.features?.slice(0, 3)?.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-surface-700">
                      <ApperIcon name="Check" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  )) || []}
                </div>

                <button className="w-full text-primary border border-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <MainFeature />

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-surface-800 mb-4 md:mb-6">
              Client <span className="text-gradient">Success Stories</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto">
              See how we've helped businesses transform with AI
            </p>
          </motion.div>

          {testimonials?.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 md:p-8 lg:p-12 rounded-2xl shadow-soft text-center"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon
                      key={i}
                      name="Star"
                      className={`h-5 w-5 md:h-6 md:w-6 ${
                        i < (testimonials[activeTestimonial]?.rating || 5)
                          ? 'text-yellow-400 fill-current'
                          : 'text-surface-300'
                      }`}
                    />
                  ))}
                </div>
                
                <blockquote className="text-lg md:text-xl lg:text-2xl text-surface-700 mb-6 md:mb-8 italic leading-relaxed">
                  "{testimonials[activeTestimonial]?.content || 'Great service!'}"
                </blockquote>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg md:text-xl">
                      {testimonials[activeTestimonial]?.clientName?.charAt(0) || 'C'}
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="font-semibold text-surface-800 text-lg">
                      {testimonials[activeTestimonial]?.clientName || 'Client Name'}
                    </p>
                    <p className="text-surface-600">
                      {testimonials[activeTestimonial]?.company || 'Company Name'}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-center mt-6 md:mt-8 space-x-2">
                {testimonials?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial
                        ? 'bg-primary'
                        : 'bg-surface-300 hover:bg-surface-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-surface-800 mb-4 md:mb-6">
              Featured <span className="text-gradient">Case Studies</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto">
              Real-world AI implementations delivering measurable results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {caseStudies?.map((study, index) => (
              <motion.div
                key={study?.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="floating-card bg-gradient-to-br from-surface-50 to-white rounded-2xl overflow-hidden border border-surface-200 shadow-card"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <ApperIcon name="TrendingUp" className="h-16 w-16 text-primary" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {study?.industry || 'Industry'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-surface-800 mb-3">
                    {study?.title || 'Case Study Title'}
                  </h3>
                  
                  <p className="text-surface-600 mb-4 line-clamp-3">
                    {study?.challenge || 'Business challenge description'}
                  </p>

                  <div className="space-y-2 mb-6">
                    {study?.tags?.slice(0, 3)?.map((tag, idx) => (
                      <span key={idx} className="inline-block text-xs text-surface-700 bg-surface-100 px-2 py-1 rounded mr-2">
                        {tag}
                      </span>
                    )) || []}
                  </div>

                  <button className="w-full text-primary border border-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300">
                    Read Case Study
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 md:py-24 bg-gradient-to-br from-surface-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-surface-800 mb-4 md:mb-6">
              Latest <span className="text-gradient">Insights</span>
            </h2>
            <p className="text-lg md:text-xl text-surface-600 max-w-3xl mx-auto">
              Stay ahead with the latest AI trends and industry insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts?.map((post, index) => (
              <motion.article
                key={post?.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="floating-card bg-white rounded-2xl overflow-hidden border border-surface-200 shadow-card"
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <ApperIcon name="FileText" className="h-16 w-16 text-primary" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-1 rounded-full">
                      {post?.category || 'AI Insights'}
                    </span>
                    <span className="text-xs text-surface-500">
                      {post?.publishDate ? new Date(post.publishDate).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-surface-800 mb-3 line-clamp-2">
                    {post?.title || 'Blog Post Title'}
                  </h3>
                  
                  <p className="text-surface-600 mb-4 line-clamp-3">
                    {post?.content?.substring(0, 120) || 'Blog post excerpt...'}...
                  </p>
<div className="flex items-center justify-between">
                    <span className="text-sm text-surface-500">
                      By {post?.author || 'Dreamwares Team'}
                    </span>
                    <button className="text-primary font-medium hover:text-primary-dark transition-colors">
<button className="text-primary font-medium hover:text-primary-dark transition-colors">
                      Read More
                      <ApperIcon name="ArrowRight" className="ml-1 h-4 w-4 inline" />
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
<div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="Zap" className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Dreamwares</span>
              </div>
              <p className="text-surface-300 mb-6 max-w-md">
                Empowering businesses with cutting-edge AI solutions. Transform your operations with machine learning, NLP, computer vision, and strategic AI consulting.
              </p>
              <div className="flex space-x-4">
                {['Linkedin', 'Twitter', 'Github', 'Mail'].map((social) => (
                  <button key={social} className="w-10 h-10 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                    <ApperIcon name={social} className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">Machine Learning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Computer Vision</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NLP Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Consulting</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-surface-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
<div className="border-t border-surface-800 mt-12 pt-8 text-center">
            <p className="text-surface-400">
              © 2024 Dreamwares. All rights reserved. Built with advanced AI technologies.
            </p>
</div>
        </div>
      </footer>
    </div>
  )
}

export default Home