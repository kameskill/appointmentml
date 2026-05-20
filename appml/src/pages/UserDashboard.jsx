import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Bell, Calendar, CheckCircle2, Clock, Loader2, Lock, LogOut, Settings, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { appointmentsApi, notificationsApi, getErrorMessage } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { formatTime } from '../utils/formatters'

const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700'
}

const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-PH', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
}

export default function UserDashboard() {
    const navigate = useNavigate()
    const { user, logout, sendPasswordOtp, resetPasswordWithOtp } = useAuth()
    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState([])
    const [notifications, setNotifications] = useState([])
    const [activeTab, setActiveTab] = useState('home')
    const [submitting, setSubmitting] = useState(false)
    const [passwordForm, setPasswordForm] = useState({
        phone: '',
        otp: '',
        newPassword: ''
    })

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true })
            return
        }
        if (user.role === 'admin') {
            navigate('/admin', { replace: true })
            return
        }

        setPasswordForm(prev => ({ ...prev, phone: user.phone || '' }))
        loadData()
    }, [user, navigate])

    const loadData = async () => {
        setLoading(true)
        try {
            const [appointmentRes, notificationRes] = await Promise.all([
                appointmentsApi.getMy(),
                notificationsApi.getMine()
            ])
            setAppointments(appointmentRes.data.appointments || [])
            setNotifications(notificationRes.data.notifications || [])
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }

    const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications])

    const handleMarkRead = async (id) => {
        try {
            await notificationsApi.markAsRead(id)
            setNotifications(prev => prev.map(n => (n._id === id ? { ...n, isRead: true } : n)))
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    const handleCancelAppointment = async (id) => {
        try {
            await appointmentsApi.cancel(id)
            toast.success('Appointment cancelled')
            loadData()
        } catch (error) {
            toast.error(getErrorMessage(error))
        }
    }

    const handleSendOtp = async () => {
        if (!passwordForm.phone.trim()) {
            toast.error('Phone number is required')
            return
        }

        setSubmitting(true)
        try {
            await sendPasswordOtp(passwordForm.phone)
            toast.success('OTP sent to your mobile number')
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setSubmitting(false)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()

        if (!passwordForm.otp || passwordForm.otp.length !== 6) {
            toast.error('Enter a valid 6-digit OTP')
            return
        }
        if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setSubmitting(true)
        try {
            await resetPasswordWithOtp({
                phone: passwordForm.phone,
                otp: passwordForm.otp,
                newPassword: passwordForm.newPassword
            })
            toast.success('Password changed successfully')
            setPasswordForm(prev => ({ ...prev, otp: '', newPassword: '' }))
        } catch (error) {
            toast.error(getErrorMessage(error))
        } finally {
            setSubmitting(false)
        }
    }

    const handleLogout = () => {
        logout()
        toast.success('Logged out')
        navigate('/')
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-gray-50 pt-20 flex items-center justify-center'>
                <div className='text-center'>
                    <Loader2 className='animate-spin text-purple-600 mx-auto mb-4' size={40} />
                    <p className='text-gray-600 font-medium'>Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='bg-white border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 py-6 flex justify-between items-center'>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-900'>Welcome, {user?.firstName}</h1>
                        <p className='text-sm text-gray-500'>Your Timmy Tails home</p>
                    </div>
                    <button onClick={handleLogout}
                        className='flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all'>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 border-b border-gray-200 bg-white'>
                <div className='flex gap-2 overflow-x-auto'>
                    {[
                        { id: 'home', label: 'Home', icon: Calendar },
                        { id: 'notifications', label: `Notifications (${unreadCount})`, icon: Bell },
                        { id: 'settings', label: 'Settings', icon: Settings }
                    ].map(tab => {
                        const Icon = tab.icon
                        return (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-5 font-medium flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${activeTab === tab.id ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}>
                                <Icon size={17} /> {tab.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 py-8'>
                {activeTab === 'home' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-6'>
                        <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100'>
                            <h2 className='text-xl font-bold text-gray-900 mb-2'>Quick actions</h2>
                            <div className='flex flex-wrap gap-3'>
                                <button onClick={() => navigate('/booking')}
                                    className='bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold'>
                                    Book Appointment
                                </button>
                                <button onClick={() => setActiveTab('notifications')}
                                    className='border border-purple-300 text-purple-700 px-4 py-2 rounded-lg font-semibold'>
                                    View Notifications
                                </button>
                                <button onClick={() => setActiveTab('settings')}
                                    className='border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold'>
                                    Account Settings
                                </button>
                            </div>
                        </div>

                        <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100'>
                            <h2 className='text-xl font-bold text-gray-900 mb-4'>My Appointments</h2>
                            {appointments.length === 0 ? (
                                <p className='text-gray-500'>No appointments yet.</p>
                            ) : (
                                <div className='space-y-3'>
                                    {appointments.map((a) => (
                                        <div key={a._id} className='p-4 bg-gray-50 rounded-lg border border-gray-200'>
                                            <div className='flex justify-between items-start gap-4'>
                                                <div>
                                                    <p className='font-bold text-gray-900'>{a.petName} ({a.breed})</p>
                                                    <p className='text-sm text-gray-600'>{a.service}</p>
                                                    <p className='text-xs text-gray-500 mt-1 flex items-center gap-1'>
                                                        <Clock size={12} /> {formatDate(a.date)} · {formatTime(a.time)}
                                                    </p>
                                                </div>
                                                <div className='text-right'>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[a.status] || 'bg-gray-100 text-gray-600'}`}>
                                                        {a.status}
                                                    </span>
                                                    {a.status !== 'cancelled' && a.status !== 'completed' && (
                                                        <button onClick={() => handleCancelAppointment(a._id)} className='block mt-2 text-xs text-red-600 font-semibold'>
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'notifications' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='bg-white rounded-xl p-6 shadow-md border border-gray-100'>
                        <h2 className='text-xl font-bold text-gray-900 mb-4'>Notifications</h2>
                        {notifications.length === 0 ? (
                            <p className='text-gray-500'>No notifications yet.</p>
                        ) : (
                            <div className='space-y-3'>
                                {notifications.map((n) => (
                                    <div key={n._id} className={`p-4 rounded-lg border ${n.isRead ? 'bg-white border-gray-200' : 'bg-purple-50 border-purple-200'}`}>
                                        <div className='flex justify-between items-start gap-3'>
                                            <div>
                                                <p className='font-bold text-gray-900'>{n.title}</p>
                                                <p className='text-sm text-gray-700 mt-1'>{n.message}</p>
                                                <p className='text-xs text-gray-500 mt-2'>{new Date(n.createdAt).toLocaleString('en-PH')}</p>
                                            </div>
                                            {!n.isRead && (
                                                <button onClick={() => handleMarkRead(n._id)} className='text-xs text-purple-700 font-semibold'>
                                                    Mark read
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {activeTab === 'settings' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='space-y-6'>
                        <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100'>
                            <h2 className='text-xl font-bold text-gray-900 mb-4'>Profile</h2>
                            <div className='grid md:grid-cols-2 gap-4 text-sm'>
                                <p><span className='text-gray-500'>Name:</span> <strong>{user?.firstName} {user?.lastName}</strong></p>
                                <p><span className='text-gray-500'>Email:</span> <strong>{user?.email}</strong></p>
                                <p><span className='text-gray-500'>Phone:</span> <strong>{user?.phone || '—'}</strong></p>
                            </div>
                        </div>

                        <div className='bg-white rounded-xl p-6 shadow-md border border-gray-100'>
                            <h2 className='text-xl font-bold text-gray-900 mb-4'>Change Password (OTP)</h2>
                            <form onSubmit={handleResetPassword} className='grid md:grid-cols-2 gap-4'>
                                <div className='md:col-span-2'>
                                    <label className='block text-gray-700 font-bold mb-2'>Mobile Number</label>
                                    <input
                                        value={passwordForm.phone}
                                        onChange={(e) => setPasswordForm(prev => ({ ...prev, phone: e.target.value }))}
                                        className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-bold mb-2'>OTP</label>
                                    <div className='relative'>
                                        <ShieldCheck size={17} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                        <input
                                            value={passwordForm.otp}
                                            maxLength={6}
                                            onChange={(e) => setPasswordForm(prev => ({ ...prev, otp: e.target.value }))}
                                            className='w-full pl-9 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className='block text-gray-700 font-bold mb-2'>New Password</label>
                                    <div className='relative'>
                                        <Lock size={17} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                        <input
                                            type='password'
                                            value={passwordForm.newPassword}
                                            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                            className='w-full pl-9 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600'
                                        />
                                    </div>
                                </div>
                                <div className='md:col-span-2 flex gap-3'>
                                    <button type='button' onClick={handleSendOtp} disabled={submitting}
                                        className='flex-1 border-2 border-purple-300 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-50'>
                                        Send OTP
                                    </button>
                                    <button type='submit' disabled={submitting}
                                        className='flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50'>
                                        {submitting ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
