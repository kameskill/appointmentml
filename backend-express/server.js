require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()

// Connect to MongoDB
connectDB()

// CORS
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3000'
]
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))

// Body parsing
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/appointments', require('./routes/appointments'))
app.use('/api/admin', require('./routes/admin'))
app.use('/api/contact', require('./routes/contact'))

// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'Timmy Tails API is running', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ success: false, message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`🐾 Timmy Tails API running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`)
})

module.exports = app
