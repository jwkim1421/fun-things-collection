-- participation_count means content starts, not completed results.
CREATE TABLE IF NOT EXISTS content_stats (
  content_id TEXT PRIMARY KEY,
  participation_count INTEGER NOT NULL DEFAULT 0 CHECK (participation_count >= 0),
  fun_count INTEGER NOT NULL DEFAULT 0 CHECK (fun_count >= 0),
  relatable_count INTEGER NOT NULL DEFAULT 0 CHECK (relatable_count >= 0),
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS participation_attempts (
  attempt_id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_participation_content ON participation_attempts(content_id);

CREATE TRIGGER IF NOT EXISTS participation_after_insert
AFTER INSERT ON participation_attempts
BEGIN
  INSERT INTO content_stats (content_id, participation_count)
  VALUES (NEW.content_id, 1)
  ON CONFLICT(content_id) DO UPDATE SET
    participation_count = participation_count + 1,
    updated_at = CURRENT_TIMESTAMP;
END;

CREATE TABLE IF NOT EXISTS content_reactions (
  anonymous_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('fun', 'relatable')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (anonymous_id, content_id, reaction_type)
);

CREATE INDEX IF NOT EXISTS idx_reactions_content ON content_reactions(content_id);

CREATE TRIGGER IF NOT EXISTS reaction_after_insert
AFTER INSERT ON content_reactions
BEGIN
  INSERT INTO content_stats (content_id, fun_count, relatable_count)
  VALUES (
    NEW.content_id,
    CASE WHEN NEW.reaction_type = 'fun' THEN 1 ELSE 0 END,
    CASE WHEN NEW.reaction_type = 'relatable' THEN 1 ELSE 0 END
  )
  ON CONFLICT(content_id) DO UPDATE SET
    fun_count = fun_count + CASE WHEN NEW.reaction_type = 'fun' THEN 1 ELSE 0 END,
    relatable_count = relatable_count + CASE WHEN NEW.reaction_type = 'relatable' THEN 1 ELSE 0 END,
    updated_at = CURRENT_TIMESTAMP;
END;

CREATE TRIGGER IF NOT EXISTS reaction_after_delete
AFTER DELETE ON content_reactions
BEGIN
  UPDATE content_stats SET
    fun_count = MAX(0, fun_count - CASE WHEN OLD.reaction_type = 'fun' THEN 1 ELSE 0 END),
    relatable_count = MAX(0, relatable_count - CASE WHEN OLD.reaction_type = 'relatable' THEN 1 ELSE 0 END),
    updated_at = CURRENT_TIMESTAMP
  WHERE content_id = OLD.content_id;
END;
