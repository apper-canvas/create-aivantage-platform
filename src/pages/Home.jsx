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
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 md:h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-secondary to-electric-blue rounded-2xl flex items-center justify-center shadow-lg">
                <ApperIcon name="Zap" className="h-6 w-6 md:h-7 md:w-7 text-white" />
              </div>
              <span className="text-2xl md:text-3xl font-bold text-gradient tracking-tight">Dreamwares</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-10">
              {['Services', 'About', 'Case Studies', 'Blog', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-surface-700 hover:text-secondary transition-all duration-300 font-medium text-base tracking-wide relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-electric-cyan transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="btn-electric text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-semibold text-sm md:text-base tracking-wide"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>

{/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-50 via-blue-50/30 to-indigo-50/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.1),rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-surface-200/50 rounded-full text-sm font-medium text-surface-700 mb-8">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Trusted by 500+ companies worldwide
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 md:mb-12 leading-tight"
            >
              <span className="text-surface-900">Empowering</span>
              <br />
              <span className="text-gradient-blue">Businesses</span> with
              <br />
              <span className="text-surface-900">Cutting-Edge</span>
              <br />
              <span className="text-gradient-blue">AI Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl text-surface-600 mb-12 md:mb-16 leading-relaxed max-w-4xl mx-auto font-light"
            >
              Transform your business with our comprehensive AI services including machine learning, 
              natural language processing, computer vision, and strategic AI consulting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <button className="btn-electric text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-semibold text-lg md:text-xl transition-all duration-300 w-full sm:w-auto group">
                Start Your AI Journey
                <ApperIcon name="ArrowRight" className="ml-3 h-6 w-6 inline group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-surface-700 border-2 border-surface-300 bg-white/50 backdrop-blur-sm px-8 py-4 md:px-10 md:py-5 rounded-2xl font-semibold text-lg md:text-xl hover:bg-surface-900 hover:text-white hover:border-surface-900 transition-all duration-300 w-full sm:w-auto group">
                Watch Demo
                <ApperIcon name="Play" className="ml-3 h-6 w-6 inline group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap justify-center items-center gap-8 text-surface-500"
            >
              <div className="flex items-center gap-2">
                <ApperIcon name="Shield" className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Zap" className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Rapid Deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Users" className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Expert Support</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { icon: 'Brain', position: 'top-1/4 left-1/6', delay: 0 },
              { icon: 'Eye', position: 'top-1/3 right-1/6', delay: 1.5 },
              { icon: 'MessageSquare', position: 'bottom-1/3 left-1/5', delay: 3 },
              { icon: 'BarChart3', position: 'bottom-1/4 right-1/5', delay: 4.5 }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 0.08, scale: 1, rotate: 0 }}
                transition={{ duration: 2, delay: item.delay, ease: "easeOut" }}
                className={`absolute ${item.position} hidden xl:block animate-float`}
                style={{ animationDelay: `${item.delay}s` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-secondary/10 to-electric-purple/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <ApperIcon name={item.icon} className="h-10 w-10 text-secondary" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-white via-surface-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.05),rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-purple/10 border border-electric-purple/20 rounded-full text-sm font-semibold text-electric-purple mb-6">
              <ApperIcon name="Users" className="h-4 w-4" />
              About Dreamwares
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-surface-900 mb-6 md:mb-8">
              Pioneering the <span className="text-gradient-blue">Future of AI</span>
            </h2>
            <p className="text-xl md:text-2xl text-surface-600 max-w-4xl mx-auto leading-relaxed">
              We are a team of AI experts, data scientists, and engineers dedicated to transforming businesses 
              through cutting-edge artificial intelligence solutions and strategic innovation.
            </p>
          </motion.div>

          {/* Company Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 md:mb-28"
          >
            {[
              { number: "8+", label: "Years of Experience", icon: "Calendar" },
              { number: "500+", label: "Projects Completed", icon: "CheckCircle" },
              { number: "200+", label: "Clients Served", icon: "Users" },
              { number: "1000+", label: "AI Models Deployed", icon: "Brain" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="floating-card p-6 md:p-8 rounded-2xl shadow-soft border-0 h-full">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-electric-purple to-secondary rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <ApperIcon name={stat.icon} className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-blue mb-2">
                    {stat.number}
                  </div>
                  <div className="text-surface-600 font-medium text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission & Values */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-28">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 mb-6 md:mb-8">
                Our <span className="text-gradient-blue">Mission</span>
              </h3>
              <p className="text-lg md:text-xl text-surface-600 leading-relaxed mb-8">
                To democratize artificial intelligence by making advanced AI solutions accessible, 
                practical, and transformative for businesses of all sizes. We believe AI should enhance 
                human capabilities, not replace them.
              </p>
              <div className="space-y-4">
                {[
                  "Accelerate digital transformation through AI innovation",
                  "Deliver measurable business value with every solution",
                  "Maintain highest standards of ethics and transparency"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <ApperIcon name="Check" className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-surface-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "AI Expertise", icon: "Brain", color: "from-secondary to-electric-blue" },
                  { title: "Innovation", icon: "Lightbulb", color: "from-electric-purple to-electric-pink" },
                  { title: "Reliability", icon: "Shield", color: "from-green-500 to-emerald-500" },
                  { title: "Support", icon: "HeartHandshake", color: "from-orange-500 to-red-500" }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="floating-card p-6 rounded-2xl shadow-soft border-0 text-center group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <ApperIcon name={value.icon} className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-surface-900 group-hover:text-secondary transition-colors duration-300">
                      {value.title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Vision & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="floating-card p-8 md:p-12 lg:p-16 rounded-3xl shadow-soft border-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-secondary/5 to-electric-purple/5 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-electric-cyan/5 to-electric-purple/5 rounded-full translate-y-16 -translate-x-16"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-surface-900 mb-6 md:mb-8">
                  Building Tomorrow's <span className="text-gradient-blue">AI-Powered World</span>
                </h3>
                <p className="text-lg md:text-xl text-surface-600 leading-relaxed mb-8 md:mb-12">
                  We envision a future where artificial intelligence seamlessly integrates with human creativity 
                  and intuition, creating unprecedented opportunities for growth, innovation, and positive impact 
                  across all industries.
                </p>
                <button className="btn-electric text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-semibold text-lg md:text-xl transition-all duration-300 group">
                  Learn More About Us
                  <ApperIcon name="ArrowRight" className="ml-3 h-6 w-6 inline group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
{/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-gradient-to-b from-white to-surface-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-sm font-semibold text-secondary mb-6">
              <ApperIcon name="Sparkles" className="h-4 w-4" />
              Our AI Services
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-surface-900 mb-6 md:mb-8">
              Comprehensive <span className="text-gradient-blue">AI Solutions</span>
            </h2>
            <p className="text-xl md:text-2xl text-surface-600 max-w-4xl mx-auto leading-relaxed">
              Tailored artificial intelligence services designed to transform your business operations and accelerate growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services?.map((service, index) => (
              <motion.div
                key={service?.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="floating-card p-8 md:p-10 rounded-3xl shadow-soft border-0 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/5 to-electric-purple/5 rounded-full -translate-y-12 translate-x-12"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-secondary to-electric-purple rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <ApperIcon name={service?.icon || 'Zap'} className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-surface-900 mb-4 group-hover:text-secondary transition-colors duration-300">
                      {service?.title || 'AI Service'}
                    </h3>
                    
                    <p className="text-surface-600 mb-6 leading-relaxed line-clamp-3">
                      {service?.description || 'Advanced AI solutions for your business'}
                    </p>

                    <div className="space-y-3 mb-8">
                      {service?.features?.slice(0, 3)?.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-surface-700">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ApperIcon name="Check" className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="leading-relaxed">{feature}</span>
                        </div>
                      )) || []}
                    </div>

                    <button className="w-full text-secondary border-2 border-secondary/20 bg-secondary/5 px-6 py-3 rounded-xl font-semibold hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 group-hover:shadow-lg">
                      Learn More
                    </button>
                  </div>
                </div>
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
      <section id="case-studies" className="py-20 md:py-32 bg-gradient-to-b from-white to-surface-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-full text-sm font-semibold text-green-700 mb-6">
              <ApperIcon name="TrendingUp" className="h-4 w-4" />
              Success Stories
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-surface-900 mb-6 md:mb-8">
              Featured <span className="text-gradient-blue">Case Studies</span>
            </h2>
            <p className="text-xl md:text-2xl text-surface-600 max-w-4xl mx-auto leading-relaxed">
              Real-world AI implementations delivering measurable results and transforming businesses across industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
            {caseStudies?.map((study, index) => (
              <motion.div
                key={study?.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="floating-card rounded-3xl overflow-hidden shadow-soft border-0 h-full">
                  <div className="h-56 bg-gradient-to-br from-secondary/10 via-electric-purple/10 to-electric-cyan/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-electric-purple/5"></div>
                    <ApperIcon name="TrendingUp" className="h-20 w-20 text-secondary relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-semibold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                        {study?.industry || 'Industry'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-surface-900 mb-4 group-hover:text-secondary transition-colors duration-300">
                      {study?.title || 'Case Study Title'}
                    </h3>
                    
                    <p className="text-surface-600 mb-6 leading-relaxed line-clamp-3">
                      {study?.challenge || 'Business challenge description'}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {study?.tags?.slice(0, 3)?.map((tag, idx) => (
                        <span key={idx} className="text-xs font-medium text-surface-700 bg-surface-100 px-3 py-1 rounded-full border border-surface-200">
                          {tag}
                        </span>
                      )) || []}
                    </div>

                    <button className="w-full text-secondary border-2 border-secondary/20 bg-secondary/5 px-6 py-3 rounded-xl font-semibold hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-300 group-hover:shadow-lg">
                      Read Case Study
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* Blog Section */}
      <section id="blog" className="py-20 md:py-32 bg-gradient-to-b from-surface-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.05),rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-cyan/10 border border-electric-cyan/20 rounded-full text-sm font-semibold text-electric-cyan mb-6">
              <ApperIcon name="BookOpen" className="h-4 w-4" />
              Latest Insights
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-surface-900 mb-6 md:mb-8">
              AI <span className="text-gradient-blue">Knowledge Hub</span>
            </h2>
            <p className="text-xl md:text-2xl text-surface-600 max-w-4xl mx-auto leading-relaxed">
              Stay ahead with the latest AI trends, industry insights, and expert analysis from our team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {blogPosts?.map((post, index) => (
              <motion.article
                key={post?.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="floating-card rounded-3xl overflow-hidden shadow-soft border-0 h-full">
                  <div className="h-56 bg-gradient-to-br from-electric-cyan/10 via-secondary/10 to-electric-purple/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-secondary/5"></div>
                    <ApperIcon name="FileText" className="h-20 w-20 text-electric-cyan relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-sm font-semibold text-electric-cyan bg-electric-cyan/10 px-3 py-1 rounded-full">
                        {post?.category || 'AI Insights'}
                      </span>
                      <span className="text-sm text-surface-500 font-medium">
                        {post?.publishDate ? new Date(post.publishDate).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-surface-900 mb-4 line-clamp-2 group-hover:text-electric-cyan transition-colors duration-300">
                      {post?.title || 'Blog Post Title'}
                    </h3>
                    
                    <p className="text-surface-600 mb-6 leading-relaxed line-clamp-3">
                      {post?.content?.substring(0, 120) || 'Blog post excerpt...'}...
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-electric-cyan to-secondary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {(post?.author || 'Dreamwares Team').charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm text-surface-600 font-medium">
                          {post?.author || 'Dreamwares Team'}
                        </span>
                      </div>
                      <button className="text-electric-cyan font-semibold hover:text-secondary transition-colors duration-300 group flex items-center gap-2">
                        Read More
                        <ApperIcon name="ArrowRight" className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

{/* Footer */}
      <footer className="bg-gradient-to-b from-surface-900 to-surface-950 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.1),rgba(255,255,255,0))]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-16">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-electric-purple rounded-2xl flex items-center justify-center shadow-lg">
                  <ApperIcon name="Zap" className="h-7 w-7 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-white to-surface-300 bg-clip-text text-transparent">Dreamwares</span>
              </div>
              <p className="text-surface-300 mb-8 max-w-md text-lg leading-relaxed">
                Empowering businesses with cutting-edge AI solutions. Transform your operations with machine learning, NLP, computer vision, and strategic AI consulting.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: 'Linkedin', color: 'hover:bg-blue-600' },
                  { name: 'Twitter', color: 'hover:bg-sky-500' },
                  { name: 'Github', color: 'hover:bg-gray-700' },
                  { name: 'Mail', color: 'hover:bg-green-600' }
                ].map((social) => (
                  <button 
                    key={social.name} 
                    className={`w-12 h-12 bg-surface-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg border border-surface-700/50`}
                  >
                    <ApperIcon name={social.name} className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Services</h4>
              <ul className="space-y-4 text-surface-300">
                {['Machine Learning', 'Computer Vision', 'NLP Solutions', 'AI Consulting', 'Custom AI Development'].map((service) => (
                  <li key={service}>
                    <a href="#" className="hover:text-secondary transition-colors duration-300 flex items-center gap-2 group">
                      <ApperIcon name="ChevronRight" className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-4 text-surface-300">
                {['About Us', 'Case Studies', 'Blog', 'Contact', 'Careers'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-secondary transition-colors duration-300 flex items-center gap-2 group">
                      <ApperIcon name="ChevronRight" className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-800/50 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-surface-400 text-center md:text-left">
                © 2024 Dreamwares. All rights reserved. Built with advanced AI technologies.
              </p>
              <div className="flex items-center gap-6 text-surface-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Security</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home