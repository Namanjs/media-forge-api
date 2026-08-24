CREATE TABLE files (
  id UUID PRIMARY KEY,
  original_name TEXT NOT NULL,
  storage_key TEXT NOT NULL UNIQUE,
  size_bytes BIGINT NOT NULL CHECK (size_bytes >= 0),
  content_type TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);