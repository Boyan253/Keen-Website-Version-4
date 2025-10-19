-- CMS Content History Table
CREATE TABLE IF NOT EXISTS cms_content_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id UUID NOT NULL,
  section VARCHAR(50) NOT NULL,
  type VARCHAR(20) NOT NULL,
  key VARCHAR(100) NOT NULL,
  old_value TEXT,
  new_value TEXT NOT NULL,
  label VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  is_published BOOLEAN,
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  changed_by VARCHAR(100) DEFAULT 'system'
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_cms_content_history_content_id ON cms_content_history(content_id);
CREATE INDEX IF NOT EXISTS idx_cms_content_history_changed_at ON cms_content_history(changed_at);

-- Enable RLS
ALTER TABLE cms_content_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on cms_content_history" ON cms_content_history FOR ALL USING (true);

-- Function to track changes
CREATE OR REPLACE FUNCTION track_cms_content_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into history table
  INSERT INTO cms_content_history (
    content_id,
    section,
    type,
    key,
    old_value,
    new_value,
    label,
    description,
    category,
    is_published
  ) VALUES (
    NEW.id,
    NEW.section,
    NEW.type,
    NEW.key,
    CASE WHEN TG_OP = 'UPDATE' THEN OLD.value ELSE NULL END,
    NEW.value,
    NEW.label,
    NEW.description,
    NEW.category,
    NEW.is_published
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS cms_content_change_trigger ON cms_content;
CREATE TRIGGER cms_content_change_trigger
  AFTER INSERT OR UPDATE ON cms_content
  FOR EACH ROW
  EXECUTE FUNCTION track_cms_content_changes();

-- CMS Content Backups Table
CREATE TABLE IF NOT EXISTS cms_content_backups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  backup_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE cms_content_backups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on cms_content_backups" ON cms_content_backups FOR ALL USING (true);
