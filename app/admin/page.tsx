'use client'

import { useState, useRef, useEffect } from 'react'
import { useCMS } from '@/lib/cms/context'
import { Settings, Palette, FileText, Image, Layout, Save, Eye, EyeOff } from 'lucide-react'
import ColorPicker from '@/components/admin/ColorPicker'
import ImageUpload from '@/components/admin/ImageUpload'

export default function AdminDashboard() {
  const { state, getContent, getActiveColors, updateContentLocally, updateColorSchemeLocally, updateSettings, saveAllChanges } = useCMS()
  const [activeTab, setActiveTab] = useState<'content' | 'colors' | 'images' | 'sections' | 'settings'>('content')
  const [previewMode, setPreviewMode] = useState(false)
  const [splitView, setSplitView] = useState(false)
  const [saving, setSaving] = useState(false)
  const [adminPanelWidth, setAdminPanelWidth] = useState(50) // Percentage
  const [isResizing, setIsResizing] = useState(false)

  const tabs = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'colors', label: 'Colors', icon: Palette },
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
    setSaving(true)
    try {
      await saveAllChanges()
      // Show success message or notification here if needed
    } catch (error) {
      console.error('Error saving changes:', error)
      // Show error message here if needed
    } finally {
      setSaving(false)
    }
  }

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
        <div className="w-full h-screen">
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
                    <span>Saving...</span>
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
                  disabled={saving}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    saving 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-keen-blue text-white hover:bg-blue-600'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
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
              {activeTab === 'colors' && <ColorsTab onUpdate={handleColorUpdate} />}
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
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'content' && <ContentTab onUpdate={handleContentUpdate} />}
              {activeTab === 'colors' && <ColorsTab onUpdate={handleColorUpdate} />}
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
            <div className="flex-1 overflow-hidden">
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
  
  const sections = ['hero', 'about', 'product', 'process', 'testimonials', 'faq', 'footer', 'global']
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h2>
        <p className="text-gray-600">Edit text content for different sections of your website.</p>
      </div>

      {sections.map((section) => {
        const content = getContent(section)
        if (content.length === 0) return null

        return (
          <div key={section} className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">{section} Section</h3>
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

// Colors Tab Component
function ColorsTab({ onUpdate }: { onUpdate: (colorKey: string, value: string) => void }) {
  const { getActiveColors } = useCMS()
  const activeColors = getActiveColors()

  if (!activeColors) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No color scheme found. Please create one first.</p>
      </div>
    )
  }

  const colorFields = [
    { key: 'primary', label: 'Primary Color', description: 'Main brand color' },
    { key: 'secondary', label: 'Secondary Color', description: 'Secondary brand color' },
    { key: 'accent', label: 'Accent Color', description: 'Accent color for highlights' },
    { key: 'background', label: 'Background Color', description: 'Main background color' },
    { key: 'text', label: 'Text Color', description: 'Primary text color' },
    { key: 'textSecondary', label: 'Secondary Text', description: 'Secondary text color' },
    { key: 'textMuted', label: 'Muted Text', description: 'Muted text color' },
    { key: 'border', label: 'Border Color', description: 'Border color' },
    { key: 'success', label: 'Success Color', description: 'Success state color' },
    { key: 'warning', label: 'Warning Color', description: 'Warning state color' },
    { key: 'error', label: 'Error Color', description: 'Error state color' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Color Management</h2>
        <p className="text-gray-600">Customize the color scheme for your website.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Palette</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colorFields.map((field) => (
            <ColorPicker
              key={field.key}
              value={activeColors[field.key as keyof typeof activeColors]}
              onChange={(value) => onUpdate(field.key, value)}
              label={field.label}
              description={field.description}
            />
          ))}
        </div>
      </div>
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
