'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader } from 'lucide-react'

export default function InitPage() {
  const [isInitializing, setIsInitializing] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initializeCMS = async () => {
    setIsInitializing(true)
    setError(null)
    
    try {
      const response = await fetch('/api/init-cms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to initialize CMS')
      }
      
      const result = await response.json()
      setIsInitialized(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setIsInitializing(false)
    }
  }

  if (isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">CMS Initialized!</h1>
          <p className="text-gray-600 mb-6">
            Your CMS has been successfully initialized with default content and settings.
          </p>
          <div className="space-y-3">
            <a
              href="/admin"
              className="block w-full bg-keen-blue text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Go to Admin Dashboard
            </a>
            <a
              href="/"
              className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              View Website
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Keen CMS</h1>
          <p className="text-gray-600">
            Initialize your Content Management System to start customizing your website.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">What will be initialized:</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Default content for all sections
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Default color scheme
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Basic site settings
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Admin dashboard access
            </li>
          </ul>
        </div>

        <button
          onClick={initializeCMS}
          disabled={isInitializing}
          className="w-full mt-8 bg-keen-blue text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isInitializing ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Initializing...
            </>
          ) : (
            'Initialize CMS'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          This will create default content and settings for your website.
        </p>
      </div>
    </div>
  )
}
