import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className='min-h-screen flex items-center justify-center relative overflow-hidden pt-20'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-center z-10 px-4'
      >
        <div className='inline-block mb-4'>
          <span className='bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold'>
            🐾 Premium Dog Grooming
          </span>
        </div>
        <h1 className='text-5xl md:text-7xl font-bold text-gray-900 mb-6'>
          Premium Dog
          <span className='block bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text'>
            Grooming Made Simple
          </span>
        </h1>
        <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
          Book appointments online, get AI-powered haircut recommendations, and give your furry friend the pampering they deserve.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/booking')}
            className='bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all'
          >
            Book Appointment Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/services')}
            className='border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all'
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className='absolute bottom-10 left-1/2 transform -translate-x-1/2'
      >
        <div className='w-6 h-10 border-2 border-purple-600 rounded-full flex items-start justify-center p-2'>
          <motion.div className='w-1 h-2 bg-purple-600 rounded-full' />
        </div>
      </motion.div>
    </section>
  )
}
