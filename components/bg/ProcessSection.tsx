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

export default function BulgarianProcessSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const phases = [
    {
      phase: 1,
      title: "Откриване и картографиране на процеси",
      subtitle: "Дълбоко разбиране на работните процеси и източниците на данни",
      icon: Map,
      duration: "1-2 седмици",
      deliverables: ["Карти на процеси", "Метрики за успех", "Инвентар на данни", "Матрица за интеграция"],
      color: "from-green-500 to-emerald-500",
      description: "Ние интервюираме заинтересованите страни, провеждаме сесии за наблюдение и картографираме вашите процеси от край до край, за да разберем всяка точка за вземане на решения и KPI."
    },
    {
      phase: 2,
      title: "Проектиране на агент и прототип",
      subtitle: "Изграждане на агент-прототип с тесен обхват",
      icon: Cog,
      duration: "2-4 седмици",
      deliverables: ["Прототип агент", "Тестови случаи", "Конектор(и) за пясъчник"],
      color: "from-purple-500 to-violet-500",
      description: "Ние изграждаме MVP агент, който автоматизира ясно обхваната задача, определяйки намерения, потоци от разговори и правила за валидация."
    },
    {
      phase: 3,
      title: "Интеграция и пилот",
      subtitle: "Внедряване в контролиран пилот с живи данни",
      icon: Rocket,
      duration: "2-6 седмици",
      deliverables: ["Пилотно внедряване", "Dashboard за мониторинг", "Пилотен доклад с анализ на ROI"],
      color: "from-orange-500 to-red-500",
      description: "Ние внедряваме агента в контролиран пилот с живи данни, настройвайки телеметрия, логиране и пътища за ескалация към човека."
    }
  ]

  const continuousImprovement = {
    title: "Непрекъснато подобряване и операции",
    subtitle: "Преминаване в производство с текуща оптимизация",
    icon: Scale,
    duration: "Постоянно",
    deliverables: ["Производствено внедряване", "Материали за обучение", "SLA за производителност", "План за непрекъсната оптимизация"],
    color: "from-keen-blue to-keen-gradient-end",
    description: "Ние преминаваме агента в производство, документираме ръководства и предаваме модел за операции или продължаваме да работим от ваше име."
  }

  const roles = [
    {
      title: "Клиент",
      responsibilities: ["Описва текущите бизнес процеси", "Определя бизнес нужди и изисквания", "Предоставя достъп до експерти по предмета", "Одобрява карти на процеси", "Участва в приемане на пилота"],
      icon: Users
    },
    {
      title: "Keen Agents",
      responsibilities: ["Разбира и анализира бизнес процеси", "Оптимизира процеси заедно с клиента (когато е необходимо)", "Внедрява и конфигурира нашата AI платформа", "Настройва агенти да изпълняват задачи според специфичните процеси на клиента"],
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
            Бърз процес на внедряване
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            Нашата опростена рамка в три фази доставя готови за производство AI агенти за дни, не месеци. Всяка фаза е оптимизирана за скорост, като запазва качеството и безопасността.
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
                      Фаза {phase.phase}
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
                        Доставки:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.deliverables.map((deliverable, idx) => (
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
                      Доставки:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {continuousImprovement.deliverables.map((deliverable, idx) => (
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
          <h3 className="text-2xl font-bold text-keen-gray mb-8 text-center">
            Кой какво прави
          </h3>
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
                  {role.responsibilities.map((responsibility, idx) => (
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
              Готови ли сте за бързо AI внедряване?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Нашият опростен процес доставя готови за производство AI агенти за дни, не месеци. Започнете вашето бързо внедряване днес.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '#questionnaire'}
              className="bg-white text-keen-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2 mx-auto"
            >
              <span>Започнете бързо внедряване</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
