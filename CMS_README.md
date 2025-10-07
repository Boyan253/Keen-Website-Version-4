# Keen Website CMS System

A comprehensive Content Management System for the Keen website that allows you to manage content, colors, images, and sections dynamically.

## Features

### 🎨 **Dynamic Color Management**
- Change primary, secondary, and accent colors
- Customize text colors, backgrounds, and borders
- Real-time color preview
- Preset color palettes
- Color picker with hex input

### 📝 **Content Management**
- Edit text content for all sections
- Real-time content updates
- Fallback content support
- Section-based organization

### 🖼️ **Image Management**
- Upload and manage images
- Drag & drop interface
- Image organization by section
- Automatic image optimization

### 🎛️ **Section Management**
- Enable/disable sections
- Customize section styling
- Order sections
- Custom CSS support

### ⚙️ **Global Settings**
- Site name and description
- Logo and favicon management
- Font settings
- Animation controls
- Dark mode support

## Getting Started

### 1. Initialize the CMS

First, initialize the CMS with default content:

```bash
# Using the API endpoint
curl -X POST http://localhost:3000/api/init-cms

# Or using the script
node scripts/init-cms.js
```

### 2. Access the Admin Dashboard

Navigate to `/admin` in your browser to access the CMS dashboard.

### 3. Start Managing Content

- **Content Tab**: Edit text content for different sections
- **Colors Tab**: Customize your website's color scheme
- **Images Tab**: Upload and manage images
- **Sections Tab**: Configure section settings
- **Settings Tab**: Manage global site settings

## Usage Examples

### Using CMS Content in Components

```tsx
import CMSContent from '@/components/CMSContent'

// Basic text content
<CMSContent
  section="hero"
  key="headline"
  fallback="Default Headline"
  as="h1"
  className="text-4xl font-bold"
/>

// HTML content
<CMSContent
  section="about"
  key="description"
  fallback="Default description"
  type="html"
  as="div"
  className="prose"
/>
```

### Using Dynamic Colors

The color system automatically applies to your existing Tailwind classes:

```tsx
// These classes will use your CMS colors
<div className="bg-keen-blue text-keen-gray">
  <h1 className="text-keen-blue">Title</h1>
  <p className="text-keen-gray/80">Description</p>
</div>
```

### Custom Color Properties

You can also use CSS custom properties:

```css
.my-component {
  background-color: var(--color-primary);
  color: var(--color-text);
  border-color: var(--color-border);
}
```

## API Endpoints

### Content Management
- `GET /api/cms/content` - Get all content
- `GET /api/cms/content?section=hero` - Get content by section
- `POST /api/cms/content` - Create new content
- `PUT /api/cms/content` - Update content
- `DELETE /api/cms/content?id=123` - Delete content

### Color Management
- `GET /api/cms/colors` - Get all color schemes
- `GET /api/cms/colors?active=true` - Get active color scheme
- `POST /api/cms/colors` - Create color scheme
- `PUT /api/cms/colors` - Update color scheme

### Image Management
- `GET /api/cms/images` - Get all images
- `GET /api/cms/images?section=hero` - Get images by section
- `POST /api/cms/images` - Upload image
- `DELETE /api/cms/images?id=123` - Delete image

### Settings Management
- `GET /api/cms/settings` - Get site settings
- `PUT /api/cms/settings` - Update settings

## Customization

### Adding New Content Fields

1. Add content through the admin dashboard
2. Use the `CMSContent` component in your templates:

```tsx
<CMSContent
  section="your-section"
  key="your-field"
  fallback="Default value"
  as="div"
  className="your-styles"
/>
```

### Adding New Color Properties

1. Update the `ColorScheme` type in `lib/types/cms.ts`
2. Add the color to the color picker in the admin dashboard
3. Update the `DynamicStyles` component to apply the new color

### Adding New Sections

1. Create your section component
2. Add it to the main page
3. Use `CMSContent` components for dynamic content
4. Add section configuration in the admin dashboard

## Development

### File Structure

```
lib/
├── cms/
│   ├── context.tsx      # CMS React context
│   └── database.ts      # In-memory database
├── types/
│   └── cms.ts          # TypeScript types
components/
├── CMSContent.tsx      # Dynamic content component
├── DynamicStyles.tsx   # Dynamic color system
└── admin/              # Admin components
    ├── ColorPicker.tsx
    └── ImageUpload.tsx
app/
├── admin/              # Admin dashboard
└── api/cms/           # API endpoints
```

### Database

The CMS currently uses an in-memory database for development. For production, you should replace the database implementation in `lib/cms/database.ts` with a real database like PostgreSQL, MongoDB, or Supabase.

### Styling

The CMS integrates with your existing Tailwind CSS setup. Colors are applied dynamically using CSS custom properties and Tailwind class overrides.

## Troubleshooting

### Content Not Updating
- Check that the section and key match exactly
- Ensure the content is published (`isPublished: true`)
- Verify the CMS context is properly initialized

### Colors Not Applying
- Check that the color scheme is active
- Verify the `DynamicStyles` component is included in your layout
- Clear browser cache and hard refresh

### Images Not Loading
- Check the image URL is correct
- Verify the image was uploaded successfully
- Check browser console for errors

## Support

For issues or questions about the CMS system, please check the console logs and ensure all API endpoints are working correctly.
