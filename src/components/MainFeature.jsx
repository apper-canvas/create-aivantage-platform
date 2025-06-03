import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { contactInquiryService } from '../services'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('consultation')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceInterest: '',
    message: '',
    consultationType: 'strategy',
    budget: '',
    timeline: ''
  })
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const serviceOptions = [
    { value: 'machine-learning', label: 'Machine Learning', icon: 'Brain' },
    { value: 'computer-vision', label: 'Computer Vision', icon: 'Eye' },
    { value: 'nlp', label: 'Natural Language Processing', icon: 'MessageSquare' },
    { value: 'ai-consulting', label: 'AI Strategy Consulting', icon: 'TrendingUp' },
    { value: 'custom-ai', label: 'Custom AI Solutions', icon: 'Zap' }
  ]

  const consultationTypes = [
    { value: 'strategy', label: 'AI Strategy Planning', duration: '90 minutes' },
    { value: 'technical', label: 'Technical Assessment', duration: '60 minutes' },
    { value: 'implementation', label: 'Implementation Planning', duration: '120 minutes' },
    { value: 'optimization', label: 'AI Optimization Review', duration: '75 minutes' }
  ]

  const budgetRanges = [
    { value: '10k-50k', label: '$10K - $50K' },
    { value: '50k-100k', label: '$50K - $100K' },
    { value: '100k-500k', label: '$100K - $500K' },
    { value: '500k+', label: '$500K+' }
  ]

  const timelineOptions = [
    { value: '1-3months', label: '1-3 months' },
    { value: '3-6months', label: '3-6 months' },
    { value: '6-12months', label: '6-12 months' },
    { value: '12months+', label: '12+ months' }
  ]

  useEffect(() => {
    const loadInquiries = async () => {
      setLoading(true)
      try {
        const data = await contactInquiryService.getAll()
        setInquiries(data || [])
      } catch (err) {
        setError(err?.message || 'Failed to load inquiries')
      } finally {
        setLoading(false)
      }
    }
    loadInquiries()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    const { name, email, company, serviceInterest, message } = formData
    
    if (!name?.trim()) {
      toast.error('Please enter your name')
      return false
    }
    
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address')
      return false
    }
    
    if (!company?.trim()) {
      toast.error('Please enter your company name')
      return false
    }
    
    if (!serviceInterest) {
      toast.error('Please select a service of interest')
      return false
    }
    
    if (!message?.trim() || message.trim().length < 10) {
      toast.error('Please provide a detailed message (minimum 10 characters)')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setSubmitLoading(true)
    try {
      const inquiryData = {
        ...formData,
        submissionDate: new Date().toISOString(),
        status: 'new'
      }
      
      const newInquiry = await contactInquiryService.create(inquiryData)
      setInquiries(prev => [newInquiry, ...(prev || [])])
      
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceInterest: '',
        message: '',
        consultationType: 'strategy',
        budget: '',
        timeline: ''
      })
      
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
      
      toast.success('Your inquiry has been submitted successfully! We\'ll contact you within 24 hours.')
    } catch (err) {
      toast.error(err?.message || 'Failed to submit inquiry. Please try again.')
    } finally {
      setSubmitLoading(false)
    }
  }

  const recentInquiries = inquiries?.slice(0, 5) || []

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-surface-900 via-primary-dark to-surface-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, delay: i * 0.1 }}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Start Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI Transformation</span>
          </h2>
          <p className="text-lg md:text-xl text-surface-300 max-w-3xl mx-auto">
            Book a consultation or submit your project inquiry. Our AI experts are ready to help you unlock the power of artificial intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20"
            >
              {/* Tab Navigation */}
              <div className="flex flex-col sm:flex-row mb-8 bg-surface-800/50 rounded-xl p-1">
                {[
                  { id: 'consultation', label: 'Book Consultation', icon: 'Calendar' },
                  { id: 'inquiry', label: 'Project Inquiry', icon: 'Send' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                        : 'text-surface-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <ApperIcon name={tab.icon} className="h-4 w-4" />
                    <span className="text-sm sm:text-base">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3"
                  >
                    <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <p className="text-green-100 text-sm">
                      Thank you! Your inquiry has been submitted successfully. We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-200 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                    placeholder="Your Company Name"
                    required
                  />
                </div>

                {/* Service Interest */}
                <div>
                  <label className="block text-sm font-medium text-surface-200 mb-3">
                    Service of Interest *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {serviceOptions.map((service) => (
                      <label
                        key={service.value}
                        className={`relative flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                          formData.serviceInterest === service.value
                            ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-cyan-400 shadow-lg'
                            : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="serviceInterest"
                          value={service.value}
                          checked={formData.serviceInterest === service.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <ApperIcon name={service.icon} className="h-5 w-5 text-cyan-400 mr-3 flex-shrink-0" />
                        <span className="text-sm font-medium text-white">{service.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Consultation-specific fields */}
                <AnimatePresence>
                  {activeTab === 'consultation' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-surface-200 mb-3">
                          Consultation Type
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {consultationTypes.map((type) => (
                            <label
                              key={type.value}
                              className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                formData.consultationType === type.value
                                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-cyan-400'
                                  : 'bg-white/5 border-white/20 hover:bg-white/10'
                              }`}
                            >
                              <input
                                type="radio"
                                name="consultationType"
                                value={type.value}
                                checked={formData.consultationType === type.value}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <span className="text-sm font-medium text-white">{type.label}</span>
                              <span className="text-xs text-surface-400 mt-1">{type.duration}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Project-specific fields */}
                <AnimatePresence>
                  {activeTab === 'inquiry' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-surface-200 mb-2">
                            Project Budget
                          </label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                          >
                            <option value="" className="bg-surface-800">Select budget range</option>
                            {budgetRanges.map((range) => (
                              <option key={range.value} value={range.value} className="bg-surface-800">
                                {range.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-surface-200 mb-2">
                            Project Timeline
                          </label>
                          <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                          >
                            <option value="" className="bg-surface-800">Select timeline</option>
                            {timelineOptions.map((option) => (
                              <option key={option.value} value={option.value} className="bg-surface-800">
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-surface-200 mb-2">
                    {activeTab === 'consultation' ? 'Tell us about your AI challenges' : 'Project Description'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={
                      activeTab === 'consultation'
                        ? 'Describe your current AI challenges, goals, and what you hope to achieve...'
                        : 'Provide detailed information about your project requirements, goals, and expected outcomes...'
                    }
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={submitLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-electric text-white py-4 rounded-xl font-semibold text-lg shadow-electric hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <ApperIcon name={activeTab === 'consultation' ? 'Calendar' : 'Send'} className="h-5 w-5" />
                      {activeTab === 'consultation' ? 'Book Consultation' : 'Submit Inquiry'}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-6">Get In Touch</h3>
              
              <div className="space-y-4">
                {[
                  { icon: 'Mail', label: 'Email', value: 'contact@aivantage.ai' },
                  { icon: 'Phone', label: 'Phone', value: '+1 (555) 123-4567' },
                  { icon: 'MapPin', label: 'Office', value: 'San Francisco, CA' },
                  { icon: 'Clock', label: 'Response Time', value: '< 24 hours' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-lg flex items-center justify-center">
                      <ApperIcon name={item.icon} className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm text-surface-300">{item.label}</p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Inquiries */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              
              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-white/10 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : recentInquiries?.length > 0 ? (
                <div className="space-y-4">
                  {recentInquiries.map((inquiry, index) => (
                    <motion.div
                      key={inquiry?.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-white truncate">
                          {inquiry?.company || 'Company'}
                        </p>
                        <span className="text-xs text-surface-400">
                          {inquiry?.submissionDate ? new Date(inquiry.submissionDate).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                      <p className="text-xs text-surface-300 line-clamp-2">
                        {inquiry?.serviceInterest?.replace('-', ' ')?.toUpperCase() || 'AI Services'}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <ApperIcon name="Inbox" className="h-8 w-8 text-surface-400 mx-auto mb-2" />
                  <p className="text-sm text-surface-400">No recent inquiries</p>
                </div>
              )}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-6">Why Choose AIVantage</h3>
              
              <div className="space-y-4">
                {[
                  { icon: 'Shield', text: 'Enterprise-grade security' },
                  { icon: 'Users', text: '500+ successful implementations' },
                  { icon: 'Award', text: 'Industry-leading expertise' },
                  { icon: 'Zap', text: 'Rapid deployment & results' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ApperIcon name={item.icon} className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                    <p className="text-sm text-surface-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainFeature