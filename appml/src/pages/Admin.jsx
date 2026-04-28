import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LogOut, BarChart3, Calendar, TrendingUp, Users, DollarSign, CheckCircle, Clock, Loader2, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { adminApi, getErrorMessage } from '../utils/api'
import { useAuth } from '../context/AuthContext'

const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700'
}

const formatTime = (time) => {
    if (!time) return ''
    const [h, m] = time.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    const hour = h % 12 || 12
    return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-PH', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}

export default function Admin() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const [activeTab, setActiveTab] = useState('overview')
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState(null)
    const [appointments, setAppointments] = useState([])
    const [analytics, setAnalytics] = useState(null)
    const [statusFilter, setStatusFilter] = useState('')
    const [updatingId, setUpdatingId] = useState(null)

    useEffect(() => {
        if (!user) { navigate('/login'); return }
        if (user.role !== 'admin') { toast.error('Admin access required'); navigate('/'); return }
    }, [user, navigate])

    const fetchStats = async () => {
        try {
            const { data } = await adminApi.getStats()
            setStats(data.stats)
        } catch (e) {
            toast.error(getErrorMessage(e))
        }
    }

    const fetchAppointments = async () => {
        try {
            const params = statusFilter ? { status: statusFilter } : {}
            const { data } = await adminApi.getAppointments(params)
            setAppointments(data.appointments || [])
        } catch (e) {
            toast.error(getErrorMessage(e))
        }
    }

    const fetchAnalytics = async () => {
        try {
            const { data } = await adminApi.getAnalytics()
            setAnalytics(data.analytics)
        } catch (e) {
            toast.error(getErrorMessage(e))
        }
    }

    const loadAll = async () => {
        setLoading(true)
        await Promise.all([fetchStats(), fetchAppointments(), fetchAnalytics()])
        setLoading(false)
    }

    useEffect(() => { if (user?.role === 'admin') loadAll() }, [user])
    useEffect(() => { if (user?.role === 'admin') fetchAppointments() }, [statusFilter])

    const handleStatusUpdate = async (id, newStatus) => {
        setUpdatingId(id)
        try {
            await adminApi.updateStatus(id, newStatus)
            toast.success(`Appointment marked as ${newStatus}`)
            fetchAppointments()
            fetchStats()
        } catch (e) {
            toast.error(getErrorMessage(e))
        } finally {
            setUpdatingId(null)
        }
    }

    const handleLogout = () => {
        logout()
        toast.success('Logged out')
        navigate('/')
    }

    const StatCard = ({ icon: Icon, label, value, change, color }) => (
        <motion.div whileHover={{ y: -5 }} className='bg-white rounded-xl p-6 shadow-md border border-gray-100'>
            <div className='flex items-center justify-between mb-4'>
                <div className={`p-3 rounded-lg ${color}`}><Icon size={24} className='text-white' /></div>
            </div>
            <h3 className='text-gray-600 text-sm font-medium mb-1'>{label}</h3>
            <p className='text-3xl font-bold text-gray-900 mb-2'>{value ?? '—'}</p>
            {change && <p className='text-green-600 text-sm font-medium'>{change}</p>}
        </motion.div>
    )

    if (loading) {
        return (
            <div className='min-h-screen bg-gray-50 pt-20 flex items-center justify-center'>
                <div className='text-center'>
                    <Loader2 className='animate-spin text-purple-600 mx-auto mb-4' size={40} />
                    <p className='text-gray-600 font-medium'>Loading admin dashboard...</p>
                </div>
            </div>
        )
    }

    const maxRevenue = analytics?.monthlyData?.length
        ? Math.max(...analytics.monthlyData.map(d => d.revenue), 1)
        : 1

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <div className='bg-white border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 py-6 flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center'>
                            <span className='text-white font-bold text-lg'>TT</span>
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold text-gray-900'>Timmy Tails Admin</h1>
                            <p className='text-sm text-gray-500'>Welcome, {user?.firstName}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <motion.button whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}
                            onClick={loadAll} className='p-2 rounded-lg hover:bg-gray-100 transition-colors' title='Refresh'>
                            <RefreshCw size={20} className='text-gray-600' />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} onClick={handleLogout}
                            className='flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all'>
                            <LogOut size={20} /> Logout
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className='max-w-7xl mx-auto px-4 border-b border-gray-200 bg-white'>
                <div className='flex gap-2 overflow-x-auto'>
                    {[
                        { id: 'overview', label: 'Overview', icon: BarChart3 },
                        { id: 'appointments', label: 'Appointments', icon: Calendar },
                        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                        { id: 'ml-trends', label: 'ML Trends', icon: TrendingUp }
                    ].map(tab => {
                        const Icon = tab.icon
                        return (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-5 font-medium flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${activeTab === tab.id ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
                                <Icon size={18} /> {tab.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Content */}
            <div className='max-w-7xl mx-auto px-4 py-8'>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            <StatCard icon={Calendar} label="Today's Appointments" value={stats?.todayAppointments ?? 0} color='bg-blue-500' />
                            <StatCard icon={DollarSign} label='Monthly Revenue' value={stats?.monthlyRevenue} color='bg-green-500' />
                            <StatCard icon={Users} label='Total Customers' value={stats?.totalCustomers ?? 0} color='bg-purple-500' />
                            <StatCard icon={CheckCircle} label='Confirmed' value={stats?.confirmedBookings ?? 0} change={`${stats?.pendingAppointments ?? 0} pending`} color='bg-orange-500' />
                        </div>

                        {/* Revenue Chart */}
                        {analytics?.monthlyData?.length > 0 && (
                            <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                                <h2 className='text-xl font-bold text-gray-900 mb-6'>Monthly Revenue</h2>
                                <div className='h-64 flex items-end gap-4 justify-between'>
                                    {analytics.monthlyData.map((d, idx) => (
                                        <div key={idx} className='flex-1 flex flex-col items-center gap-2'>
                                            <span className='text-xs text-gray-500 font-medium'>₱{(d.revenue / 1000).toFixed(0)}K</span>
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(d.revenue / maxRevenue) * 200}px` }}
                                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                                className='w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg min-h-1'
                                            />
                                            <span className='text-xs font-bold text-gray-600'>{d.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All appointments */}
                        <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                            <h2 className='text-xl font-bold text-gray-900 mb-6'>All Appointments</h2>
                            {appointments.length > 0 ? (
                                <div className='space-y-3'>
                                    {appointments.map((a, idx) => (
                                        <motion.div key={idx} whileHover={{ x: 5 }}
                                            className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200'>
                                            <Clock size={20} className='text-purple-600 flex-shrink-0' />
                                            <div className='flex-1'>
                                                <p className='font-bold text-gray-900'>{formatTime(a.time)} — {a.ownerName}</p>
                                                <p className='text-sm text-gray-600'>{a.petName} ({a.breed}) · {a.service}</p>
                                                <p className='text-xs text-gray-400 mt-0.5'>{formatDate(a.date)}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[a.status] || 'bg-gray-100 text-gray-600'}`}>{a.status}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-gray-500 text-center py-8'>No appointments found.</p>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-4'>
                        {/* Filter */}
                        <div className='flex items-center gap-3 flex-wrap'>
                            <span className='text-gray-600 font-medium text-sm'>Filter by status:</span>
                            {['', 'pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                                <button key={s} onClick={() => setStatusFilter(s)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${statusFilter === s ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-300 hover:border-purple-400'}`}>
                                    {s || 'All'}
                                </button>
                            ))}
                        </div>

                        <div className='bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden'>
                            <div className='p-6'>
                                <h2 className='text-xl font-bold text-gray-900 mb-4'>
                                    {appointments.length} Appointment{appointments.length !== 1 ? 's' : ''}
                                </h2>
                                {appointments.length === 0 ? (
                                    <p className='text-gray-500 text-center py-12'>No appointments found.</p>
                                ) : (
                                    <div className='overflow-x-auto'>
                                        <table className='w-full text-sm'>
                                            <thead className='bg-gray-50 border-b border-gray-200'>
                                                <tr>
                                                    {['Owner', 'Pet', 'Service', 'Date', 'Time', 'Price', 'Status', 'Actions'].map(h => (
                                                        <th key={h} className='px-4 py-3 text-left font-bold text-gray-700'>{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className='divide-y divide-gray-100'>
                                                {appointments.map((a) => (
                                                    <tr key={a._id} className='hover:bg-gray-50 transition-colors'>
                                                        <td className='px-4 py-3 font-medium text-gray-900'>{a.ownerName}</td>
                                                        <td className='px-4 py-3 text-gray-600'>{a.petName} ({a.breed})</td>
                                                        <td className='px-4 py-3 text-gray-600'>{a.service}</td>
                                                        <td className='px-4 py-3 text-gray-600'>{formatDate(a.date)}</td>
                                                        <td className='px-4 py-3 text-gray-600'>{formatTime(a.time)}</td>
                                                        <td className='px-4 py-3 font-bold text-gray-900'>₱{a.price?.toLocaleString()}</td>
                                                        <td className='px-4 py-3'>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[a.status] || 'bg-gray-100 text-gray-600'}`}>{a.status}</span>
                                                        </td>
                                                        <td className='px-4 py-3'>
                                                            {updatingId === a._id ? (
                                                                <Loader2 className='animate-spin text-purple-600' size={16} />
                                                            ) : (
                                                                <select
                                                                    value={a.status}
                                                                    onChange={(e) => handleStatusUpdate(a._id, e.target.value)}
                                                                    className='text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-purple-500'
                                                                >
                                                                    {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                                                                        <option key={s} value={s}>{s}</option>
                                                                    ))}
                                                                </select>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && analytics && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            {/* Service Distribution */}
                            <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                                <h3 className='text-lg font-bold text-gray-900 mb-6'>Service Distribution</h3>
                                {analytics.serviceDistribution.length > 0 ? (
                                    <div className='space-y-4'>
                                        {analytics.serviceDistribution.map((s, idx) => (
                                            <div key={idx}>
                                                <div className='flex justify-between mb-1'>
                                                    <span className='text-sm text-gray-700 font-medium'>{s.name}</span>
                                                    <span className='text-sm font-bold text-gray-900'>{s.percentage}%</span>
                                                </div>
                                                <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
                                                    <motion.div initial={{ width: 0 }} animate={{ width: `${s.percentage}%` }}
                                                        transition={{ delay: idx * 0.1 }} className='h-full bg-gradient-to-r from-purple-600 to-purple-400' />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : <p className='text-gray-500 text-sm'>No data yet.</p>}
                            </div>

                            {/* Monthly data bar */}
                            <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                                <h3 className='text-lg font-bold text-gray-900 mb-6'>Appointments per Month</h3>
                                {analytics.monthlyData.length > 0 ? (
                                    <div className='h-56 flex items-end gap-3 justify-between'>
                                        {analytics.monthlyData.map((d, idx) => {
                                            const maxApts = Math.max(...analytics.monthlyData.map(x => x.appointments), 1)
                                            return (
                                                <div key={idx} className='flex-1 flex flex-col items-center gap-1'>
                                                    <span className='text-xs text-gray-500'>{d.appointments}</span>
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${(d.appointments / maxApts) * 160}px` }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className='w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg min-h-1'
                                                    />
                                                    <span className='text-xs font-bold text-gray-600'>{d.month}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : <p className='text-gray-500 text-sm'>No data yet.</p>}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ML Trends Tab */}
                {activeTab === 'ml-trends' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-8'>
                        <div className='bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl p-8 text-white shadow-lg'>
                            <h2 className='text-2xl font-bold mb-2'>AI-Powered Trend Analysis</h2>
                            <p className='text-purple-100'>Machine learning predictions for trending haircuts by breed and season</p>
                        </div>

                        <div className='bg-white rounded-xl p-8 shadow-md border border-gray-100'>
                            <h3 className='text-xl font-bold text-gray-900 mb-6'>Trending Haircuts by Breed</h3>
                            {analytics?.trendingData?.length > 0 ? (
                                <div className='overflow-x-auto'>
                                    <table className='w-full text-sm'>
                                        <thead className='bg-gray-50 border-b border-gray-200'>
                                            <tr>
                                                {['Breed', 'Top Haircut', 'Trend Score', 'Total Bookings'].map(h => (
                                                    <th key={h} className='px-6 py-3 text-left font-bold text-gray-700'>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y divide-gray-200'>
                                            {analytics.trendingData.map((t, idx) => (
                                                <motion.tr key={idx} whileHover={{ backgroundColor: '#f9fafb' }}>
                                                    <td className='px-6 py-4 font-medium text-gray-900'>{t.breed}</td>
                                                    <td className='px-6 py-4'>
                                                        <span className='px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold'>{t.haircut}</span>
                                                    </td>
                                                    <td className='px-6 py-4'>
                                                        <div className='flex items-center gap-2'>
                                                            <div className='w-24 h-2 bg-gray-200 rounded-full overflow-hidden'>
                                                                <div className='h-full bg-gradient-to-r from-purple-600 to-purple-400' style={{ width: `${t.trend}%` }} />
                                                            </div>
                                                            <span className='font-bold text-gray-900'>{t.trend}%</span>
                                                        </div>
                                                    </td>
                                                    <td className='px-6 py-4 font-bold text-purple-600'>{t.bookings}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className='text-center py-12'>
                                    <p className='text-gray-500'>No booking data yet. Trends will appear once appointments are made.</p>
                                </div>
                            )}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            {[
                                {
                                    className: 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200',
                                    title: 'Seasonal Analysis',
                                    body: 'Current season: Spring',
                                    sub: 'Popular: Puppy Cut, Summer Cut'
                                },
                                {
                                    className: 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200',
                                    title: 'Breed Preferences',
                                    body: 'Top breeds by bookings',
                                    sub: 'Full data available after first bookings'
                                },
                                {
                                    className: 'bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200',
                                    title: 'ML Service Status',
                                    body: 'Model: Active',
                                    sub: 'Serving breed + season predictions'
                                }
                            ].map(({ className, title, body, sub }) => (
                                <div key={title} className={`${className} rounded-xl p-6`}>
                                    <h4 className='font-bold text-gray-900 mb-2'>{title}</h4>
                                    <p className='text-sm text-gray-700 mb-2'>{body}</p>
                                    <p className='text-xs text-gray-600'>{sub}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
