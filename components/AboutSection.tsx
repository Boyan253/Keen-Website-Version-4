'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Users, 
  Target, 
  Award, 
  Lightbulb,
  Briefcase,
  GraduationCap,
  Globe,
  ArrowRight
} from 'lucide-react'

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const leadership = [
    {
      name: "Petar Denev",
      role: "Co-founder & CEO",
      bio: "30+ years leading technology and digital transformation programs across enterprise and mid-market organisations. Petar was inspired to co-found Keen Agents after witnessing countless businesses struggle with manual, repetitive processes that could be automated. His vision is to democratize AI automation, making it accessible to businesses of all sizes without the complexity and cost barriers that have traditionally existed.",
      highlights: [
        "Multi-country operations transformations",
        "Large-scale integrations",
        "Data governance expertise",
        "Change management leadership"
      ],
      icon: Target,
      color: "from-keen-blue to-keen-gradient-end"
    },
    {
      name: "Viktor [Last Name]",
      role: "Co-founder & CTO",
      bio: "AI systems architect and product leader with experience deploying automation at scale. Viktor was driven to co-found Keen Agents by the gap between AI research and practical business implementation. Having seen the potential of AI agents in production environments, he was inspired to create a platform that makes AI automation accessible, reliable, and profitable for businesses without requiring deep technical expertise.",
      highlights: [
        "ML engineering team leadership",
        "NLP and RPA solutions",
        "Resilient integration architecture",
        "Production-scale automation"
      ],
      icon: Lightbulb,
      color: "from-green-500 to-emerald-500"
    }
  ]

  const companyValues = [
    {
      icon: Target,
      title: "Outcome-Focused",
      description: "We deliver measurable business results, not just technology experiments.",
      color: "from-keen-blue to-keen-gradient-end"
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Every solution is tailored to your specific business needs and constraints.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Proven Expertise",
      description: "Decades of combined experience in enterprise technology and AI deployment.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Globe,
      title: "Scalable Solutions",
      description: "Built to grow with your business and adapt to changing requirements.",
      color: "from-orange-500 to-red-500"
    }
  ]

  const stats = [
    { number: "30+", label: "Years Combined Experience", icon: Briefcase },
    { number: "100%", label: "Client Success Rate", icon: Award },
    { number: "24/7", label: "Support Available", icon: Globe },
    { number: "99.9%", label: "Uptime SLA", icon: Target }
  ]

  return (
    <section id="about" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-keen-gray mb-6">
            About Us
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            Keen Agents was founded to bridge the gap between AI research and practical business impact. Our leadership combines decades of enterprise technology, process engineering, and applied AI.
          </p>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-keen-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-keen-blue" />
              </div>
              <div className="text-3xl font-bold text-keen-blue mb-2">
                {stat.number}
              </div>
              <div className="text-keen-gray/70 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Leadership Team */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl font-bold text-keen-gray text-center mb-12"
          >
            Leadership Team
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start space-x-6 mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${leader.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <leader.icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-keen-gray mb-2">
                      {leader.name}
                    </h4>
                    <p className="text-keen-blue font-semibold text-lg">
                      {leader.role}
                    </p>
                  </div>
                </div>
                
                <p className="text-keen-gray/70 leading-relaxed mb-6">
                  {leader.bio}
                </p>
                
                <div>
                  <h5 className="text-lg font-semibold text-keen-gray mb-4">
                    Key Expertise:
                  </h5>
                  <div className="grid grid-cols-1 gap-2">
                    {leader.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-keen-blue rounded-full flex-shrink-0" />
                        <span className="text-keen-gray/80 text-sm">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-keen-gray text-center mb-12">
            Our Values
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-keen-gray mb-4">
                  {value.title}
                </h4>
                <p className="text-keen-gray/70 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="bg-gradient-to-r from-keen-blue to-keen-gradient-end rounded-3xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-6">
            Our Mission
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-4xl mx-auto leading-relaxed">
            To democratize AI automation by making it accessible, reliable, and profitable for businesses of all sizes. We believe every company should have access to AI employees that work tirelessly to improve their operations, reduce costs, and enhance customer experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-keen-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2"
            >
              <span>Join Our Mission</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-keen-blue transition-colors duration-300"
            >
              Learn More About Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
