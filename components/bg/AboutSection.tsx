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

export default function BulgarianAboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const leadership = [
    {
      name: "Петър Денев",
      role: "Съосновател и CEO",
      bio: "30+ години ръководене на технологии и програми за дигитална трансформация в предприятия и средни компании. Петър беше вдъхновен да съосновава Keen Agents след като видя безброй бизнеси да се борят с ръчни, повтарящи се процеси, които могат да бъдат автоматизирани. Неговата визия е да демократизира AI автоматизацията, правейки я достъпна за бизнеси от всички размери без сложността и бариерите за разходи, които традиционно са съществували.",
      highlights: [
        "Трансформации на операции в множество страни",
        "Големи интеграции",
        "Експертиза в управление на данни",
        "Ръководство на управление на промените"
      ],
      icon: Target,
      color: "from-keen-blue to-keen-gradient-end"
    },
    {
      name: "Виктор [Фамилия]",
      role: "Съосновател и CTO",
      bio: "Архитект на AI системи и продуктов лидер с опит във внедряване на автоматизация в мащаб. Виктор беше мотивиран да съосновава Keen Agents от пропастта между AI изследванията и практическото бизнес внедряване. След като видя потенциала на AI агентите в производствени среди, той беше вдъхновен да създаде платформа, която прави AI автоматизацията достъпна, надеждна и печеливша за бизнеси без изискване на дълбоки технически познания.",
      highlights: [
        "Ръководство на екип за ML инженеринг",
        "NLP и RPA решения",
        "Архитектура за устойчива интеграция",
        "Автоматизация в производствен мащаб"
      ],
      icon: Lightbulb,
      color: "from-green-500 to-emerald-500"
    }
  ]

  const companyValues = [
    {
      icon: Target,
      title: "Фокусирани върху резултата",
      description: "Ние доставяме измерени бизнес резултати, не само технологични експерименти.",
      color: "from-keen-blue to-keen-gradient-end"
    },
    {
      icon: Users,
      title: "Ориентирани към клиента",
      description: "Всяко решение е адаптирано към вашите специфични бизнес нужди и ограничения.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Доказана експертиза",
      description: "Десетилетия комбиниран опит в корпоративни технологии и AI внедряване.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Globe,
      title: "Мащабируеми решения",
      description: "Изградени да растат с вашия бизнес и да се адаптират към променящи се изисквания.",
      color: "from-orange-500 to-red-500"
    }
  ]

  const stats = [
    { number: "30+", label: "Години комбиниран опит", icon: Briefcase },
    { number: "100%", label: "Процент успех на клиенти", icon: Award },
    { number: "24/7", label: "Налична поддръжка", icon: Globe },
    { number: "99.9%", label: "SLA за време на работа", icon: Target }
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
            За нас
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            Keen Agents беше основана за да преодолее пропастта между AI изследванията и практическото бизнес въздействие. Нашето ръководство комбинира десетилетия корпоративни технологии, инженеринг на процеси и приложен AI.
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
        <div className="space-y-16 mb-20">
          {leadership.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100"
            >
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                {/* Left Column - Photo & Basic Info */}
                <div className="text-center lg:text-left">
                  <div className={`w-24 h-24 bg-gradient-to-br ${leader.color} rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6`}>
                    <leader.icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-keen-gray mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-keen-blue font-semibold mb-6">
                    {leader.role}
                  </p>
                </div>

                {/* Middle Column - Bio */}
                <div className="lg:col-span-2">
                  <p className="text-keen-gray/80 leading-relaxed mb-8">
                    {leader.bio}
                  </p>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-lg font-semibold text-keen-gray mb-4">
                      Ключови области на експертиза:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {leader.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-keen-blue rounded-full flex-shrink-0" />
                          <span className="text-keen-gray/80 text-sm">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-keen-gray mb-12 text-center">
            Нашите ценности
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-keen-blue to-keen-gradient-end rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Готови ли сте да работим заедно?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Нашият екип от експерти е готов да ви помогне да трансформирате вашия бизнес с AI автоматизация.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '#questionnaire'}
              className="bg-white text-keen-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2 mx-auto"
            >
              <span>Свържете се с нас</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
