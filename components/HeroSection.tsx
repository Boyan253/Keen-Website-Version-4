'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Calendar, Brain } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import CMSContent from './CMSContent'

export default function HeroSection() {
  const [heroVariant, setHeroVariant] = useState('primary')

  const stats = [
    { metric: '10x', label: 'faster time to POC', metricKey: 'stats_1_metric', labelKey: 'stats_1_label' },
    { metric: 'Days', label: 'not months to deploy', metricKey: 'stats_2_metric', labelKey: 'stats_2_label' },
    { metric: 'Rapid', label: 'time-to-value', metricKey: 'stats_3_metric', labelKey: 'stats_3_label' },
  ]

  const primaryHero = {
    headline: "AI Implementation Made Simple — Deploy Production-Ready AI Agents in Days",
    subheadline: "We do not sell our software platform — we deliver business outcomes. Working with our proprietary software platform, we design, train and operate custom AI agents that behave like YOUR high-performing employees.",
    supportLine: "10x faster time to POC • Rapid Time-to-Value • Deploy production-ready AI agents in days, not months"
  }

  const riskAverseHero = {
    headline: "Practical AI, Real Results — No IT Overhaul Required",
    subheadline: "Our AI platform deploys agents that work with your existing systems and processes. No rip-and-replace. No vendor lock-in. Just measurable improvements and continuous support.",
    supportLine: "Seamless integration with your existing infrastructure."
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
                Primary
              </button>
              <button
                onClick={() => setHeroVariant('risk-averse')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  heroVariant === 'risk-averse'
                    ? 'bg-keen-blue text-white shadow-lg'
                    : 'bg-white/20 text-keen-gray hover:bg-white/30'
                }`}
              >
                Risk-Averse
              </button>
            </div>

            {/* Headline */}
            <motion.div
              key="hero-headline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CMSContent
                section="hero"
                contentKey="headline"
                fallback={currentHero.headline}
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-keen-gray leading-tight"
              />
            </motion.div>

            {/* Subheadline */}
            <motion.div
              key="hero-subheadline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CMSContent
                section="hero"
                contentKey="subheadline"
                fallback={currentHero.subheadline}
                as="p"
                className="text-lg md:text-xl text-keen-gray/80 leading-relaxed"
              />
            </motion.div>

            {/* Support Line */}
            {heroVariant === 'primary' && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <CMSContent
                  section="hero"
                  contentKey="support_line"
                  fallback={currentHero.supportLine}
                  as="p"
                  className="text-base text-keen-blue font-semibold"
                />
              </motion.div>
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
                    <CMSContent
                      section="hero"
                      contentKey={stat.metricKey}
                      fallback={stat.metric}
                      as="div"
                      className="text-2xl md:text-3xl font-bold text-keen-blue"
                    />
                    <CMSContent
                      section="hero"
                      contentKey={stat.labelKey}
                      fallback={stat.label}
                      as="div"
                      className="text-sm text-keen-gray/70 font-medium"
                    />
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
                <Calendar className="w-5 h-5" />
                <CMSContent
                  section="hero"
                  contentKey="cta_primary"
                  fallback="Book a Free Consultation"
                  as="span"
                />
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '#questionnaire'}
                className="btn-secondary text-lg px-8 py-4 flex items-center justify-center space-x-2"
              >
                <Brain className="w-5 h-5" />
                <CMSContent
                  section="hero"
                  contentKey="cta_secondary"
                  fallback="Take AI Readiness Quiz"
                  as="span"
                />
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
                    <CMSContent
                      section="hero"
                      contentKey="agent_card_title"
                      fallback="Keen Agent AI"
                      as="h3"
                      className="text-xl font-bold text-keen-gray"
                    />
                    <CMSContent
                      section="hero"
                      contentKey="agent_card_subtitle"
                      fallback="Always Learning"
                      as="p"
                      className="text-keen-gray/70"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <CMSContent
                      section="hero"
                      contentKey="agent_feature_1"
                      fallback="Processing orders 24/7"
                      as="span"
                      className="text-keen-gray"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <CMSContent
                      section="hero"
                      contentKey="agent_feature_2"
                      fallback="Customer support automated"
                      as="span"
                      className="text-keen-gray"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <CMSContent
                      section="hero"
                      contentKey="agent_feature_3"
                      fallback="Data analysis complete"
                      as="span"
                      className="text-keen-gray"
                    />
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-keen-blue/10 rounded-lg">
                    <CMSContent
                      section="hero"
                      contentKey="agent_metric_1_value"
                      fallback="99.9%"
                      as="div"
                      className="text-2xl font-bold text-keen-blue"
                    />
                    <CMSContent
                      section="hero"
                      contentKey="agent_metric_1_label"
                      fallback="Uptime"
                      as="div"
                      className="text-xs text-keen-gray/70"
                    />
                  </div>
                  <div className="text-center p-3 bg-green-500/10 rounded-lg">
                    <CMSContent
                      section="hero"
                      contentKey="agent_metric_2_value"
                      fallback="30%"
                      as="div"
                      className="text-2xl font-bold text-green-500"
                    />
                    <CMSContent
                      section="hero"
                      contentKey="agent_metric_2_label"
                      fallback="Faster"
                      as="div"
                      className="text-xs text-keen-gray/70"
                    />
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
