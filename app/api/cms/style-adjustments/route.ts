import { NextRequest, NextResponse } from 'next/server'
import { cmsDatabase } from '@/lib/cms/supabase-database'

// GET - Fetch style overrides
// Helper function to convert snake_case to camelCase
function toCamelCase(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj
  
  const converted: any = {}
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
    converted[camelKey] = obj[key]
  }
  return converted
}

// Helper function to convert camelCase to snake_case
function toSnakeCase(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj
  
  const converted: any = {}
  for (const key in obj) {
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase()
    converted[snakeKey] = obj[key]
  }
  return converted
}

export async function GET(request: NextRequest) {
  try {
    const styleOverrides = await cmsDatabase.getStyleOverrides()
    
    // Convert snake_case to camelCase for frontend
    const camelCaseData = styleOverrides.map(toCamelCase)

    return NextResponse.json({ success: true, data: camelCaseData })
  } catch (error) {
    console.error('Error fetching style overrides:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch style overrides' },
      { status: 500 }
    )
  }
}

// POST - Create style override
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const result = await cmsDatabase.createStyleOverride(body)
    
    // Convert back to camelCase
    const camelCaseData = toCamelCase(result)

    return NextResponse.json({ success: true, data: camelCaseData })
  } catch (error) {
    console.error('Error creating style override:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create style override' },
      { status: 500 }
    )
  }
}

// PUT - Update style override
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    const result = await cmsDatabase.updateStyleOverride(body.id, body)
    
    // Convert back to camelCase
    const camelCaseData = toCamelCase(result)

    return NextResponse.json({ success: true, data: camelCaseData })
  } catch (error) {
    console.error('Error updating style override:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update style override' },
      { status: 500 }
    )
  }
}

// DELETE - Remove style override
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      )
    }

    await cmsDatabase.deleteStyleOverride(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting style override:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete style override' },
      { status: 500 }
    )
  }
}

