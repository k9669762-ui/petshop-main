'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Eye, EyeOff, Lock, Mail, PawPrint, User, Phone, 
  MapPin, Building, ChevronDown, Check, AlertCircle,
  ArrowLeft, ArrowRight, Loader2
} from 'lucide-react'
import { useAuthStore, UserAddress } from '@/store/useAuthStore'
import { tamilNaduDistricts, tamilNaduCities, isValidTamilNaduPincode, isValidIndianMobile } from '@/lib/tamilnaduData'
import Link from 'next/link'

type LoginMethod = 'otp' | 'password'
type Step = 'method' | 'otp-send' | 'otp-verify' | 'password-login' | 'register-details' | 'register-address'

export default function LoginPage() {
  const router = useRouter()
  const { 
    isAuthenticated, 
    sendOTP, 
    verifyOTP, 
    loginWithMobileOTP, 
    loginWithPassword, 
    register,
    otpSession 
  } = useAuthStore()

  // State
  const [step, setStep] = useState<Step>('method')
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('otp')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form fields
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [otpDisplay, setOtpDisplay] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)

  // Address fields
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [area, setArea] = useState('')
  const [district, setDistrict] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')

  // Timer for OTP resend
  const [resendTimer, setResendTimer] = useState(0)

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/account')
    }
  }, [isAuthenticated, router])

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  // Get cities based on selected district
  const availableCities = district ? tamilNaduCities[district] || [] : []

  const handleSendOTP = async () => {
    if (!isValidIndianMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setIsLoading(true)
    setError('')

    const result = sendOTP(mobile)
    
    if (result.success) {
      setOtpDisplay(result.otp || '')
      setSuccess(result.message)
      setStep('otp-verify')
      setResendTimer(60)
    } else {
      setError(result.message)
    }

    setIsLoading(false)
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    setIsLoading(true)
    setError('')

    const result = verifyOTP(mobile, otp)
    
    if (result.success) {
      // Check if user exists
      const loginResult = loginWithMobileOTP(mobile)
      
      if (loginResult.success) {
        setSuccess('Login successful! Redirecting...')
        setTimeout(() => router.push('/account'), 1000)
      } else if (loginResult.message.includes('register')) {
        // New user - go to registration
        setIsNewUser(true)
        setStep('register-details')
      } else {
        setError(loginResult.message)
      }
    } else {
      setError(result.message)
    }

    setIsLoading(false)
  }

  const handlePasswordLogin = async () => {
    if (!email && !mobile) {
      setError('Please enter email or mobile number')
      return
    }

    if (!password) {
      setError('Please enter your password')
      return
    }

    setIsLoading(true)
    setError('')

    const result = loginWithPassword(email || mobile, password)
    
    if (result.success) {
      setSuccess('Login successful! Redirecting...')
      setTimeout(() => router.push('/account'), 1000)
    } else {
      setError(result.message)
    }

    setIsLoading(false)
  }

  const handleRegisterDetails = () => {
    if (!name.trim()) {
      setError('Please enter your full name')
      return
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (password) {
      if (password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }
    }

    setError('')
    setStep('register-address')
  }

  const handleRegister = async () => {
    // Validate address
    if (!addressLine1.trim()) {
      setError('Please enter your address')
      return
    }

    if (!area.trim()) {
      setError('Please enter your area/locality')
      return
    }

    if (!district) {
      setError('Please select your district')
      return
    }

    if (!city) {
      setError('Please select your city')
      return
    }

    if (!isValidTamilNaduPincode(pincode)) {
      setError('Please enter a valid Tamil Nadu pincode')
      return
    }

    setIsLoading(true)
    setError('')

    const address: UserAddress = {
      addressLine1,
      addressLine2: addressLine2 || undefined,
      area,
      city,
      district,
      pincode,
      state: 'Tamil Nadu',
      country: 'India',
    }

    const result = register({
      name,
      mobile,
      email: email || undefined,
      password: password || undefined,
      address,
    })

    if (result.success) {
      setSuccess(result.message)
      setTimeout(() => router.push('/account'), 1500)
    } else {
      setError(result.message)
    }

    setIsLoading(false)
  }

  const renderStep = () => {
    switch (step) {
      case 'method':
        return (
          <motion.div
            key="method"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h1 className="font-heading font-bold text-2xl text-dark mb-2">
                Welcome to BowPaw
              </h1>
              <p className="text-gray-500 text-sm">
                Choose how you want to sign in
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setLoginMethod('otp')
                  setStep('otp-send')
                }}
                className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Mobile + OTP</p>
                  <p className="text-sm text-gray-500">Quick & secure login</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
              </button>

              <button
                onClick={() => {
                  setLoginMethod('password')
                  setStep('password-login')
                }}
                className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-secondary-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Email/Mobile + Password</p>
                  <p className="text-sm text-gray-500">Traditional login</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
              </button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                🚚 We deliver only in <span className="font-semibold text-primary-600">Tamil Nadu</span>
              </p>
            </div>
          </motion.div>
        )

      case 'otp-send':
        return (
          <motion.div
            key="otp-send"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <button onClick={() => setStep('method')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="text-center mb-6">
              <h1 className="font-heading font-bold text-2xl text-dark mb-2">
                Enter Mobile Number
              </h1>
              <p className="text-gray-500 text-sm">
                We'll send you a one-time password
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="98765 43210"
                  maxLength={10}
                  className="w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-lg tracking-wider"
                />
                {mobile.length === 10 && isValidIndianMobile(mobile) && (
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="mt-2 text-xs text-gray-500">Enter 10-digit mobile number</p>
            </div>

            <button
              onClick={handleSendOTP}
              disabled={isLoading || mobile.length !== 10}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </motion.div>
        )

      case 'otp-verify':
        return (
          <motion.div
            key="otp-verify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <button onClick={() => setStep('otp-send')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4" />
              Change Number
            </button>

            <div className="text-center mb-6">
              <h1 className="font-heading font-bold text-2xl text-dark mb-2">
                Verify OTP
              </h1>
              <p className="text-gray-500 text-sm">
                Enter the 6-digit code sent to +91 {mobile}
              </p>
            </div>

            {/* Demo OTP Display */}
            {otpDisplay && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Demo OTP:</span> {otpDisplay}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP *
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="• • • • • •"
                maxLength={6}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-2xl tracking-[0.5em] text-center font-mono"
              />
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.length !== 6}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Continue'
              )}
            </button>

            <div className="text-center">
              {resendTimer > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend OTP in <span className="font-semibold text-primary-500">{resendTimer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleSendOTP}
                  className="text-sm text-primary-500 font-medium hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </motion.div>
        )

      case 'password-login':
        return (
          <motion.div
            key="password-login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <button onClick={() => setStep('method')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="text-center mb-6">
              <h1 className="font-heading font-bold text-2xl text-dark mb-2">
                Sign In
              </h1>
              <p className="text-gray-500 text-sm">
                Enter your credentials to continue
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm">
              <p className="font-medium text-gray-700 mb-2">Demo Users:</p>
              <div className="space-y-1 text-gray-600">
                <p>priya@example.com / user123</p>
                <p>9876543212 / user123</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={email || mobile}
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^\d+$/.test(value)) {
                        setMobile(value.slice(0, 10))
                        setEmail('')
                      } else {
                        setEmail(value)
                        setMobile('')
                      }
                    }}
                    placeholder="Email or mobile number"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handlePasswordLogin}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                New to BowPaw?{' '}
                <button
                  onClick={() => setStep('otp-send')}
                  className="text-primary-500 font-medium hover:underline"
                >
                  Register with OTP
                </button>
              </p>
            </div>
          </motion.div>
        )

      case 'register-details':
        return (
          <motion.div
            key="register-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h1 className="font-heading font-bold text-2xl text-dark mb-2">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm">
                Step 1 of 2 - Personal Details
              </p>
            </div>

            {/* Progress indicator */}
            <div className="flex gap-2 mb-6">
              <div className="flex-1 h-1 bg-primary-500 rounded-full" />
              <div className="flex-1 h-1 bg-gray-200 rounded-full" />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={`+91 ${mobile}`}
                    disabled
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                  <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {password && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                    />
                    {confirmPassword && password === confirmPassword && (
                      <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleRegisterDetails}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )

      case 'register-address':
        return (
          <motion.div
            key="register-address"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            <button onClick={() => setStep('register-details')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="text-center mb-4">
              <h1 className="font-heading font-bold text-2xl text-dark mb-2">
                Delivery Address
              </h1>
              <p className="text-gray-500 text-sm">
                Step 2 of 2 - Tamil Nadu addresses only
              </p>
            </div>

            {/* Progress indicator */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 h-1 bg-primary-500 rounded-full" />
              <div className="flex-1 h-1 bg-primary-500 rounded-full" />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              <p className="text-sm text-amber-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                We currently deliver only within Tamil Nadu
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 1 *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="House/Flat No., Building Name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Line 2 <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  placeholder="Street, Landmark"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area / Locality *
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter your area or locality"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District *
                  </label>
                  <div className="relative">
                    <select
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value)
                        setCity('')
                      }}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                    >
                      <option value="">Select District</option>
                      {tamilNaduDistricts.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={!district}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select City</option>
                      {availableCities.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none ${
                      pincode.length === 6 && !isValidTamilNaduPincode(pincode)
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200'
                    }`}
                  />
                  {pincode.length === 6 && !isValidTamilNaduPincode(pincode) && (
                    <p className="mt-1 text-xs text-red-500">Invalid Tamil Nadu pincode</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value="Tamil Nadu"
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value="India"
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                />
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Complete Registration
                </>
              )}
            </button>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 py-8">
      {/* Background Paw Prints */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              transform: `rotate(${-20 + i * 15}deg)`,
            }}
          >
            <PawPrint className="w-20 h-20 text-primary-500" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent" />

          {/* Logo */}
          <Link href="/" className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-2xl"
            >
              <PawPrint className="w-7 h-7 text-primary-500" />
            </motion.div>
          </Link>

          {/* Error/Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-4 text-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4 flex-shrink-0" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Back to Store */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-primary-500 transition-colors"
            >
              ← Back to Store
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
