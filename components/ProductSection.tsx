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

export default function ProductSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const valueProps = [
    {
      icon: Bot,
      title: "AI Employees, Not Bots",
      description: "Task-specific agents that perform roles (customer support, order processing, claims triage, data entry) with SLA-level reliability.",
      color: "from-keen-blue to-keen-gradient-end"
    },
    {
      icon: TrendingUp,
      title: "Measurable ROI",
      description: "Typical outcomes include faster processing times, fewer errors, and lower operational spend.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "No IT Disruption",
      description: "Integrates with existing systems via APIs, connectors, or secure middleware.",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Users,
      title: "Human-in-the-loop",
      description: "Safe escalation paths and supervised decisioning for high-risk cases.",
      color: "from-orange-500 to-red-500"
    }
  ]

  const features = [
    {
      icon: Zap,
      title: "Process Automation",
      description: "Reduce manual processing, enforce business rules, and eliminate repetitive errors.",
      stats: "85% reduction in manual tasks"
    },
    {
      icon: Clock,
      title: "Customer Experience",
      description: "Faster responses, contextual answers, and consistent service 24/7.",
      stats: "24/7 availability"
    },
    {
      icon: CheckCircle,
      title: "Operational Resilience",
      description: "Scale instantly without hiring; maintain performance during peak demand.",
      stats: "99.9% uptime SLA"
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
          <h2 className="text-4xl md:text-5xl font-bold text-keen-gray mb-6">
            What We Do
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            We do not sell our software platform — we deliver business outcomes. Working with our proprietary software platform, we design, train and operate custom AI agents that behave like YOUR high-performing employees.
          </p>
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
                <h3 className="text-xl font-bold text-keen-gray mb-4">
                  {prop.title}
                </h3>
                <p className="text-keen-gray/70 leading-relaxed">
                  {prop.description}
                </p>
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
                    <h3 className="text-xl font-bold text-keen-gray">
                      {feature.title}
                    </h3>
                    <div className="text-sm font-semibold text-keen-blue">
                      {feature.stats}
                    </div>
                  </div>
                </div>
                <p className="text-keen-gray/70 leading-relaxed mb-6">
                  {feature.description}
                </p>
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
            <h3 className="text-3xl font-bold text-keen-gray mb-4">
              Ready to Deploy Your AI Employees?
            </h3>
            <p className="text-xl text-keen-gray/80 mb-8 max-w-2xl mx-auto">
              Join forward-thinking companies already using AI agents to transform their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Your AI Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                View Case Studies
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
