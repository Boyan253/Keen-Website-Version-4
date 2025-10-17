'use client'

import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ArrowRight,
  Linkedin,
  Twitter,
  Github
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
                    href="https://linkedin.com/company/keen-agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-keen-blue/20 rounded-lg flex items-center justify-center hover:bg-keen-blue/30 transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://twitter.com/keenagents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-keen-blue/20 rounded-lg flex items-center justify-center hover:bg-keen-blue/30 transition-colors duration-300"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="https://github.com/keen-agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-keen-blue/20 rounded-lg flex items-center justify-center hover:bg-keen-blue/30 transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
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
            <div className="flex space-x-6 text-sm">
              <a href="/privacy-policy" className="text-gray-400 hover:text-keen-blue transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-keen-blue transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/cookie-policy" className="text-gray-400 hover:text-keen-blue transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
