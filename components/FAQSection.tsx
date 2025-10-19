'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { 
  Plus, 
  Minus, 
  Shield, 
  Settings, 
  Server, 
  AlertTriangle,
  Headphones,
  HelpCircle
} from 'lucide-react'
import CMSContent from './CMSContent'
import { useCMS } from '@/lib/cms/context'

export default function FAQSection() {
  const { getContentByKey } = useCMS()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: getContentByKey('faq_1_question', 'faq')?.value || "How do you secure our data?",
      answer: getContentByKey('faq_1_answer', 'faq')?.value || "Security is non-negotiable. We employ industry-standard encryption (TLS in transit, AES-256 at rest), role-based access control, audit logs, and tenant isolation for multi-client environments. We can operate within private VPCs, support on-prem deployments, or use cloud-hosted models under strict data governance rules. We provide SOC2 / ISO controls upon request and support data residency requirements.",
      icon: Shield,
      category: getContentByKey('faq_1_category', 'faq')?.value || "Security"
    },
    {
      question: getContentByKey('faq_2_question', 'faq')?.value || "Will this change our processes or require retraining staff?",
      answer: getContentByKey('faq_2_answer', 'faq')?.value || "Our approach prioritises minimal disruption. We map current processes and design agents to slot into existing workflows. Where change is required, we provide clear change-management plans, role-based training sessions, and operator runbooks. We recommend a 'train the trainer' model to accelerate adoption.",
      icon: Settings,
      category: getContentByKey('faq_2_category', 'faq')?.value || "Implementation"
    },
    {
      question: getContentByKey('faq_3_question', 'faq')?.value || "Do we need to upgrade our IT infrastructure?",
      answer: getContentByKey('faq_3_answer', 'faq')?.value || "In most cases — no. Our agents integrate via APIs, webhooks, or lightweight connectors. When complex legacy systems require adapters, we build secure middleware. We produce an integration matrix during discovery to estimate effort and provide options for SaaS, hybrid, or on-prem architectures.",
      icon: Server,
      category: getContentByKey('faq_3_category', 'faq')?.value || "Technical"
    },
    {
      question: getContentByKey('faq_4_question', 'faq')?.value || "How do you manage errors and edge cases?",
      answer: getContentByKey('faq_4_answer', 'faq')?.value || "We implement human-in-the-loop workflows, clear escalation rules, and confidence thresholds to prevent incorrect automation. Every agent has audit trails and can be placed into monitoring mode where low-confidence decisions are routed to a human reviewer until sufficient confidence is reached.",
      icon: AlertTriangle,
      category: getContentByKey('faq_4_category', 'faq')?.value || "Operations"
    },
    {
      question: getContentByKey('faq_5_question', 'faq')?.value || "What SLAs & support do you offer?",
      answer: getContentByKey('faq_5_answer', 'faq')?.value || "We offer SLAs for uptime, response times for incidents, and scheduled optimization windows. Support tiers are flexible — from knowledge transfer to fully managed operations where Keen Agents runs and optimizes the agent on your behalf.",
      icon: Headphones,
      category: getContentByKey('faq_5_category', 'faq')?.value || "Support"
    },
    {
      question: getContentByKey('faq_6_question', 'faq')?.value || "How long does implementation typically take?",
      answer: getContentByKey('faq_6_answer', 'faq')?.value || "Implementation timelines vary based on complexity, but our typical process takes 8-16 weeks from discovery to production. Simple use cases can be deployed in 4-6 weeks, while complex enterprise integrations may take 12-20 weeks. We provide detailed timelines during the discovery phase.",
      icon: HelpCircle,
      category: getContentByKey('faq_6_category', 'faq')?.value || "Timeline"
    }
  ]

  const categories = ["All", "Security", "Implementation", "Technical", "Operations", "Support", "Timeline"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredFAQs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <CMSContent
            section="faq"
            contentKey="title"
            fallback="Frequently Asked Questions"
            as="h2"
            className="text-4xl md:text-5xl font-bold text-keen-gray mb-6"
          />
          <CMSContent
            section="faq"
            contentKey="description"
            fallback="Get answers to common questions about AI agent implementation, security, and support."
            as="p"
            className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-keen-blue text-white shadow-lg'
                  : 'bg-gray-100 text-keen-gray hover:bg-keen-blue/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="mb-4"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-keen-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <faq.icon className="w-5 h-5 text-keen-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-keen-gray">
                        {faq.question}
                      </h3>
                      <span className="text-sm text-keen-blue font-medium">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openFAQ === index ? (
                      <Minus className="w-6 h-6 text-keen-blue" />
                    ) : (
                      <Plus className="w-6 h-6 text-keen-blue" />
                    )}
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-keen-gray/70 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-keen-blue/5 to-keen-gradient-end/5 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-keen-gray mb-4">
              Still Have Questions?
            </h3>
            <p className="text-xl text-keen-gray/80 mb-8 max-w-2xl mx-auto">
              Our team is here to help. Schedule a consultation to discuss your specific needs and get personalized answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Schedule Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Contact Support
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
