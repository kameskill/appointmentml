import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, DollarSign, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Booking() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        petName: '',
        breed: '',
        haircutStyle: null,
        service: null,
        date: '',
        time: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: ''
    })

    // AI Recommendations database for each breed
    const breedRecommendations = {
        'Labrador Retriever': [
            { name: 'Feathered Trim', description: 'Maintains natural beauty with carefully layered feathering that enhances coat texture', popularity: '90%', season: 'Spring', price: '₱1100', match: '97%' },
            { name: 'Sanitary Trim', description: 'Focuses on hygiene areas while maintaining overall coat length - practical and clean', popularity: '71%', season: 'Spring', price: '₱800', match: '87%' }
        ],
        'Golden Retriever': [
            { name: 'Feathered Trim', description: 'Maintains natural beauty with carefully layered feathering that enhances coat texture', popularity: '92%', season: 'Spring', price: '₱1100', match: '96%' },
            { name: 'Sanitary Trim', description: 'Focuses on hygiene areas while maintaining overall coat length', popularity: '68%', season: 'Spring', price: '₱800', match: '84%' }
        ],
        'Poodle': [
            { name: 'Puppy Cut', description: 'A classic, low-maintenance style keeping your Poodle looking adorable year-round', popularity: '94%', season: 'Spring', price: '₱800', match: '97%' },
            { name: 'Lamb Cut', description: 'Soft, uniform length all over creating lamb-like fluffy appearance - adorable and cuddly', popularity: '71%', season: 'Spring', price: '₱800', match: '86%' }
        ],
        'Shih Tzu': [
            { name: 'Puppy Cut', description: 'A classic, low-maintenance style keeping your Shih Tzu looking adorable year-round', popularity: '93%', season: 'Spring', price: '₱800', match: '96%' },
            { name: 'Teddy Bear Cut', description: 'Gives your Shih Tzu an irresistibly cuddly appearance with rounded features and soft coat', popularity: '72%', season: 'Spring', price: '₱800', match: '88%' }
        ],
        'Maltese': [
            { name: 'Puppy Cut', description: 'Perfect for Maltese - keeps your pet adorable year-round with minimal maintenance', popularity: '88%', season: 'Spring', price: '₱800', match: '95%' },
            { name: 'Teddy Bear Cut', description: 'Gives your Maltese an irresistibly cuddly appearance with rounded features', popularity: '74%', season: 'Spring', price: '₱800', match: '89%' }
        ],
        'Beagle': [
            { name: 'Puppy Cut', description: 'A classic, low-maintenance style keeping your Beagle looking adorable', popularity: '94%', season: 'Spring', price: '₱800', match: '96%' },
            { name: 'Teddy Bear Cut', description: 'Gives your Beagle an irresistibly cuddly appearance with rounded features', popularity: '74%', season: 'Spring', price: '₱800', match: '86%' }
        ],
        'Yorkshire Terrier': [
            { name: 'Puppy Cut', description: 'A classic, low-maintenance style keeping your Yorkshire Terrier looking adorable', popularity: '93%', season: 'Spring', price: '₱800', match: '96%' },
            { name: 'Teddy Bear Cut', description: 'Gives your Yorkshire Terrier an irresistibly cuddly appearance', popularity: '78%', season: 'Spring', price: '₱800', match: '89%' }
        ],
        'Pomeranian': [
            { name: 'Teddy Bear Cut', description: 'Gives your Pomeranian an irresistibly cuddly appearance with rounded features', popularity: '93%', season: 'Spring', price: '₱800', match: '97%' },
            { name: 'Puppy Cut', description: 'A classic, low-maintenance style keeping your Pomeranian looking perfect', popularity: '71%', season: 'Spring', price: '₱800', match: '87%' }
        ],
        'Dachshund': [
            { name: 'Puppy Cut', description: 'Perfect for Dachshunds - keeps them looking adorable with easy maintenance', popularity: '91%', season: 'Spring', price: '₱800', match: '94%' },
            { name: 'Sanitary Trim', description: 'Focuses on hygiene while maintaining coat length', popularity: '65%', season: 'Spring', price: '₱800', match: '82%' }
        ],
        'Chihuahua': [
            { name: 'Puppy Cut', description: 'Perfect for Chihuahuas - keeps them looking adorable with minimal fuss', popularity: '89%', season: 'Spring', price: '₱800', match: '95%' },
            { name: 'Teddy Bear Cut', description: 'Gives your Chihuahua a cute, cuddly appearance', popularity: '76%', season: 'Spring', price: '₱800', match: '88%' }
        ],
        'Bulldog': [
            { name: 'Sanitary Trim', description: 'Focuses on hygiene areas - important for Bulldogs', popularity: '92%', season: 'Spring', price: '₱800', match: '97%' },
            { name: 'Bath & Brush', description: 'Gentle care for sensitive Bulldog skin', popularity: '88%', season: 'Spring', price: '₱600', match: '91%' }
        ]
    }

    const services = [
        { id: 1, name: 'Full Grooming Package', description: 'Complete grooming with bath, haircut, nail trim, and ear cleaning', duration: '120 min', price: '₱1200' },
        { id: 2, name: 'Bath & Brush', description: 'Relaxing bath with premium shampoo and thorough brushing', duration: '60 min', price: '₱600' },
        { id: 3, name: 'Haircut Special', description: 'Professional haircut with breed-specific styling', duration: '90 min', price: '₱900' },
        { id: 4, name: 'Quick Trim', description: 'Fast maintenance service for nails, paws, and sanitary trimming', duration: '30 min', price: '₱400' },
        { id: 5, name: 'Teeth Cleaning', description: 'Professional dental cleaning and breath freshening', duration: '45 min', price: '₱500' },
        { id: 6, name: 'De-shedding Treatment', description: 'Special treatment to reduce shedding and promote healthy coat', duration: '75 min', price: '₱700' }
    ]

    const breeds = [
        'Labrador Retriever', 'Golden Retriever', 'German Shepherd', 'Bulldog',
        'Poodle', 'Beagle', 'Yorkshire Terrier', 'Dachshund',
        'Shih Tzu', 'Maltese', 'Chihuahua', 'Pomeranian', 'Other'
    ]

    // Get available time slots (9 AM to 5 PM, excluding booked times)
    const getTimeSlots = () => {
        const slots = []
        for (let hour = 9; hour < 17; hour++) {
            const time = hour.toString().padStart(2, '0') + ':00'
            // Simulate some booked slots
            const bookedTimes = ['12:00', '14:00', '16:00']
            if (!bookedTimes.includes(time)) {
                slots.push(time)
            }
        }
        return slots
    }

    // Get minimum date (today)
    const getMinDate = () => {
        const today = new Date()
        return today.toISOString().split('T')[0]
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleBreedChange = (e) => {
        const selectedBreed = e.target.value
        setFormData(prev => ({ ...prev, breed: selectedBreed, haircutStyle: null }))
    }

    const handleServiceSelect = (serviceId) => {
        setFormData(prev => ({ ...prev, service: serviceId }))
    }

    const handleHaircutSelect = (haircutName) => {
        setFormData(prev => ({ ...prev, haircutStyle: haircutName }))
    }

    const handleNextStep = () => {
        if (step < 3) setStep(step + 1)
    }

    const handlePrevStep = () => {
        if (step > 1) setStep(step - 1)
    }

    const handleSubmit = () => {
        console.log('Booking submitted:', formData)
        alert('Appointment booked successfully! You will receive a confirmation email shortly.')
        navigate('/')
    }

    const selectedService = services.find(s => s.id === formData.service)
    const breedRecommendationsList = breedRecommendations[formData.breed] || []

    return (
        <div className='min-h-screen bg-gradient-to-br from-white via-purple-50 to-white pt-32 pb-20 px-4'>
            <div className='max-w-4xl mx-auto'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex items-center gap-4 mb-8'
                >
                    <button
                        onClick={() => navigate('/')}
                        className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                    >
                        <ArrowLeft size={24} className='text-gray-700' />
                    </button>
                    <div>
                        <img src="/logo.png" alt="Timmy Tails" className="w-10 h-10 rounded-lg object-cover inline-block mr-3" />
                        <h1 className='text-3xl font-bold text-gray-900 inline-block'>Book Appointment</h1>
                    </div>
                </motion.div>

                {/* Progress Steps */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className='flex justify-center items-center gap-8 mb-12'
                >
                    {[1, 2, 3].map((stepNum) => (
                        <div key={stepNum} className='flex items-center gap-4'>
                            <motion.div
                                animate={{
                                    backgroundColor: step >= stepNum ? '#a855f7' : '#e5e7eb',
                                    color: step >= stepNum ? '#fff' : '#6b7280'
                                }}
                                className='w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg'
                            >
                                {stepNum}
                            </motion.div>
                            {stepNum < 3 && (
                                <div
                                    className={`h-1 w-20 ${step > stepNum ? 'bg-purple-600' : 'bg-gray-300'
                                        }`}
                                ></div>
                            )}
                        </div>
                    ))}
                </motion.div>

                <div className='flex justify-center gap-8 mb-4 text-sm font-medium'>
                    <span className={step === 1 ? 'text-purple-600' : 'text-gray-600'}>Pet & Service</span>
                    <span className={step === 2 ? 'text-purple-600' : 'text-gray-600'}>Date & Time</span>
                    <span className={step === 3 ? 'text-purple-600' : 'text-gray-600'}>Confirm</span>
                </div>

                {/* Step 1: Pet & Service */}
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'
                    >
                        <h2 className='text-2xl font-bold text-gray-900 mb-6'>Pet Information</h2>

                        <div className='grid md:grid-cols-2 gap-6 mb-8'>
                            <div>
                                <label className='block text-gray-700 font-bold mb-2'>Pet Name *</label>
                                <input
                                    type='text'
                                    name='petName'
                                    value={formData.petName}
                                    onChange={handleInputChange}
                                    placeholder='e.g., Max'
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700 font-bold mb-2'>Breed *</label>
                                <select
                                    name='breed'
                                    value={formData.breed}
                                    onChange={handleBreedChange}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                >
                                    <option value=''>Select breed</option>
                                    {breeds.map(breed => (
                                        <option key={breed} value={breed}>{breed}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* AI Recommendations */}
                        {formData.breed && breedRecommendationsList.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border border-purple-200'
                            >
                                <h3 className='text-lg font-bold text-gray-900 mb-2 flex items-center gap-2'>
                                    <Sparkles size={20} className='text-purple-600' />
                                    AI-Recommended Haircuts for {formData.breed}
                                </h3>
                                <p className='text-sm text-gray-600 mb-4'>Based on seasonal trends and breed analysis</p>

                                <div className='grid md:grid-cols-2 gap-4'>
                                    {breedRecommendationsList.map((rec, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -5 }}
                                            onClick={() => handleHaircutSelect(rec.name)}
                                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.haircutStyle === rec.name
                                                ? 'border-purple-600 bg-white'
                                                : 'border-gray-200 bg-white hover:border-purple-300'
                                                }`}
                                        >
                                            <div className='flex justify-between items-start mb-2'>
                                                <h4 className='font-bold text-gray-900'>{rec.name}</h4>
                                                <span className='bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full'>{rec.match} Match</span>
                                            </div>
                                            <p className='text-sm text-gray-600 mb-3'>{rec.description}</p>
                                            <div className='space-y-1 text-sm text-gray-600 mb-3'>
                                                <p><strong>Popularity:</strong> {rec.popularity}</p>
                                                <p><strong>Season:</strong> {rec.season}</p>
                                            </div>
                                            <p className='font-bold text-purple-600'>{rec.price}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        <h2 className='text-2xl font-bold text-gray-900 mb-6'>Select Service</h2>
                        <div className='grid md:grid-cols-2 gap-4 mb-8'>
                            {services.map(service => (
                                <motion.div
                                    key={service.id}
                                    onClick={() => handleServiceSelect(service.id)}
                                    whileHover={{ y: -5 }}
                                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${formData.service === service.id
                                        ? 'border-purple-600 bg-purple-50'
                                        : 'border-gray-200 bg-white hover:border-purple-300'
                                        }`}
                                >
                                    <h3 className='font-bold text-gray-900 mb-2'>{service.name}</h3>
                                    <p className='text-gray-600 text-sm mb-3'>{service.description}</p>
                                    <div className='flex justify-between items-center'>
                                        <span className='flex items-center gap-1 text-gray-600 text-sm'>
                                            <Clock size={16} /> {service.duration}
                                        </span>
                                        <span className='font-bold text-purple-600'>{service.price}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <button
                            onClick={handleNextStep}
                            disabled={!formData.petName || !formData.breed || !formData.service}
                            className='w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all'
                        >
                            Continue to Date & Time
                        </button>
                    </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'
                    >
                        <h2 className='text-2xl font-bold text-gray-900 mb-6'>Select Date & Time</h2>

                        <div className='mb-8'>
                            <label className='block text-gray-700 font-bold mb-2'>Preferred Date *</label>
                            <input
                                type='date'
                                name='date'
                                value={formData.date}
                                onChange={handleInputChange}
                                min={getMinDate()}
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                            />
                            <p className='text-xs text-gray-500 mt-1'>Select a date from today onwards</p>
                        </div>

                        <div className='mb-8'>
                            <label className='block text-gray-700 font-bold mb-3'>Available Time Slots *</label>
                            <div className='grid grid-cols-3 md:grid-cols-5 gap-3'>
                                {getTimeSlots().map(time => (
                                    <motion.button
                                        key={time}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setFormData(prev => ({ ...prev, time }))}
                                        className={`py-2 px-3 rounded-lg font-bold transition-all ${formData.time === time
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {time}
                                    </motion.button>
                                ))}
                            </div>
                            <p className='text-xs text-gray-500 mt-2'>Grayed out times are unavailable</p>
                        </div>

                        {selectedService && (
                            <div className='bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8'>
                                <p className='text-gray-700 mb-2'>
                                    <strong>Service:</strong> {selectedService.name}
                                </p>
                                <p className='text-gray-700 mb-2'>
                                    <strong>Duration:</strong> {selectedService.duration}
                                </p>
                                <p className='text-gray-700'>
                                    <strong>Price:</strong> {selectedService.price}
                                </p>
                            </div>
                        )}

                        <div className='flex gap-4'>
                            <button
                                onClick={handlePrevStep}
                                className='flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all'
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNextStep}
                                disabled={!formData.date || !formData.time}
                                className='flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all'
                            >
                                Continue to Confirm
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'
                    >
                        <h2 className='text-2xl font-bold text-gray-900 mb-6'>Confirm & Complete Booking</h2>

                        <div className='grid md:grid-cols-2 gap-6 mb-8'>
                            <div>
                                <label className='block text-gray-700 font-bold mb-2'>Your Name *</label>
                                <input
                                    type='text'
                                    name='ownerName'
                                    value={formData.ownerName}
                                    onChange={handleInputChange}
                                    placeholder='Your full name'
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700 font-bold mb-2'>Email *</label>
                                <input
                                    type='email'
                                    name='ownerEmail'
                                    value={formData.ownerEmail}
                                    onChange={handleInputChange}
                                    placeholder='your@email.com'
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                />
                            </div>
                        </div>

                        <div className='mb-8'>
                            <label className='block text-gray-700 font-bold mb-2'>Phone Number *</label>
                            <input
                                type='tel'
                                name='ownerPhone'
                                value={formData.ownerPhone}
                                onChange={handleInputChange}
                                placeholder='+63 (9) 123-4567'
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                            />
                        </div>

                        {/* Booking Summary */}
                        <div className='bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200'>
                            <h3 className='font-bold text-gray-900 mb-4 text-lg'>Booking Summary</h3>
                            <div className='space-y-3 text-gray-700'>
                                <p><strong>Pet Name:</strong> {formData.petName}</p>
                                <p><strong>Breed:</strong> {formData.breed}</p>
                                {formData.haircutStyle && <p><strong>Haircut Style:</strong> {formData.haircutStyle}</p>}
                                <p><strong>Service:</strong> {selectedService?.name}</p>
                                <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}</p>
                                <p><strong>Time:</strong> {formData.time}</p>
                                <p className='text-lg font-bold text-purple-600 pt-4 border-t border-gray-300'>
                                    Total: {selectedService?.price}
                                </p>
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <button
                                onClick={handlePrevStep}
                                className='flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all'
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!formData.ownerName || !formData.ownerEmail || !formData.ownerPhone}
                                className='flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/50 transition-all'
                            >
                                Complete Booking
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
