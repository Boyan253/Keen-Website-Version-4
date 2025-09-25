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

export default function BulgarianTestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const caseStudies = [
    {
      company: "Unimasters Logistics",
      industry: "Логистика и клиентска поддръжка",
      challenge: "Големи обеми от рутинни клиентски запитвания претоварваха поддържащия деск по време на пикови часове, водещи до забавени отговори и недоволство на клиентите",
      solution: "Внедрихме клиентски AI агент, обучен на историческите билети на Unimasters Logistics, вътрешната база знания и каталога на ERP продуктите с постепенно внедряване и човешка поддръжка",
      results: {
        automation: "70% от запитванията автоматизирани за 8 седмици",
        responseTime: "85% намаляване на средното време за отговор",
        satisfaction: "12 точки увеличение на удовлетвореността на клиентите (NPS)"
      },
      quote: "Keen Agents ни позволи да си върнем времето на екипа и драматично да подобрим качеството на отговорите.",
      author: "Директор клиентска поддръжка, Unimasters Logistics",
      color: "from-blue-500 to-cyan-500"
    },
    {
      company: "Renault",
      industry: "Операции",
      challenge: "Бавната обработка в администрацията създаваше забавяния при изпълнение на поръчки",
      solution: "Изградихме агент за обработка на поръчки, който валидира входящи поръчки, обогатява записи и насочва изключения към човешки рецензенти",
      results: {
        processingTime: "30% намаляване на времето за обработка на поръчки",
        costReduction: "25% спад на административните разходи в първите 3 месеца",
        errorRate: "40% намаляване на процента на грешки"
      },
      quote: "ROI беше видим за седмици — интеграцията беше безпроблемна и с нисък риск.",
      author: "Директор операции, Renault",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const homepageQuotes = [
    {
      quote: "Keen Agents трансформира как работим — техните агенти са надеждни и изискват минимален надзор.",
      author: "Изпълнителен директор, Unimasters Logistics",
      company: "Unimasters Logistics"
    },
    {
      quote: "Бърз ROI, без IT драма, измеримо въздействие.",
      author: "Директор операции, Renault",
      company: "Renault"
    }
  ]

  const metrics = [
    { value: "70%", label: "Среден процент автоматизация", icon: TrendingUp },
    { value: "85%", label: "По-бързи времена за отговор", icon: Clock },
    { value: "25%", label: "Намаляване на разходите", icon: CheckCircle },
    { value: "99.9%", label: "SLA за време на работа", icon: Users }
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
          <h2 className="text-4xl md:text-5xl font-bold text-keen-gray mb-6">
            Истории за успех
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            Реални компании, реални резултати. Вижте как прогресивните организации използват AI агенти за трансформиране на своите операции.
          </p>
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
              <div className="text-3xl font-bold text-keen-blue mb-2">
                {metric.value}
              </div>
              <div className="text-keen-gray/70 font-medium">
                {metric.label}
              </div>
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
                      <h3 className="text-2xl font-bold text-keen-gray">
                        {study.company}
                      </h3>
                      <p className="text-keen-blue font-semibold">
                        {study.industry}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-keen-gray mb-3">
                        Предизвикателство
                      </h4>
                      <p className="text-keen-gray/70 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-keen-gray mb-3">
                        Решение
                      </h4>
                      <p className="text-keen-gray/70 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Results & Quote */}
                <div>
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-keen-gray mb-4">
                      Резултати
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
                    <blockquote className="text-lg text-keen-gray italic mb-4 leading-relaxed">
                      "{study.quote}"
                    </blockquote>
                    <div className="text-keen-blue font-semibold">
                      — {study.author}
                    </div>
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
              Вижте го в действие
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Гледайте как нашите AI агенти работят в реални бизнес среди
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-keen-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              <span>Гледайте демо</span>
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
              Готови ли сте да се присъедините към тези истории за успех?
            </h3>
            <p className="text-xl text-keen-gray/80 mb-8 max-w-2xl mx-auto">
              Нека обсъдим как AI агентите могат да трансформират вашите бизнес операции.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '#questionnaire'}
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
              >
                <span>Започнете вашата история за успех</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4"
              >
                Изтеглете казуси
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
