'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Search, 
  Map, 
  Cog, 
  Rocket, 
  Scale,
  CheckCircle,
  Clock,
  Users,
  ArrowRight
} from 'lucide-react'
import CMSContent from './CMSContent'
import { useCMS } from '@/lib/cms/context'

export default function ProcessSection() {
  const { getContentByKey } = useCMS()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Get deliverables from CMS
  const phase1DeliverablesRaw = getContentByKey('phase_1_deliverables', 'process')?.value
  const phase1Deliverables = phase1DeliverablesRaw 
    ? JSON.parse(phase1DeliverablesRaw)
    : ["Process maps", "Success metrics", "Data inventory", "Integration matrix"]

  const phase2DeliverablesRaw = getContentByKey('phase_2_deliverables', 'process')?.value
  const phase2Deliverables = phase2DeliverablesRaw 
    ? JSON.parse(phase2DeliverablesRaw)
    : ["Prototype agent", "Test cases", "Sandbox connector(s)"]

  const phase3DeliverablesRaw = getContentByKey('phase_3_deliverables', 'process')?.value
  const phase3Deliverables = phase3DeliverablesRaw 
    ? JSON.parse(phase3DeliverablesRaw)
    : ["Pilot deployment", "Monitoring dashboard", "Pilot report with ROI analysis"]

  const continuousDeliverablesRaw = getContentByKey('continuous_deliverables', 'process')?.value
  const continuousDeliverables = continuousDeliverablesRaw 
    ? JSON.parse(continuousDeliverablesRaw)
    : ["Production rollout", "Training materials", "Performance SLA", "Continuous optimization plan"]

  const phases = [
    {
      phase: 1,
      title: getContentByKey('phase_1_title', 'process')?.value || "Discovery & Process Mapping",
      subtitle: getContentByKey('phase_1_subtitle', 'process')?.value || "Deeply understand workflows and data sources",
      icon: Map,
      duration: getContentByKey('phase_1_duration', 'process')?.value || "1-2 weeks",
      deliverables: phase1Deliverables,
      color: "from-green-500 to-emerald-500",
      description: getContentByKey('phase_1_description', 'process')?.value || "We interview stakeholders, run shadowing sessions, and map your end-to-end processes to understand every decision point and KPI."
    },
    {
      phase: 2,
      title: getContentByKey('phase_2_title', 'process')?.value || "Agent Design & Prototype",
      subtitle: getContentByKey('phase_2_subtitle', 'process')?.value || "Build a narrow-scope prototype agent",
      icon: Cog,
      duration: getContentByKey('phase_2_duration', 'process')?.value || "2-4 weeks",
      deliverables: phase2Deliverables,
      color: "from-purple-500 to-violet-500",
      description: getContentByKey('phase_2_description', 'process')?.value || "We build an MVP agent that automates a clearly scoped task, defining intents, conversation flows, and validation rules."
    },
    {
      phase: 3,
      title: getContentByKey('phase_3_title', 'process')?.value || "Integration & Pilot",
      subtitle: getContentByKey('phase_3_subtitle', 'process')?.value || "Deploy into controlled pilot with live data",
      icon: Rocket,
      duration: getContentByKey('phase_3_duration', 'process')?.value || "2-6 weeks",
      deliverables: phase3Deliverables,
      color: "from-orange-500 to-red-500",
      description: getContentByKey('phase_3_description', 'process')?.value || "We deploy the agent into a controlled pilot with live data, setting up telemetry, logging, and human escalation paths."
    }
  ]

  const continuousImprovement = {
    title: getContentByKey('continuous_title', 'process')?.value || "Continuous Improvement & Operations",
    subtitle: getContentByKey('continuous_subtitle', 'process')?.value || "Roll into production with ongoing optimization",
    icon: Scale,
    duration: getContentByKey('continuous_duration', 'process')?.value || "Ongoing",
    deliverables: continuousDeliverables,
    color: "from-keen-blue to-keen-gradient-end",
    description: getContentByKey('continuous_description', 'process')?.value || "We roll the agent into production, document runbooks, and hand over an operations model or continue operating on your behalf."
  }

  // Get role data from CMS
  const clientTitle = getContentByKey('role_client_title', 'process')?.value || 'Client'
  const clientResponsibilitiesRaw = getContentByKey('role_client_responsibilities', 'process')?.value
  const clientResponsibilities = clientResponsibilitiesRaw 
    ? JSON.parse(clientResponsibilitiesRaw)
    : ["Describe current business processes", "Define business needs and requirements", "Provide access to subject-matter experts", "Approve process maps", "Participate in pilot acceptance"]

  const keenTitle = getContentByKey('role_keen_title', 'process')?.value || 'Keen Agents'
  const keenResponsibilitiesRaw = getContentByKey('role_keen_responsibilities', 'process')?.value
  const keenResponsibilities = keenResponsibilitiesRaw 
    ? JSON.parse(keenResponsibilitiesRaw)
    : ["Understand and analyze business processes", "Optimize processes together with client (when needed)", "Deploy and configure our AI platform", "Set up agents to execute tasks according to client's specific processes"]

  const roles = [
    {
      title: clientTitle,
      responsibilities: clientResponsibilities,
      icon: Users
    },
    {
      title: keenTitle,
      responsibilities: keenResponsibilities,
      icon: CheckCircle
    }
  ]

  return (
    <section id="process" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-keen-gray mb-6">
            Rapid Implementation Process
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            Our streamlined three-phase framework delivers production-ready AI agents in days, not months. Each phase is optimized for speed while maintaining quality and safety.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative mb-20">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-keen-blue to-keen-gradient-end rounded-full hidden lg:block" />
          
          <div className="space-y-12">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex flex-col lg:flex-row lg:items-center gap-8"
              >
                {/* Phase Number & Icon */}
                <div className="flex items-center space-x-4 lg:w-1/3">
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <phase.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-keen-blue">
                      <span className="text-sm font-bold text-keen-blue">{phase.phase}</span>
                    </div>
                  </div>
                  <div className="lg:hidden">
                    <div className="text-sm font-semibold text-keen-blue mb-1">
                      Phase {phase.phase}
                    </div>
                    <div className="flex items-center text-keen-gray/70">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{phase.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Phase Content */}
                <div className="lg:w-2/3">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-keen-gray mb-2">
                          {phase.title}
                        </h3>
                        <p className="text-keen-blue font-semibold mb-4">
                          {phase.subtitle}
                        </p>
                        <p className="text-keen-gray/70 leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                      <div className="lg:text-center mt-4 lg:mt-0">
                        <div className="inline-flex items-center px-4 py-2 bg-keen-blue/10 rounded-full">
                          <Clock className="w-4 h-4 mr-2 text-keen-blue" />
                          <span className="text-sm font-semibold text-keen-blue">
                            {phase.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="text-lg font-semibold text-keen-gray mb-4">
                        Deliverables:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.deliverables.map((deliverable: string, idx: number) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-keen-gray/80 text-sm">
                              {deliverable}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Continuous Improvement Section - Non-numbered */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative flex flex-col lg:flex-row lg:items-center gap-8"
            >
              {/* Icon without number */}
              <div className="flex items-center space-x-4 lg:w-1/3">
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${continuousImprovement.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <continuousImprovement.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="lg:hidden">
                  <div className="flex items-center text-keen-gray/70">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{continuousImprovement.duration}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-2/3">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-keen-gray mb-2">
                        {continuousImprovement.title}
                      </h3>
                      <p className="text-keen-blue font-semibold mb-4">
                        {continuousImprovement.subtitle}
                      </p>
                      <p className="text-keen-gray/70 leading-relaxed">
                        {continuousImprovement.description}
                      </p>
                    </div>
                    <div className="lg:text-center mt-4 lg:mt-0">
                      <div className="inline-flex items-center px-4 py-2 bg-keen-blue/10 rounded-full">
                        <Clock className="w-4 h-4 mr-2 text-keen-blue" />
                        <span className="text-sm font-semibold text-keen-blue">
                          {continuousImprovement.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <h4 className="text-lg font-semibold text-keen-gray mb-4">
                      Deliverables:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {continuousImprovement.deliverables.map((deliverable: string, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-keen-gray/80 text-sm">
                            {deliverable}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Roles & Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
        >
          <CMSContent
            section="process"
            contentKey="roles_title"
            fallback="Who Does What"
            as="h3"
            className="text-2xl font-bold text-keen-gray mb-8 text-center"
          />
          <div className="grid md:grid-cols-2 gap-8">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-keen-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <role.icon className="w-8 h-8 text-keen-blue" />
                </div>
                <h4 className="text-xl font-bold text-keen-gray mb-4">
                  {role.title}
                </h4>
                <ul className="space-y-2 text-left">
                  {role.responsibilities.map((responsibility: string, idx: number) => (
                    <li key={idx} className="text-keen-gray/70 text-sm flex items-start">
                      <span className="mr-2">•</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-keen-blue to-keen-gradient-end rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready for Rapid AI Deployment?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Our streamlined process delivers production-ready AI agents in days, not months. Start your rapid implementation today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-keen-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2 mx-auto"
            >
              <span>Start Rapid Implementation</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
