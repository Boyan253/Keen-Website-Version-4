import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rxolrjqfvhgdtsvkepkg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4b2xyanFmdmhnZHRzdmtlcGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MzYwMDgsImV4cCI6MjA3NTQxMjAwOH0.XP5549RIFe1I-EyZRyRIdfVEzHsIODSFBCLFLGfGKGo'

export const supabase = createClient(supabaseUrl, supabaseKey)
