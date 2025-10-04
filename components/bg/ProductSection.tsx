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

export default function BulgarianProductSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const valueProps = [
    {
      icon: Bot,
      title: "10x По-бързо POC",
      description: "Получете от концепция до работещ прототип за дни, не месеци. Бърза валидация на AI случаи на използване с незабавно бизнес въздействие.",
      color: "from-keen-blue to-keen-gradient-end"
    },
    {
      icon: TrendingUp,
      title: "Бързо време до стойност",
      description: "Внедрявайте готови за производство AI агенти бързо с измерим ROI от първия ден. Без дълги цикли на внедряване.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Дни, не месеци",
      description: "Прост процес на внедряване, който работи с вашите съществуващи системи. Без сложни интеграции или IT преустройства.",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Users,
      title: "Готови за производство",
      description: "AI агенти на корпоративно ниво, които са веднага готови за производствено използване с вградено наблюдение и човешки надзор.",
      color: "from-orange-500 to-red-500"
    }
  ]

  const features = [
    {
      icon: Zap,
      title: "Автоматизация на процеси",
      description: "Намалете ръчната обработка, приложете бизнес правила и елиминирайте повтарящи се грешки.",
      stats: "85% намаляване на ръчните задачи"
    },
    {
      icon: Clock,
      title: "Клиентско изживяване",
      description: "По-бързи отговори, контекстуални отговори и последователно обслужване 24/7.",
      stats: "24/7 наличност"
    },
    {
      icon: CheckCircle,
      title: "Оперативна устойчивост",
      description: "Мащабирайте мигновено без наемане; поддържайте производителност по време на пиково търсене.",
      stats: "99.9% SLA за време на работа"
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
            AI внедряване направено просто
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            Ние не продаваме нашата софтуерна платформа — ние доставяме бизнес резултати. Работейки с нашата собствена софтуерна платформа, ние проектираме, обучаваме и управляваме персонализирани AI агенти, които се държат като ВАШИТЕ високопроизводителни служители.
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
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${prop.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <prop.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-keen-gray mb-4">
                {prop.title}
              </h3>
              <p className="text-keen-gray/70 leading-relaxed">
                {prop.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-12 h-12 bg-gradient-to-br from-keen-blue to-keen-gradient-end rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-keen-gray mb-4">
                {feature.title}
              </h3>
              <p className="text-keen-gray/70 leading-relaxed mb-4">
                {feature.description}
              </p>
              <div className="text-sm font-semibold text-keen-blue">
                {feature.stats}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-keen-blue to-keen-gradient-end rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Готови ли сте за бързо AI внедряване?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Внедрявайте готови за производство AI агенти за дни, не месеци. Присъединете се към прогресивните компании, които вече използват нашия бърз подход за внедряване.
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
