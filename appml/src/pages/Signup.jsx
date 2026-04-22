import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function Signup() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState(0)

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }

        // Calculate password strength
        if (name === 'password') {
            let strength = 0
            if (value.length >= 6) strength++
            if (value.length >= 10) strength++
            if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++
            if (/[0-9]/.test(value)) strength++
            if (/[^a-zA-Z0-9]/.test(value)) strength++
            setPasswordStrength(strength)
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required'
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required'
        }

        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required'
        } else if (!/^\+63\s?\d{9,10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
            newErrors.phone = 'Please enter a valid Philippine number'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must agree to the terms and conditions'
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
                console.log('Signup submitted:', formData)
                alert('Account created successfully! Welcome to Timmy Tails.')
                navigate('/login')
            }, 1500)
        } else {
            setErrors(newErrors)
        }
    }

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 2) return 'bg-red-500'
        if (passwordStrength === 3) return 'bg-yellow-500'
        return 'bg-green-500'
    }

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 2) return 'Weak'
        if (passwordStrength === 3) return 'Good'
        return 'Strong'
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-white via-purple-50 to-white flex items-center justify-center px-4 pt-20 pb-20'>
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
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Create Account</h1>
                        <p className='text-gray-600'>Join Timmy Tails and book grooming appointments</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {/* First Name & Last Name */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-gray-700 font-bold mb-2'>First Name</label>
                                <div className='relative'>
                                    <User className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                                    <input
                                        type='text'
                                        name='firstName'
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder='Juan'
                                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${errors.firstName
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-gray-300 focus:border-purple-600'
                                            }`}
                                    />
                                </div>
                                {errors.firstName && <p className='text-red-500 text-sm mt-1'>{errors.firstName}</p>}
                            </div>

                            <div>
                                <label className='block text-gray-700 font-bold mb-2'>Last Name</label>
                                <div className='relative'>
                                    <User className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                                    <input
                                        type='text'
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder='Dela Cruz'
                                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${errors.lastName
                                                ? 'border-red-500 bg-red-50'
                                                : 'border-gray-300 focus:border-purple-600'
                                            }`}
                                    />
                                </div>
                                {errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Email */}
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

                        {/* Phone */}
                        <div>
                            <label className='block text-gray-700 font-bold mb-2'>Phone Number</label>
                            <div className='relative'>
                                <Phone className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                                <input
                                    type='tel'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder='(+63) 999 999 9999'
                                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${errors.phone
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-300 focus:border-purple-600'
                                        }`}
                                />
                            </div>
                            {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className='block text-gray-700 font-bold mb-2'>Password</label>
                            <div className='relative'>
                                <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder='Create a strong password'
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

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className='mt-2'>
                                    <div className='flex items-center gap-2 mb-1'>
                                        <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                className={`h-full ${getPasswordStrengthColor()}`}
                                            />
                                        </div>
                                        <span className='text-xs font-bold text-gray-600'>{getPasswordStrengthText()}</span>
                                    </div>
                                    <p className='text-xs text-gray-500'>Use uppercase, numbers, and symbols for stronger password</p>
                                </div>
                            )}
                            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className='block text-gray-700 font-bold mb-2'>Confirm Password</label>
                            <div className='relative'>
                                <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder='Re-enter your password'
                                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-all ${errors.confirmPassword
                                            ? 'border-red-500 bg-red-50'
                                            : 'border-gray-300 focus:border-purple-600'
                                        }`}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>}
                            {formData.password && formData.confirmPassword === formData.password && (
                                <p className='text-green-500 text-sm mt-1 flex items-center gap-1'>
                                    <CheckCircle size={16} /> Passwords match
                                </p>
                            )}
                        </div>

                        {/* Terms & Conditions */}
                        <div className='flex items-start gap-3 pt-2'>
                            <input
                                type='checkbox'
                                name='agreeTerms'
                                checked={formData.agreeTerms}
                                onChange={handleInputChange}
                                className='w-5 h-5 rounded border-gray-300 mt-1'
                            />
                            <label className='text-gray-600 text-sm'>
                                I agree to the{' '}
                                <Link to='#' className='text-purple-600 hover:text-purple-700 font-semibold'>
                                    Terms and Conditions
                                </Link>
                                {' '}and{' '}
                                <Link to='#' className='text-purple-600 hover:text-purple-700 font-semibold'>
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                        {errors.agreeTerms && <p className='text-red-500 text-sm'>{errors.agreeTerms}</p>}

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                            className='w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6'
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </motion.button>
                    </form>

                    {/* Sign In Link */}
                    <p className='text-center text-gray-600 mt-6'>
                        Already have an account?{' '}
                        <Link to='/login' className='text-purple-600 hover:text-purple-700 font-bold'>
                            Sign in here
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