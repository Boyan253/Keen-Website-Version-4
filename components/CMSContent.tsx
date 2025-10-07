'use client'

import { useCMS } from '@/lib/cms/context'
import { useState, useEffect, useRef } from 'react'

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
  const { getContentByKey } = useCMS()
  const [content, setContent] = useState(fallback)
  const lastContentRef = useRef<string>('')

  useEffect(() => {
    const cmsContent = getContentByKey(contentKey, section)
    const newContent = cmsContent ? cmsContent.value : fallback
    
    // Only update if content actually changed to prevent unnecessary re-renders
    if (newContent !== lastContentRef.current) {
      lastContentRef.current = newContent
      setContent(newContent)
    }
  }, [getContentByKey, contentKey, section, fallback])

  if (type === 'html') {
    return (
      <Component 
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }

  return (
    <Component className={className}>
      {content}
    </Component>
  )
}
