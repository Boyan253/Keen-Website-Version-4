'use client'

import { useState, useRef, useEffect } from 'react'
import { useCMS } from '@/lib/cms/context'
import { Settings, Wand2, FileText, Image, Layout, Save, Eye, EyeOff, Check } from 'lucide-react'
import ColorPicker from '@/components/admin/ColorPicker'
import ImageUpload from '@/components/admin/ImageUpload'

export default function AdminDashboard() {
  const { state, getContent, getActiveColors, updateContentLocally, updateColorSchemeLocally, updateSettings, saveAllChanges, getStyleOverrides, updateStyleOverrideLocally, removeStyleOverrideLocally } = useCMS()
  const [activeTab, setActiveTab] = useState<'content' | 'style-adjustments' | 'images' | 'sections' | 'settings'>('content')
  const [previewMode, setPreviewMode] = useState(false)
  const [splitView, setSplitView] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [adminPanelWidth, setAdminPanelWidth] = useState(50) // Percentage
  const [isResizing, setIsResizing] = useState(false)
  const [selectedStyleContent, setSelectedStyleContent] = useState<any>(null) // Persist across saves
  
  // Calculate number of unsaved changes
  const unsavedChanges = (state.dirtyContentIds?.size || 0) + (state.dirtyColorSchemeIds?.size || 0) + (state.dirtyStyleOverrideIds?.size || 0) + (state.deletedStyleOverrideIds?.size || 0)
  
  // Debug logging
  useEffect(() => {
    console.log('Unsaved changes updated:', {
      content: state.dirtyContentIds?.size || 0,
      colors: state.dirtyColorSchemeIds?.size || 0,
      styles: state.dirtyStyleOverrideIds?.size || 0,
      deletedStyles: state.deletedStyleOverrideIds?.size || 0,
      total: unsavedChanges
    })
  }, [unsavedChanges, state.dirtyContentIds, state.dirtyColorSchemeIds, state.dirtyStyleOverrideIds, state.deletedStyleOverrideIds])
  
  // Scroll position preservation
  const adminScrollRef = useRef<HTMLDivElement>(null)
  const previewScrollRef = useRef<HTMLDivElement>(null)
  const [savedScrollPositions, setSavedScrollPositions] = useState<{
    admin: number
    preview: number
  } | null>(null)
  const [isRestoringScroll, setIsRestoringScroll] = useState(false)
  const [shouldRestoreScroll, setShouldRestoreScroll] = useState(false)

  // Load saved positions on mount (but don't auto-restore)
  useEffect(() => {
    // Load saved positions on mount but don't automatically restore them
    const savedPositions = localStorage.getItem('admin-scroll-positions')
    if (savedPositions) {
      try {
        const parsed = JSON.parse(savedPositions)
        // Only load if saved within last 5 minutes, but don't restore automatically
        if (Date.now() - parsed.timestamp < 300000) {
          setSavedScrollPositions({
            admin: parsed.admin || 0,
            preview: parsed.preview || 0
          })
        }
      } catch (error) {
        console.warn('Could not parse saved scroll positions:', error)
      }
    }
  }, [splitView])

  const tabs = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'style-adjustments', label: 'Style Adjustments', icon: Wand2 },
    { id: 'images', label: 'Images', icon: Image },
    { id: 'sections', label: 'Sections', icon: Layout },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]
  
  const handleContentUpdate = (key: string, section: string, value: string) => {
    const existingContent = getContent(section).find(item => item.key === key)
    if (existingContent) {
      updateContentLocally({
        ...existingContent,
        value,
        updatedAt: new Date().toISOString()
      })
    }
  }

  const handleColorUpdate = (colorKey: string, value: string) => {
    const activeColors = getActiveColors()
    if (activeColors) {
      const updatedColors = { ...activeColors, [colorKey]: value }
      // Find the active color scheme and update it locally
      const activeScheme = state.colorSchemes.find(scheme => scheme.isActive)
      if (activeScheme) {
        updateColorSchemeLocally({
          ...activeScheme,
          colors: updatedColors,
          updatedAt: new Date().toISOString()
        })
      }
    }
  }

  const handleSaveAll = async () => {
    // Save current scroll positions before saving
    const adminScroll = adminScrollRef.current?.scrollTop || 0
    let previewScroll = 0
    
    // Get iframe scroll position
    if (previewScrollRef.current) {
      const iframe = previewScrollRef.current.querySelector('iframe')
      if (iframe && iframe.contentWindow) {
        try {
          previewScroll = iframe.contentWindow.pageYOffset || iframe.contentWindow.scrollY || 0
        } catch (error) {
          // Cross-origin restrictions might prevent this
          console.warn('Could not get iframe scroll position:', error)
        }
      }
    }
    
    setSavedScrollPositions({
      admin: adminScroll,
      preview: previewScroll
    })
    
    setSaving(true)
    setSaveSuccess(false)
    try {
      await saveAllChanges()
      setSaveSuccess(true)
      // Set flag to restore scroll positions after save completes
      setShouldRestoreScroll(true)
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving changes:', error)
      // Show error message here if needed
    } finally {
      setSaving(false)
    }
  }

  // Restore scroll positions after save completes
  useEffect(() => {
    if (!saving && shouldRestoreScroll && savedScrollPositions) {
      setIsRestoringScroll(true)
      
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        // Restore admin panel scroll
        if (adminScrollRef.current) {
          adminScrollRef.current.scrollTop = savedScrollPositions.admin
        }
        
        // Restore preview scroll - try multiple methods without forcing reload
        if (previewScrollRef.current && savedScrollPositions.preview > 0) {
          const iframe = previewScrollRef.current.querySelector('iframe')
          if (iframe) {
            // Method 1: Direct iframe access
            try {
              if (iframe.contentWindow) {
                iframe.contentWindow.scrollTo(0, savedScrollPositions.preview)
              }
            } catch (error) {
              // Method 2: PostMessage to iframe
              try {
                iframe.contentWindow?.postMessage({
                  type: 'RESTORE_SCROLL',
                  scrollY: savedScrollPositions.preview
                }, '*')
              } catch (postError) {
                // Method 3: Store in localStorage for iframe to read (without reload)
                localStorage.setItem('admin-preview-scroll', savedScrollPositions.preview.toString())
                // Don't force iframe reload - let the iframe handle it naturally
              }
            }
          }
        }
        
        setSavedScrollPositions(null)
        setShouldRestoreScroll(false)
        
        // Reset the restoration flag after a delay to allow scroll events to settle
        setTimeout(() => {
          setIsRestoringScroll(false)
        }, 500)
      }, 200) // Increased timeout for better reliability
    }
  }, [saving, shouldRestoreScroll, savedScrollPositions])

  // Resize functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return
    
    const containerWidth = window.innerWidth
    const newWidth = (e.clientX / containerWidth) * 100
    
    // Set minimum and maximum widths (20% to 80%)
    const clampedWidth = Math.min(Math.max(newWidth, 20), 80)
    setAdminPanelWidth(clampedWidth)
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  // Add event listeners for mouse move and up
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing])

  // Keyboard shortcuts for split ratios
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!splitView) return
      
      // Only trigger if no input is focused
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault()
            setAdminPanelWidth(25) // 25/75 split
            break
          case '2':
            e.preventDefault()
            setAdminPanelWidth(50) // 50/50 split
            break
          case '3':
            e.preventDefault()
            setAdminPanelWidth(75) // 75/25 split
            break
          case '0':
            e.preventDefault()
            setAdminPanelWidth(50) // Reset to 50/50
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [splitView])


  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-keen-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CMS...</p>
        </div>
      </div>
    )
  }

  // Preview mode - show the actual website
  if (previewMode && !splitView) {
    return (
      <div className="min-h-screen bg-white">
        <div className="fixed top-4 right-4 z-50 flex space-x-2">
          <button
            onClick={() => setPreviewMode(false)}
            className="flex items-center space-x-2 px-4 py-2 bg-keen-blue text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
          >
            <EyeOff className="w-4 h-4" />
            <span>Exit Preview</span>
          </button>
          <button
            onClick={() => setSplitView(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
          >
            <Layout className="w-4 h-4" />
            <span>Split View</span>
          </button>
          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg"
          >
            <Eye className="w-4 h-4" />
            <span>Open in New Tab</span>
          </button>
        </div>
        <div ref={previewScrollRef} className="w-full h-screen">
          <iframe
            src="/"
            className="w-full h-full border-0"
            title="Website Preview"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${splitView ? 'flex' : ''}`}>
      {/* Header */}
      {!splitView && (
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Keen CMS</h1>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      previewMode
                        ? 'bg-keen-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {previewMode ? 'Exit Preview' : 'Preview Mode'}
                  </button>
                  <button
                    onClick={() => setSplitView(true)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                  >
                    <Layout className="w-4 h-4" />
                    <span>Split View</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {saving && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-keen-blue"></div>
                    <span>Saving {unsavedChanges} change{unsavedChanges !== 1 ? 's' : ''}...</span>
                  </div>
                )}
                {saveSuccess && !saving && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Check className="w-4 h-4" />
                    <span>Saved successfully!</span>
                  </div>
                )}
                {!saving && !saveSuccess && unsavedChanges > 0 && (
                  <div className="text-sm text-orange-600 font-medium">
                    {unsavedChanges} unsaved change{unsavedChanges !== 1 ? 's' : ''}
                  </div>
                )}
                <button
                  onClick={() => setPreviewMode(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Live Preview</span>
                </button>
                <button 
                  onClick={handleSaveAll}
                  disabled={saving || unsavedChanges === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    saving || unsavedChanges === 0
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-keen-blue text-white hover:bg-blue-600'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : `Save ${unsavedChanges > 0 ? `${unsavedChanges} Change${unsavedChanges !== 1 ? 's' : ''}` : 'Changes'}`}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Split View Header - Vertical Layout */}
      {splitView && (
        <div className="bg-white shadow-sm border-b">
          <div className="flex h-screen">
            {/* Left Sidebar with Controls */}
            <div className="w-64 bg-gray-50 border-r flex flex-col">
              <div className="p-4 border-b">
                <h1 className="text-xl font-bold text-gray-900 mb-4">Keen CMS</h1>
                
                {/* Control Buttons - Vertical Layout */}
                <div className="space-y-3">
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      previewMode
                        ? 'bg-keen-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{previewMode ? 'Exit Preview' : 'Preview Mode'}</span>
                  </button>
                  
                  <button
                    onClick={() => setPreviewMode(true)}
                    className="w-full flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Live Preview</span>
                  </button>
                  
                  <button 
                    onClick={handleSaveAll}
                    disabled={saving}
                    className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      saving 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-keen-blue text-white hover:bg-blue-600'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  
                  {saving && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-yellow-50 px-3 py-2 rounded-lg">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-keen-blue"></div>
                      <span>Saving...</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg group relative">
                    <Layout className="w-4 h-4" />
                    <span>Split: {Math.round(adminPanelWidth)}% / {Math.round(100 - adminPanelWidth)}%</span>
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                      Ctrl+1: 25/75 | Ctrl+2: 50/50 | Ctrl+3: 75/25 | Ctrl+0: Reset
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <div className="flex-1 p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-keen-blue text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {!splitView && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex space-x-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-keen-blue text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'content' && <ContentTab onUpdate={handleContentUpdate} />}
              {activeTab === 'style-adjustments' && <StyleAdjustmentsTab selectedContent={selectedStyleContent} setSelectedContent={setSelectedStyleContent} />}
              {activeTab === 'images' && <ImagesTab />}
              {activeTab === 'sections' && <SectionsTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </div>
          </div>
        </div>
      )}

      {/* Split View Content */}
      {splitView && (
        <div className="flex w-full h-screen">
          {/* Admin Content Panel */}
          <div 
            className="border-r relative bg-white flex flex-col"
            style={{ width: `${adminPanelWidth}%` }}
          >
            <div ref={adminScrollRef} className="flex-1 overflow-y-auto p-6">
              {activeTab === 'content' && <ContentTab onUpdate={handleContentUpdate} />}
              {activeTab === 'style-adjustments' && <StyleAdjustmentsTab selectedContent={selectedStyleContent} setSelectedContent={setSelectedStyleContent} />}
              {activeTab === 'images' && <ImagesTab />}
              {activeTab === 'sections' && <SectionsTab />}
              {activeTab === 'settings' && <SettingsTab />}
            </div>

            {/* Resizable Divider */}
            <div
              className="absolute right-0 top-0 w-1 h-full bg-gray-300 hover:bg-keen-blue cursor-col-resize z-10 flex items-center justify-center group"
              onMouseDown={handleMouseDown}
            >
              <div className="w-3 h-8 bg-gray-400 group-hover:bg-keen-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-0.5 h-4 bg-white rounded-full"></div>
              </div>
              {/* Split percentage indicator */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {Math.round(adminPanelWidth)}% / {Math.round(100 - adminPanelWidth)}%
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div 
            className="relative bg-white flex flex-col"
            style={{ width: `${100 - adminPanelWidth}%` }}
          >
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <button
                onClick={() => setAdminPanelWidth(50)}
                className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                title="Reset to 50/50 split"
              >
                <Layout className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={() => setSplitView(false)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <EyeOff className="w-4 h-4" />
                <span>Close Split</span>
              </button>
              <button
                onClick={() => window.open('/', '_blank')}
                className="flex items-center space-x-2 px-3 py-2 bg-keen-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                <span>Open New Tab</span>
              </button>
            </div>
            <div ref={previewScrollRef} className="flex-1 overflow-hidden">
              <iframe
                src="/"
                className="w-full h-full border-0"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Content Tab Component
function ContentTab({ onUpdate }: { onUpdate: (key: string, section: string, value: string) => void }) {
  const { getContent } = useCMS()
  
  // Order sections to match the website flow
  const sections = [
    'header',      // Header navigation
    'hero',        // Hero section
    'product',     // Product section  
    'process',     // Process section
    'testimonials', // Testimonials section
    'investors',   // Investors section
    'about',       // About section
    'faq',         // FAQ section
    'questionnaire', // Questionnaire section
    'footer',      // Footer
    'global'       // Global settings
  ]
  
  // Custom sorting function for questionnaire content
  const sortQuestionnaireContent = (content: any[]) => {
    return content.sort((a, b) => {
      // First, separate question items from other items
      const isQuestionA = a.key.includes('question_')
      const isQuestionB = b.key.includes('question_')
      
      if (isQuestionA && !isQuestionB) return -1
      if (!isQuestionA && isQuestionB) return 1
      
      // If both are questions, sort by question number
      if (isQuestionA && isQuestionB) {
        const questionNumA = parseInt(a.key.match(/question_(\d+)/)?.[1] || '0')
        const questionNumB = parseInt(b.key.match(/question_(\d+)/)?.[1] || '0')
        
        if (questionNumA !== questionNumB) {
          return questionNumA - questionNumB
        }
        
        // If same question number, sort text before options
        const isTextA = a.key.includes('_text')
        const isTextB = b.key.includes('_text')
        
        if (isTextA && !isTextB) return -1
        if (!isTextA && isTextB) return 1
      }
      
      // For non-question items, sort alphabetically by key
      return a.key.localeCompare(b.key)
    })
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h2>
        <p className="text-gray-600">Edit text content for different sections of your website.</p>
      </div>

      {sections.map((section) => {
        let content = getContent(section)
        if (content.length === 0) return null

        // Apply custom sorting for questionnaire section
        if (section === 'questionnaire') {
          content = sortQuestionnaireContent(content)
        }

        // Get section display name
        const getSectionDisplayName = (section: string) => {
          const sectionNames: { [key: string]: string } = {
            'header': 'Header & Navigation',
            'hero': 'Hero Section',
            'product': 'Product Section',
            'process': 'Process Section',
            'testimonials': 'Testimonials Section',
            'about': 'About Section',
            'faq': 'FAQ Section',
            'questionnaire': 'Questionnaire Section',
            'footer': 'Footer',
            'global': 'Global Settings'
          }
          return sectionNames[section] || `${section} Section`
        }

        return (
          <div key={section} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="w-2 h-8 bg-keen-blue rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-900">{getSectionDisplayName(section)}</h3>
            </div>
            <div className="space-y-4">
              {content.map((item) => (
                <ContentItem
                  key={item.id}
                  item={item}
                  onUpdate={onUpdate}
                />
              ))}
            </div>
          </div>
        )
      })}
</div>
  )
}

// Individual content item component to prevent unnecessary re-renders
function ContentItem({ 
  item, 
  onUpdate 
}: { 
  item: any
  onUpdate: (key: string, section: string, value: string) => void 
}) {
  const [localValue, setLocalValue] = useState(item.value)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Set new timeout for debounced update
    timeoutRef.current = setTimeout(() => {
      onUpdate(item.key, item.section, newValue)
    }, 1000) // 1 second debounce
  }

  // Update local value when item value changes from external source
  useEffect(() => {
    setLocalValue(item.value)
  }, [item.value])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {item.label}
      </label>
      <textarea
        value={localValue}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
        rows={3}
        placeholder="Type here to edit content..."
      />
      {item.description && (
        <p className="text-xs text-gray-500">{item.description}</p>
      )}
    </div>
  )
}

// Style Adjustments Tab Component
function StyleAdjustmentsTab({ selectedContent, setSelectedContent }: { selectedContent: any, setSelectedContent: (content: any) => void }) {
  const { getContent, getStyleOverrides, getStyleOverrideForContent, updateStyleOverrideLocally, removeStyleOverrideLocally } = useCMS()
  const [searchTerm, setSearchTerm] = useState('')
  const isLoadingStyles = useRef(false)
  const loadCounter = useRef(0)

  // Current style values for the selected content
  const [styles, setStyles] = useState({
    backgroundColor: '',
    textColor: '',
    fontSize: '',
    fontWeight: '',
    fontFamily: '',
    lineHeight: '',
    letterSpacing: '',
    textAlign: '',
    padding: '',
    margin: '',
    borderColor: '',
    borderWidth: '',
    borderRadius: '',
    boxShadow: '',
    opacity: '',
    customCss: ''
  })

  // Get style overrides from context
  const styleOverrides = getStyleOverrides()

  // Get all content for searching
  const allContent = [
    'header', 'hero', 'product', 'process', 'testimonials', 
    'investors', 'about', 'faq', 'questionnaire', 'footer', 'global'
  ].flatMap(section => getContent(section))

  // Filter content based on search term
  const filteredContent = searchTerm
    ? allContent.filter(item => 
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  // Load existing styles when content is selected or when style overrides change
  useEffect(() => {
    if (selectedContent) {
      const currentLoad = ++loadCounter.current
      isLoadingStyles.current = true
      const existingStyle = getStyleOverrideForContent(selectedContent.id)
      
      console.log('Loading styles for selected content:', {
        contentId: selectedContent.id,
        hasExistingStyle: !!existingStyle,
        existingStyle,
        loadCount: currentLoad
      })
      
      if (existingStyle) {
        const newStyles = {
          backgroundColor: existingStyle.backgroundColor || '',
          textColor: existingStyle.textColor || '',
          fontSize: existingStyle.fontSize || '',
          fontWeight: existingStyle.fontWeight || '',
          fontFamily: existingStyle.fontFamily || '',
          lineHeight: existingStyle.lineHeight || '',
          letterSpacing: existingStyle.letterSpacing || '',
          textAlign: existingStyle.textAlign || '',
          padding: existingStyle.padding || '',
          margin: existingStyle.margin || '',
          borderColor: existingStyle.borderColor || '',
          borderWidth: existingStyle.borderWidth || '',
          borderRadius: existingStyle.borderRadius || '',
          boxShadow: existingStyle.boxShadow || '',
          opacity: existingStyle.opacity || '',
          customCss: existingStyle.customCss || ''
        }
        console.log('Setting styles to:', newStyles)
        setStyles(newStyles)
      } else {
        // Reset to empty if no existing styles
        setStyles({
          backgroundColor: '',
          textColor: '',
          fontSize: '',
          fontWeight: '',
          fontFamily: '',
          lineHeight: '',
          letterSpacing: '',
          textAlign: '',
          padding: '',
          margin: '',
          borderColor: '',
          borderWidth: '',
          borderRadius: '',
          boxShadow: '',
          opacity: '',
          customCss: ''
        })
      }
      
      // Reset the flag after a delay, ensuring auto-save doesn't trigger during reload
      const timer = setTimeout(() => {
        // Only reset if this is still the current load (not superseded by another)
        if (loadCounter.current === currentLoad) {
          isLoadingStyles.current = false
          console.log('isLoadingStyles set to false for load:', currentLoad)
        }
      }, 300)
      
      return () => clearTimeout(timer)
    }
  }, [selectedContent, styleOverrides])

  // Auto-save styles when they change
  useEffect(() => {
    if (!selectedContent || isLoadingStyles.current) {
      console.log('Auto-save skipped:', { hasSelected: !!selectedContent, isLoading: isLoadingStyles.current })
      return
    }

    const existingStyle = getStyleOverrideForContent(selectedContent.id)
    
    console.log('Auto-save triggered for:', selectedContent.id, 'Current styles:', styles)
    
    // Check if all style values are empty
    const hasAnyStyle = !!(
      styles.backgroundColor ||
      styles.textColor ||
      styles.fontSize ||
      styles.fontWeight ||
      styles.fontFamily ||
      styles.lineHeight ||
      styles.letterSpacing ||
      styles.textAlign ||
      styles.padding ||
      styles.margin ||
      styles.borderColor ||
      styles.borderWidth ||
      styles.borderRadius ||
      styles.boxShadow ||
      styles.opacity ||
      styles.customCss
    )
    
    // If all styles are empty and an override exists, remove it
    if (!hasAnyStyle && existingStyle) {
      console.log('All styles empty - removing override')
      removeStyleOverrideLocally(existingStyle.id)
      return
    }
    
    // If all styles are empty and no override exists, do nothing
    if (!hasAnyStyle) {
      console.log('All styles empty - nothing to save')
      return
    }
    
    // Create a clean style override object
    // Note: Don't include updatedAt/createdAt in local updates to avoid false dirty detection
    const styleOverride: any = {
      id: existingStyle?.id || `temp-${Date.now()}-${selectedContent.id}`,
      contentId: selectedContent.id,
      section: selectedContent.section,
      key: selectedContent.key,
      isActive: true
    }
    
    // Preserve timestamps if they exist (for comparison with originals)
    if (existingStyle?.createdAt) {
      styleOverride.createdAt = existingStyle.createdAt
    }
    if (existingStyle?.updatedAt) {
      styleOverride.updatedAt = existingStyle.updatedAt
    }

    // Add style properties (including empty strings to allow clearing)
    styleOverride.backgroundColor = styles.backgroundColor
    styleOverride.textColor = styles.textColor
    styleOverride.fontSize = styles.fontSize
    styleOverride.fontWeight = styles.fontWeight
    styleOverride.fontFamily = styles.fontFamily
    styleOverride.lineHeight = styles.lineHeight
    styleOverride.letterSpacing = styles.letterSpacing
    styleOverride.textAlign = styles.textAlign
    styleOverride.padding = styles.padding
    styleOverride.margin = styles.margin
    styleOverride.borderColor = styles.borderColor
    styleOverride.borderWidth = styles.borderWidth
    styleOverride.borderRadius = styles.borderRadius
    styleOverride.boxShadow = styles.boxShadow
    styleOverride.opacity = styles.opacity
    styleOverride.customCss = styles.customCss

    console.log('Calling updateStyleOverrideLocally with:', styleOverride)
    // Update locally - this will mark it as dirty
    updateStyleOverrideLocally(styleOverride)
  }, [styles, selectedContent])

  const handleRemoveStyles = () => {
    if (!selectedContent) return

    const existingStyle = getStyleOverrideForContent(selectedContent.id)
    if (!existingStyle) return

    if (!confirm('Are you sure you want to remove all style adjustments for this content?')) {
      return
    }

    // Remove locally - this will update the dirty tracking
    removeStyleOverrideLocally(existingStyle.id)
    setStyles({
      backgroundColor: '',
      textColor: '',
      fontSize: '',
      fontWeight: '',
      fontFamily: '',
      lineHeight: '',
      letterSpacing: '',
      textAlign: '',
      padding: '',
      margin: '',
      borderColor: '',
      borderWidth: '',
      borderRadius: '',
      boxShadow: '',
      opacity: '',
      customCss: ''
    })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Style Adjustments</h2>
        <p className="text-sm sm:text-base text-gray-600">Search for content and apply custom styling</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Search Content
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by label, key, section..."
              className="w-full px-3 py-2 sm:px-4 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
            />
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
              {filteredContent.length === 0 ? (
                <div className="p-3 sm:p-4 text-center text-gray-500 text-sm">
                  No content found matching "{searchTerm}"
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredContent.map((item) => {
                    const hasStyles = getStyleOverrideForContent(item.id) !== null
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedContent(item)
                          setSearchTerm('')
                        }}
                        className="w-full text-left p-3 sm:p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{item.label}</span>
                              {hasStyles && (
                                <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-xs font-medium bg-keen-blue text-white flex-shrink-0">
                                  Styled
                                </span>
                              )}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 mt-1">
                              {item.section} • {item.key}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400 mt-1 truncate">
                              {item.value.substring(0, 100)}...
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Selected Content Styling Panel */}
      {selectedContent && (
        <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
          <div className="mb-4 lg:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{selectedContent.label}</h3>
                <p className="text-xs sm:text-sm text-gray-500">{selectedContent.section} • {selectedContent.key}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {getStyleOverrideForContent(selectedContent.id) && (
                  <button
                    onClick={handleRemoveStyles}
                    className="text-xs sm:text-sm text-red-600 hover:text-red-700 whitespace-nowrap"
                  >
                    Remove All
                  </button>
                )}
                <button
                  onClick={() => setSelectedContent(null)}
                  className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="p-2 sm:p-3 bg-gray-50 rounded-lg text-xs sm:text-sm text-gray-700 max-h-20 overflow-y-auto">
              {selectedContent.value}
            </div>
          </div>

          <div className="space-y-4">
            {/* Color Settings */}
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Colors</h4>
              
              <ColorPicker
                label="Background Color"
                value={styles.backgroundColor}
                onChange={(value) => setStyles({ ...styles, backgroundColor: value })}
              />
              
              <ColorPicker
                label="Text Color"
                value={styles.textColor}
                onChange={(value) => setStyles({ ...styles, textColor: value })}
              />
              
              <ColorPicker
                label="Border Color"
                value={styles.borderColor}
                onChange={(value) => setStyles({ ...styles, borderColor: value })}
              />
            </div>

            {/* Typography Settings */}
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Typography</h4>
              
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Font Size</label>
                <input
                  type="text"
                  value={styles.fontSize}
                  onChange={(e) => setStyles({ ...styles, fontSize: e.target.value })}
                  placeholder="e.g., 16px, 1rem"
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Font Weight</label>
                <select
                  value={styles.fontWeight}
                  onChange={(e) => setStyles({ ...styles, fontWeight: e.target.value })}
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
                >
                  <option value="">Default</option>
                  <option value="300">Light</option>
                  <option value="400">Normal</option>
                  <option value="500">Medium</option>
                  <option value="600">Semi-Bold</option>
                  <option value="700">Bold</option>
                  <option value="800">Extra Bold</option>
                </select>
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Line Height</label>
                <input
                  type="text"
                  value={styles.lineHeight}
                  onChange={(e) => setStyles({ ...styles, lineHeight: e.target.value })}
                  placeholder="e.g., 1.5, 24px"
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Text Align</label>
                <select
                  value={styles.textAlign}
                  onChange={(e) => setStyles({ ...styles, textAlign: e.target.value })}
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
                >
                  <option value="">Default</option>
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
            </div>

            {/* Spacing Settings */}
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Spacing</h4>
              
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Padding</label>
                <input
                  type="text"
                  value={styles.padding}
                  onChange={(e) => setStyles({ ...styles, padding: e.target.value })}
                  placeholder="e.g., 16px"
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Margin</label>
                <input
                  type="text"
                  value={styles.margin}
                  onChange={(e) => setStyles({ ...styles, margin: e.target.value })}
                  placeholder="e.g., 16px"
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
                />
              </div>
            </div>

            {/* Border & Effects Settings */}
            <div className="space-y-2">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Border & Effects</h4>
              
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Border Width</label>
                <input
                  type="text"
                  value={styles.borderWidth}
                  onChange={(e) => setStyles({ ...styles, borderWidth: e.target.value })}
                  placeholder="e.g., 1px"
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Border Radius</label>
                <input
                  type="text"
                  value={styles.borderRadius}
                  onChange={(e) => setStyles({ ...styles, borderRadius: e.target.value })}
                  placeholder="e.g., 4px"
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Box Shadow</label>
                <input
                  type="text"
                  value={styles.boxShadow}
                  onChange={(e) => setStyles({ ...styles, boxShadow: e.target.value })}
                  placeholder="0 2px 4px rgba(0,0,0,0.1)"
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">Opacity</label>
                <input
                  type="text"
                  value={styles.opacity}
                  onChange={(e) => setStyles({ ...styles, opacity: e.target.value })}
                  placeholder="e.g., 0.8, 1"
                  className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Custom CSS */}
          <div className="mt-4 lg:mt-6 space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Custom CSS (Advanced)
            </label>
            <textarea
              value={styles.customCss}
              onChange={(e) => setStyles({ ...styles, customCss: e.target.value })}
              placeholder="e.g., transform: scale(1.1);"
              className="w-full px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-keen-blue focus:border-transparent font-mono text-xs sm:text-sm"
              rows={3}
            />
            <p className="text-xs text-gray-500">
              Add any valid CSS property
            </p>
          </div>
        </div>
      )}

      {/* No Content Selected State */}
      {!selectedContent && (
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 lg:p-12">
          <div className="text-center py-6 sm:py-8 lg:py-12">
            <div className="mb-4 sm:mb-6">
              <Wand2 className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No Content Selected</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto px-4">
              Use the search bar above to find content you want to style. You can adjust colors, fonts, spacing, borders, and more.
            </p>
          </div>
        </div>
      )}

      {/* Styled Content List */}
      {styleOverrides.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 lg:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Content with Styles ({styleOverrides.length})
          </h3>
          <div className="space-y-2">
            {styleOverrides.map((override) => {
              const content = allContent.find(c => c.id === override.contentId)
              if (!content) return null
              
              return (
                <button
                  key={override.id}
                  onClick={() => setSelectedContent(content)}
                  className="w-full text-left p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium text-gray-900 text-sm sm:text-base truncate">{content.label}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{content.section} • {content.key}</div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Images Tab Component
function ImagesTab() {
  const { getImages, uploadImage, removeImage } = useCMS()
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      await uploadImage(file, 'global', file.name)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleImageUpload = async (file: File, section: string, alt?: string): Promise<void> => {
    try {
      await uploadImage(file, section, alt)
    } catch (error) {
      console.error('Upload failed:', error)
      throw error
    }
  }

  const images = getImages()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Image Management</h2>
        <p className="text-gray-600">Upload and manage images for your website.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Image
          </label>
          <ImageUpload
            onUpload={handleImageUpload}
            section="global"
            disabled={uploading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageItem
              key={image.id}
              image={image}
              onDelete={removeImage}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Individual image item component to prevent unnecessary re-renders
function ImageItem({ 
  image, 
  onDelete 
}: { 
  image: any
  onDelete: (id: string) => void 
}) {
  const handleDelete = () => {
    onDelete(image.id)
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <img
        src={image.url}
        alt={image.alt}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-900 truncate">{image.originalName}</p>
        <p className="text-xs text-gray-500">{image.section}</p>
        <button
          onClick={handleDelete}
          className="text-xs text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

// Sections Tab Component
function SectionsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Section Management</h2>
        <p className="text-gray-600">Configure sections and their styling.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-500">Section management features coming soon...</p>
      </div>
    </div>
  )
}

// Settings Tab Component
function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Site Settings</h2>
        <p className="text-gray-600">Configure global site settings.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-500">Settings management features coming soon...</p>
      </div>
    </div>
  )
}
