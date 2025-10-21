import { supabase } from '@/lib/supabase/client'
import { CMSContent, ColorScheme, ImageAsset, SectionConfig, CMSSettings } from '@/lib/types/cms'

export class SupabaseCMSDatabase {
  // Content management
  async getContent(section?: string): Promise<CMSContent[]> {
    let query = supabase.from('cms_content').select('*')
    
    if (section) {
      query = query.eq('section', section)
    }
    
    const { data, error } = await query.order('created_at', { ascending: true })
    
    if (error) {
      console.error('Error fetching content:', error)
      return []
    }
    
    return data || []
  }

  async getContentByKey(key: string, section: string): Promise<CMSContent | null> {
    const { data, error } = await supabase
      .from('cms_content')
      .select('*')
      .eq('key', key)
      .eq('section', section)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') return null // No rows found
      console.error('Error fetching content by key:', error)
      return null
    }
    
    return data
  }

  async setContent(content: Omit<CMSContent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CMSContent> {
    const now = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('cms_content')
      .upsert({
        section: content.section,
        type: content.type,
        key: content.key,
        value: content.value,
        label: content.label,
        description: content.description,
        category: content.category,
        is_published: content.isPublished,
        updated_at: now
      }, {
        onConflict: 'section,key'
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error setting content:', error)
      throw new Error('Failed to save content')
    }
    
    return {
      id: data.id,
      section: data.section,
      type: data.type,
      key: data.key,
      value: data.value,
      label: data.label,
      description: data.description,
      category: data.category,
      isPublished: data.is_published,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  }

  async deleteContent(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('cms_content')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting content:', error)
      return false
    }
    
    return true
  }

  // Color scheme management
  async getColorSchemes(): Promise<ColorScheme[]> {
    const { data, error } = await supabase
      .from('cms_color_schemes')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (error) {
      console.error('Error fetching color schemes:', error)
      return []
    }
    
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      colors: item.colors,
      isActive: item.is_active,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }))
  }

  async getActiveColorScheme(): Promise<ColorScheme | null> {
    const { data, error } = await supabase
      .from('cms_color_schemes')
      .select('*')
      .eq('is_active', true)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') return null // No rows found
      console.error('Error fetching active color scheme:', error)
      return null
    }
    
    return {
      id: data.id,
      name: data.name,
      colors: data.colors,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  }

  async setColorScheme(scheme: Omit<ColorScheme, 'id' | 'createdAt' | 'updatedAt'>): Promise<ColorScheme> {
    const now = new Date().toISOString()
    
    // If this scheme is active, deactivate all others first
    if (scheme.isActive) {
      await supabase
        .from('cms_color_schemes')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000') // Update all except non-existent ID
    }
    
    const { data, error } = await supabase
      .from('cms_color_schemes')
      .upsert({
        name: scheme.name,
        colors: scheme.colors,
        is_active: scheme.isActive,
        updated_at: now
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error setting color scheme:', error)
      throw new Error('Failed to save color scheme')
    }
    
    return {
      id: data.id,
      name: data.name,
      colors: data.colors,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  }

  // Image management
  async getImages(section?: string): Promise<ImageAsset[]> {
    let query = supabase.from('cms_images').select('*')
    
    if (section) {
      query = query.eq('section', section)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching images:', error)
      return []
    }
    
    return (data || []).map(item => ({
      id: item.id,
      filename: item.original_name,
      originalName: item.original_name,
      url: item.url,
      alt: item.alt || '',
      width: 0, // Default values since we don't store these in Supabase
      height: 0,
      size: 0,
      mimeType: 'image/jpeg', // Default mime type
      section: item.section,
      createdAt: item.created_at,
      updatedAt: item.updated_at
    }))
  }

  async addImage(image: Omit<ImageAsset, 'id' | 'createdAt' | 'updatedAt'>): Promise<ImageAsset> {
    const now = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('cms_images')
      .insert({
        url: image.url,
        alt: image.alt,
        original_name: image.originalName,
        section: image.section,
        created_at: now,
        updated_at: now
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error adding image:', error)
      throw new Error('Failed to save image')
    }
    
    return {
      id: data.id,
      filename: data.original_name,
      originalName: data.original_name,
      url: data.url,
      alt: data.alt || '',
      width: image.width || 0,
      height: image.height || 0,
      size: image.size || 0,
      mimeType: image.mimeType || 'image/jpeg',
      section: data.section,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  }

  async removeImage(id: string): Promise<void> {
    const { error } = await supabase
      .from('cms_images')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error removing image:', error)
      throw new Error('Failed to delete image')
    }
  }

  // Settings management
  async getSettings(): Promise<CMSSettings> {
    const { data, error } = await supabase
      .from('cms_settings')
      .select('*')
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No settings found, return default
        return {
          siteName: 'Keen Agents',
          siteDescription: 'AI Employees for Your Business',
          primaryColor: '#04a5fa',
          secondaryColor: '#656565',
          accentColor: '#06b6d4',
          fontFamily: 'Montserrat',
          fontSize: '16px',
          lineHeight: '1.6',
          borderRadius: '8px',
          shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          animation: true,
          darkMode: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
      console.error('Error fetching settings:', error)
      throw new Error('Failed to fetch settings')
    }
    
    return {
      siteName: data.site_name,
      siteDescription: data.site_description,
      primaryColor: data.primary_color,
      secondaryColor: data.secondary_color,
      accentColor: data.accent_color,
      fontFamily: data.font_family,
      fontSize: data.font_size,
      lineHeight: data.line_height,
      borderRadius: data.border_radius,
      shadow: data.shadow,
      animation: data.animation,
      darkMode: data.dark_mode,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  }

  async setSettings(settings: Partial<CMSSettings>): Promise<CMSSettings> {
    const now = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('cms_settings')
      .upsert({
        site_name: settings.siteName,
        site_description: settings.siteDescription,
        primary_color: settings.primaryColor,
        secondary_color: settings.secondaryColor,
        accent_color: settings.accentColor,
        font_family: settings.fontFamily,
        font_size: settings.fontSize,
        line_height: settings.lineHeight,
        border_radius: settings.borderRadius,
        shadow: settings.shadow,
        animation: settings.animation,
        dark_mode: settings.darkMode,
        updated_at: now
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error setting settings:', error)
      throw new Error('Failed to save settings')
    }
    
    return {
      siteName: data.site_name,
      siteDescription: data.site_description,
      primaryColor: data.primary_color,
      secondaryColor: data.secondary_color,
      accentColor: data.accent_color,
      fontFamily: data.font_family,
      fontSize: data.font_size,
      lineHeight: data.line_height,
      borderRadius: data.border_radius,
      shadow: data.shadow,
      animation: data.animation,
      darkMode: data.dark_mode,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    }
  }

  async updateSettings(settings: Partial<CMSSettings>): Promise<CMSSettings> {
    return this.setSettings(settings)
  }

  // Initialize with default data
  async initializeDefaultContent(): Promise<void> {
    // Clear existing content first
    await supabase.from('cms_content').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('cms_color_schemes').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    const defaultContent: Omit<CMSContent, 'id' | 'createdAt' | 'updatedAt'>[] = [
      // Header Section
      {
        section: 'header',
        type: 'text',
        key: 'logo_text',
        value: 'keen',
        label: 'Logo Text',
        description: 'Main logo text',
        category: 'header',
        isPublished: true
      },
      {
        section: 'header',
        type: 'text',
        key: 'logo_subtext',
        value: 'agents',
        label: 'Logo Subtext',
        description: 'Logo subtext',
        category: 'header',
        isPublished: true
      },
      {
        section: 'header',
        type: 'text',
        key: 'tagline',
        value: 'Multi-Agent Orchestration\non a Whole New Level',
        label: 'Header Tagline',
        description: 'Tagline displayed next to logo (use \\n for line breaks)',
        category: 'header',
        isPublished: true
      },
      {
        section: 'header',
        type: 'text',
        key: 'nav_what_we_do',
        value: 'What We Do',
        label: 'Navigation - What We Do',
        description: 'Navigation menu item',
        category: 'header',
        isPublished: true
      },
      {
        section: 'header',
        type: 'text',
        key: 'nav_how_we_do_it',
        value: 'How We Do It',
        label: 'Navigation - How We Do It',
        description: 'Navigation menu item',
        category: 'header',
        isPublished: true
      },
      {
        section: 'header',
        type: 'text',
        key: 'nav_success_stories',
        value: 'Success Stories',
        label: 'Navigation - Success Stories',
        description: 'Navigation menu item',
        category: 'header',
        isPublished: true
      },
      {
        section: 'header',
        type: 'text',
        key: 'nav_about_us',
        value: 'About Us',
        label: 'Navigation - About Us',
        description: 'Navigation menu item',
        category: 'header',
        isPublished: true
      },
      {
        section: 'header',
        type: 'text',
        key: 'nav_faq',
        value: 'FAQ',
        label: 'Navigation - FAQ',
        description: 'Navigation menu item',
        category: 'header',
        isPublished: true
      },
      {
        section: 'header',
        type: 'text',
        key: 'cta_quiz',
        value: 'AI Readiness Quiz',
        label: 'Header CTA - Quiz',
        description: 'Quiz button text in header',
        category: 'header',
        isPublished: true
      },
      {
        section: 'header',
        type: 'text',
        key: 'cta_consultation',
        value: 'Book Consultation',
        label: 'Header CTA - Consultation',
        description: 'Consultation button text in header',
        category: 'header',
        isPublished: true
      },
      // Hero Section
      {
        section: 'hero',
        type: 'text',
        key: 'headline',
        value: 'AI Implementation Made Simple — Deploy Production-Ready AI Agents in Days',
        label: 'Hero Headline',
        description: 'Main headline displayed in the hero section',
        category: 'hero',
        isPublished: true
      },
      {
        section: 'hero',
        type: 'text',
        key: 'subheadline',
        value: 'We do not sell our software platform — we deliver business outcomes. Working with our proprietary software platform, we design, train and operate custom AI agents that behave like YOUR high-performing employees.',
        label: 'Hero Subheadline',
        description: 'Subheadline text below the main headline',
        category: 'hero',
        isPublished: true
      },
      {
        section: 'hero',
        type: 'text',
        key: 'support_line',
        value: '10x faster time to POC • Rapid Time-to-Value • Deploy production-ready AI agents in days, not months',
        label: 'Hero Support Line',
        description: 'Support line below subheadline',
        category: 'hero',
        isPublished: true
      },
      {
        section: 'hero',
        type: 'text',
        key: 'cta_primary',
        value: 'Book a Free Consultation',
        label: 'Primary CTA Button',
        description: 'Text for the primary call-to-action button',
        category: 'hero',
        isPublished: true
      },
      {
        section: 'hero',
        type: 'text',
        key: 'cta_secondary',
        value: 'Take AI Readiness Quiz',
        label: 'Secondary CTA Button',
        description: 'Text for the secondary call-to-action button',
        category: 'hero',
        isPublished: true
      },
      {
        section: 'hero',
        type: 'text',
        key: 'stats_1_metric',
        value: '10x',
        label: 'Hero Stat 1 - Metric',
        description: 'First statistic metric',
        category: 'hero',
        isPublished: true
      },
      {
        section: 'hero',
        type: 'text',
        key: 'stats_1_label',
        value: 'faster time to POC',
        label: 'Hero Stat 1 - Label',
        description: 'First statistic label',
        category: 'hero',
        isPublished: true
      },
      {
        section: 'hero',
        type: 'text',
        key: 'stats_2_metric',
        value: 'Days',
        label: 'Hero Stat 2 - Metric',
        description: 'Second statistic metric',
        category: 'hero',
        isPublished: true
      },
      {
        section: 'hero',
        type: 'text',
        key: 'stats_2_label',
        value: 'not months to deploy',
        label: 'Hero Stat 2 - Label',
        description: 'Second statistic label',
        category: 'hero',
        isPublished: true
      },
      {
        section: 'hero',
        type: 'text',
        key: 'stats_3_metric',
        value: 'Rapid',
        label: 'Hero Stat 3 - Metric',
        description: 'Third statistic metric',
        category: 'hero',
        isPublished: true
      },
      {
        section: 'hero',
        type: 'text',
        key: 'stats_3_label',
        value: 'time-to-value',
        label: 'Hero Stat 3 - Label',
        description: 'Third statistic label',
        category: 'hero',
        isPublished: true
      },
      // Product Section
      {
        section: 'product',
        type: 'text',
        key: 'title',
        value: 'AI Implementation Made Simple',
        label: 'Product Section Title',
        description: 'Title of the product section',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'description',
        value: 'We do not sell our software platform — we deliver business outcomes. Working with our proprietary software platform, we design, train and operate custom AI agents that behave like YOUR high-performing employees.',
        label: 'Product Section Description',
        description: 'Description text for the product section',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'value_prop_1_title',
        value: '10x Faster POC',
        label: 'Value Proposition 1 - Title',
        description: 'First value proposition title',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'value_prop_1_description',
        value: 'Get from concept to working prototype in days, not months. Rapid validation of AI use cases with immediate business impact.',
        label: 'Value Proposition 1 - Description',
        description: 'First value proposition description',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'value_prop_2_title',
        value: 'Rapid Time-to-Value',
        label: 'Value Proposition 2 - Title',
        description: 'Second value proposition title',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'value_prop_2_description',
        value: 'Deploy production-ready AI agents quickly with measurable ROI from day one. No lengthy implementation cycles.',
        label: 'Value Proposition 2 - Description',
        description: 'Second value proposition description',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'value_prop_3_title',
        value: 'Days, Not Months',
        label: 'Value Proposition 3 - Title',
        description: 'Third value proposition title',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'value_prop_3_description',
        value: 'Simple deployment process that works with your existing systems. No complex integrations or IT overhauls required.',
        label: 'Value Proposition 3 - Description',
        description: 'Third value proposition description',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'value_prop_4_title',
        value: 'Production-Ready',
        label: 'Value Proposition 4 - Title',
        description: 'Fourth value proposition title',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'value_prop_4_description',
        value: 'Enterprise-grade AI agents that are immediately ready for production use with built-in monitoring and human oversight.',
        label: 'Value Proposition 4 - Description',
        description: 'Fourth value proposition description',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'feature_1_title',
        value: 'Process Automation',
        label: 'Feature 1 - Title',
        description: 'First feature title',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'feature_1_description',
        value: 'Reduce manual processing, enforce business rules, and eliminate repetitive errors.',
        label: 'Feature 1 - Description',
        description: 'First feature description',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'feature_1_stats',
        value: '85% reduction in manual tasks',
        label: 'Feature 1 - Stats',
        description: 'First feature statistics',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'feature_2_title',
        value: 'Customer Experience',
        label: 'Feature 2 - Title',
        description: 'Second feature title',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'feature_2_description',
        value: 'Faster responses, contextual answers, and consistent service 24/7.',
        label: 'Feature 2 - Description',
        description: 'Second feature description',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'feature_2_stats',
        value: '24/7 availability',
        label: 'Feature 2 - Stats',
        description: 'Second feature statistics',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'feature_3_title',
        value: 'Operational Resilience',
        label: 'Feature 3 - Title',
        description: 'Third feature title',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'feature_3_description',
        value: 'Scale instantly without hiring; maintain performance during peak demand.',
        label: 'Feature 3 - Description',
        description: 'Third feature description',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'feature_3_stats',
        value: '99.9% uptime SLA',
        label: 'Feature 3 - Stats',
        description: 'Third feature statistics',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'cta_title',
        value: 'Ready for Rapid AI Implementation?',
        label: 'Product CTA Title',
        description: 'Product section CTA title',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'cta_description',
        value: 'Deploy production-ready AI agents in days, not months. Join forward-thinking companies already using our rapid implementation approach.',
        label: 'Product CTA Description',
        description: 'Product section CTA description',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'cta_primary',
        value: 'Start Rapid Implementation',
        label: 'Product CTA Primary',
        description: 'Product section primary CTA button',
        category: 'product',
        isPublished: true
      },
      {
        section: 'product',
        type: 'text',
        key: 'cta_secondary',
        value: 'See 10x Faster POC',
        label: 'Product CTA Secondary',
        description: 'Product section secondary CTA button',
        category: 'product',
        isPublished: true
      },
      // Process Section
      {
        section: 'process',
        type: 'text',
        key: 'title',
        value: 'Rapid Implementation Process',
        label: 'Process Section Title',
        description: 'Title of the process section',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'description',
        value: 'Our streamlined three-phase framework delivers production-ready AI agents in days, not months. Each phase is optimized for speed while maintaining quality and safety.',
        label: 'Process Section Description',
        description: 'Description text for the process section',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_1_title',
        value: 'Discovery & Process Mapping',
        label: 'Phase 1 - Title',
        description: 'First phase title',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_1_subtitle',
        value: 'Deeply understand workflows and data sources',
        label: 'Phase 1 - Subtitle',
        description: 'First phase subtitle',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_1_duration',
        value: '1-2 weeks',
        label: 'Phase 1 - Duration',
        description: 'First phase duration',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_1_description',
        value: 'We interview stakeholders, run shadowing sessions, and map your end-to-end processes to understand every decision point and KPI.',
        label: 'Phase 1 - Description',
        description: 'First phase description',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'json',
        key: 'phase_1_deliverables',
        value: JSON.stringify([
          "Process maps",
          "Success metrics", 
          "Data inventory",
          "Integration matrix"
        ]),
        label: 'Phase 1 - Deliverables',
        description: 'First phase deliverables list',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_2_title',
        value: 'Agent Design & Prototype',
        label: 'Phase 2 - Title',
        description: 'Second phase title',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_2_subtitle',
        value: 'Build a narrow-scope prototype agent',
        label: 'Phase 2 - Subtitle',
        description: 'Second phase subtitle',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_2_duration',
        value: '2-4 weeks',
        label: 'Phase 2 - Duration',
        description: 'Second phase duration',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_2_description',
        value: 'We build an MVP agent that automates a clearly scoped task, defining intents, conversation flows, and validation rules.',
        label: 'Phase 2 - Description',
        description: 'Second phase description',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'json',
        key: 'phase_2_deliverables',
        value: JSON.stringify([
          "Prototype agent",
          "Test cases",
          "Sandbox connector(s)"
        ]),
        label: 'Phase 2 - Deliverables',
        description: 'Second phase deliverables list',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_3_title',
        value: 'Integration & Pilot',
        label: 'Phase 3 - Title',
        description: 'Third phase title',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_3_subtitle',
        value: 'Deploy into controlled pilot with live data',
        label: 'Phase 3 - Subtitle',
        description: 'Third phase subtitle',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_3_duration',
        value: '2-6 weeks',
        label: 'Phase 3 - Duration',
        description: 'Third phase duration',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'phase_3_description',
        value: 'We deploy the agent into a controlled pilot with live data, setting up telemetry, logging, and human escalation paths.',
        label: 'Phase 3 - Description',
        description: 'Third phase description',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'json',
        key: 'phase_3_deliverables',
        value: JSON.stringify([
          "Pilot deployment",
          "Monitoring dashboard",
          "Pilot report with ROI analysis"
        ]),
        label: 'Phase 3 - Deliverables',
        description: 'Third phase deliverables list',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'continuous_title',
        value: 'Continuous Improvement & Operations',
        label: 'Continuous - Title',
        description: 'Continuous improvement title',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'continuous_subtitle',
        value: 'Roll into production with ongoing optimization',
        label: 'Continuous - Subtitle',
        description: 'Continuous improvement subtitle',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'continuous_duration',
        value: 'Ongoing',
        label: 'Continuous - Duration',
        description: 'Continuous improvement duration',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'continuous_description',
        value: 'We roll the agent into production, document runbooks, and hand over an operations model or continue operating on your behalf.',
        label: 'Continuous - Description',
        description: 'Continuous improvement description',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'json',
        key: 'continuous_deliverables',
        value: JSON.stringify([
          "Production rollout",
          "Training materials",
          "Performance SLA",
          "Continuous optimization plan"
        ]),
        label: 'Continuous - Deliverables',
        description: 'Continuous improvement deliverables list',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'roles_title',
        value: 'Who Does What',
        label: 'Roles Title',
        description: 'Roles section title',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'role_client_title',
        value: 'Client',
        label: 'Client Role Title',
        description: 'Title for client role',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'json',
        key: 'role_client_responsibilities',
        value: JSON.stringify([
          "Describe current business processes",
          "Define business needs and requirements",
          "Provide access to subject-matter experts",
          "Approve process maps",
          "Participate in pilot acceptance"
        ]),
        label: 'Client Role Responsibilities',
        description: 'List of client responsibilities',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'role_keen_title',
        value: 'Keen Agents',
        label: 'Keen Agents Role Title',
        description: 'Title for Keen Agents role',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'json',
        key: 'role_keen_responsibilities',
        value: JSON.stringify([
          "Understand and analyze business processes",
          "Optimize processes together with client (when needed)",
          "Deploy and configure our AI platform",
          "Set up agents to execute tasks according to client's specific processes"
        ]),
        label: 'Keen Agents Role Responsibilities',
        description: 'List of Keen Agents responsibilities',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'cta_title',
        value: 'Ready for Rapid AI Deployment?',
        label: 'Process CTA Title',
        description: 'Process section CTA title',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'cta_description',
        value: 'Our streamlined process delivers production-ready AI agents in days, not months. Start your rapid implementation today.',
        label: 'Process CTA Description',
        description: 'Process section CTA description',
        category: 'process',
        isPublished: true
      },
      {
        section: 'process',
        type: 'text',
        key: 'cta_button',
        value: 'Start Rapid Implementation',
        label: 'Process CTA Button',
        description: 'Process section CTA button',
        category: 'process',
        isPublished: true
      },
      // Testimonials Section
      {
        section: 'testimonials',
        type: 'text',
        key: 'title',
        value: 'Success Stories',
        label: 'Testimonials Section Title',
        description: 'Title of the testimonials section',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'description',
        value: 'Real companies, real results. See how forward-thinking organizations are using AI agents to transform their operations.',
        label: 'Testimonials Section Description',
        description: 'Description text for the testimonials section',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'metric_1_value',
        value: '70%',
        label: 'Metric 1 - Value',
        description: 'First metric value',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'metric_1_label',
        value: 'Average automation rate',
        label: 'Metric 1 - Label',
        description: 'First metric label',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'metric_2_value',
        value: '85%',
        label: 'Metric 2 - Value',
        description: 'Second metric value',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'metric_2_label',
        value: 'Faster response times',
        label: 'Metric 2 - Label',
        description: 'Second metric label',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'metric_3_value',
        value: '25%',
        label: 'Metric 3 - Value',
        description: 'Third metric value',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'metric_3_label',
        value: 'Cost reduction',
        label: 'Metric 3 - Label',
        description: 'Third metric label',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'metric_4_value',
        value: '99.9%',
        label: 'Metric 4 - Value',
        description: 'Fourth metric value',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'metric_4_label',
        value: 'Uptime SLA',
        label: 'Metric 4 - Label',
        description: 'Fourth metric label',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_1_company',
        value: 'Unimasters Logistics',
        label: 'Case Study 1 - Company',
        description: 'First case study company name',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_1_industry',
        value: 'Logistics & Customer Service',
        label: 'Case Study 1 - Industry',
        description: 'First case study industry',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_1_challenge',
        value: 'High volumes of routine customer inquiries overwhelmed the support desk during peak hours, leading to delayed responses and customer dissatisfaction',
        label: 'Case Study 1 - Challenge',
        description: 'First case study challenge',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_1_solution',
        value: 'Deployed a customer-service AI agent trained on Unimasters Logistics\' historical tickets, internal knowledge base, and ERP product catalog with phased rollout and human fallback',
        label: 'Case Study 1 - Solution',
        description: 'First case study solution',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_1_quote',
        value: 'Keen Agents allowed us to reclaim our team\'s time and dramatically improve response quality.',
        label: 'Case Study 1 - Quote',
        description: 'First case study quote',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_1_author',
        value: 'Customer Service Director, Unimasters Logistics',
        label: 'Case Study 1 - Author',
        description: 'First case study author',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_2_company',
        value: 'Renault',
        label: 'Case Study 2 - Company',
        description: 'Second case study company name',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_2_industry',
        value: 'Operations',
        label: 'Case Study 2 - Industry',
        description: 'Second case study industry',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_2_challenge',
        value: 'Slow back-office processing created order fulfillment delays',
        label: 'Case Study 2 - Challenge',
        description: 'Second case study challenge',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_2_solution',
        value: 'Built an order-processing agent that validated incoming orders, enriched records, and routed exceptions to human reviewers',
        label: 'Case Study 2 - Solution',
        description: 'Second case study solution',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_2_quote',
        value: 'ROI was visible within weeks — the integration was seamless and low-risk.',
        label: 'Case Study 2 - Quote',
        description: 'Second case study quote',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'case_study_2_author',
        value: 'Operations Director, Renault',
        label: 'Case Study 2 - Author',
        description: 'Second case study author',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'video_title',
        value: 'See It In Action',
        label: 'Video Section Title',
        description: 'Video section title',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'video_description',
        value: 'Watch how our AI agents work in real business environments',
        label: 'Video Section Description',
        description: 'Video section description',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'video_button',
        value: 'Watch Demo',
        label: 'Video Button',
        description: 'Video button text',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'cta_title',
        value: 'Ready to Join These Success Stories?',
        label: 'Testimonials CTA Title',
        description: 'Testimonials section CTA title',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'cta_description',
        value: 'Let\'s discuss how AI agents can transform your business operations.',
        label: 'Testimonials CTA Description',
        description: 'Testimonials section CTA description',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'cta_primary',
        value: 'Start Your Success Story',
        label: 'Testimonials CTA Primary',
        description: 'Testimonials section primary CTA button',
        category: 'testimonials',
        isPublished: true
      },
      {
        section: 'testimonials',
        type: 'text',
        key: 'cta_secondary',
        value: 'Download Case Studies',
        label: 'Testimonials CTA Secondary',
        description: 'Testimonials section secondary CTA button',
        category: 'testimonials',
        isPublished: true
      },
      // About Section
      {
        section: 'about',
        type: 'text',
        key: 'title',
        value: 'About Us',
        label: 'About Section Title',
        description: 'Title of the about section',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'description',
        value: 'Keen Agents was founded to bridge the gap between AI research and practical business impact. Our leadership combines decades of enterprise technology, process engineering, and applied AI.',
        label: 'About Section Description',
        description: 'Description text for the about section',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'leader_1_name',
        value: 'Petar Denev',
        label: 'Leader 1 - Name',
        description: 'First leader name',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'leader_1_role',
        value: 'Co-founder & CEO',
        label: 'Leader 1 - Role',
        description: 'First leader role',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'leader_1_bio',
        value: '30+ years leading technology and digital transformation programs across enterprise and mid-market organisations. Petar was inspired to co-found Keen Agents after witnessing countless businesses struggle with manual, repetitive processes that could be automated. His vision is to democratize AI automation, making it accessible to businesses of all sizes without the complexity and cost barriers that have traditionally existed.',
        label: 'Leader 1 - Bio',
        description: 'First leader biography',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'leader_2_name',
        value: 'Viktor Vatchev',
        label: 'Leader 2 - Name',
        description: 'Second leader name',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'leader_2_role',
        value: 'Co-founder & CTO',
        label: 'Leader 2 - Role',
        description: 'Second leader role',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'leader_2_bio',
        value: 'AI systems architect and product leader with experience deploying automation at scale. Viktor was driven to co-found Keen Agents by the gap between AI research and practical business implementation. Having seen the potential of AI agents in production environments, he was inspired to create a platform that makes AI automation accessible, reliable, and profitable for businesses without requiring deep technical expertise.',
        label: 'Leader 2 - Bio',
        description: 'Second leader biography',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'mission_title',
        value: 'Our Mission',
        label: 'Mission Title',
        description: 'Mission section title',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'mission_description',
        value: 'To democratize AI implementation by making it accessible, reliable, and profitable for businesses of all sizes. We believe every company should have access to production-ready AI agents that deliver measurable business outcomes, reduce costs, and enhance customer experiences.',
        label: 'Mission Description',
        description: 'Mission description',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'mission_cta_primary',
        value: 'Join Our Mission',
        label: 'Mission CTA Primary',
        description: 'Mission section primary CTA button',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'mission_cta_secondary',
        value: 'Learn More About Us',
        label: 'Mission CTA Secondary',
        description: 'Mission section secondary CTA button',
        category: 'about',
        isPublished: true
      },
      // FAQ Section
      {
        section: 'faq',
        type: 'text',
        key: 'title',
        value: 'Frequently Asked Questions',
        label: 'FAQ Section Title',
        description: 'Title of the FAQ section',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'description',
        value: 'Get answers to common questions about AI agent implementation, security, and support.',
        label: 'FAQ Section Description',
        description: 'Description text for the FAQ section',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'cta_title',
        value: 'Still Have Questions?',
        label: 'FAQ CTA Title',
        description: 'FAQ section CTA title',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'cta_description',
        value: 'Our team is here to help. Schedule a consultation to discuss your specific needs and get personalized answers.',
        label: 'FAQ CTA Description',
        description: 'FAQ section CTA description',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'cta_primary',
        value: 'Schedule Consultation',
        label: 'FAQ CTA Primary',
        description: 'FAQ section primary CTA button',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'cta_secondary',
        value: 'Contact Support',
        label: 'FAQ CTA Secondary',
        description: 'FAQ section secondary CTA button',
        category: 'faq',
        isPublished: true
      },
      // Questionnaire Section
      {
        section: 'questionnaire',
        type: 'text',
        key: 'title',
        value: 'AI Readiness Questionnaire',
        label: 'Questionnaire Title',
        description: 'Title of the questionnaire section',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'description',
        value: 'Take our quick assessment to discover your AI automation potential and get personalized recommendations.',
        label: 'Questionnaire Description',
        description: 'Description text for the questionnaire section',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'results_title',
        value: 'Your AI Readiness Results',
        label: 'Questionnaire Results Title',
        description: 'Title for questionnaire results',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'results_description',
        value: 'Based on your answers, here\'s your personalized AI readiness assessment.',
        label: 'Questionnaire Results Description',
        description: 'Description for questionnaire results',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'cta_primary',
        value: 'Schedule Discovery Call',
        label: 'Questionnaire CTA Primary',
        description: 'Questionnaire primary CTA button',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'cta_secondary',
        value: 'Retake Quiz',
        label: 'Questionnaire CTA Secondary',
        description: 'Questionnaire secondary CTA button',
        category: 'questionnaire',
        isPublished: true
      },
      // Footer Section
      {
        section: 'footer',
        type: 'text',
        key: 'logo_text',
        value: 'keen',
        label: 'Footer Logo Text',
        description: 'Footer logo text',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'logo_subtext',
        value: 'agents',
        label: 'Footer Logo Subtext',
        description: 'Footer logo subtext',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'tagline',
        value: 'Multi-Agent Orchestration on a Whole New Level',
        label: 'Footer Tagline',
        description: 'Footer tagline',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'description',
        value: 'We do not sell our software platform — we deliver business outcomes. Deploy production-ready AI agents in days, not months. 10x faster time to POC with rapid time-to-value.',
        label: 'Footer Description',
        description: 'Footer description text',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'newsletter_title',
        value: 'Stay Updated',
        label: 'Newsletter Title',
        description: 'Newsletter signup title',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'newsletter_description',
        value: 'Get the latest insights on AI automation and business transformation.',
        label: 'Newsletter Description',
        description: 'Newsletter signup description',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'newsletter_placeholder',
        value: 'Enter your email',
        label: 'Newsletter Placeholder',
        description: 'Newsletter input placeholder',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'newsletter_button',
        value: 'Subscribe',
        label: 'Newsletter Button',
        description: 'Newsletter subscribe button',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'copyright',
        value: 'Keen Agents. All rights reserved.',
        label: 'Copyright Text',
        description: 'Copyright text',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'contact_email',
        value: 'hello@keenagents.com',
        label: 'Contact Email',
        description: 'Contact email address',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'contact_phone',
        value: '+1 (555) 123-4567',
        label: 'Contact Phone',
        description: 'Contact phone number',
        category: 'footer',
        isPublished: true
      },
      {
        section: 'footer',
        type: 'text',
        key: 'contact_address',
        value: 'San Francisco, CA',
        label: 'Contact Address',
        description: 'Contact address',
        category: 'footer',
        isPublished: true
      },
      // Questionnaire Questions
      {
        section: 'questionnaire',
        type: 'text',
        key: 'question_1_text',
        value: 'Do you have digital records of the process you want to automate?',
        label: 'Question 1 - Text',
        description: 'First questionnaire question text',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'json',
        key: 'question_1_options',
        value: JSON.stringify([
          { value: "yes", label: "Yes, we have comprehensive digital records" },
          { value: "partial", label: "Partial, some processes are documented" },
          { value: "no", label: "No, most processes are manual or undocumented" }
        ]),
        label: 'Question 1 - Options',
        description: 'First questionnaire question options',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'question_2_text',
        value: 'How many employees currently handle the process you want to automate?',
        label: 'Question 2 - Text',
        description: 'Second questionnaire question text',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'json',
        key: 'question_2_options',
        value: JSON.stringify([
          { value: "1-2", label: "1-2 employees" },
          { value: "3-5", label: "3-5 employees" },
          { value: "6-10", label: "6-10 employees" },
          { value: "10+", label: "More than 10 employees" }
        ]),
        label: 'Question 2 - Options',
        description: 'Second questionnaire question options',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'question_3_text',
        value: 'What is the average time spent on this process per day?',
        label: 'Question 3 - Text',
        description: 'Third questionnaire question text',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'json',
        key: 'question_3_options',
        value: JSON.stringify([
          { value: "1-2", label: "1-2 hours per day" },
          { value: "3-5", label: "3-5 hours per day" },
          { value: "6-8", label: "6-8 hours per day" },
          { value: "8+", label: "More than 8 hours per day" }
        ]),
        label: 'Question 3 - Options',
        description: 'Third questionnaire question options',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'question_4_text',
        value: 'How often do errors occur in this process?',
        label: 'Question 4 - Text',
        description: 'Fourth questionnaire question text',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'json',
        key: 'question_4_options',
        value: JSON.stringify([
          { value: "rarely", label: "Rarely (less than 5% error rate)" },
          { value: "sometimes", label: "Sometimes (5-15% error rate)" },
          { value: "often", label: "Often (15-30% error rate)" },
          { value: "frequently", label: "Frequently (more than 30% error rate)" }
        ]),
        label: 'Question 4 - Options',
        description: 'Fourth questionnaire question options',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'question_5_text',
        value: 'What is your current IT infrastructure like?',
        label: 'Question 5 - Text',
        description: 'Fifth questionnaire question text',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'json',
        key: 'question_5_options',
        value: JSON.stringify([
          { value: "modern", label: "Modern, cloud-based systems with APIs" },
          { value: "mixed", label: "Mixed, some modern and some legacy systems" },
          { value: "legacy", label: "Mostly legacy systems with limited integration" },
          { value: "minimal", label: "Minimal IT infrastructure" }
        ]),
        label: 'Question 5 - Options',
        description: 'Fifth questionnaire question options',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'question_6_text',
        value: 'How important is data security for your organization?',
        label: 'Question 6 - Text',
        description: 'Sixth questionnaire question text',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'json',
        key: 'question_6_options',
        value: JSON.stringify([
          { value: "critical", label: "Critical - we handle sensitive data" },
          { value: "important", label: "Important - we have some sensitive data" },
          { value: "moderate", label: "Moderate - standard business data" },
          { value: "low", label: "Low - mostly public information" }
        ]),
        label: 'Question 6 - Options',
        description: 'Sixth questionnaire question options',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'question_7_text',
        value: 'What is your budget range for AI automation?',
        label: 'Question 7 - Text',
        description: 'Seventh questionnaire question text',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'json',
        key: 'question_7_options',
        value: JSON.stringify([
          { value: "10k-25k", label: "$10,000 - $25,000" },
          { value: "25k-50k", label: "$25,000 - $50,000" },
          { value: "50k-100k", label: "$50,000 - $100,000" },
          { value: "100k+", label: "More than $100,000" }
        ]),
        label: 'Question 7 - Options',
        description: 'Seventh questionnaire question options',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'text',
        key: 'question_8_text',
        value: 'How quickly do you need to see results from automation?',
        label: 'Question 8 - Text',
        description: 'Eighth questionnaire question text',
        category: 'questionnaire',
        isPublished: true
      },
      {
        section: 'questionnaire',
        type: 'json',
        key: 'question_8_options',
        value: JSON.stringify([
          { value: "immediate", label: "Immediate (within 1 month)" },
          { value: "quick", label: "Quick (1-3 months)" },
          { value: "moderate", label: "Moderate (3-6 months)" },
          { value: "flexible", label: "Flexible timeline" }
        ]),
        label: 'Question 8 - Options',
        description: 'Eighth questionnaire question options',
        category: 'questionnaire',
        isPublished: true
      },
      // FAQ Questions
      {
        section: 'faq',
        type: 'text',
        key: 'faq_1_question',
        value: 'How do you secure our data?',
        label: 'FAQ 1 - Question',
        description: 'First FAQ question',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_1_answer',
        value: 'Security is non-negotiable. We employ industry-standard encryption (TLS in transit, AES-256 at rest), role-based access control, audit logs, and tenant isolation for multi-client environments. We can operate within private VPCs, support on-prem deployments, or use cloud-hosted models under strict data governance rules. We provide SOC2 / ISO controls upon request and support data residency requirements.',
        label: 'FAQ 1 - Answer',
        description: 'First FAQ answer',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_1_category',
        value: 'Security',
        label: 'FAQ 1 - Category',
        description: 'First FAQ category',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_2_question',
        value: 'Will this change our processes or require retraining staff?',
        label: 'FAQ 2 - Question',
        description: 'Second FAQ question',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_2_answer',
        value: 'Our approach prioritises minimal disruption. We map current processes and design agents to slot into existing workflows. Where change is required, we provide clear change-management plans, role-based training sessions, and operator runbooks. We recommend a \'train the trainer\' model to accelerate adoption.',
        label: 'FAQ 2 - Answer',
        description: 'Second FAQ answer',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_2_category',
        value: 'Implementation',
        label: 'FAQ 2 - Category',
        description: 'Second FAQ category',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_3_question',
        value: 'Do we need to upgrade our IT infrastructure?',
        label: 'FAQ 3 - Question',
        description: 'Third FAQ question',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_3_answer',
        value: 'In most cases — no. Our agents integrate via APIs, webhooks, or lightweight connectors. When complex legacy systems require adapters, we build secure middleware. We produce an integration matrix during discovery to estimate effort and provide options for SaaS, hybrid, or on-prem architectures.',
        label: 'FAQ 3 - Answer',
        description: 'Third FAQ answer',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_3_category',
        value: 'Technical',
        label: 'FAQ 3 - Category',
        description: 'Third FAQ category',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_4_question',
        value: 'How do you manage errors and edge cases?',
        label: 'FAQ 4 - Question',
        description: 'Fourth FAQ question',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_4_answer',
        value: 'We implement human-in-the-loop workflows, clear escalation rules, and confidence thresholds to prevent incorrect automation. Every agent has audit trails and can be placed into monitoring mode where low-confidence decisions are routed to a human reviewer until sufficient confidence is reached.',
        label: 'FAQ 4 - Answer',
        description: 'Fourth FAQ answer',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_4_category',
        value: 'Operations',
        label: 'FAQ 4 - Category',
        description: 'Fourth FAQ category',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_5_question',
        value: 'What SLAs & support do you offer?',
        label: 'FAQ 5 - Question',
        description: 'Fifth FAQ question',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_5_answer',
        value: 'We offer SLAs for uptime, response times for incidents, and scheduled optimization windows. Support tiers are flexible — from knowledge transfer to fully managed operations where Keen Agents runs and optimizes the agent on your behalf.',
        label: 'FAQ 5 - Answer',
        description: 'Fifth FAQ answer',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_5_category',
        value: 'Support',
        label: 'FAQ 5 - Category',
        description: 'Fifth FAQ category',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_6_question',
        value: 'How long does implementation typically take?',
        label: 'FAQ 6 - Question',
        description: 'Sixth FAQ question',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_6_answer',
        value: 'Implementation timelines vary based on complexity, but our typical process takes 8-16 weeks from discovery to production. Simple use cases can be deployed in 4-6 weeks, while complex enterprise integrations may take 12-20 weeks. We provide detailed timelines during the discovery phase.',
        label: 'FAQ 6 - Answer',
        description: 'Sixth FAQ answer',
        category: 'faq',
        isPublished: true
      },
      {
        section: 'faq',
        type: 'text',
        key: 'faq_6_category',
        value: 'Timeline',
        label: 'FAQ 6 - Category',
        description: 'Sixth FAQ category',
        category: 'faq',
        isPublished: true
      },
      // Company Values
      {
        section: 'about',
        type: 'text',
        key: 'value_1_title',
        value: 'Outcome-Focused',
        label: 'Value 1 - Title',
        description: 'First company value title',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'value_1_description',
        value: 'We deliver measurable business results, not just technology experiments.',
        label: 'Value 1 - Description',
        description: 'First company value description',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'value_2_title',
        value: 'Client-Centric',
        label: 'Value 2 - Title',
        description: 'Second company value title',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'value_2_description',
        value: 'Every solution is tailored to your specific business needs and constraints.',
        label: 'Value 2 - Description',
        description: 'Second company value description',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'value_3_title',
        value: 'Proven Expertise',
        label: 'Value 3 - Title',
        description: 'Third company value title',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'value_3_description',
        value: 'Decades of combined experience in enterprise technology and AI deployment.',
        label: 'Value 3 - Description',
        description: 'Third company value description',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'value_4_title',
        value: 'Scalable Solutions',
        label: 'Value 4 - Title',
        description: 'Fourth company value title',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'value_4_description',
        value: 'Built to grow with your business and adapt to changing requirements.',
        label: 'Value 4 - Description',
        description: 'Fourth company value description',
        category: 'about',
        isPublished: true
      },
      // Stats
      {
        section: 'about',
        type: 'text',
        key: 'stat_1_number',
        value: '30+',
        label: 'Stat 1 - Number',
        description: 'First statistic number',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'stat_1_label',
        value: 'Years Combined Experience',
        label: 'Stat 1 - Label',
        description: 'First statistic label',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'stat_2_number',
        value: '100%',
        label: 'Stat 2 - Number',
        description: 'Second statistic number',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'stat_2_label',
        value: 'Client Success Rate',
        label: 'Stat 2 - Label',
        description: 'Second statistic label',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'stat_3_number',
        value: '24/7',
        label: 'Stat 3 - Number',
        description: 'Third statistic number',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'stat_3_label',
        value: 'Support Available',
        label: 'Stat 3 - Label',
        description: 'Third statistic label',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'stat_4_number',
        value: '99.9%',
        label: 'Stat 4 - Number',
        description: 'Fourth statistic number',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'stat_4_label',
        value: 'Uptime SLA',
        label: 'Stat 4 - Label',
        description: 'Fourth statistic label',
        category: 'about',
        isPublished: true
      },
      // Leadership Highlights
      {
        section: 'about',
        type: 'text',
        key: 'leader_highlights_title',
        value: 'Key Expertise:',
        label: 'Leadership Highlights - Title',
        description: 'Title for leadership highlights section',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'leader_1_highlights',
        value: 'We do not sell our software platform — we deliver business outcomes. Working with our proprietary software platform, we design, train and operate custom AI agents that behave like YOUR high-performing employees.',
        label: 'Leader 1 - Highlights',
        description: 'First leader highlights text',
        category: 'about',
        isPublished: true
      },
      {
        section: 'about',
        type: 'text',
        key: 'leader_2_highlights',
        value: 'We do not sell our software platform — we deliver business outcomes. Working with our proprietary software platform, we design, train and operate custom AI agents that behave like YOUR high-performing employees.',
        label: 'Leader 2 - Highlights',
        description: 'Second leader highlights text',
        category: 'about',
        isPublished: true
      },
      // Global Settings
      {
        section: 'global',
        type: 'text',
        key: 'site_name',
        value: 'Keen Agents',
        label: 'Site Name',
        description: 'The name of your website',
        category: 'global',
        isPublished: true
      },
      {
        section: 'global',
        type: 'text',
        key: 'site_description',
        value: 'AI Employees for Your Business',
        label: 'Site Description',
        description: 'Meta description for SEO',
        category: 'global',
        isPublished: true
      }
    ]

    // Insert all default content
    for (const content of defaultContent) {
      await this.setContent(content)
    }

    // Initialize default color scheme
    await this.setColorScheme({
      name: 'Default Keen Theme',
      colors: {
        primary: '#04a5fa',
        secondary: '#656565',
        accent: '#06b6d4',
        background: '#ffffff',
        text: '#656565',
        textSecondary: '#9ca3af',
        textMuted: '#6b7280',
        border: '#e5e7eb',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      },
      isActive: true
    })
  }

  // Style Overrides management
  async getStyleOverrides(): Promise<any[]> {
    const { data, error } = await supabase
      .from('cms_content_styles')
      .select('*')
      .order('updated_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching style overrides:', error)
      return []
    }
    
    return data || []
  }

  async createStyleOverride(override: any): Promise<any> {
    const now = new Date().toISOString()
    
    // Use upsert to handle both create and update cases
    const { data, error } = await supabase
      .from('cms_content_styles')
      .upsert({
        content_id: override.contentId,
        section: override.section,
        key: override.key,
        background_color: override.backgroundColor || null,
        text_color: override.textColor || null,
        font_size: override.fontSize || null,
        font_weight: override.fontWeight || null,
        font_family: override.fontFamily || null,
        line_height: override.lineHeight || null,
        letter_spacing: override.letterSpacing || null,
        text_align: override.textAlign || null,
        padding: override.padding || null,
        margin: override.margin || null,
        border_color: override.borderColor || null,
        border_width: override.borderWidth || null,
        border_radius: override.borderRadius || null,
        box_shadow: override.boxShadow || null,
        opacity: override.opacity || null,
        custom_css: override.customCss || null,
        is_active: override.isActive ?? true,
        updated_at: now
      }, {
        onConflict: 'content_id',
        ignoreDuplicates: false
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating style override:', error)
      throw new Error('Failed to create style override')
    }
    
    return data
  }

  async updateStyleOverride(id: string, override: any): Promise<any> {
    const { data, error } = await supabase
      .from('cms_content_styles')
      .update({
        background_color: override.backgroundColor || null,
        text_color: override.textColor || null,
        font_size: override.fontSize || null,
        font_weight: override.fontWeight || null,
        font_family: override.fontFamily || null,
        line_height: override.lineHeight || null,
        letter_spacing: override.letterSpacing || null,
        text_align: override.textAlign || null,
        padding: override.padding || null,
        margin: override.margin || null,
        border_color: override.borderColor || null,
        border_width: override.borderWidth || null,
        border_radius: override.borderRadius || null,
        box_shadow: override.boxShadow || null,
        opacity: override.opacity || null,
        custom_css: override.customCss || null,
        is_active: override.isActive ?? true,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating style override:', error)
      throw new Error('Failed to update style override')
    }
    
    return data
  }

  async deleteStyleOverride(id: string): Promise<void> {
    const { error } = await supabase
      .from('cms_content_styles')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting style override:', error)
      throw new Error('Failed to delete style override')
    }
  }
}

export const cmsDatabase = new SupabaseCMSDatabase()
