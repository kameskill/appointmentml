const sendOtp = async ({ phone, code, purpose }) => {
    const apiKey = process.env.TEXTBEE_API_KEY
    const deviceId = process.env.TEXTBEE_DEVICE_ID

    const message = purpose === 'signup'
        ? `Your Timmy Tails account OTP is ${code}. It expires in 10 minutes.`
        : `Your Timmy Tails password reset OTP is ${code}. It expires in 10 minutes.`

    if (!apiKey || !deviceId) {
        if ((process.env.NODE_ENV || 'development') !== 'production') {
            console.log(`[DEV OTP] ${phone} (${purpose}): ${code}`)
        }
        return { delivered: false, skipped: true }
    }

    const response = await fetch(`https://api.textbee.dev/api/v1/gateway/devices/${deviceId}/send-sms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            recipients: [phone],
            message
        })
    })

    if (!response.ok) {
        const raw = await response.text()
        throw new Error(`TextBee send failed (${response.status}): ${raw}`)
    }

    return { delivered: true, skipped: false }
}

module.exports = { sendOtp }
