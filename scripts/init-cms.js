const { cmsDatabase } = require('../lib/cms/database')

async function initializeCMS() {
  try {
    console.log('Initializing CMS with default content...')
    await cmsDatabase.initializeDefaultContent()
    console.log('CMS initialized successfully!')
    console.log('You can now access the admin dashboard at /admin')
  } catch (error) {
    console.error('Failed to initialize CMS:', error)
  }
}

initializeCMS()
