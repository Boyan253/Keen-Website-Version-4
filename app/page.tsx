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
    
    let scrollRestorationTimeout: NodeJS.Timeout
    
    // Listen for scroll restoration messages from admin panel
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'RESTORE_SCROLL') {
        // Clear any pending scroll restoration
        if (scrollRestorationTimeout) {
          clearTimeout(scrollRestorationTimeout)
        }
        
        // Debounce scroll restoration to prevent loops
        scrollRestorationTimeout = setTimeout(() => {
          window.scrollTo(0, event.data.scrollY)
        }, 50)
      }
    }
    
    // Also check localStorage for scroll position on load
    const savedScroll = localStorage.getItem('admin-preview-scroll')
    if (savedScroll) {
      const scrollY = parseInt(savedScroll)
      if (scrollY > 0) {
        // Use a longer timeout for initial load to ensure page is ready
        setTimeout(() => {
          window.scrollTo(0, scrollY)
          localStorage.removeItem('admin-preview-scroll')
        }, 300)
      }
    }
    
    window.addEventListener('message', handleMessage)
    
    return () => {
      window.removeEventListener('message', handleMessage)
      if (scrollRestorationTimeout) {
        clearTimeout(scrollRestorationTimeout)
      }
    }
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
