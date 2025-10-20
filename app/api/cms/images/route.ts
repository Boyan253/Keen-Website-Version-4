import { NextRequest, NextResponse } from 'next/server'
import { cmsDatabase } from '@/lib/cms/supabase-database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')
    
    const images = await cmsDatabase.getImages(section || undefined)
    return NextResponse.json({ success: true, data: images })
  } catch (error) {
    console.error('Error fetching images:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const section = formData.get('section') as string
    const alt = formData.get('alt') as string
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }
    
    const imageAsset = await cmsDatabase.addImage({
      filename: `uploaded-${Date.now()}-${file.name}`,
      originalName: file.name,
      url: `/api/placeholder/${file.name}`, // Placeholder URL
      alt: alt || file.name,
      width: 800,
      height: 600,
      size: file.size,
      mimeType: file.type,
      section: section || 'global'
    })
    
    return NextResponse.json({ success: true, data: imageAsset })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
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
        { success: false, error: 'Image ID is required' },
        { status: 400 }
      )
    }
    
    await cmsDatabase.removeImage(id)
    const deleted = true
    return NextResponse.json({ success: deleted, data: { id } })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
