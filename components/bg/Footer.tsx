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

export default function BulgarianFooter() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'За нас', href: '#about' },
      { name: 'Нашият процес', href: '#process' },
      { name: 'Истории за успех', href: '#testimonials' },
      { name: 'Кариери', href: '/careers' }
    ],
    services: [
      { name: 'AI Агенти', href: '#product' },
      { name: 'Автоматизация на процеси', href: '#product' },
      { name: 'AI клиентска поддръжка', href: '#product' },
      { name: 'Обработка на данни', href: '#product' }
    ],
    resources: [
      { name: 'ЧЗВ', href: '#faq' },
      { name: 'AI готовност тест', href: '#questionnaire' },
      { name: 'Казуси', href: '#testimonials' },
      { name: 'Документация', href: '/docs' }
    ],
    support: [
      { name: 'Свържете се с нас', href: '#contact' },
      { name: 'Център за поддръжка', href: '/support' },
      { name: 'Резервирайте консултация', href: 'https://calendly.com/keenagents' },
      { name: 'Страница за състояние', href: '/status' }
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
                  <span className="text-2xl font-bold">
                    keen agents
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Изграждане на индивидуални AI агенти, които работят като цифрови служители за автоматизиране на вашите бизнес процеси и намаляване на разходите.
                </p>
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
                  {category === 'company' ? 'Компания' : 
                   category === 'services' ? 'Услуги' :
                   category === 'resources' ? 'Ресурси' : 'Поддръжка'}
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
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="py-8 border-t border-gray-600"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Останете в течение с AI автоматизацията
            </h3>
            <p className="text-gray-300 mb-6">
              Получавайте месечни актуализации за най-новите тенденции в AI автоматизацията и казуси от нашите клиенти.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Вашият имейл"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-keen-blue"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-keen-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <span>Абонирайте се</span>
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
              © {currentYear} Keen Agents. Всички права запазени.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy-policy" className="text-gray-400 hover:text-keen-blue transition-colors duration-300">
                Политика за поверителност
              </a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-keen-blue transition-colors duration-300">
                Условия за ползване
              </a>
              <a href="/cookie-policy" className="text-gray-400 hover:text-keen-blue transition-colors duration-300">
                Политика за бисквитки
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
