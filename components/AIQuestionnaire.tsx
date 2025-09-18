'use client'

import React from 'react'

export default function AIQuestionnaire() {
  return (
    <section id="questionnaire" className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-keen-gray mb-6">
            AI Readiness Questionnaire
          </h2>
          <p className="text-xl text-keen-gray/80 max-w-3xl mx-auto leading-relaxed">
            Take our quick assessment to discover your AI automation potential and get personalized recommendations.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-keen-gray mb-4">
              Question 1 of 2
            </h3>
            <p className="text-lg text-keen-gray mb-8 leading-relaxed">
              Do you have digital records of the process you want to automate?
            </p>
            <div className="space-y-4">
              <button className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-keen-blue hover:bg-keen-blue/5 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                  <span className="text-keen-gray font-medium">Yes</span>
                </div>
              </button>
              <button className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-keen-blue hover:bg-keen-blue/5 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                  <span className="text-keen-gray font-medium">Partial</span>
                </div>
              </button>
              <button className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-keen-blue hover:bg-keen-blue/5 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                  <span className="text-keen-gray font-medium">No</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}