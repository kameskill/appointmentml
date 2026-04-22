import { motion } from 'framer-motion'
import { Share2, MessageCircle, Heart, Globe, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        Product: ['Features', 'Pricing', 'Security', 'Roadmap'],
        Company: ['About', 'Blog', 'Careers', 'Press'],
        Resources: ['Documentation', 'Community', 'Help Center', 'Contact'],
        Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Compliance'],
    }

    const socialLinks = [
        { icon: Share2, href: '#', label: 'Facebook' },
        { icon: MessageCircle, href: '#', label: 'Twitter' },
        { icon: Heart, href: '#', label: 'Instagram' },
        { icon: Globe, href: '#', label: 'LinkedIn' },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    }

    return (
        <footer className='bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <motion.div
                    variants={containerVariants}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: false, amount: 0.2 }}
                    className='py-16 grid md:grid-cols-5 gap-8'
                >
                    <motion.div variants={itemVariants} className='md:col-span-1'>
                        <div className='flex items-center gap-2 mb-4'>
                            <img src="/logo.png" alt="Timmy Tails" className="w-10 h-10 rounded-lg object-cover" />
                            <span className='text-xl font-bold'>Timmy Tails</span>
                        </div>
                        <p className='text-gray-400 mb-6'>
                            Premium dog grooming appointments made simple with AI-powered recommendations.
                        </p>
                        <div className='space-y-3'>
                            <div className='flex items-center gap-3 text-gray-400 hover:text-white transition-colors'>
                                <Phone size={18} />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className='flex items-center gap-3 text-gray-400 hover:text-white transition-colors'>
                                <Mail size={18} />
                                <span>hello@timmytails.com</span>
                            </div>
                            <div className='flex items-center gap-3 text-gray-400 hover:text-white transition-colors'>
                                <MapPin size={18} />
                                <span>123 Pet Street, NY 10001</span>
                            </div>
                        </div>
                    </motion.div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <motion.div key={category} variants={itemVariants}>
                            <h3 className='font-bold text-lg mb-4'>{category}</h3>
                            <ul className='space-y-2'>
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href='#'
                                            className='text-gray-400 hover:text-white transition-colors duration-200'
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                <div className='border-t border-gray-800'></div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: false }}
                    className='py-8 flex flex-col md:flex-row justify-between items-center gap-6'
                >
                    <div className='text-gray-400 text-center md:text-left'>
                        <p>© {currentYear} Timmy Tails. All rights reserved.</p>
                    </div>

                    <motion.div
                        className='flex items-center gap-6'
                        variants={containerVariants}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: false }}
                    >
                        {socialLinks.map((social) => {
                            const Icon = social.icon
                            return (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.2, color: '#a855f7' }}
                                    whileTap={{ scale: 0.95 }}
                                    className='text-gray-400 hover:text-purple-500 transition-colors'
                                >
                                    <Icon size={24} />
                                </motion.a>
                            )
                        })}
                    </motion.div>

                    <div className='flex gap-6 text-gray-400 text-sm'>
                        <a href='#' className='hover:text-white transition-colors'>
                            Privacy
                        </a>
                        <a href='#' className='hover:text-white transition-colors'>
                            Terms
                        </a>
                        <a href='#' className='hover:text-white transition-colors'>
                            Cookies
                        </a>
                    </div>
                </motion.div>
            </div>

            <div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10'></div>
            <div className='absolute top-1/2 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl -z-10'></div>
        </footer>
    )
}
