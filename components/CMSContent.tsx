'use client'

import { useCMS } from '@/lib/cms/context'
import { useState, useEffect, useRef, useMemo } from 'react'

interface CMSContentProps {
  section: string
  contentKey: string
  fallback?: string
  type?: 'text' | 'html'
  className?: string
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
}

export default function CMSContent({ 
  section, 
  contentKey, 
  fallback = '', 
  type = 'text',
  className = '',
  as: Component = 'div'
}: CMSContentProps) {
  const { getContentByKey, getStyleOverrides } = useCMS()
  const [content, setContent] = useState(fallback)
  const [contentId, setContentId] = useState<string | null>(null)
  const lastContentRef = useRef<string>('')

  useEffect(() => {
    const cmsContent = getContentByKey(contentKey, section)
    const newContent = cmsContent ? cmsContent.value : fallback
    
    // Store content ID for style lookups
    if (cmsContent?.id !== contentId) {
      setContentId(cmsContent?.id || null)
    }
    
    // Only update if content actually changed to prevent unnecessary re-renders
    if (newContent !== lastContentRef.current) {
      lastContentRef.current = newContent
      setContent(newContent)
    }
  }, [getContentByKey, contentKey, section, fallback, contentId])

  // Get style overrides for this content
  const styleOverrides = getStyleOverrides()
  const styleOverride = useMemo(() => {
    if (!contentId) return null
    return styleOverrides.find(override => override.contentId === contentId && override.isActive)
  }, [styleOverrides, contentId])

  // Build inline styles from override
  // Note: We need to inject styles via a <style> tag to use !important for CSS specificity
  useEffect(() => {
    if (!styleOverride || !contentId) return
    
    const styleId = `cms-override-${contentId.substring(0, 8)}`
    const className = `cms-override-${contentId.substring(0, 8)}`
    const existingStyle = document.getElementById(styleId)
    
    // Build CSS rules with !important for specificity
    let cssRules = ''
    if (styleOverride.backgroundColor) cssRules += `background-color: ${styleOverride.backgroundColor} !important; `
    if (styleOverride.textColor) cssRules += `color: ${styleOverride.textColor} !important; `
    if (styleOverride.fontSize) cssRules += `font-size: ${styleOverride.fontSize} !important; `
    if (styleOverride.fontWeight) cssRules += `font-weight: ${styleOverride.fontWeight} !important; `
    if (styleOverride.fontFamily) cssRules += `font-family: ${styleOverride.fontFamily} !important; `
    if (styleOverride.lineHeight) cssRules += `line-height: ${styleOverride.lineHeight} !important; `
    if (styleOverride.letterSpacing) cssRules += `letter-spacing: ${styleOverride.letterSpacing} !important; `
    if (styleOverride.textAlign) cssRules += `text-align: ${styleOverride.textAlign} !important; `
    if (styleOverride.padding) cssRules += `padding: ${styleOverride.padding} !important; `
    if (styleOverride.margin) cssRules += `margin: ${styleOverride.margin} !important; `
    if (styleOverride.borderColor) cssRules += `border-color: ${styleOverride.borderColor} !important; `
    if (styleOverride.borderWidth) cssRules += `border-width: ${styleOverride.borderWidth} !important; `
    if (styleOverride.borderRadius) cssRules += `border-radius: ${styleOverride.borderRadius} !important; `
    if (styleOverride.boxShadow) cssRules += `box-shadow: ${styleOverride.boxShadow} !important; `
    if (styleOverride.opacity) cssRules += `opacity: ${styleOverride.opacity} !important; `
    
    console.log('CMSContent Style Injection:', {
      contentId,
      className,
      styleOverride,
      cssRules,
      hasExistingStyle: !!existingStyle
    })
    
    if (cssRules) {
      const fullCSS = `.${className} { ${cssRules} }`
      if (existingStyle) {
        existingStyle.textContent = fullCSS
      } else {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = fullCSS
        document.head.appendChild(style)
        console.log('Injected style tag:', fullCSS)
      }
    } else if (existingStyle) {
      // No rules, remove the style tag
      existingStyle.remove()
    }
    
    return () => {
      // Cleanup when component unmounts
      const style = document.getElementById(styleId)
      if (style) style.remove()
    }
  }, [styleOverride, contentId])
  
  // Build basic inline styles as fallback (without !important)
  const inlineStyles = useMemo(() => {
    if (!styleOverride) return {}
    
    const styles: React.CSSProperties = {}
    
    if (styleOverride.backgroundColor) styles.backgroundColor = styleOverride.backgroundColor
    if (styleOverride.textColor) styles.color = styleOverride.textColor
    if (styleOverride.fontSize) styles.fontSize = styleOverride.fontSize
    if (styleOverride.fontWeight) styles.fontWeight = styleOverride.fontWeight
    if (styleOverride.fontFamily) styles.fontFamily = styleOverride.fontFamily
    if (styleOverride.lineHeight) styles.lineHeight = styleOverride.lineHeight
    if (styleOverride.letterSpacing) styles.letterSpacing = styleOverride.letterSpacing
    if (styleOverride.textAlign) styles.textAlign = styleOverride.textAlign as any
    if (styleOverride.padding) styles.padding = styleOverride.padding
    if (styleOverride.margin) styles.margin = styleOverride.margin
    if (styleOverride.borderColor) styles.borderColor = styleOverride.borderColor
    if (styleOverride.borderWidth) styles.borderWidth = styleOverride.borderWidth
    if (styleOverride.borderRadius) styles.borderRadius = styleOverride.borderRadius
    if (styleOverride.boxShadow) styles.boxShadow = styleOverride.boxShadow
    if (styleOverride.opacity) styles.opacity = styleOverride.opacity
    
    return styles
  }, [styleOverride])

  // Combine className with custom CSS and override class
  const combinedClassName = useMemo(() => {
    let classes = className
    
    // Add style override class
    if (styleOverride && contentId) {
      const overrideClassName = `cms-override-${contentId.substring(0, 8)}`
      classes = `${classes} ${overrideClassName}`.trim()
      console.log('Adding override class:', overrideClassName, 'to element')
    }
    
    // Add custom CSS class if present
    if (styleOverride?.customCss && contentId) {
      const customClassName = `cms-custom-${contentId.substring(0, 8)}`
      
      // Inject custom CSS if not already present
      if (typeof document !== 'undefined') {
        const existingStyle = document.getElementById(customClassName)
        if (!existingStyle) {
          const style = document.createElement('style')
          style.id = customClassName
          style.textContent = `.${customClassName} { ${styleOverride.customCss} }`
          document.head.appendChild(style)
        }
      }
      
      classes = `${classes} ${customClassName}`.trim()
    }
    
    console.log('CMSContent final className:', classes)
    return classes
  }, [styleOverride, contentId, className])

  if (type === 'html') {
    return (
      <Component 
        className={combinedClassName}
        style={inlineStyles}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return (
    <Component 
      className={combinedClassName}
      style={inlineStyles}
    >
      {content}
    </Component>
  )
}
