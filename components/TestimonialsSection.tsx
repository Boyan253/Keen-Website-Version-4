'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Quote, 
  Star, 
  TrendingUp, 
  Clock, 
  Users,
  CheckCircle,
  ArrowRight,
  Play
} from 'lucide-react'
import CMSContent from './CMSContent'

export default function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const caseStudies = [
    {
      company: "Unimasters Logistics",
      industry: "Logistics & Customer Service",
      challenge: "High volumes of routine customer inquiries overwhelmed the support desk during peak hours, leading to delayed responses and customer dissatisfaction",
      solution: "Deployed a customer-service AI agent trained on Unimasters Logistics' historical tickets, internal knowledge base, and ERP product catalog with phased rollout and human fallback",
      results: {
        automation: "70% of inquiries automated within 8 weeks",
        responseTime: "85% reduction in average response time",
        satisfaction: "12 points increase in customer satisfaction (NPS)"
      },
      quote: "Keen Agents allowed us to reclaim our team's time and dramatically improve response quality.",
      author: "Customer Service Director, Unimasters Logistics",
      color: "from-blue-500 to-cyan-500",
      companyKey: "case_study_1_company",
      industryKey: "case_study_1_industry",
      challengeKey: "case_study_1_challenge",
      solutionKey: "case_study_1_solution",
      quoteKey: "case_study_1_quote",
      authorKey: "case_study_1_author"
    },
    {
      company: "Renault",
      industry: "Operations",
      challenge: "Slow back-office processing created order fulfillment delays",
      solution: "Built an order-processing agent that validated incoming orders, enriched records, and routed exceptions to human reviewers",
      results: {
        processingTime: "30% reduction in order processing time",
        costReduction: "25% drop in administrative cost in first 3 months",
        errorRate: "40% reduction in error rate"
      },
      quote: "ROI was visible within weeks — the integration was seamless and low-risk.",
      author: "Operations Director, Renault",
      color: "from-green-500 to-emerald-500",
      companyKey: "case_study_2_company",
      industryKey: "case_study_2_industry",
      challengeKey: "case_study_2_challenge",
      solutionKey: "case_study_2_solution",
      quoteKey: "case_study_2_quote",
      authorKey: "case_study_2_author"
    }
  ]

  const homepageQuotes = [
    {
      quote: "Keen Agents transformed how we operate — their agents are reliable and require minimal oversight.",
      author: "Executive, Unimasters Logistics",
      company: "Unimasters Logistics"
    },
    {
      quote: "Fast ROI, no IT drama, measurable impact.",
      author: "Operations Director, Renault",
      company: "Renault"
    }
  ]

  const metrics = [
    { value: "70%", label: "Average automation rate", icon: TrendingUp, valueKey: "metric_1_value", labelKey: "metric_1_label" },
    { value: "85%", label: "Faster response times", icon: Clock, valueKey: "metric_2_value", labelKey: "metric_2_label" },
    { value: "25%", label: "Cost reduction", icon: CheckCircle, valueKey: "metric_3_value", labelKey: "metric_3_label" },
    { value: "99.9%", label: "Uptime SLA", icon: Users, valueKey: "metric_4_value", labelKey: "metric_4_label" }
  ]

  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <CMSContent
            section="testimonials"
            contentKey="title"
            fallback="Success Stories"
            as="h2"
            className="text-4xl md:text-5xl font-bold text-keen-gray mb-6"
          />
          <CMSContent
            section="testimonials"
            contentKey="description"
            fallback="Real companies, real results. See how forward-thinking organizations are using AI agents to transform their operations."
            as="p"
            className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed"
          />
        </motion.div>

        {/* Metrics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-keen-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-8 h-8 text-keen-blue" />
              </div>
              <CMSContent
                section="testimonials"
                contentKey={metric.valueKey}
                fallback={metric.value}
                as="div"
                className="text-3xl font-bold text-keen-blue mb-2"
              />
              <CMSContent
                section="testimonials"
                contentKey={metric.labelKey}
                fallback={metric.label}
                as="div"
                className="text-keen-gray/70 font-medium"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-16 mb-20">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Column - Company Info & Challenge */}
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${study.color} rounded-2xl flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-white">
                        {study.company.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CMSContent
                        section="testimonials"
                        contentKey={study.companyKey}
                        fallback={study.company}
                        as="h3"
                        className="text-2xl font-bold text-keen-gray"
                      />
                      <CMSContent
                        section="testimonials"
                        contentKey={study.industryKey}
                        fallback={study.industry}
                        as="p"
                        className="text-keen-blue font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-keen-gray mb-3">
                        Challenge
                      </h4>
                      <CMSContent
                        section="testimonials"
                        contentKey={study.challengeKey}
                        fallback={study.challenge}
                        as="p"
                        className="text-keen-gray/70 leading-relaxed"
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-keen-gray mb-3">
                        Solution
                      </h4>
                      <CMSContent
                        section="testimonials"
                        contentKey={study.solutionKey}
                        fallback={study.solution}
                        as="p"
                        className="text-keen-gray/70 leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Results & Quote */}
                <div>
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-keen-gray mb-4">
                      Results
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(study.results).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-keen-gray/80 font-medium">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <Quote className="w-8 h-8 text-keen-blue mb-4" />
                    <CMSContent
                      section="testimonials"
                      contentKey={study.quoteKey}
                      fallback={`"${study.quote}"`}
                      as="p"
                      className="text-lg text-keen-gray italic mb-4 leading-relaxed"
                    />
                    <CMSContent
                      section="testimonials"
                      contentKey={study.authorKey}
                      fallback={`— ${study.author}`}
                      as="div"
                      className="text-keen-blue font-semibold"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Homepage Testimonial Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {homepageQuotes.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-keen-blue/5 to-keen-gradient-end/5 rounded-2xl p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg text-keen-gray italic mb-4 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-keen-blue font-semibold">
                — {testimonial.author}
              </div>
              <div className="text-keen-gray/70 text-sm mt-1">
                {testimonial.company}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Testimonial Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-to-br from-keen-blue to-keen-gradient-end rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              See It In Action
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Watch how our AI agents work in real business environments
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-keen-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </motion.button>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-12 shadow-lg border border-gray-100">
            <h3 className="text-3xl font-bold text-keen-gray mb-4">
              Ready to Join These Success Stories?
            </h3>
            <p className="text-xl text-keen-gray/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how AI agents can transform your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <span>Start Your Success Story</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Download Case Studies
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
