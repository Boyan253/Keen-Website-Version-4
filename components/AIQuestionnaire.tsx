'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, Brain, Clock, Users, Shield, TrendingUp } from 'lucide-react'
import CMSContent from './CMSContent'
import { useCMS } from '@/lib/cms/context'

interface QuestionOption {
  value: string
  label: string
}

interface Question {
  id: number
  question: string
  options: QuestionOption[]
}

export default function AIQuestionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const { getContentByKey, getContent } = useCMS()

  // Build questions from CMS content
  const questions = useMemo(() => {
    const questionsList: Question[] = []
    
    // Get all questionnaire content
    const allContent = getContent('questionnaire')
    
    for (let i = 1; i <= 8; i++) {
      const questionText = allContent.find(item => item.key === `question_${i}_text`)
      const questionOptions = allContent.find(item => item.key === `question_${i}_options`)
      
      if (questionText && questionOptions) {
        try {
          const options = JSON.parse(questionOptions.value) as QuestionOption[]
          questionsList.push({
            id: i,
            question: questionText.value,
            options: options
          })
        } catch (error) {
          console.warn(`Failed to parse options for question ${i}:`, error)
        }
      }
    }
    
    return questionsList
  }, [getContent])

  // Fallback questions in case CMS data is not available
  const fallbackQuestions: Question[] = [
    {
      id: 1,
      question: "Do you have digital records of the process you want to automate?",
      options: [
        { value: "yes", label: "Yes, we have comprehensive digital records" },
        { value: "partial", label: "Partial, some processes are documented" },
        { value: "no", label: "No, most processes are manual or undocumented" }
      ]
    },
    {
      id: 2,
      question: "How many employees currently handle the process you want to automate?",
      options: [
        { value: "1-2", label: "1-2 employees" },
        { value: "3-5", label: "3-5 employees" },
        { value: "6-10", label: "6-10 employees" },
        { value: "10+", label: "More than 10 employees" }
      ]
    },
    {
      id: 3,
      question: "What is the average time spent on this process per day?",
      options: [
        { value: "1-2", label: "1-2 hours per day" },
        { value: "3-5", label: "3-5 hours per day" },
        { value: "6-8", label: "6-8 hours per day" },
        { value: "8+", label: "More than 8 hours per day" }
      ]
    },
    {
      id: 4,
      question: "How often do errors occur in this process?",
      options: [
        { value: "rarely", label: "Rarely (less than 5% error rate)" },
        { value: "sometimes", label: "Sometimes (5-15% error rate)" },
        { value: "often", label: "Often (15-30% error rate)" },
        { value: "frequently", label: "Frequently (more than 30% error rate)" }
      ]
    },
    {
      id: 5,
      question: "What is your current IT infrastructure like?",
      options: [
        { value: "modern", label: "Modern, cloud-based systems with APIs" },
        { value: "mixed", label: "Mixed, some modern and some legacy systems" },
        { value: "legacy", label: "Mostly legacy systems with limited integration" },
        { value: "minimal", label: "Minimal IT infrastructure" }
      ]
    },
    {
      id: 6,
      question: "How important is data security for your organization?",
      options: [
        { value: "critical", label: "Critical - we handle sensitive data" },
        { value: "important", label: "Important - we have some sensitive data" },
        { value: "moderate", label: "Moderate - standard business data" },
        { value: "low", label: "Low - mostly public information" }
      ]
    },
    {
      id: 7,
      question: "What is your budget range for AI automation?",
      options: [
        { value: "10k-25k", label: "$10,000 - $25,000" },
        { value: "25k-50k", label: "$25,000 - $50,000" },
        { value: "50k-100k", label: "$50,000 - $100,000" },
        { value: "100k+", label: "More than $100,000" }
      ]
    },
    {
      id: 8,
      question: "How quickly do you need to see results from automation?",
      options: [
        { value: "immediate", label: "Immediate (within 1 month)" },
        { value: "quick", label: "Quick (1-3 months)" },
        { value: "moderate", label: "Moderate (3-6 months)" },
        { value: "flexible", label: "Flexible timeline" }
      ]
    }
  ]

  // Use CMS questions if available, otherwise fallback to hardcoded questions
  const finalQuestions = questions.length > 0 ? questions : fallbackQuestions

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion]: answer }
    setAnswers(newAnswers)
    
    if (currentQuestion < finalQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const calculateScore = () => {
    let score = 0
    const totalQuestions = finalQuestions.length
    
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
        level: "High Readiness",
        color: "from-green-500 to-emerald-500",
        icon: TrendingUp,
        message: "Your organization is well-positioned for AI automation. You have the infrastructure, processes, and resources needed for successful implementation.",
        nextSteps: [
          "Schedule a discovery call to discuss specific use cases",
          "Review our case studies for similar implementations",
          "Consider a pilot project to validate ROI"
        ]
      }
    } else if (score >= 60) {
      return {
        level: "Medium Readiness",
        color: "from-blue-500 to-cyan-500",
        icon: Brain,
        message: "You have good potential for AI automation with some preparation needed. Focus on process documentation and infrastructure improvements.",
        nextSteps: [
          "Document your current processes thoroughly",
          "Assess your IT infrastructure needs",
          "Start with a small pilot project"
        ]
      }
    } else {
      return {
        level: "Needs Preparation",
        color: "from-orange-500 to-red-500",
        icon: Clock,
        message: "Your organization would benefit from foundational work before implementing AI automation. Focus on process optimization and infrastructure.",
        nextSteps: [
          "Optimize your current processes first",
          "Improve data quality and documentation",
          "Consider consulting services for preparation"
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
            <CMSContent 
              contentKey="results_title" 
              section="questionnaire" 
              fallback="Your AI Readiness Results"
            />
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            <CMSContent 
              contentKey="results_description" 
              section="questionnaire" 
              fallback="Based on your answers, here's your personalized AI readiness assessment."
              as="span"
            />
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
                <h4 className="text-xl font-bold text-keen-gray mb-4">Recommended Next Steps:</h4>
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
                  onClick={() => window.open('https://calendly.com/keenagents', '_blank')}
                  className="btn-primary text-lg px-8 py-4 flex items-center space-x-2"
                >
                  <CMSContent 
                    contentKey="cta_primary" 
                    section="questionnaire" 
                    fallback="Schedule Discovery Call"
                    as="span"
                  />
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetQuiz}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  <CMSContent 
                    contentKey="cta_secondary" 
                    section="questionnaire" 
                    fallback="Retake Quiz"
                    as="span"
                  />
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
            <CMSContent 
              contentKey="title" 
              section="questionnaire" 
              fallback="AI Readiness Questionnaire"
            />
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            <CMSContent 
              contentKey="description" 
              section="questionnaire" 
              fallback="Take our quick assessment to discover your AI automation potential and get personalized recommendations."
              as="span"
            />
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
                    Question {currentQuestion + 1} of {finalQuestions.length}
                  </h3>
                  <div className="text-sm text-keen-gray/70">
                    {Math.round(((currentQuestion + 1) / finalQuestions.length) * 100)}% Complete
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-keen-blue to-keen-gradient-end h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / finalQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <p className="text-lg text-keen-gray mb-8 leading-relaxed">
                {finalQuestions[currentQuestion].question}
              </p>
              
              <div className="space-y-4">
                {finalQuestions[currentQuestion].options.map((option, index) => (
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