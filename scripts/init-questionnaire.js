import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rxolrjqfvhgdtsvkepkg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4b2xyanFmdmhnZHRzdmtlcGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MzYwMDgsImV4cCI6MjA3NTQxMjAwOH0.XP5549RIFe1I-EyZRyRIdfVEzHsIODSFBCLFLGfGKGo'

const supabase = createClient(supabaseUrl, supabaseKey)

const questionnaireContent = [
  // Questionnaire Section Content
  {
    section: 'questionnaire',
    type: 'text',
    key: 'title',
    value: 'AI Readiness Questionnaire',
    label: 'Questionnaire Title',
    description: 'Title of the questionnaire section',
    category: 'questionnaire',
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'description',
    value: 'Take our quick assessment to discover your AI automation potential and get personalized recommendations.',
    label: 'Questionnaire Description',
    description: 'Description text for the questionnaire section',
    category: 'questionnaire',
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'results_title',
    value: 'Your AI Readiness Results',
    label: 'Questionnaire Results Title',
    description: 'Title for questionnaire results',
    category: 'questionnaire',
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'results_description',
    value: 'Based on your answers, here\'s your personalized AI readiness assessment.',
    label: 'Questionnaire Results Description',
    description: 'Description for questionnaire results',
    category: 'questionnaire',
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'cta_primary',
    value: 'Schedule Discovery Call',
    label: 'Questionnaire CTA Primary',
    description: 'Questionnaire primary CTA button',
    category: 'questionnaire',
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'cta_secondary',
    value: 'Retake Quiz',
    label: 'Questionnaire CTA Secondary',
    description: 'Questionnaire secondary CTA button',
    category: 'questionnaire',
    is_published: true
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
    is_published: true
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
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'question_2_text',
    value: 'How many employees currently handle the process you want to automate?',
    label: 'Question 2 - Text',
    description: 'Second questionnaire question text',
    category: 'questionnaire',
    is_published: true
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
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'question_3_text',
    value: 'What is the average time spent on this process per day?',
    label: 'Question 3 - Text',
    description: 'Third questionnaire question text',
    category: 'questionnaire',
    is_published: true
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
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'question_4_text',
    value: 'How often do errors occur in this process?',
    label: 'Question 4 - Text',
    description: 'Fourth questionnaire question text',
    category: 'questionnaire',
    is_published: true
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
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'question_5_text',
    value: 'What is your current IT infrastructure like?',
    label: 'Question 5 - Text',
    description: 'Fifth questionnaire question text',
    category: 'questionnaire',
    is_published: true
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
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'question_6_text',
    value: 'How important is data security for your organization?',
    label: 'Question 6 - Text',
    description: 'Sixth questionnaire question text',
    category: 'questionnaire',
    is_published: true
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
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'question_7_text',
    value: 'What is your budget range for AI automation?',
    label: 'Question 7 - Text',
    description: 'Seventh questionnaire question text',
    category: 'questionnaire',
    is_published: true
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
    is_published: true
  },
  {
    section: 'questionnaire',
    type: 'text',
    key: 'question_8_text',
    value: 'How quickly do you need to see results from automation?',
    label: 'Question 8 - Text',
    description: 'Eighth questionnaire question text',
    category: 'questionnaire',
    is_published: true
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
    is_published: true
  }
]

async function initializeQuestionnaire() {
  try {
    console.log('Initializing questionnaire content in Supabase...')
    
    // First, clear existing questionnaire content
    console.log('Clearing existing questionnaire content...')
    const { error: deleteError } = await supabase
      .from('cms_content')
      .delete()
      .eq('section', 'questionnaire')
    
    if (deleteError) {
      console.warn('Warning: Could not clear existing questionnaire content:', deleteError.message)
    }
    
    // Insert new questionnaire content
    console.log('Inserting questionnaire content...')
    const { data, error } = await supabase
      .from('cms_content')
      .insert(questionnaireContent)
      .select()
    
    if (error) {
      throw error
    }
    
    console.log(`Successfully inserted ${data.length} questionnaire content items!`)
    console.log('Questionnaire is now ready to be customized through the CMS.')
    
  } catch (error) {
    console.error('Failed to initialize questionnaire:', error)
    process.exit(1)
  }
}

initializeQuestionnaire()
