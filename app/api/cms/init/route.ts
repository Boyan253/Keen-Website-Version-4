import { NextResponse } from 'next/server'
import { cmsDatabase } from '@/lib/cms/database'

export async function POST() {
  try {
    await cmsDatabase.initializeDefaultContent()
    return NextResponse.json({ 
      success: true, 
      message: 'CMS initialized with default content' 
    })
  } catch (error) {
    console.error('Error initializing CMS:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to initialize CMS' },
      { status: 500 }
    )
  }
}
