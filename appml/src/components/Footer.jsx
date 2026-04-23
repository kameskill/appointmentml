import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='bg-gray-900 text-gray-300 pt-16 pb-8'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                {/* Main Footer Content */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
                    {/* Brand Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='flex flex-col items-start'
                    >
                        <div className='flex items-center gap-3 mb-4'>
                            <img src='/logo.png' alt='Timmy Tails' className='w-10 h-10 rounded-lg' />
                            <span className='text-2xl font-bold text-white'>Timmy Tails</span>
                        </div>
                        <p className='text-gray-400 text-sm leading-relaxed max-w-xs'>
                            Professional pet grooming services with AI-powered haircut recommendations. We care for your furry friends like family.
                        </p>
                        <div className='flex gap-4 mt-6'>
                            {/* Facebook */}
                            <motion.a
                                whileHover={{ scale: 1.2, color: '#a855f7' }}
                                href='#'
                                className='p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors'
                                title='Facebook'
                            >
                                <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
                                    <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                                </svg>
                            </motion.a>
                            {/* Instagram */}
                            <motion.a
                                whileHover={{ scale: 1.2, color: '#a855f7' }}
                                href='#'
                                className='p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors'
                                title='Instagram'
                            >
                                <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
                                    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.265-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z' />
                                </svg>
                            </motion.a>
                            {/* Twitter */}
                            <motion.a
                                whileHover={{ scale: 1.2, color: '#a855f7' }}
                                href='#'
                                className='p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors'
                                title='Twitter'
                            >
                                <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
                                    <path d='M23.953 4.57a10 10 0 002.856-3.51 9.95 9.95 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                                </svg>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className='text-lg font-bold text-white mb-6'>Quick Links</h3>
                        <ul className='space-y-3'>
                            {[
                                { label: 'Home', href: '/' },
                                { label: 'Services', href: '/services' },
                                { label: 'Booking', href: '/booking' },
                                { label: 'About', href: '/about' },
                                { label: 'Contact', href: '/contact' }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className='text-gray-400 hover:text-purple-500 transition-colors font-medium text-sm'
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className='text-lg font-bold text-white mb-6'>Get in Touch</h3>
                        <div className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <Phone size={20} className='text-purple-500 mt-1 flex-shrink-0' />
                                <div>
                                    <p className='text-sm text-gray-400'>Phone</p>
                                    <a href='tel:+639123456789' className='text-white hover:text-purple-500 transition-colors font-medium'>
                                        +63 (9) 123-456-789
                                    </a>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <Mail size={20} className='text-purple-500 mt-1 flex-shrink-0' />
                                <div>
                                    <p className='text-sm text-gray-400'>Email</p>
                                    <a href='mailto:hello@timmytails.com' className='text-white hover:text-purple-500 transition-colors font-medium'>
                                        hello@timmytails.com
                                    </a>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <MapPin size={20} className='text-purple-500 mt-1 flex-shrink-0' />
                                <div>
                                    <p className='text-sm text-gray-400'>Address</p>
                                    <p className='text-white font-medium'>
                                        123 Pet Street<br />
                                        Manila, Philippines 1000
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Divider */}
                <div className='border-t border-gray-800 my-8'></div>

                {/* Bottom Section */}
                <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                    <p className='text-gray-500 text-sm'>
                        © {currentYear} Timmy Tails. All rights reserved.
                    </p>
                    <div className='flex gap-6 text-sm'>
                        <Link to='#' className='text-gray-400 hover:text-purple-500 transition-colors'>
                            Privacy Policy
                        </Link>
                        <Link to='#' className='text-gray-400 hover:text-purple-500 transition-colors'>
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}