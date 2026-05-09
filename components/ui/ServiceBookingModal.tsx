'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Calendar, Clock, MapPin, Phone, User, PawPrint, 
  Check, ChevronDown, ChevronLeft, ChevronRight, Loader2,
  Mail, MessageSquare, Shield, Star, AlertCircle
} from 'lucide-react'

interface ServiceBookingModalProps {
  isOpen: boolean
  onClose: () => void
  serviceName: string
  servicePrice: string
  serviceIcon?: React.ReactNode
  themeColor?: 'primary' | 'purple' | 'orange' | 'green' | 'pink' | 'blue' | 'red' | 'indigo'
  packages?: Array<{
    name: string
    price: string
    duration: string
    features: string[]
    popular?: boolean
  }>
}

const themeClasses = {
  primary: {
    bg: 'bg-primary-500',
    bgGradient: 'bg-gradient-to-r from-primary-500 to-primary-600',
    text: 'text-primary-500',
    border: 'border-primary-500',
    ring: 'focus:ring-primary-500',
    light: 'bg-primary-50',
  },
  purple: {
    bg: 'bg-purple-500',
    bgGradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
    text: 'text-purple-500',
    border: 'border-purple-500',
    ring: 'focus:ring-purple-500',
    light: 'bg-purple-50',
  },
  orange: {
    bg: 'bg-orange-500',
    bgGradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
    text: 'text-orange-500',
    border: 'border-orange-500',
    ring: 'focus:ring-orange-500',
    light: 'bg-orange-50',
  },
  green: {
    bg: 'bg-green-500',
    bgGradient: 'bg-gradient-to-r from-green-500 to-green-600',
    text: 'text-green-500',
    border: 'border-green-500',
    ring: 'focus:ring-green-500',
    light: 'bg-green-50',
  },
  pink: {
    bg: 'bg-pink-500',
    bgGradient: 'bg-gradient-to-r from-pink-500 to-pink-600',
    text: 'text-pink-500',
    border: 'border-pink-500',
    ring: 'focus:ring-pink-500',
    light: 'bg-pink-50',
  },
  blue: {
    bg: 'bg-blue-500',
    bgGradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
    text: 'text-blue-500',
    border: 'border-blue-500',
    ring: 'focus:ring-blue-500',
    light: 'bg-blue-50',
  },
  red: {
    bg: 'bg-red-500',
    bgGradient: 'bg-gradient-to-r from-red-500 to-red-600',
    text: 'text-red-500',
    border: 'border-red-500',
    ring: 'focus:ring-red-500',
    light: 'bg-red-50',
  },
  indigo: {
    bg: 'bg-indigo-500',
    bgGradient: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
    text: 'text-indigo-500',
    border: 'border-indigo-500',
    ring: 'focus:ring-indigo-500',
    light: 'bg-indigo-50',
  },
}

const tamilNaduDistricts = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 
  'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul',
  'Thoothukudi', 'Kanchipuram', 'Cuddalore', 'Tirupur', 'Villupuram',
  'Nagapattinam', 'Pudukkottai', 'Ramanathapuram', 'Sivaganga', 'Virudhunagar',
  'Krishnagiri', 'Dharmapuri', 'Namakkal', 'Perambalur', 'Ariyalur',
  'Karur', 'Tiruvannamalai', 'Nilgiris', 'Theni', 'Tenkasi',
  'Kallakurichi', 'Chengalpattu', 'Ranipet', 'Tirupattur', 'Mayiladuthurai'
]

const timeSlots = [
  'Morning (6 AM - 9 AM)',
  'Mid-morning (9 AM - 12 PM)',
  'Afternoon (12 PM - 3 PM)',
  'Late Afternoon (3 PM - 6 PM)',
  'Evening (6 PM - 9 PM)',
]

export default function ServiceBookingModal({
  isOpen,
  onClose,
  serviceName,
  servicePrice,
  serviceIcon,
  themeColor = 'primary',
  packages,
}: ServiceBookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedPackage, setSelectedPackage] = useState<number | null>(packages ? 0 : null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const theme = themeClasses[themeColor]

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    petName: '',
    petType: 'dog',
    date: '',
    time: timeSlots[0],
    address: '',
    city: tamilNaduDistricts[0],
    pincode: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setStep(1)
      setIsSuccess(false)
      setFormData({
        name: '',
        mobile: '',
        email: '',
        petName: '',
        petType: 'dog',
        date: '',
        time: timeSlots[0],
        address: '',
        city: tamilNaduDistricts[0],
        pincode: '',
        notes: '',
      })
      setErrors({})
    }
  }, [isOpen])

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required'
      else if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = 'Enter valid 10-digit mobile'
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter valid email'
    }

    if (currentStep === 2) {
      if (!formData.petName.trim()) newErrors.petName = "Pet's name is required"
      if (!formData.date) newErrors.date = 'Please select a date'
    }

    if (currentStep === 3) {
      if (!formData.address.trim()) newErrors.address = 'Address is required'
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const totalSteps = 3

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Fixed to entire screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[55]"
          />

          {/* Modal - Fixed to screen */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 sm:inset-auto sm:top-0 sm:right-0 sm:bottom-0 sm:left-0 
                       md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       md:w-full md:max-w-lg lg:max-w-xl md:max-h-[90vh] md:rounded-3xl
                       bg-white sm:rounded-none shadow-2xl z-[60] overflow-hidden flex flex-col"
          >
            {isSuccess ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center safe-area-inset"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className={`w-20 h-20 sm:w-24 sm:h-24 ${theme.bg} rounded-full flex items-center justify-center mb-6`}
                >
                  <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </motion.div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-dark mb-3">
                  Booking Submitted!
                </h3>
                <p className="text-gray-500 mb-2 text-sm sm:text-base">
                  Thank you, {formData.name}! Your {serviceName} booking has been received.
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  We'll call you at {formData.mobile} within 30 minutes to confirm.
                </p>
                <div className={`${theme.light} rounded-2xl p-4 sm:p-6 w-full max-w-sm mb-6`}>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-left text-sm">
                    <div>
                      <p className="text-gray-400 text-xs">Service</p>
                      <p className="font-semibold text-dark">{serviceName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Date</p>
                      <p className="font-semibold text-dark">{new Date(formData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Pet</p>
                      <p className="font-semibold text-dark">{formData.petName}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Time</p>
                      <p className="font-semibold text-dark">{formData.time.split(' ')[0]}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`w-full max-w-sm py-3 sm:py-4 ${theme.bgGradient} text-white font-bold rounded-xl 
                             hover:shadow-lg transition-all text-sm sm:text-base`}
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <>
                {/* Header - Sticky at top */}
                <div className={`${theme.bgGradient} text-white p-4 sm:p-6 flex-shrink-0 sticky top-0 z-10 pt-[max(1rem,env(safe-area-inset-top))]`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        {serviceIcon || <PawPrint className="w-5 h-5 sm:w-6 sm:h-6" />}
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg sm:text-xl">Book {serviceName}</h3>
                        <p className="text-white/80 text-xs sm:text-sm">Starting from {servicePrice}</p>
                      </div>
                    </div>
                    <button 
                      onClick={onClose} 
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>

                  {/* Progress Steps */}
                  <div className="flex items-center gap-2 mt-4 sm:mt-6">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex-1 flex items-center gap-2">
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                          s === step 
                            ? 'bg-white text-gray-900' 
                            : s < step 
                              ? 'bg-white/30 text-white' 
                              : 'bg-white/10 text-white/50'
                        }`}>
                          {s < step ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : s}
                        </div>
                        {s < 3 && (
                          <div className={`flex-1 h-1 rounded-full transition-all ${
                            s < step ? 'bg-white/50' : 'bg-white/10'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-white/70">
                    <span>Contact</span>
                    <span>Pet & Time</span>
                    <span>Location</span>
                  </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Contact Info */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h4 className="font-heading font-semibold text-lg text-dark mb-4">Your Contact Details</h4>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              placeholder="Enter your full name"
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all text-sm sm:text-base ${
                                errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              }`}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Mobile Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+91</span>
                            <input
                              type="tel"
                              value={formData.mobile}
                              onChange={(e) => handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                              placeholder="98765 43210"
                              className={`w-full pl-20 pr-4 py-3 border rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all text-sm sm:text-base ${
                                errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              }`}
                            />
                          </div>
                          {errors.mobile && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.mobile}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email <span className="text-gray-400">(optional)</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              placeholder="you@example.com"
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all text-sm sm:text-base ${
                                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              }`}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Pet & Schedule */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h4 className="font-heading font-semibold text-lg text-dark mb-4">Pet & Schedule Info</h4>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Pet's Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <PawPrint className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              <input
                                type="text"
                                value={formData.petName}
                                onChange={(e) => handleInputChange('petName', e.target.value)}
                                placeholder="Pet name"
                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all text-sm ${
                                  errors.petName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                }`}
                              />
                            </div>
                            {errors.petName && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.petName}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Pet Type</label>
                            <div className="relative">
                              <select
                                value={formData.petType}
                                onChange={(e) => handleInputChange('petType', e.target.value)}
                                className={`w-full pl-4 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all appearance-none text-sm`}
                              >
                                <option value="dog">🐕 Dog</option>
                                <option value="cat">🐱 Cat</option>
                                <option value="other">🐾 Other</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Preferred Date <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="date"
                              min={today}
                              value={formData.date}
                              onChange={(e) => handleInputChange('date', e.target.value)}
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all text-sm sm:text-base ${
                                errors.date ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              }`}
                            />
                          </div>
                          {errors.date && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.date}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Preferred Time Slot
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                              value={formData.time}
                              onChange={(e) => handleInputChange('time', e.target.value)}
                              className={`w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all appearance-none text-sm sm:text-base`}
                            >
                              {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>{slot}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Package Selection */}
                        {packages && packages.length > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
                            <div className="space-y-2">
                              {packages.map((pkg, idx) => (
                                <motion.button
                                  key={idx}
                                  type="button"
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setSelectedPackage(idx)}
                                  className={`w-full p-3 sm:p-4 rounded-xl border-2 text-left transition-all ${
                                    selectedPackage === idx 
                                      ? `${theme.border} ${theme.light}` 
                                      : 'border-gray-200 hover:border-gray-300'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="font-semibold text-dark text-sm sm:text-base">{pkg.name}</span>
                                        {pkg.popular && (
                                          <span className={`px-2 py-0.5 ${theme.bg} text-white text-xs rounded-full`}>
                                            Popular
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-gray-500 mt-0.5">{pkg.duration}</p>
                                    </div>
                                    <div className="text-right">
                                      <span className={`font-bold text-lg ${theme.text}`}>{pkg.price}</span>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Step 3: Location */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h4 className="font-heading font-semibold text-lg text-dark mb-4">Service Location</h4>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Address <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <textarea
                              rows={2}
                              value={formData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              placeholder="Enter your full address"
                              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all resize-none text-sm sm:text-base ${
                                errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              }`}
                            />
                          </div>
                          {errors.address && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.address}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              City/District <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <select
                                value={formData.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                                className={`w-full pl-4 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all appearance-none text-sm`}
                              >
                                {tamilNaduDistricts.map((city) => (
                                  <option key={city} value={city}>{city}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Pincode <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.pincode}
                              onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                              placeholder="600001"
                              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all text-sm ${
                                errors.pincode ? 'border-red-300 bg-red-50' : 'border-gray-200'
                              }`}
                            />
                            {errors.pincode && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.pincode}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Special Instructions <span className="text-gray-400">(optional)</span>
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <textarea
                              rows={2}
                              value={formData.notes}
                              onChange={(e) => handleInputChange('notes', e.target.value)}
                              placeholder="Any special requirements or notes..."
                              className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 ${theme.ring} focus:border-transparent transition-all resize-none text-sm sm:text-base`}
                            />
                          </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center gap-4 pt-2">
                          <div className="flex items-center gap-1.5 text-green-600 text-xs">
                            <Shield className="w-4 h-4" />
                            <span>Verified Caregivers</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-yellow-600 text-xs">
                            <Star className="w-4 h-4" />
                            <span>4.9 Rating</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer Actions - Sticky at bottom */}
                <div className="p-4 sm:p-6 border-t border-gray-100 flex-shrink-0 sticky bottom-0 bg-white pb-[max(1rem,env(safe-area-inset-bottom))]">
                  <div className="flex gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex-1 py-3.5 sm:py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 
                                   hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className={`flex-1 py-3.5 sm:py-4 ${theme.bgGradient} text-white font-bold rounded-xl 
                                 hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm sm:text-base
                                 disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : step < 3 ? (
                        <>
                          Next
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                          Submit Booking
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    We'll contact you within 30 minutes to confirm
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

