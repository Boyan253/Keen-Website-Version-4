'use client'

import { useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import ProductSection from '@/components/ProductSection'
import ProcessSection from '@/components/ProcessSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import AboutSection from '@/components/AboutSection'
import FAQSection from '@/components/FAQSection'
import AIQuestionnaire from '@/components/AIQuestionnaire'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export default function Home() {
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
      <AboutSection />
      <FAQSection />
      <AIQuestionnaire />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
