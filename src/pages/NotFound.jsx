import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 via-blue-50 to-surface-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-bold text-gradient leading-none">
              404
            </h1>
          </motion.div>

          {/* Error Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
              <ApperIcon name="AlertTriangle" className="h-10 w-10 md:h-12 md:w-12 text-primary" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-surface-800 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-surface-600 leading-relaxed max-w-lg mx-auto">
              Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="btn-electric text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-electric hover:shadow-glow transition-all duration-300 inline-flex items-center w-full sm:w-auto justify-center"
            >
              <ApperIcon name="Home" className="mr-2 h-5 w-5" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="text-primary border-2 border-primary px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 inline-flex items-center w-full sm:w-auto justify-center"
            >
              <ApperIcon name="ArrowLeft" className="mr-2 h-5 w-5" />
              Go Back
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 pt-8 border-t border-surface-200"
          >
            <p className="text-surface-600 mb-4">You might be looking for:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'AI Services', icon: 'Brain' },
                { name: 'Case Studies', icon: 'TrendingUp' },
                { name: 'Blog', icon: 'FileText' },
                { name: 'Contact', icon: 'Mail' }
              ].map((link, index) => (
                <motion.a
                  key={link.name}
                  href={`/#${link.name.toLowerCase().replace(' ', '-')}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="inline-flex items-center text-surface-600 hover:text-primary transition-colors text-sm md:text-base"
                >
                  <ApperIcon name={link.icon} className="mr-2 h-4 w-4" />
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 2, delay: i * 0.3 }}
                className={`absolute w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound