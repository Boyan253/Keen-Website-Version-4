'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar, Settings, Sun, Moon, Globe } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    // Close settings menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (isSettingsOpen && !(event.target as Element).closest('.settings-menu')) {
        setIsSettingsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSettingsOpen])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme)
    // Save theme to localStorage
    localStorage.setItem('theme', newTheme)
  }

  const navItems = [
    { name: 'What We Do', href: '#product' },
    { name: 'How We Do It', href: '#process' },
    { name: 'Success Stories', href: '#testimonials' },
    { name: 'About Us', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4"
          >
            <div className="relative w-10 h-10 p-2">
              <Image
                src="/logo-no-text.webp"
                alt="Keen Agents Logo"
                fill
                className={`object-contain transition-colors duration-300 ${
                  isScrolled ? 'brightness-0' : ''
                }`}
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-px h-6 bg-keen-gray/30"></div>
              <div className="text-keen-gray">
                <div className="text-lg font-bold">keen</div>
                <div className="text-xs font-medium">agents</div>
              </div>
              <div className="w-px h-6 bg-keen-gray/30"></div>
              <div className="text-keen-gray/80">
                <div className="text-xs font-semibold">Multi-Agent Orchestration</div>
                <div className="text-xs font-medium">on a Whole New Level</div>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="text-keen-gray hover:text-keen-blue transition-colors duration-300 font-medium text-sm whitespace-nowrap"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('questionnaire')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary text-xs px-3 py-2"
            >
              AI Readiness Quiz
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://calendly.com/keenagents', '_blank')}
              className="btn-primary text-xs px-3 py-2 flex items-center space-x-2"
            >
              <Calendar className="w-3 h-3" />
              <span>Book Consultation</span>
            </motion.button>
          </div>

          {/* Settings Menu */}
          <div className="relative settings-menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <Settings className="w-5 h-5 text-keen-gray" />
            </motion.button>

            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                >
                  {/* Language Selector */}
                  <div className="px-4 py-2">
                    <div className="flex items-center space-x-2 mb-3">
                      <Globe className="w-4 h-4 text-keen-gray" />
                      <span className="text-sm font-medium text-keen-gray">Language</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a 
                        href="/" 
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-300 ${
                          typeof window !== 'undefined' && window.location.pathname === '/' 
                            ? 'bg-keen-blue text-white' 
                            : 'text-keen-gray hover:bg-gray-100'
                        }`}
                      >
                        English
                      </a>
                      <a 
                        href="/bg" 
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-300 ${
                          typeof window !== 'undefined' && window.location.pathname === '/bg' 
                            ? 'bg-keen-blue text-white' 
                            : 'text-keen-gray hover:bg-gray-100'
                        }`}
                      >
                        Български
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-2"></div>

                  {/* Theme Selector */}
                  <div className="px-4 py-2">
                    <div className="flex items-center space-x-2 mb-3">
                      <Sun className="w-4 h-4 text-keen-gray" />
                      <span className="text-sm font-medium text-keen-gray">Theme</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleTheme}
                        className="relative w-12 h-6 bg-gray-200 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-keen-blue focus:ring-offset-2"
                      >
                        <motion.div
                          animate={{ x: theme === 'dark' ? 24 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center"
                        >
                          {theme === 'light' ? (
                            <Sun className="w-2.5 h-2.5 text-yellow-500" />
                          ) : (
                            <Moon className="w-2.5 h-2.5 text-blue-600" />
                          )}
                        </motion.div>
                      </button>
                      <span className="text-sm text-keen-gray/70">
                        {theme === 'light' ? 'Light' : 'Dark'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-keen-gray hover:text-keen-blue transition-colors duration-300 font-medium"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <button 
                onClick={() => {
                  document.getElementById('questionnaire')?.scrollIntoView({ behavior: 'smooth' })
                  setIsMobileMenuOpen(false)
                }}
                className="btn-secondary w-full text-sm"
              >
                AI Readiness Quiz
              </button>
              <button className="btn-primary w-full text-sm flex items-center justify-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}
