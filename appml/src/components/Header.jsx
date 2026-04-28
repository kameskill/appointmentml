import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Header({ scrolled }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  if (location.pathname === '/admin') {
    return null
  }
  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
    setIsOpen(false)
  }

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Timmy Tails" className="w-12 h-12 rounded-lg object-cover" />
            <span className="text-xl font-bold text-gray-800">Timmy Tails</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-8"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-purple-600 font-bold hover:text-purple-800 transition-colors">
              Admin
            </Link>
          )}
        </motion.div>

        {/* Auth Buttons – Desktop */}
        <div className="flex items-center gap-3">
          {user ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full border border-purple-200">
                <User size={16} className="text-purple-600" />
                <span className="text-purple-700 font-medium text-sm">{user.firstName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-500 hover:text-red-500 px-3 py-2 rounded-full font-medium transition-all text-sm"
              >
                <LogOut size={16} />
                Logout
              </button>
            </motion.div>
          ) : (
            <>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => navigate('/login')}
                className="hidden md:inline-block text-purple-600 hover:text-purple-700 px-6 py-2 rounded-full font-medium transition-all"
              >
                Login
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => navigate('/signup')}
                className="hidden md:inline-block bg-gradient-to-r from-purple-600 to-purple-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
              >
                Sign Up
              </motion.button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 p-1 hover:text-purple-600 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block text-gray-700 hover:text-purple-600 transition-colors font-medium py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {user?.role === 'admin' && (
                <Link to="/admin" className="block text-purple-600 font-bold py-1" onClick={() => setIsOpen(false)}>
                  Admin
                </Link>
              )}
              <div className="pt-3 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Signed in as <span className="font-bold text-gray-800">{user.firstName} {user.lastName}</span></p>
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-red-500 border-2 border-red-200 px-4 py-2 rounded-full font-medium hover:bg-red-50 transition-all">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => { navigate('/login'); setIsOpen(false) }}
                      className="flex-1 text-purple-600 hover:text-purple-700 px-4 py-2 rounded-full font-medium border-2 border-purple-600 transition-all"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => { navigate('/signup'); setIsOpen(false) }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}