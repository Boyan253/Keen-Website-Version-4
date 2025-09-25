'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, Brain, Clock, Users, Shield, TrendingUp } from 'lucide-react'

export default function BulgarianAIQuestionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: 1,
      question: "Имате ли цифрови записи на процеса, който искате да автоматизирате?",
      options: [
        { value: "yes", label: "Да, имаме изчерпателни цифрови записи" },
        { value: "partial", label: "Частично, някои процеси са документирани" },
        { value: "no", label: "Не, повечето процеси са ръчни или недокументирани" }
      ]
    },
    {
      id: 2,
      question: "Колко служители в момента обработват процеса, който искате да автоматизирате?",
      options: [
        { value: "1-2", label: "1-2 служители" },
        { value: "3-5", label: "3-5 служители" },
        { value: "6-10", label: "6-10 служители" },
        { value: "10+", label: "Повече от 10 служители" }
      ]
    },
    {
      id: 3,
      question: "Какво е средното време, прекарано за този процес на ден?",
      options: [
        { value: "1-2", label: "1-2 часа на ден" },
        { value: "3-5", label: "3-5 часа на ден" },
        { value: "6-8", label: "6-8 часа на ден" },
        { value: "8+", label: "Повече от 8 часа на ден" }
      ]
    },
    {
      id: 4,
      question: "Колко често възникват грешки в този процес?",
      options: [
        { value: "rarely", label: "Рядко (по-малко от 5% процент на грешки)" },
        { value: "sometimes", label: "Понякога (5-15% процент на грешки)" },
        { value: "often", label: "Често (15-30% процент на грешки)" },
        { value: "frequently", label: "Много често (повече от 30% процент на грешки)" }
      ]
    },
    {
      id: 5,
      question: "Каква е вашата текуща IT инфраструктура?",
      options: [
        { value: "modern", label: "Модерна, облачно-базирани системи с API" },
        { value: "mixed", label: "Смесена, някои модерни и някои наследени системи" },
        { value: "legacy", label: "Предимно наследени системи с ограничена интеграция" },
        { value: "minimal", label: "Минимална IT инфраструктура" }
      ]
    },
    {
      id: 6,
      question: "Колко важна е сигурността на данните за вашата организация?",
      options: [
        { value: "critical", label: "Критична - обработваме чувствителни данни" },
        { value: "important", label: "Важна - имаме някои чувствителни данни" },
        { value: "moderate", label: "Умерена - стандартни бизнес данни" },
        { value: "low", label: "Ниска - предимно публична информация" }
      ]
    },
    {
      id: 7,
      question: "Какъв е вашият бюджетен диапазон за AI автоматизация?",
      options: [
        { value: "10k-25k", label: "$10,000 - $25,000" },
        { value: "25k-50k", label: "$25,000 - $50,000" },
        { value: "50k-100k", label: "$50,000 - $100,000" },
        { value: "100k+", label: "Повече от $100,000" }
      ]
    },
    {
      id: 8,
      question: "Колко бързо трябва да видите резултати от автоматизацията?",
      options: [
        { value: "immediate", label: "Веднага (в рамките на 1 месец)" },
        { value: "quick", label: "Бързо (1-3 месеца)" },
        { value: "moderate", label: "Умерено (3-6 месеца)" },
        { value: "flexible", label: "Гъвкав график" }
      ]
    }
  ]

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer }
    setAnswers(newAnswers)
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const calculateScore = () => {
    let score = 0
    const totalQuestions = questions.length
    
    // Simple scoring logic based on readiness indicators
    Object.values(answers).forEach(answer => {
      switch(answer) {
        case 'yes':
        case 'modern':
        case 'critical':
        case '100k+':
          score += 4
          break
        case 'partial':
        case 'mixed':
        case 'important':
        case '50k-100k':
          score += 3
          break
        case 'sometimes':
        case 'legacy':
        case 'moderate':
        case '25k-50k':
          score += 2
          break
        default:
          score += 1
      }
    })
    
    return Math.round((score / (totalQuestions * 4)) * 100)
  }

  const getRecommendation = (score: number) => {
    if (score >= 80) {
      return {
        level: "Висока готовност",
        color: "from-green-500 to-emerald-500",
        icon: TrendingUp,
        message: "Вашата организация е добре позиционирана за AI автоматизация. Имате инфраструктурата, процесите и ресурсите, необходими за успешно внедряване.",
        nextSteps: [
          "Резервирайте разговори за откриване, за да обсъдите конкретни случаи на използване",
          "Прегледайте нашите казуси за подобни внедрявания",
          "Помислете за пилотен проект за валидиране на ROI"
        ]
      }
    } else if (score >= 60) {
      return {
        level: "Средна готовност",
        color: "from-blue-500 to-cyan-500",
        icon: Brain,
        message: "Имате добър потенциал за AI автоматизация с нужда от някаква подготовка. Фокусирайте се върху документиране на процеси и подобрения на инфраструктурата.",
        nextSteps: [
          "Документирайте подробно вашите текущи процеси",
          "Оценете нуждите от IT инфраструктура",
          "Започнете с малък пилотен проект"
        ]
      }
    } else {
      return {
        level: "Нужда от подготовка",
        color: "from-orange-500 to-red-500",
        icon: Clock,
        message: "Вашата организация ще се възползва от основна работа преди внедряване на AI автоматизация. Фокусирайте се върху оптимизация на процеси и инфраструктура.",
        nextSteps: [
          "Първо оптимизирайте вашите текущи процеси",
          "Подобрете качеството и документирането на данни",
          "Помислете за консултантски услуги за подготовка"
        ]
      }
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  if (showResults) {
    const score = calculateScore()
    const recommendation = getRecommendation(score)
    
    return (
      <section id="questionnaire" className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-keen-gray mb-6">
              Вашите резултати за AI готовност
            </h2>
            <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
              Въз основа на вашите отговори, ето вашата персонализирана оценка за AI готовност.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 mb-8"
            >
              <div className="text-center mb-8">
                <div className={`w-24 h-24 bg-gradient-to-br ${recommendation.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <recommendation.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-keen-gray mb-2">
                  {recommendation.level}
                </h3>
                <div className="text-4xl font-bold text-keen-blue mb-4">
                  {score}%
                </div>
                <p className="text-lg text-keen-gray/80 leading-relaxed max-w-2xl mx-auto">
                  {recommendation.message}
                </p>
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-bold text-keen-gray mb-4">Препоръчани следващи стъпки:</h4>
                <ul className="space-y-3">
                  {recommendation.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-keen-gray/80">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                >
                  <span>Резервирайте разговор за откриване</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetQuiz}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Направете теста отново
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="questionnaire" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-keen-gray mb-6">
            AI готовност въпросник
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            Направете нашата бърза оценка, за да откриете вашия потенциал за AI автоматизация и да получите персонализирани препоръки.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-keen-gray">
                    Въпрос {currentQuestion + 1} от {questions.length}
                  </h3>
                  <div className="text-sm text-keen-gray/70">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Завършено
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-keen-blue to-keen-gradient-end h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <p className="text-lg text-keen-gray mb-8 leading-relaxed">
                {questions[currentQuestion].question}
              </p>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-keen-blue hover:bg-keen-blue/5 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                      <span className="text-keen-gray font-medium">{option.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
