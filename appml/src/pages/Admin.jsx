import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LogOut, BarChart3, Calendar, TrendingUp, Users, DollarSign, CheckCircle, Clock } from 'lucide-react'

export default function Admin() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('overview')

    // Mock data
    const statsData = {
        todayAppointments: 2,
        monthlyRevenue: '₱3,800',
        totalCustomers: 156,
        confirmedBookings: 4,
        revenueGrowth: '+12% from last month',
        pendingAppointments: 4
    }

    const monthlyData = [
        { month: 'Oct', revenue: 45000, appointments: 38 },
        { month: 'Nov', revenue: 52000, appointments: 45 },
        { month: 'Dec', revenue: 60000, appointments: 52 },
        { month: 'Jan', revenue: 50000, appointments: 42 },
        { month: 'Feb', revenue: 57000, appointments: 48 },
        { month: 'Mar', revenue: 65000, appointments: 55 }
    ]

    const appointmentsData = [
        { id: 1, customer: 'John Doe', pet: 'Max (Golden Retriever)', service: 'Full Grooming Package', date: '2026-03-25', time: '10:00 AM', price: '₱1200', status: 'confirmed' },
        { id: 2, customer: 'Jane Smith', pet: 'Bella (Poodle)', service: 'Haircut Special', date: '2026-03-25', time: '02:00 PM', price: '₱800', status: 'confirmed' },
        { id: 3, customer: 'Mike Johnson', pet: 'Charlie (Shih Tzu)', service: 'Bath & Brush', date: '2026-03-26', time: '11:00 AM', price: '₱600', status: 'confirmed' },
        { id: 4, customer: 'Sarah Lee', pet: 'Lucy (Pomeranian)', service: 'Full Grooming Package', date: '2026-03-26', time: '03:00 PM', price: '₱1200', status: 'confirmed' }
    ]

    const trendingData = [
        { breed: 'Shih Tzu', haircut: 'Puppy Cut', trend: 93, bookings: 58 },
        { breed: 'Golden Retriever', haircut: 'Feathered Trim', trend: 91, bookings: 48 },
        { breed: 'Poodle', haircut: 'Puppy Cut', trend: 92, bookings: 64 },
        { breed: 'Pomeranian', haircut: 'Teddy Bear Cut', trend: 91, bookings: 35 },
        { breed: 'Maltese', haircut: 'Puppy Cut', trend: 94, bookings: 46 }
    ]

    const analyticsData = {
        serviceDistribution: [
            { name: 'Full Grooming', percentage: 35 },
            { name: 'Haircut Special', percentage: 20 },
            { name: 'Bath & Brush', percentage: 22 },
            { name: 'Nail Trim', percentage: 10 },
            { name: 'Other', percentage: 13 }
        ],
        dayOfWeek: [
            { day: 'Mon', volume: 12 },
            { day: 'Tue', volume: 15 },
            { day: 'Wed', volume: 18 },
            { day: 'Thu', volume: 14 },
            { day: 'Fri', volume: 20 },
            { day: 'Sat', volume: 25 },
            { day: 'Sun', volume: 8 }
        ],
        popularServices: [
            { service: 'Full Grooming + Teddy Bear Cut', bookings: 156, revenue: '₱124,800' },
            { service: 'Bath & Brush', bookings: 203, revenue: '₱121,800' },
            { service: 'Puppy Cut Package', bookings: 142, revenue: '₱113,600' },
            { service: 'Nail Trim & Paw Care', bookings: 187, revenue: '₱56,100' },
            { service: 'Lion Cut Special', bookings: 98, revenue: '₱137,200' }
        ]
    }

    const todaySchedule = [
        { time: '10:00 AM', customer: 'John Doe', pet: 'Max (Golden Retriever)', service: 'Full Grooming Package', status: 'confirmed' },
        { time: '02:00 PM', customer: 'Jane Smith', pet: 'Bella (Poodle)', service: 'Haircut Special', status: 'confirmed' }
    ]

    const StatCard = ({ icon: Icon, label, value, change, color }) => (
        <motion.div
            whileHover={{ y: -5 }}
            className='bg-white rounded-xl p-6 shadow-md border border-gray-100'
        >
            <div className='flex items-center justify-between mb-4'>
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon size={24} className='text-white' />
                </div>
            </div>
            <h3 className='text-gray-600 text-sm font-medium mb-1'>{label}</h3>
            <p className='text-3xl font-bold text-gray-900 mb-2'>{value}</p>
            {change && <p className='text-green-600 text-sm font-medium'>{change}</p>}
        </motion.div>
    )

    return (
        <div className='min-h-screen bg-gray-50 pt-20'>
            {/* Header */}
            <div className='bg-white border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 py-6 flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center'>
                            <span className='text-white font-bold'>TT</span>
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-900'>Timmy Tails Admin</h1>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <span className='text-gray-600 font-medium'>Admin</span>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate('/login')}
                            className='flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all'
                        >
                            <LogOut size={20} />
                            Logout
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className='max-w-7xl mx-auto px-4 border-b border-gray-200 bg-white'>
                <div className='flex gap-8'>
                    {[
                        { id: 'overview', label: 'Overview', icon: BarChart3 },
                        { id: 'appointments', label: 'Appointments', icon: Calendar },
                        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                        { id: 'ml-trends', label: 'ML Trends', icon: TrendingUp }
                    ].map(tab => {
                        const Icon = tab.icon
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-6 font-medium flex items-center gap-2 border-b-2 transition-all ${activeTab === tab.id
                                        ? 'border-purple-600 text-purple-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Icon size={20} />
                                {tab.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Content */}
            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='space-y-8'
                    >
                        {/* Stats Cards */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            <StatCard
                                icon={Calendar}
                                label="Today's Appointments"
                                value={statsData.todayAppointments}
                                change="Confirmed bookings"
                                color='bg-blue-500'
                            />
                            <StatCard
                                icon={DollarSign}
                                label="Monthly Revenue"
                                value={statsData.monthlyRevenue}
                                change={statsData.revenueGrowth}
                                color='bg-green-500'
                            />
                            <StatCard
                                icon={Users}
                                label="Total Customers"
                                value={statsData.totalCustomers}
                                change="Active this month"
                                color='bg-purple-500'
                            />
                            <StatCard
                                icon={CheckCircle}
                                label="Confirmed"
                                value={statsData.confirmedBookings}
                                change="Pending appointments"
                                color='bg-orange-500'
                            />
                        </div>

                        {/* Charts */}
                        <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                            <h2 className='text-xl font-bold text-gray-900 mb-6'>Monthly Revenue & Appointments</h2>
                            <div className='h-80 flex items-end gap-8 justify-between'>
                                {monthlyData.map((data, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ height: 0 }}
                                        animate={{ height: data.revenue / 1000 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className='flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg relative group'
                                    >
                                        <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-gray-600'>
                                            {data.month}
                                        </div>
                                        <div className='opacity-0 group-hover:opacity-100 absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity'>
                                            ₱{(data.revenue / 1000).toFixed(0)}K
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className='flex justify-center gap-8 mt-12 text-sm font-medium'>
                                <div className='flex items-center gap-2'>
                                    <div className='w-3 h-3 rounded-full bg-purple-600'></div>
                                    <span>Revenue (₱)</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='w-3 h-3 rounded-full bg-blue-600'></div>
                                    <span>Appointments</span>
                                </div>
                            </div>
                        </div>

                        {/* Today's Schedule */}
                        <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                            <h2 className='text-xl font-bold text-gray-900 mb-6'>Today's Schedule</h2>
                            <div className='space-y-4'>
                                {todaySchedule.map((schedule, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 5 }}
                                        className='flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200'
                                    >
                                        <Clock size={20} className='text-purple-600 mt-1' />
                                        <div className='flex-1'>
                                            <p className='font-bold text-gray-900'>{schedule.time} - {schedule.customer}</p>
                                            <p className='text-sm text-gray-600'>{schedule.pet} • {schedule.service}</p>
                                        </div>
                                        <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold'>
                                            {schedule.status}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden'
                    >
                        <div className='p-8'>
                            <h2 className='text-2xl font-bold text-gray-900 mb-6'>All Appointments</h2>
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead className='bg-gray-50 border-b border-gray-200'>
                                        <tr>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Customer</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Pet</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Service</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Date</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Time</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Price</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200'>
                                        {appointmentsData.map((apt, idx) => (
                                            <motion.tr
                                                key={idx}
                                                whileHover={{ backgroundColor: '#f9fafb' }}
                                                className='transition-colors'
                                            >
                                                <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{apt.customer}</td>
                                                <td className='px-6 py-4 text-sm text-gray-600'>{apt.pet}</td>
                                                <td className='px-6 py-4 text-sm text-gray-600'>{apt.service}</td>
                                                <td className='px-6 py-4 text-sm text-gray-600'>{apt.date}</td>
                                                <td className='px-6 py-4 text-sm text-gray-600'>{apt.time}</td>
                                                <td className='px-6 py-4 text-sm font-bold text-gray-900'>{apt.price}</td>
                                                <td className='px-6 py-4'>
                                                    <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold'>
                                                        {apt.status}
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='space-y-8'
                    >
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            {/* Service Distribution */}
                            <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                                <h3 className='text-lg font-bold text-gray-900 mb-6'>Service Distribution</h3>
                                <div className='space-y-4'>
                                    {analyticsData.serviceDistribution.map((service, idx) => (
                                        <div key={idx}>
                                            <div className='flex justify-between mb-2'>
                                                <span className='text-sm font-medium text-gray-700'>{service.name}</span>
                                                <span className='text-sm font-bold text-gray-900'>{service.percentage}%</span>
                                            </div>
                                            <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${service.percentage}%` }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className='h-full bg-gradient-to-r from-purple-600 to-purple-400'
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Customer Volume by Day */}
                            <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                                <h3 className='text-lg font-bold text-gray-900 mb-6'>Customer Volume by Day</h3>
                                <div className='h-64 flex items-end gap-3 justify-between'>
                                    {analyticsData.dayOfWeek.map((data, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ height: 0 }}
                                            animate={{ height: (data.volume / 25) * 100 + '%' }}
                                            transition={{ delay: idx * 0.1 }}
                                            className='flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg relative group'
                                        >
                                            <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600'>
                                                {data.day}
                                            </div>
                                            <div className='opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap transition-opacity'>
                                                {data.volume}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Popular Services */}
                        <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                            <h3 className='text-lg font-bold text-gray-900 mb-6'>Popular Services</h3>
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead className='bg-gray-50 border-b border-gray-200'>
                                        <tr>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Service</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Bookings</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200'>
                                        {analyticsData.popularServices.map((service, idx) => (
                                            <tr key={idx} className='hover:bg-gray-50 transition-colors'>
                                                <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{service.service}</td>
                                                <td className='px-6 py-4 text-sm text-gray-600'>{service.bookings}</td>
                                                <td className='px-6 py-4 text-sm font-bold text-green-600'>{service.revenue}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ML Trends Tab */}
                {activeTab === 'ml-trends' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className='space-y-8'
                    >
                        <div className='bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-8 text-white shadow-lg'>
                            <h2 className='text-2xl font-bold mb-2'>AI-Powered Trend Analysis</h2>
                            <p className='text-purple-100'>Machine learning predictions for trending haircuts by breed and season</p>
                        </div>

                        {/* Trending Haircuts */}
                        <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                            <h3 className='text-xl font-bold text-gray-900 mb-6'>Trending Haircuts by Breed</h3>
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead className='bg-gray-50 border-b border-gray-200'>
                                        <tr>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Breed</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Top Haircut</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Trend Score</th>
                                            <th className='px-6 py-3 text-left text-sm font-bold text-gray-900'>Projected Bookings</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200'>
                                        {trendingData.map((trend, idx) => (
                                            <motion.tr
                                                key={idx}
                                                whileHover={{ backgroundColor: '#f9fafb' }}
                                                className='transition-colors'
                                            >
                                                <td className='px-6 py-4 text-sm text-gray-900 font-medium'>{trend.breed}</td>
                                                <td className='px-6 py-4 text-sm text-gray-600'>
                                                    <span className='px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold'>
                                                        {trend.haircut}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <div className='w-24'>
                                                        <div className='flex items-center gap-2'>
                                                            <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                                                                <div
                                                                    className='h-full bg-gradient-to-r from-purple-600 to-purple-400'
                                                                    style={{ width: `${trend.trend}%` }}
                                                                />
                                                            </div>
                                                            <span className='text-sm font-bold text-gray-900'>{trend.trend}%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='px-6 py-4 text-sm font-bold text-purple-600'>{trend.bookings}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ML Insights */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200'>
                                <h4 className='font-bold text-gray-900 mb-2'>Seasonal Analysis</h4>
                                <p className='text-sm text-gray-700 mb-3'>Current season: <strong>Spring</strong></p>
                                <p className='text-xs text-gray-600'>Popular cuts: Puppy Cut, Teddy Bear Cut</p>
                            </div>
                            <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200'>
                                <h4 className='font-bold text-gray-900 mb-2'>Breed Preferences</h4>
                                <p className='text-sm text-gray-700 mb-3'>Top 3: Shih Tzu, Poodle, Golden Retriever</p>
                                <p className='text-xs text-gray-600'>Most booked service: Full Grooming</p>
                            </div>
                            <div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200'>
                                <h4 className='font-bold text-gray-900 mb-2'>Prediction Accuracy</h4>
                                <p className='text-sm text-gray-700 mb-3'>Model accuracy: <strong>92%</strong></p>
                                <p className='text-xs text-gray-600'>Confidence level: High</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}