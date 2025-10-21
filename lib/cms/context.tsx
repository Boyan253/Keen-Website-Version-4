'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react'
import { CMSContent, ColorScheme, ImageAsset, SectionConfig, CMSSettings, ContentStyleOverride } from '@/lib/types/cms'
import { cmsDatabase } from '@/lib/cms/supabase-database'

interface CMSState {
  content: CMSContent[]
  colorSchemes: ColorScheme[]
  activeColorScheme: ColorScheme | null
  images: ImageAsset[]
  sections: SectionConfig[]
  settings: CMSSettings | null
  styleOverrides: ContentStyleOverride[]
  loading: boolean
  error: string | null
  dirtyContentIds: Set<string>
  dirtyColorSchemeIds: Set<string>
  dirtyStyleOverrideIds: Set<string>
  deletedStyleOverrideIds: Set<string>
  originalContent: Map<string, CMSContent>
  originalColorSchemes: Map<string, ColorScheme>
  originalStyleOverrides: Map<string, ContentStyleOverride>
}

type CMSAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CONTENT'; payload: CMSContent[] }
  | { type: 'UPDATE_CONTENT'; payload: CMSContent }
  | { type: 'SET_COLOR_SCHEMES'; payload: ColorScheme[] }
  | { type: 'UPDATE_COLOR_SCHEME'; payload: ColorScheme }
  | { type: 'SET_ACTIVE_COLOR_SCHEME'; payload: ColorScheme | null }
  | { type: 'SET_IMAGES'; payload: ImageAsset[] }
  | { type: 'ADD_IMAGE'; payload: ImageAsset }
  | { type: 'REMOVE_IMAGE'; payload: string }
  | { type: 'SET_SECTIONS'; payload: SectionConfig[] }
  | { type: 'UPDATE_SECTION'; payload: SectionConfig }
  | { type: 'SET_SETTINGS'; payload: CMSSettings }
  | { type: 'SET_STYLE_OVERRIDES'; payload: ContentStyleOverride[] }
  | { type: 'UPDATE_STYLE_OVERRIDE'; payload: ContentStyleOverride }
  | { type: 'REMOVE_STYLE_OVERRIDE'; payload: string }
  | { type: 'CLEAR_DIRTY_TRACKING' }

const initialState: CMSState = {
  content: [],
  colorSchemes: [],
  activeColorScheme: null,
  images: [],
  sections: [],
  settings: null,
  styleOverrides: [],
  loading: false,
  error: null,
  dirtyContentIds: new Set(),
  dirtyColorSchemeIds: new Set(),
  dirtyStyleOverrideIds: new Set(),
  deletedStyleOverrideIds: new Set(),
  originalContent: new Map(),
  originalColorSchemes: new Map(),
  originalStyleOverrides: new Map()
}

function cmsReducer(state: CMSState, action: CMSAction): CMSState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_CONTENT':
      // Store original values when content is first loaded
      const originalContentMap = new Map<string, CMSContent>()
      action.payload.forEach(item => {
        originalContentMap.set(item.id, { ...item })
      })
      return { 
        ...state, 
        content: action.payload,
        originalContent: originalContentMap
      }
    case 'UPDATE_CONTENT':
      const newDirtyContentIds = new Set(state.dirtyContentIds)
      const originalItem = state.originalContent.get(action.payload.id)
      
      // Check if the value has changed from the original
      if (originalItem && originalItem.value === action.payload.value) {
        // Value matches original, remove from dirty tracking
        newDirtyContentIds.delete(action.payload.id)
      } else {
        // Value is different, add to dirty tracking
        newDirtyContentIds.add(action.payload.id)
      }
      
      return {
        ...state,
        content: state.content.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        dirtyContentIds: newDirtyContentIds
      }
    case 'SET_COLOR_SCHEMES':
      // Store original values when color schemes are first loaded
      const originalColorSchemesMap = new Map<string, ColorScheme>()
      action.payload.forEach(scheme => {
        originalColorSchemesMap.set(scheme.id, { ...scheme, colors: { ...scheme.colors } })
      })
      return { 
        ...state, 
        colorSchemes: action.payload,
        originalColorSchemes: originalColorSchemesMap
      }
    case 'UPDATE_COLOR_SCHEME':
      const newDirtyColorSchemeIds = new Set(state.dirtyColorSchemeIds)
      const originalScheme = state.originalColorSchemes.get(action.payload.id)
      
      // Check if colors have changed from the original
      let colorsChanged = false
      if (originalScheme) {
        colorsChanged = JSON.stringify(originalScheme.colors) !== JSON.stringify(action.payload.colors)
      }
      
      if (originalScheme && !colorsChanged) {
        // Colors match original, remove from dirty tracking
        newDirtyColorSchemeIds.delete(action.payload.id)
      } else {
        // Colors are different, add to dirty tracking
        newDirtyColorSchemeIds.add(action.payload.id)
      }
      
      return {
        ...state,
        colorSchemes: state.colorSchemes.map(scheme =>
          scheme.id === action.payload.id ? action.payload : scheme
        ),
        dirtyColorSchemeIds: newDirtyColorSchemeIds
      }
    case 'SET_ACTIVE_COLOR_SCHEME':
      return { ...state, activeColorScheme: action.payload }
    case 'SET_IMAGES':
      return { ...state, images: action.payload }
    case 'ADD_IMAGE':
      return { ...state, images: [...state.images, action.payload] }
    case 'REMOVE_IMAGE':
      return { ...state, images: state.images.filter(img => img.id !== action.payload) }
    case 'SET_SECTIONS':
      return { ...state, sections: action.payload }
    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: state.sections.map(section =>
          section.id === action.payload.id ? action.payload : section
        )
      }
    case 'SET_SETTINGS':
      return { ...state, settings: action.payload }
    case 'SET_STYLE_OVERRIDES':
      // Store original values when style overrides are first loaded
      const originalStyleOverridesMap = new Map<string, ContentStyleOverride>()
      action.payload.forEach(override => {
        originalStyleOverridesMap.set(override.id, { ...override })
      })
      return {
        ...state,
        styleOverrides: action.payload,
        originalStyleOverrides: originalStyleOverridesMap
      }
    case 'UPDATE_STYLE_OVERRIDE':
      const newDirtyStyleOverrideIds = new Set(state.dirtyStyleOverrideIds)
      const originalOverride = state.originalStyleOverrides.get(action.payload.id)
      
      console.log('UPDATE_STYLE_OVERRIDE action:', {
        payloadId: action.payload.id,
        hasOriginal: !!originalOverride,
        currentDirty: newDirtyStyleOverrideIds.size
      })
      
      // Helper to normalize values (treat null and empty string as equal)
      const normalizeValue = (val: any) => (val === null || val === undefined || val === '') ? null : val
      
      // Helper to sort object keys for consistent comparison
      const sortObject = (obj: any) => {
        return Object.keys(obj).sort().reduce((result: any, key) => {
          result[key] = obj[key]
          return result
        }, {})
      }
      
      // Check if style override has changed from the original
      let overrideChanged = false
      if (originalOverride) {
        // For existing overrides, check if changed (ignore timestamp fields and normalize values)
        const { createdAt: origCreated, updatedAt: origUpdated, ...origData } = originalOverride
        const { createdAt: payloadCreated, updatedAt: payloadUpdated, ...payloadData } = action.payload
        
        // Normalize both objects
        const normalizedOrig = Object.fromEntries(
          Object.entries(origData).map(([k, v]) => [k, normalizeValue(v)])
        )
        const normalizedPayload = Object.fromEntries(
          Object.entries(payloadData).map(([k, v]) => [k, normalizeValue(v)])
        )
        
        // Sort keys for consistent string comparison
        const originalStr = JSON.stringify(sortObject(normalizedOrig))
        const payloadStr = JSON.stringify(sortObject(normalizedPayload))
        overrideChanged = originalStr !== payloadStr
        console.log('Comparing existing override:', { 
          overrideChanged, 
          originalStr: originalStr.substring(0, 150), 
          payloadStr: payloadStr.substring(0, 150),
          fullOriginal: originalStr,
          fullPayload: payloadStr
        })
      } else {
        // New override (not in original map) - always mark as changed
        overrideChanged = true
        console.log('New override detected - marking as dirty')
      }
      
      if (originalOverride && !overrideChanged) {
        // Override matches original, remove from dirty tracking
        console.log('Override matches original - removing from dirty')
        newDirtyStyleOverrideIds.delete(action.payload.id)
      } else {
        // Override is different or new, add to dirty tracking
        console.log('Adding to dirty tracking:', action.payload.id)
        newDirtyStyleOverrideIds.add(action.payload.id)
      }
      
      console.log('After update - dirty count:', newDirtyStyleOverrideIds.size)
      
      // Check if this override already exists in the state
      const existingIndex = state.styleOverrides.findIndex(o => o.id === action.payload.id)
      let newStyleOverrides
      if (existingIndex >= 0) {
        // Update existing
        console.log('Updating existing override at index:', existingIndex)
        newStyleOverrides = state.styleOverrides.map(override =>
          override.id === action.payload.id ? action.payload : override
        )
      } else {
        // Add new
        console.log('Adding new override')
        newStyleOverrides = [...state.styleOverrides, action.payload]
      }
      
      return {
        ...state,
        styleOverrides: newStyleOverrides,
        dirtyStyleOverrideIds: newDirtyStyleOverrideIds
      }
    case 'REMOVE_STYLE_OVERRIDE':
      const updatedDirtyStyleOverrideIds = new Set(state.dirtyStyleOverrideIds)
      const updatedDeletedStyleOverrideIds = new Set(state.deletedStyleOverrideIds)
      
      // If this override exists in the original state, track it for deletion from DB
      if (state.originalStyleOverrides.has(action.payload)) {
        updatedDeletedStyleOverrideIds.add(action.payload)
        console.log('Tracking override for deletion:', action.payload)
      } else {
        // If it was a new/unsaved override, just remove it from dirty tracking
        updatedDirtyStyleOverrideIds.delete(action.payload)
        console.log('Removing unsaved override from dirty tracking:', action.payload)
      }
      
      // Remove from dirty tracking since it's now deleted
      updatedDirtyStyleOverrideIds.delete(action.payload)
      
      return {
        ...state,
        styleOverrides: state.styleOverrides.filter(override => override.id !== action.payload),
        dirtyStyleOverrideIds: updatedDirtyStyleOverrideIds,
        deletedStyleOverrideIds: updatedDeletedStyleOverrideIds
      }
    case 'CLEAR_DIRTY_TRACKING':
      // Update original values to current values after successful save
      const newOriginalContent = new Map<string, CMSContent>()
      state.content.forEach(item => {
        newOriginalContent.set(item.id, { ...item })
      })
      const newOriginalColorSchemes = new Map<string, ColorScheme>()
      state.colorSchemes.forEach(scheme => {
        newOriginalColorSchemes.set(scheme.id, { ...scheme, colors: { ...scheme.colors } })
      })
      const newOriginalStyleOverrides = new Map<string, ContentStyleOverride>()
      state.styleOverrides.forEach(override => {
        newOriginalStyleOverrides.set(override.id, { ...override })
      })
      return {
        ...state,
        dirtyContentIds: new Set(),
        dirtyColorSchemeIds: new Set(),
        dirtyStyleOverrideIds: new Set(),
        deletedStyleOverrideIds: new Set(),
        originalContent: newOriginalContent,
        originalColorSchemes: newOriginalColorSchemes,
        originalStyleOverrides: newOriginalStyleOverrides
      }
    default:
      return state
  }
}

interface CMSContextType {
  state: CMSState
  dispatch: React.Dispatch<CMSAction>
  // Content management
  getContent: (section?: string) => CMSContent[]
  getContentByKey: (key: string, section: string) => CMSContent | null
  updateContent: (content: CMSContent) => Promise<void>
  updateContentLocally: (content: CMSContent) => void
  saveAllChanges: () => Promise<void>
  // Color management
  getActiveColors: () => ColorScheme['colors'] | null
  updateColorScheme: (scheme: ColorScheme) => Promise<void>
  updateColorSchemeLocally: (scheme: ColorScheme) => void
  // Image management
  getImages: (section?: string) => ImageAsset[]
  uploadImage: (file: File, section: string, alt?: string) => Promise<ImageAsset>
  removeImage: (id: string) => Promise<void>
  // Section management
  getSection: (section: string) => SectionConfig | null
  updateSection: (section: SectionConfig) => Promise<void>
  // Settings management
  updateSettings: (settings: Partial<CMSSettings>) => Promise<void>
  // Style overrides management
  getStyleOverrides: () => ContentStyleOverride[]
  getStyleOverrideForContent: (contentId: string) => ContentStyleOverride | null
  updateStyleOverrideLocally: (override: ContentStyleOverride) => void
  removeStyleOverrideLocally: (id: string) => void
}

const CMSContext = createContext<CMSContextType | null>(null)

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cmsReducer, initialState)

  // Content management functions
  const getContent = (section?: string): CMSContent[] => {
    return section 
      ? state.content.filter(item => item.section === section)
      : state.content
  }

  const getContentByKey = (key: string, section: string): CMSContent | null => {
    return state.content.find(item => item.key === key && item.section === section) || null
  }

  const updateContent = async (content: CMSContent): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/cms/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      
      if (!response.ok) throw new Error('Failed to update content')
      
      dispatch({ type: 'UPDATE_CONTENT', payload: content })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const updateContentLocally = (content: CMSContent): void => {
    dispatch({ type: 'UPDATE_CONTENT', payload: content })
  }

  const saveAllChanges = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      // Only save modified content
      const dirtyContent = state.content.filter(content => 
        state.dirtyContentIds.has(content.id)
      )
      
      // Only save modified color schemes
      const dirtyColorSchemes = state.colorSchemes.filter(scheme => 
        state.dirtyColorSchemeIds.has(scheme.id)
      )
      
      // Only save modified style overrides
      const dirtyStyleOverrides = state.styleOverrides.filter(override => 
        state.dirtyStyleOverrideIds.has(override.id)
      )
      
      // Get deleted style override IDs
      const deletedStyleOverrideIds = Array.from(state.deletedStyleOverrideIds)
      
      // Create promises only for dirty items
      const contentPromises = dirtyContent.map(content => 
        fetch('/api/cms/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(content)
        })
      )
      
      const colorPromises = dirtyColorSchemes.map(scheme => 
        fetch('/api/cms/colors', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scheme)
        })
      )
      
      const styleOverridePromises = dirtyStyleOverrides.map(override => {
        // Check if this is a new override (temp ID or not in originalStyleOverrides)
        const isTempId = override.id.startsWith('temp-')
        const isNew = isTempId || !state.originalStyleOverrides.has(override.id)
        const method = isNew ? 'POST' : 'PUT'
        
        console.log('Saving style override:', {
          id: override.id,
          isTempId,
          isNew,
          method
        })
        
        return fetch('/api/cms/style-adjustments', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(override)
        })
      })
      
      // Create delete promises for removed style overrides
      const styleOverrideDeletePromises = deletedStyleOverrideIds.map(id => {
        console.log('Deleting style override:', id)
        return fetch(`/api/cms/style-adjustments?id=${id}`, {
          method: 'DELETE'
        })
      })
      
      // Only make API calls if there are changes
      if (contentPromises.length > 0 || colorPromises.length > 0 || styleOverridePromises.length > 0 || styleOverrideDeletePromises.length > 0) {
        const results = await Promise.all([...contentPromises, ...colorPromises, ...styleOverridePromises, ...styleOverrideDeletePromises])
        
        // Update style overrides with real IDs from database responses
        const styleStartIndex = contentPromises.length + colorPromises.length
        for (let i = 0; i < styleOverridePromises.length; i++) {
          const response = results[styleStartIndex + i]
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.data) {
              // The response will have the real UUID, update our local state
              console.log('Style override saved with real ID:', result.data)
            }
          }
        }
      }
      
      // Reload style overrides to get the real IDs from database
      try {
        const styleOverridesResponse = await fetch('/api/cms/style-adjustments')
        if (styleOverridesResponse.ok) {
          const styleOverridesData = await styleOverridesResponse.json()
          if (styleOverridesData.success) {
            dispatch({ type: 'SET_STYLE_OVERRIDES', payload: styleOverridesData.data || [] })
          }
        }
      } catch (error) {
        console.error('Error reloading style overrides:', error)
      }
      
      // Clear dirty tracking after successful save
      dispatch({ type: 'CLEAR_DIRTY_TRACKING' })
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  // Color management functions
  const getActiveColors = (): ColorScheme['colors'] | null => {
    return state.activeColorScheme?.colors || null
  }

  const updateColorScheme = async (scheme: ColorScheme): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/cms/colors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheme)
      })
      
      if (!response.ok) throw new Error('Failed to update color scheme')
      
      if (scheme.isActive) {
        dispatch({ type: 'SET_ACTIVE_COLOR_SCHEME', payload: scheme })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const updateColorSchemeLocally = (scheme: ColorScheme): void => {
    if (scheme.isActive) {
      dispatch({ type: 'SET_ACTIVE_COLOR_SCHEME', payload: scheme })
    }
    dispatch({ type: 'UPDATE_COLOR_SCHEME', payload: scheme })
  }

  // Image management functions
  const getImages = (section?: string): ImageAsset[] => {
    return section 
      ? state.images.filter(img => img.section === section)
      : state.images
  }

  const uploadImage = async (file: File, section: string, alt?: string): Promise<ImageAsset> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const formData = new FormData()
      formData.append('file', file)
      formData.append('section', section)
      if (alt) formData.append('alt', alt)
      
      const response = await fetch('/api/cms/images', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error('Failed to upload image')
      
      const result = await response.json()
      dispatch({ type: 'ADD_IMAGE', payload: result.data })
      return result.data
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' })
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const removeImage = async (id: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch(`/api/cms/images?id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Failed to delete image')
      
      dispatch({ type: 'REMOVE_IMAGE', payload: id })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  // Section management functions
  const getSection = (section: string): SectionConfig | null => {
    return state.sections.find(s => s.section === section) || null
  }

  const updateSection = async (section: SectionConfig): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/cms/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section)
      })
      
      if (!response.ok) throw new Error('Failed to update section')
      
      dispatch({ type: 'UPDATE_SECTION', payload: section })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  // Settings management functions
  const updateSettings = async (settings: Partial<CMSSettings>): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/cms/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      
      if (!response.ok) throw new Error('Failed to update settings')
      
      const result = await response.json()
      dispatch({ type: 'SET_SETTINGS', payload: result.data })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  // Style overrides management functions
  const getStyleOverrides = (): ContentStyleOverride[] => {
    return state.styleOverrides
  }

  const getStyleOverrideForContent = (contentId: string): ContentStyleOverride | null => {
    return state.styleOverrides.find(override => override.contentId === contentId) || null
  }

  const updateStyleOverrideLocally = (override: ContentStyleOverride): void => {
    dispatch({ type: 'UPDATE_STYLE_OVERRIDE', payload: override })
  }

  const removeStyleOverrideLocally = (id: string): void => {
    dispatch({ type: 'REMOVE_STYLE_OVERRIDE', payload: id })
  }

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })
        
        // Load content
        const contentResponse = await fetch('/api/cms/content')
        if (contentResponse.ok) {
          const contentData = await contentResponse.json()
          dispatch({ type: 'SET_CONTENT', payload: contentData.data })
        }
        
        // Load color schemes
        const colorsResponse = await fetch('/api/cms/colors')
        if (colorsResponse.ok) {
          const colorsData = await colorsResponse.json()
          dispatch({ type: 'SET_COLOR_SCHEMES', payload: colorsData.data })
        }
        
        // Load active color scheme
        const activeColorsResponse = await fetch('/api/cms/colors?active=true')
        if (activeColorsResponse.ok) {
          const activeColorsData = await activeColorsResponse.json()
          dispatch({ type: 'SET_ACTIVE_COLOR_SCHEME', payload: activeColorsData.data })
        }
        
        // Load images
        const imagesResponse = await fetch('/api/cms/images')
        if (imagesResponse.ok) {
          const imagesData = await imagesResponse.json()
          dispatch({ type: 'SET_IMAGES', payload: imagesData.data })
        }
        
        // Load settings
        const settingsResponse = await fetch('/api/cms/settings')
        if (settingsResponse.ok) {
          const settingsData = await settingsResponse.json()
          dispatch({ type: 'SET_SETTINGS', payload: settingsData.data })
        }
        
        // Load style overrides
        const styleOverridesResponse = await fetch('/api/cms/style-adjustments')
        if (styleOverridesResponse.ok) {
          const styleOverridesData = await styleOverridesResponse.json()
          if (styleOverridesData.success) {
            dispatch({ type: 'SET_STYLE_OVERRIDES', payload: styleOverridesData.data || [] })
          }
        }
        
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Unknown error' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }
    
    loadData()
  }, [])

  const value: CMSContextType = {
    state,
    dispatch,
    getContent,
    getContentByKey,
    updateContent,
    updateContentLocally,
    saveAllChanges,
    getActiveColors,
    updateColorScheme,
    updateColorSchemeLocally,
    getImages,
    uploadImage,
    removeImage,
    getSection,
    updateSection,
    updateSettings,
    getStyleOverrides,
    getStyleOverrideForContent,
    updateStyleOverrideLocally,
    removeStyleOverrideLocally
  }

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  )
}

export function useCMS() {
  const context = useContext(CMSContext)
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider')
  }
  return context
}
