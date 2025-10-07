import { NextRequest, NextResponse } from 'next/server'
import { cmsDatabase } from '@/lib/cms/supabase-database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active')
    
    if (active === 'true') {
      const colorScheme = await cmsDatabase.getActiveColorScheme()
      return NextResponse.json({ success: true, data: colorScheme })
    }
    
    const colorSchemes = await cmsDatabase.getColorSchemes()
    return NextResponse.json({ success: true, data: colorSchemes })
  } catch (error) {
    console.error('Error fetching color schemes:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch color schemes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const colorScheme = await cmsDatabase.setColorScheme(body)
    return NextResponse.json({ success: true, data: colorScheme })
  } catch (error) {
    console.error('Error creating color scheme:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create color scheme' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const colorScheme = await cmsDatabase.setColorScheme(body)
    return NextResponse.json({ success: true, data: colorScheme })
  } catch (error) {
    console.error('Error updating color scheme:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update color scheme' },
      { status: 500 }
    )
  }
}
