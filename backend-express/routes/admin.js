const express = require('express')
const router = express.Router()
const Appointment = require('../models/Appointment')
const Contact = require('../models/Contact')
const User = require('../models/User')
const { protect, adminOnly } = require('../middleware/auth')

// All admin routes require auth + admin role
router.use(protect, adminOnly)

// @route   GET /api/admin/stats
// @desc    Dashboard overview statistics
// @access  Admin
router.get('/stats', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]
        const now = new Date()
        const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
        const lastOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]

        const [
            todayCount,
            totalCustomers,
            confirmedCount,
            pendingCount,
            monthlyAppointments,
            totalRevenue
        ] = await Promise.all([
            Appointment.countDocuments({ date: today, status: { $in: ['pending', 'confirmed'] } }),
            User.countDocuments({ role: 'user' }),
            Appointment.countDocuments({ status: 'confirmed' }),
            Appointment.countDocuments({ status: 'pending' }),
            Appointment.find({
                date: { $gte: firstOfMonth, $lte: lastOfMonth },
                status: { $in: ['confirmed', 'completed'] }
            }),
            Appointment.aggregate([
                { $match: { status: { $in: ['confirmed', 'completed'] } } },
                { $group: { _id: null, total: { $sum: '$price' } } }
            ])
        ])

        const monthlyRevenue = monthlyAppointments.reduce((sum, a) => sum + a.price, 0)

        res.json({
            success: true,
            stats: {
                todayAppointments: todayCount,
                totalCustomers,
                confirmedBookings: confirmedCount,
                pendingAppointments: pendingCount,
                monthlyRevenue: `₱${monthlyRevenue.toLocaleString()}`,
                totalRevenue: totalRevenue[0]?.total || 0
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

// @route   GET /api/admin/appointments
// @desc    Get all appointments with optional filters
// @access  Admin
router.get('/appointments', async (req, res) => {
    try {
        const { status, date, page = 1, limit = 20 } = req.query
        const query = {}
        if (status) query.status = status
        if (date) query.date = date

        const skip = (parseInt(page) - 1) * parseInt(limit)
        const [appointments, total] = await Promise.all([
            Appointment.find(query)
                .sort({ date: -1, createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .populate('user', 'firstName lastName email'),
            Appointment.countDocuments(query)
        ])

        res.json({
            success: true,
            appointments,
            pagination: { total, page: parseInt(page), limit: parseInt(limit), pages: Math.ceil(total / parseInt(limit)) }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

// @route   PATCH /api/admin/appointments/:id/status
// @desc    Update appointment status
// @access  Admin
router.patch('/appointments/:id/status', async (req, res) => {
    const { status } = req.body
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled']
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' })
    }

    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' })
        }
        res.json({ success: true, appointment })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

// @route   GET /api/admin/analytics
// @desc    Revenue and trend analytics
// @access  Admin
router.get('/analytics', async (req, res) => {
    try {
        // Last 6 months revenue
        const months = []
        for (let i = 5; i >= 0; i--) {
            const d = new Date()
            d.setMonth(d.getMonth() - i)
            months.push({
                year: d.getFullYear(),
                month: d.getMonth(),
                label: d.toLocaleString('default', { month: 'short' })
            })
        }

        const monthlyData = await Promise.all(
            months.map(async ({ year, month, label }) => {
                const first = new Date(year, month, 1).toISOString().split('T')[0]
                const last = new Date(year, month + 1, 0).toISOString().split('T')[0]
                const appointments = await Appointment.find({
                    date: { $gte: first, $lte: last },
                    status: { $in: ['confirmed', 'completed'] }
                })
                return {
                    month: label,
                    revenue: appointments.reduce((s, a) => s + a.price, 0),
                    appointments: appointments.length
                }
            })
        )

        // Service distribution
        const serviceAgg = await Appointment.aggregate([
            { $match: { status: { $nin: ['cancelled'] } } },
            { $group: { _id: '$service', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ])

        // Breed trends
        const breedAgg = await Appointment.aggregate([
            { $match: { status: { $nin: ['cancelled'] }, haircutStyle: { $ne: null } } },
            { $group: { _id: { breed: '$breed', haircut: '$haircutStyle' }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ])

        const totalApps = serviceAgg.reduce((s, a) => s + a.count, 0) || 1
        const serviceDistribution = serviceAgg.map(s => ({
            name: s._id,
            percentage: Math.round((s.count / totalApps) * 100)
        }))

        const trendingData = breedAgg.map(b => ({
            breed: b._id.breed,
            haircut: b._id.haircut,
            bookings: b.count,
            trend: Math.min(99, 70 + b.count)
        }))

        res.json({
            success: true,
            analytics: { monthlyData, serviceDistribution, trendingData }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

// @route   GET /api/admin/contacts
// @desc    Get all contact messages
// @access  Admin
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50)
        res.json({ success: true, contacts })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

module.exports = router
