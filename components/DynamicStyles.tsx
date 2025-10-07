'use client'

import { useCMS } from '@/lib/cms/context'
import { useEffect } from 'react'

export default function DynamicStyles() {
  const { getActiveColors } = useCMS()
  const activeColors = getActiveColors()

  useEffect(() => {
    if (!activeColors) return

    // Create CSS custom properties for the active color scheme
    const root = document.documentElement
    root.style.setProperty('--color-primary', activeColors.primary)
    root.style.setProperty('--color-secondary', activeColors.secondary)
    root.style.setProperty('--color-accent', activeColors.accent)
    root.style.setProperty('--color-background', activeColors.background)
    root.style.setProperty('--color-text', activeColors.text)
    root.style.setProperty('--color-text-secondary', activeColors.textSecondary)
    root.style.setProperty('--color-text-muted', activeColors.textMuted)
    root.style.setProperty('--color-border', activeColors.border)
    root.style.setProperty('--color-success', activeColors.success)
    root.style.setProperty('--color-warning', activeColors.warning)
    root.style.setProperty('--color-error', activeColors.error)

    // Update Tailwind colors dynamically
    const style = document.createElement('style')
    style.textContent = `
      .text-keen-blue { color: ${activeColors.primary} !important; }
      .bg-keen-blue { background-color: ${activeColors.primary} !important; }
      .border-keen-blue { border-color: ${activeColors.primary} !important; }
      .text-keen-gray { color: ${activeColors.text} !important; }
      .bg-keen-gray { background-color: ${activeColors.text} !important; }
      .border-keen-gray { border-color: ${activeColors.text} !important; }
      .text-keen-gradient-end { color: ${activeColors.accent} !important; }
      .bg-keen-gradient-end { background-color: ${activeColors.accent} !important; }
      .bg-keen-gradient-start { background-color: ${activeColors.background} !important; }
      
      .gradient-text {
        background: linear-gradient(to right, ${activeColors.primary}, ${activeColors.accent});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .gradient-bg {
        background: linear-gradient(135deg, ${activeColors.background}, ${activeColors.primary});
      }
      
      .btn-primary {
        background-color: ${activeColors.primary} !important;
        color: white !important;
        border-color: ${activeColors.primary} !important;
      }
      
      .btn-primary:hover {
        background-color: ${activeColors.accent} !important;
        border-color: ${activeColors.accent} !important;
      }
      
      .btn-secondary {
        background-color: transparent !important;
        color: ${activeColors.primary} !important;
        border-color: ${activeColors.primary} !important;
      }
      
      .btn-secondary:hover {
        background-color: ${activeColors.primary} !important;
        color: white !important;
      }
    `
    
    // Remove existing dynamic styles
    const existingStyle = document.getElementById('dynamic-cms-styles')
    if (existingStyle) {
      existingStyle.remove()
    }
    
    style.id = 'dynamic-cms-styles'
    document.head.appendChild(style)

    return () => {
      const styleElement = document.getElementById('dynamic-cms-styles')
      if (styleElement) {
        styleElement.remove()
      }
    }
  }, [activeColors])

  return null
}
