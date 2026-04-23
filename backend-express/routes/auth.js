const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    })
}

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
    '/register',
    [
        body('firstName').notEmpty().trim().withMessage('First name is required'),
        body('lastName').notEmpty().trim().withMessage('Last name is required'),
        body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
        body('phone').notEmpty().trim().withMessage('Phone is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }

        const { firstName, lastName, email, phone, password } = req.body

        try {
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already registered' })
            }

            const user = await User.create({ firstName, lastName, email, phone, password })

            res.status(201).json({
                success: true,
                message: 'Account created successfully',
                token: generateToken(user._id),
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, message: 'Server error' })
        }
    }
)

// @route   POST /api/auth/login
// @desc    Login user and return token
// @access  Public
router.post(
    '/login',
    [
        body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() })
        }

        const { email, password } = req.body

        try {
            const user = await User.findOne({ email }).select('+password')
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' })
            }

            const isMatch = await user.matchPassword(password)
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid email or password' })
            }

            res.json({
                success: true,
                message: 'Login successful',
                token: generateToken(user._id),
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }
            })
        } catch (error) {
            console.error(error)
            res.status(500).json({ success: false, message: 'Server error' })
        }
    }
)

// @route   GET /api/auth/me
// @desc    Get logged-in user profile
// @access  Private
router.get('/me', require('../middleware/auth').protect, async (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            phone: req.user.phone,
            role: req.user.role
        }
    })
})

module.exports = router
