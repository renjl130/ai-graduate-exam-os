-- Safely remove unreviewed duplicate global words
DELETE FROM vocabulary
WHERE user_id IS NULL
  AND id IN (
    SELECT id FROM (
      SELECT id, ROW_NUMBER() OVER (PARTITION BY lower(word) ORDER BY id) AS rn
      FROM vocabulary WHERE user_id IS NULL
    ) WHERE rn > 1
  )
  AND NOT EXISTS (SELECT 1 FROM vocabulary_reviews vr WHERE vr.word_id=vocabulary.id);
CREATE INDEX IF NOT EXISTS idx_vocab_lower_word ON vocabulary(lower(word));
