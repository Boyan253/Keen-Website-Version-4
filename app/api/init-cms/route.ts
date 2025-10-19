import { NextResponse } from 'next/server'
import { cmsDatabase } from '@/lib/cms/supabase-database'

export async function POST() {
  try {
    console.log('Initializing CMS with default content...')
    await cmsDatabase.initializeDefaultContent()
    console.log('CMS initialized successfully!')
    
    return NextResponse.json({ 
      success: true, 
      message: 'CMS initialized successfully! You can now access the admin dashboard at /admin' 
    })
  } catch (error) {
    console.error('Failed to initialize CMS:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}