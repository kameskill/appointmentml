import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Login() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = validateForm()

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true)
            // Simulate API call
            setTimeout(() => {
                console.log('Login submitted:', formData)
                alert('Login successful! Welcome back.')
                navigate('/')
            }, 1500)
        } else {
            setErrors(newErrors)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-white via-purple-50 to-white flex items-center justify-center px-4 pt-20'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='w-full max-w-md'
            >
                <div className='bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-10'>
                    {/* Header */}
                    <div className='text-center mb-8'>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className='inline-block mb-4'
                        >
                            <div className='w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center'>
                                <span className='text-2xl'>🐾</span>
                            </div>
                        </motion.div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h1>
                        <p className='text-gray-600'>Sign in to your Timmy Tails account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Email Input */}
                        <div>
                            <label className='block text-gray-700 font-bold mb-2'>Email Address</label>
                            <div className='relative'>
                                <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder='your@email.com'
                                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${errors.email
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 focus:border-purple-600'
                                        }`}
                                />
                            </div>
                            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className='block text-gray-700 font-bold mb-2'>Password</label>
                            <div className='relative'>
                                <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder='Enter your password'
                                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-all ${errors.password
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 focus:border-purple-600'
                                        }`}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className='flex items-center justify-between'>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input type='checkbox' className='w-4 h-4 rounded border-gray-300' />
                                <span className='text-gray-600 text-sm'>Remember me</span>
                            </label>
                            <Link to='#' className='text-purple-600 hover:text-purple-700 text-sm font-semibold'>
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                            className='w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </motion.button>
                    </form>

                    {/* Sign Up Link */}
                    <p className='text-center text-gray-600 mt-8'>
                        Don't have an account?{' '}
                        <Link to='/signup' className='text-purple-600 hover:text-purple-700 font-bold'>
                            Sign up here
                        </Link>
                    </p>
                </div>

                {/* Background Decoration */}
                <div className='absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 -z-10'></div>
                <div className='absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 -z-10'></div>
            </motion.div>
        </div>
    )
}