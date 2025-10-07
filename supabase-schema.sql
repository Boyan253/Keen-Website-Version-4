-- CMS Content Table
CREATE TABLE IF NOT EXISTS cms_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL DEFAULT 'text',
  key VARCHAR(100) NOT NULL,
  value TEXT NOT NULL,
  label VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);

-- CMS Color Schemes Table
CREATE TABLE IF NOT EXISTS cms_color_schemes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  colors JSONB NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CMS Images Table
CREATE TABLE IF NOT EXISTS cms_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt VARCHAR(200),
  original_name VARCHAR(200) NOT NULL,
  section VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CMS Settings Table
CREATE TABLE IF NOT EXISTS cms_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name VARCHAR(100) NOT NULL DEFAULT 'Keen Agents',
  site_description TEXT,
  primary_color VARCHAR(7) DEFAULT '#04a5fa',
  secondary_color VARCHAR(7) DEFAULT '#656565',
  accent_color VARCHAR(7) DEFAULT '#06b6d4',
  font_family VARCHAR(50) DEFAULT 'Montserrat',
  font_size VARCHAR(10) DEFAULT '16px',
  line_height VARCHAR(10) DEFAULT '1.6',
  border_radius VARCHAR(10) DEFAULT '8px',
  shadow TEXT DEFAULT '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  animation BOOLEAN DEFAULT true,
  dark_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_color_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for now - in production you'd want proper auth)
CREATE POLICY "Allow all operations on cms_content" ON cms_content FOR ALL USING (true);
CREATE POLICY "Allow all operations on cms_color_schemes" ON cms_color_schemes FOR ALL USING (true);
CREATE POLICY "Allow all operations on cms_images" ON cms_images FOR ALL USING (true);
CREATE POLICY "Allow all operations on cms_settings" ON cms_settings FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cms_content_section ON cms_content(section);
CREATE INDEX IF NOT EXISTS idx_cms_content_key ON cms_content(key);
CREATE INDEX IF NOT EXISTS idx_cms_color_schemes_active ON cms_color_schemes(is_active);
CREATE INDEX IF NOT EXISTS idx_cms_images_section ON cms_images(section);
