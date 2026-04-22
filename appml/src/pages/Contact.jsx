import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Contact() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        alert('Thank you for your message! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', phone: '', message: '' })
    }

    return (
        <section className='pt-32 pb-20 px-4'>
            <div className='max-w-4xl mx-auto'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='text-center mb-16'
                >
                    <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-4'>
                        Contact Us
                    </h1>
                    <p className='text-xl text-gray-600'>
                        Get in touch with our grooming experts
                    </p>
                </motion.div>

                <div className='grid md:grid-cols-2 gap-8 mb-8'>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className='space-y-6'
                    >
                        <div className='flex gap-4 items-start'>
                            <Phone className='text-purple-600 flex-shrink-0 mt-1' size={24} />
                            <div>
                                <h3 className='font-bold text-gray-900 mb-1'>Phone</h3>
                                <p className='text-gray-600'>+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className='flex gap-4 items-start'>
                            <Mail className='text-purple-600 flex-shrink-0 mt-1' size={24} />
                            <div>
                                <h3 className='font-bold text-gray-900 mb-1'>Email</h3>
                                <p className='text-gray-600'>hello@timmytails.com</p>
                            </div>
                        </div>

                        <div className='flex gap-4 items-start'>
                            <MapPin className='text-purple-600 flex-shrink-0 mt-1' size={24} />
                            <div>
                                <h3 className='font-bold text-gray-900 mb-1'>Address</h3>
                                <p className='text-gray-600'>123 Pet Street, NY 10001</p>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate('/booking')}
                            className='w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all mt-8'
                        >
                            Book Appointment
                        </motion.button>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        onSubmit={handleSubmit}
                        className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'
                    >
                        <div className='mb-4'>
                            <label className='block text-gray-900 font-bold mb-2'>Name</label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                placeholder='Your name'
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-900 font-bold mb-2'>Email</label>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                placeholder='Your email'
                            />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-900 font-bold mb-2'>Phone</label>
                            <input
                                type='tel'
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                placeholder='Your phone'
                            />
                        </div>

                        <div className='mb-6'>
                            <label className='block text-gray-900 font-bold mb-2'>Message</label>
                            <textarea
                                name='message'
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows='4'
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                placeholder='Your message'
                            ></textarea>
                        </div>

                        <button
                            type='submit'
                            className='w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all'
                        >
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    )
}
