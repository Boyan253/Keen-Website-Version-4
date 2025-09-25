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

export default function BulgarianFAQSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      question: "Как защитавате нашите данни?",
      answer: "Сигурността е необсъдима. Ние използваме криптиране по индустриални стандарти (TLS в транзит, AES-256 в покой), контрол на достъпа базиран на роли, одитни логове и изолация на клиенти за много-клиентски среди. Можем да работим в частни VPC, поддържаме внедряване на място, или използваме облачно хостирани модели под строги правила за управление на данни. Предоставяме SOC2 / ISO контроли при поискване и поддържаме изисквания за резидентност на данни.",
      icon: Shield,
      category: "Сигурност"
    },
    {
      question: "Ще промени ли това нашите процеси или ще изисква преобучване на персонала?",
      answer: "Нашият подход приоритизира минимални смущения. Ние картографираме текущите процеси и проектираме агенти да се вмъкнат в съществуващите работни потоци. Когато промяната е необходима, ние предоставяме ясни планове за управление на промените, сесии за обучение базирани на роли и ръководства за оператори. Препоръчваме модел 'обучи тренера' за ускоряване на приемане.",
      icon: Settings,
      category: "Внедряване"
    },
    {
      question: "Трябва ли да надстроим нашата IT инфраструктура?",
      answer: "В повечето случаи — не. Нашите агенти се интегрират чрез API, webhooks или леки конектори. Когато сложните наследени системи изискват адаптери, ние изграждаме сигурен междинен софтуер. Произвеждаме матрица за интеграция по време на откриването за оценка на усилията и предоставяме опции за SaaS, хибридни или архитектури на място.",
      icon: Server,
      category: "Технически"
    },
    {
      question: "Как управлявате грешки и гранични случаи?",
      answer: "Ние използваме многослойна стратегия за управление на грешки: автоматично повторение за временни смущения, ескалация към човешки рецензенти за сложни случаи, и непрекъснато обучение от обратна връзка. Всички решения са логирани и проследими, а ние предоставяме dashboard за мониторинг в реално време.",
      icon: AlertTriangle,
      category: "Операции"
    },
    {
      question: "Какво е времето за внедряване?",
      answer: "Типичното време за внедряване е 6-12 седмици от подписване до производство, в зависимост от сложността на процеса и интеграциите. Ние разделяме това на три фази: откриване (1-2 седмици), прототип (2-4 седмици), и пилот (2-6 седмици). Сложните интеграции могат да удължат времето, но ние винаги предоставяме реалистични оценки по време на откриването.",
      icon: Settings,
      category: "Време"
    },
    {
      question: "Какво ниво на поддръжка предоставяте?",
      answer: "Ние предоставяме 24/7 мониторинг и поддръжка с SLA за време на работа от 99.9%. Това включва превантивен мониторинг, бързо реагиране на инциденти, и регулярни доклади за производителност. Нашият екип за поддръжка е достъпен чрез множество канали и ние предоставяме ескалация за критични проблеми.",
      icon: Headphones,
      category: "Поддръжка"
    }
  ]

  const categories = ["Всички", "Сигурност", "Внедряване", "Технически", "Операции", "Време", "Поддръжка"]
  const [selectedCategory, setSelectedCategory] = useState("Всички")

  const filteredFAQs = selectedCategory === "Всички" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

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
          <h2 className="text-4xl md:text-5xl font-bold text-keen-gray mb-6">
            Често задавани въпроси
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            Отговори на най-често задаваните въпроси за нашите AI агенти и процеса на внедряване.
          </p>
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
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-keen-blue text-white shadow-lg'
                  : 'bg-gray-100 text-keen-gray hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-keen-blue/10 rounded-lg flex items-center justify-center">
                    <faq.icon className="w-5 h-5 text-keen-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-keen-gray mb-1">
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
                >
                  {openFAQ === index ? (
                    <Minus className="w-6 h-6 text-keen-blue" />
                  ) : (
                    <Plus className="w-6 h-6 text-keen-gray" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="pl-14">
                        <p className="text-keen-gray/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-keen-blue to-keen-gradient-end rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Не намерихте отговора, който търсите?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Нашият екип за поддръжка е тук да ви помогне с всички ваши въпроси.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-keen-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Свържете се с поддръжката</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '#questionnaire'}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-keen-blue transition-colors duration-300"
              >
                Направете AI готовност тест
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
