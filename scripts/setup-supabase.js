const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rxolrjqfvhgdtsvkepkg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4b2xyanFmdmhnZHRzdmtlcGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MzYwMDgsImV4cCI6MjA3NTQxMjAwOH0.XP5549RIFe1I-EyZRyRIdfVEzHsIODSFBCLFLGfGKGo'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupTables() {
  console.log('Setting up Supabase tables...')
  
  try {
    // This would normally be done via Supabase dashboard or CLI
    // For now, we'll just initialize the default content
    console.log('Tables should be created via Supabase dashboard using the provided SQL schema.')
    console.log('Please run the SQL from supabase-schema.sql in your Supabase dashboard.')
    
    // Initialize default content
    const response = await fetch('http://localhost:3000/api/init-cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    
    if (response.ok) {
      console.log('✅ Default content initialized successfully!')
    } else {
      console.log('❌ Failed to initialize default content')
    }
    
  } catch (error) {
    console.error('Error setting up Supabase:', error)
  }
}

setupTables()
