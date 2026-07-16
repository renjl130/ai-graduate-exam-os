PRAGMA foreign_keys = ON;

-- Seed subjects chunk 1/1

INSERT OR REPLACE INTO "subjects" ("id", "name", "code", "description", "icon", "color", "sort_order", "created_at") VALUES
  ('subject_xinchuan', '新传', '334/440', '新闻与传播学', '📰', '#22c55e', 1, '2026-06-10 14:48:49'),
  ('subject_politics', '政治', '101', '思想政治理论', '🏛️', '#ef4444', 2, '2026-06-10 14:48:49'),
  ('subject_english', '英语', '204', '英语二', '🌐', '#3b82f6', 3, '2026-06-10 14:48:49');
