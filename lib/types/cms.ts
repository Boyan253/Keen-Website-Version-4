export interface CMSContent {
  id: string
  section: string
  type: 'text' | 'image' | 'color' | 'section'
  key: string
  value: string
  label: string
  description?: string
  category: 'hero' | 'about' | 'product' | 'process' | 'testimonials' | 'faq' | 'footer' | 'header' | 'global' | 'questionnaire'
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface ColorScheme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    textSecondary: string
    textMuted: string
    border: string
    success: string
    warning: string
    error: string
  }
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ImageAsset {
  id: string
  filename: string
  originalName: string
  url: string
  alt: string
  width: number
  height: number
  size: number
  mimeType: string
  section: string
  createdAt: string
  updatedAt: string
}

export interface SectionConfig {
  id: string
  section: string
  enabled: boolean
  order: number
  backgroundColor?: string
  textColor?: string
  padding?: string
  margin?: string
  customCSS?: string
  createdAt: string
  updatedAt: string
}

export interface CMSSettings {
  siteName: string
  siteDescription: string
  logo?: string
  favicon?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  fontSize: string
  lineHeight: string
  borderRadius: string
  shadow: string
  animation: boolean
  darkMode: boolean
  createdAt: string
  updatedAt: string
}
