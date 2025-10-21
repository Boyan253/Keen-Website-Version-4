'use client'

import { useState, useEffect } from 'react'
import HeroSection from '@/components/bg/HeroSection'
import ProductSection from '@/components/bg/ProductSection'
import ProcessSection from '@/components/bg/ProcessSection'
import TestimonialsSection from '@/components/bg/TestimonialsSection'
import InvestorsSection from '@/components/bg/InvestorsSection'
import AboutSection from '@/components/bg/AboutSection'
import FAQSection from '@/components/bg/FAQSection'
import AIQuestionnaire from '@/components/bg/AIQuestionnaire'
import Header from '@/components/bg/Header'
import Footer from '@/components/bg/Footer'
import FloatingCTA from '@/components/bg/FloatingCTA'

export default function BulgarianHome() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className={`min-h-screen ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      <Header />
      <HeroSection />
      <ProductSection />
      <ProcessSection />
      <TestimonialsSection />
      <InvestorsSection />
      <AboutSection />
      <FAQSection />
      <AIQuestionnaire />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
