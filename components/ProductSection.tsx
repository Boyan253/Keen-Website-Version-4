'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Bot, 
  TrendingUp, 
  Shield, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Zap
} from 'lucide-react'
import CMSContent from './CMSContent'

export default function ProductSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const valueProps = [
    {
      icon: Bot,
      title: "10x Faster POC",
      description: "Get from concept to working prototype in days, not months. Rapid validation of AI use cases with immediate business impact.",
      color: "from-keen-blue to-keen-gradient-end",
      titleKey: "value_prop_1_title",
      descKey: "value_prop_1_description"
    },
    {
      icon: TrendingUp,
      title: "Rapid Time-to-Value",
      description: "Deploy production-ready AI agents quickly with measurable ROI from day one. No lengthy implementation cycles.",
      color: "from-green-500 to-emerald-600",
      titleKey: "value_prop_2_title",
      descKey: "value_prop_2_description"
    },
    {
      icon: Shield,
      title: "Days, Not Months",
      description: "Simple deployment process that works with your existing systems. No complex integrations or IT overhauls required.",
      color: "from-purple-500 to-violet-600",
      titleKey: "value_prop_3_title",
      descKey: "value_prop_3_description"
    },
    {
      icon: Users,
      title: "Production-Ready",
      description: "Enterprise-grade AI agents that are immediately ready for production use with built-in monitoring and human oversight.",
      color: "from-orange-500 to-red-500",
      titleKey: "value_prop_4_title",
      descKey: "value_prop_4_description"
    }
  ]

  const features = [
    {
      icon: Zap,
      title: "Process Automation",
      description: "Reduce manual processing, enforce business rules, and eliminate repetitive errors.",
      stats: "85% reduction in manual tasks",
      titleKey: "feature_1_title",
      descKey: "feature_1_description",
      statsKey: "feature_1_stats"
    },
    {
      icon: Clock,
      title: "Customer Experience",
      description: "Faster responses, contextual answers, and consistent service 24/7.",
      stats: "24/7 availability",
      titleKey: "feature_2_title",
      descKey: "feature_2_description",
      statsKey: "feature_2_stats"
    },
    {
      icon: CheckCircle,
      title: "Operational Resilience",
      description: "Scale instantly without hiring; maintain performance during peak demand.",
      stats: "99.9% uptime SLA",
      titleKey: "feature_3_title",
      descKey: "feature_3_description",
      statsKey: "feature_3_stats"
    }
  ]

  return (
    <section id="product" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <CMSContent
            section="product"
            contentKey="title"
            fallback="AI Implementation Made Simple"
            as="h2"
            className="text-4xl md:text-5xl font-bold text-keen-gray mb-6"
          />
          <CMSContent
            section="product"
            contentKey="description"
            fallback="We do not sell our software platform — we deliver business outcomes. Working with our proprietary software platform, we design, train and operate custom AI agents that behave like YOUR high-performing employees."
            as="p"
            className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed"
          />
        </motion.div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                <div className={`w-16 h-16 bg-gradient-to-br ${prop.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <prop.icon className="w-8 h-8 text-white" />
                </div>
                <CMSContent
                  section="product"
                  contentKey={prop.titleKey}
                  fallback={prop.title}
                  as="h3"
                  className="text-xl font-bold text-keen-gray mb-4"
                />
                <CMSContent
                  section="product"
                  contentKey={prop.descKey}
                  fallback={prop.description}
                  as="p"
                  className="text-keen-gray/70 leading-relaxed"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-keen-blue/10 rounded-xl flex items-center justify-center group-hover:bg-keen-blue/20 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-keen-blue" />
                  </div>
                  <div>
                    <CMSContent
                      section="product"
                      contentKey={feature.titleKey}
                      fallback={feature.title}
                      as="h3"
                      className="text-xl font-bold text-keen-gray"
                    />
                    <CMSContent
                      section="product"
                      contentKey={feature.statsKey}
                      fallback={feature.stats}
                      as="div"
                      className="text-sm font-semibold text-keen-blue"
                    />
                  </div>
                </div>
                <CMSContent
                  section="product"
                  contentKey={feature.descKey}
                  fallback={feature.description}
                  as="p"
                  className="text-keen-gray/70 leading-relaxed mb-6"
                />
                <div className="flex items-center text-keen-blue font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-keen-blue/5 to-keen-gradient-end/5 rounded-3xl p-12">
            <CMSContent
              section="product"
              contentKey="cta_title"
              fallback="Ready for Rapid AI Implementation?"
              as="h3"
              className="text-3xl font-bold text-keen-gray mb-4"
            />
            <CMSContent
              section="product"
              contentKey="cta_description"
              fallback="Deploy production-ready AI agents in days, not months. Join forward-thinking companies already using our rapid implementation approach."
              as="p"
              className="text-xl text-keen-gray/80 mb-8 max-w-2xl mx-auto"
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                <CMSContent
                  section="product"
                  contentKey="cta_primary"
                  fallback="Start Rapid Implementation"
                  as="span"
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                <CMSContent
                  section="product"
                  contentKey="cta_secondary"
                  fallback="See 10x Faster POC"
                  as="span"
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
