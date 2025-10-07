import { NextRequest, NextResponse } from 'next/server'
import { cmsDatabase } from '@/lib/cms/supabase-database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')
    
    const content = await cmsDatabase.getContent(section || undefined)
    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const content = await cmsDatabase.setContent(body)
    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create content' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const content = await cmsDatabase.setContent(body)
    return NextResponse.json({ success: true, data: content })
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update content' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Content ID is required' },
        { status: 400 }
      )
    }
    
    const deleted = await cmsDatabase.deleteContent(id)
    return NextResponse.json({ success: deleted, data: { id } })
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete content' },
      { status: 500 }
    )
  }
}
