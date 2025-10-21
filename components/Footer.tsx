'use client'

import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import CMSContent from './CMSContent'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Process', href: '#process' },
      { name: 'Success Stories', href: '#testimonials' },
      { name: 'Careers', href: '/careers' }
    ],
    services: [
      { name: 'AI Agents', href: '#product' },
      { name: 'Process Automation', href: '#product' },
      { name: 'Customer Support AI', href: '#product' },
      { name: 'Data Processing', href: '#product' }
    ],
    resources: [
      { name: 'FAQ', href: '#faq' },
      { name: 'AI Readiness Quiz', href: '#questionnaire' },
      { name: 'Case Studies', href: '#testimonials' },
      { name: 'Documentation', href: '/docs' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'Support Center', href: '/support' },
      { name: 'Book Consultation', href: 'https://calendly.com/keenagents' },
      { name: 'Status Page', href: '/status' }
    ]
  }

  return (
    <footer className="bg-keen-gray text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative w-10 h-10 p-2">
                    <Image
                      src="/logo-no-text.webp"
                      alt="Keen Agents Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-px h-6 bg-white/30"></div>
                    <div className="text-white">
                      <CMSContent section="footer" contentKey="logo_text" fallback="keen" as="div" className="text-lg font-bold" />
                      <CMSContent section="footer" contentKey="logo_subtext" fallback="agents" as="div" className="text-xs font-medium" />
                    </div>
                    <div className="w-px h-6 bg-white/30"></div>
                    <div className="text-white/80">
                      <CMSContent section="footer" contentKey="tagline" fallback="Multi-Agent Orchestration on a Whole New Level" as="div" className="text-xs font-semibold" />
                    </div>
                  </div>
                </div>
                <CMSContent 
                  section="footer" 
                  contentKey="description" 
                  fallback="We do not sell our software platform — we deliver business outcomes. Deploy production-ready AI agents in days, not months. 10x faster time to POC with rapid time-to-value."
                  as="p"
                  className="text-gray-300 leading-relaxed mb-6"
                />
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://x.com/KeenBotAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-keen-blue/20 rounded-lg flex items-center justify-center hover:bg-keen-blue/30 transition-colors duration-300"
                    aria-label="Follow us on X"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://discord.gg/UbCfxSaT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-keen-blue/20 rounded-lg flex items-center justify-center hover:bg-keen-blue/30 transition-colors duration-300"
                    aria-label="Join our Discord"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-6 capitalize">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-keen-blue transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-600"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-keen-blue" />
                <CMSContent section="footer" contentKey="contact_email" fallback="hello@keenagents.com" as="span" className="text-gray-300" />
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-keen-blue" />
                <CMSContent section="footer" contentKey="contact_phone" fallback="+1 (555) 123-4567" as="span" className="text-gray-300" />
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-keen-blue" />
                <CMSContent section="footer" contentKey="contact_address" fallback="San Francisco, CA" as="span" className="text-gray-300" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-8 border-t border-gray-600"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <CMSContent 
                section="footer" 
                contentKey="newsletter_title" 
                fallback="Stay Updated"
                as="h3"
                className="text-xl font-semibold mb-2"
              />
              <CMSContent 
                section="footer" 
                contentKey="newsletter_description" 
                fallback="Get the latest insights on AI automation and business transformation."
                as="p"
                className="text-gray-300"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-keen-blue focus:border-transparent text-white placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-keen-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <CMSContent section="footer" contentKey="newsletter_button" fallback="Subscribe" as="span" />
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-6 border-t border-gray-600"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} <CMSContent section="footer" contentKey="copyright" fallback="Keen Agents. All rights reserved." as="span" />
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
              <a href="/privacy-security-policy" className="text-gray-400 hover:text-keen-blue transition-colors duration-300">
                Privacy and Security Policy
              </a>
              <a href="/terms-and-conditions" className="text-gray-400 hover:text-keen-blue transition-colors duration-300">
                Terms and Conditions
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
