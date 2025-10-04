'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Calendar, Brain } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function BulgarianHeroSection() {
  const [heroVariant, setHeroVariant] = useState('primary')

  const stats = [
    { metric: '10x', label: 'по-бързо време до POC' },
    { metric: 'Дни', label: 'не месеци за внедряване' },
    { metric: 'Бързо', label: 'време до стойност' },
  ]

  const primaryHero = {
    headline: "AI внедряване направено просто — внедрявайте готови за производство AI агенти за дни, не месеци",
    subheadline: "Ние не продаваме нашата софтуерна платформа — ние доставяме бизнес резултати. Работейки с нашата собствена софтуерна платформа, ние проектираме, обучаваме и управляваме персонализирани AI агенти, които се държат като ВАШИТЕ високопроизводителни служители.",
    supportLine: "10x по-бързо време до POC • Бързо време до стойност • Внедрявайте готови за производство AI агенти за дни, не месеци"
  }

  const riskAverseHero = {
    headline: "Практичен AI, реални резултати — без нужда от IT преустройство",
    subheadline: "Нашата AI платформа внедрява агенти, които работят с вашите съществуващи системи и процеси. Без разрушаване и замяна. Без привързаност към доставчик. Само измерени подобрения и непрекъсната поддръжка.",
    supportLine: "Безпроблемна интеграция с вашата съществуваща инфраструктура."
  }

  const currentHero = heroVariant === 'primary' ? primaryHero : riskAverseHero

  return (
    <section className="relative min-h-screen flex items-center gradient-bg overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-keen-blue/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-keen-blue/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 hero-content"
          >
            {/* Hero Variant Toggle */}
            <div className="hero-toggle-buttons">
              <button
                onClick={() => setHeroVariant('primary')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  heroVariant === 'primary'
                    ? 'bg-keen-blue text-white shadow-lg'
                    : 'bg-white/20 text-keen-gray hover:bg-white/30'
                }`}
              >
                Основен
              </button>
              <button
                onClick={() => setHeroVariant('risk-averse')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  heroVariant === 'risk-averse'
                    ? 'bg-keen-blue text-white shadow-lg'
                    : 'bg-white/20 text-keen-gray hover:bg-white/30'
                }`}
              >
                Консервативен
              </button>
            </div>

            {/* Headline */}
            <motion.h1
              key={currentHero.headline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-keen-gray leading-tight"
            >
              {currentHero.headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              key={currentHero.subheadline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-keen-gray/80 leading-relaxed"
            >
              {currentHero.subheadline}
            </motion.p>

            {/* Support Line */}
            {heroVariant === 'primary' && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-base text-keen-blue font-semibold"
              >
                {currentHero.supportLine}
              </motion.p>
            )}

            {/* Stats */}
            {heroVariant === 'primary' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="grid grid-cols-3 gap-6 py-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.metric}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-keen-blue">
                      {stat.metric}
                    </div>
                    <div className="text-sm text-keen-gray/70 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(4, 165, 250, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://calendly.com/keenagents', '_blank')}
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 group"
              >
                <Calendar className="w-7 h-7" />
                <span>Резервирайте безплатна консултация</span>
                <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '#questionnaire'}
                className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2"
              >
                <Brain className="w-7 h-7" />
                <span>Направете AI готовност тест</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* AI Agent Visualization */}
            <div className="relative">
              {/* Main AI Agent Card */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative w-12 h-12 p-1">
                    <div 
                      className="w-full h-full"
                      style={{ 
                        backgroundColor: '#bad7f5',
                        maskImage: 'url(/logo-no-text.webp)',
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskImage: 'url(/logo-no-text.webp)',
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-keen-gray">Keen Agent AI</h3>
                    <p className="text-keen-gray/70">Винаги учи</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-keen-gray">Обработва поръчки 24/7</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-keen-gray">Автоматизирана клиентска поддръжка</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-keen-gray">Анализ на данни завършен</span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-keen-blue/10 rounded-lg">
                    <div className="text-2xl font-bold text-keen-blue">99.9%</div>
                    <div className="text-xs text-keen-gray/70">Време на работа</div>
                  </div>
                  <div className="text-center p-3 bg-green-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-green-500">30%</div>
                    <div className="text-xs text-keen-gray/70">По-бързо</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  x: [0, 10, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-keen-blue/20 rounded-full flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-keen-blue rounded-full animate-pulse" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  x: [0, -10, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center"
              >
                <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
