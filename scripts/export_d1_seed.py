from __future__ import annotations
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT / "backend" / "exam_os.db"
OUT = ROOT / "cloudflare" / "migrations"
OUT.mkdir(parents=True, exist_ok=True)

SCHEMA_TABLES = [
    "users", "subjects", "chapters", "knowledge_points", "knowledge_relations",
    "exam_questions", "question_bank", "conversations", "messages", "flashcards",
    "flashcard_reviews", "wrong_questions", "study_plans", "exams", "study_records",
    "study_sessions", "posts", "import_jobs", "vocabulary", "vocabulary_reviews",
    "knowledge_reviews", "search_index", "ai_summaries",
]
SEED_TABLES = [
    "subjects", "chapters", "knowledge_points", "knowledge_relations",
    "exam_questions", "question_bank", "vocabulary", "search_index",
]


def sql_literal(value):
    if value is None:
        return "NULL"
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, bytes):
        return "X'" + value.hex() + "'"
    return "'" + str(value).replace("'", "''").replace("\x00", "") + "'"


def clean_schema(sql: str) -> str:
    return sql.replace("datetime('now', 'localtime')", "CURRENT_TIMESTAMP")


def write_schema(con: sqlite3.Connection):
    statements = ["PRAGMA foreign_keys = ON;", ""]
    for table in SCHEMA_TABLES:
        row = con.execute(
            "SELECT sql FROM sqlite_master WHERE type='table' AND name=?", (table,)
        ).fetchone()
        if not row:
            raise RuntimeError(f"Missing table: {table}")
        schema = clean_schema(row[0]).strip()
        if table == "knowledge_points":
            schema = schema.replace(
                "            FOREIGN KEY (subject_id) REFERENCES subjects(id),",
                "            owner_id TEXT,\n            FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,\n            FOREIGN KEY (subject_id) REFERENCES subjects(id),",
            )
        elif table == "import_jobs":
            schema = schema.replace(
                "            id TEXT PRIMARY KEY,",
                "            id TEXT PRIMARY KEY,\n            user_id TEXT NOT NULL,",
            ).replace(
                "            completed_at TEXT",
                "            completed_at TEXT,\n            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE",
            )
        statements += [f"-- {table}", schema + ";", ""]
    wanted = set(SCHEMA_TABLES)
    for name, table, sql in con.execute(
        "SELECT name, tbl_name, sql FROM sqlite_master "
        "WHERE type='index' AND sql IS NOT NULL ORDER BY name"
    ):
        if table in wanted:
            statements.append(clean_schema(sql).strip() + ";")
    statements.extend([
        "CREATE INDEX IF NOT EXISTS idx_knowledge_points_owner ON knowledge_points(owner_id);",
        "CREATE INDEX IF NOT EXISTS idx_import_jobs_user ON import_jobs(user_id, created_at);",
    ])
    (OUT / "0001_schema.sql").write_text("\n".join(statements) + "\n", encoding="utf-8")


def batched(items, size):
    for i in range(0, len(items), size):
        yield items[i:i + size]


def table_insert_sql(con: sqlite3.Connection, table: str, rows: list[sqlite3.Row]) -> list[str]:
    if not rows:
        return []
    columns = [r[1] for r in con.execute(f'PRAGMA table_info("{table}")')]
    col_sql = ", ".join(f'"{c}"' for c in columns)
    statements = []
    # D1 enforces a per-statement size limit. Detailed knowledge points can be
    # tens of KiB each, so write them one row per statement.
    statement_batch_size = 1 if table == "knowledge_points" else 20
    for group in batched(rows, statement_batch_size):
        values = []
        for row in group:
            values.append("(" + ", ".join(sql_literal(row[c]) for c in columns) + ")")
        statements.append(
            f'INSERT OR REPLACE INTO "{table}" ({col_sql}) VALUES\n  ' + ",\n  ".join(values) + ";"
        )
    return statements


def write_seed(con: sqlite3.Connection):
    migration_number = 2
    for table in SEED_TABLES:
        rows = con.execute(f'SELECT * FROM "{table}"').fetchall()
        # Keep each migration comfortably below Wrangler/D1 SQL upload limits.
        chunks = list(batched(rows, 80 if table == "knowledge_points" else 250)) or [[]]
        for chunk_index, chunk in enumerate(chunks, start=1):
            statements = ["PRAGMA foreign_keys = ON;", f"-- Seed {table} chunk {chunk_index}/{len(chunks)}"]
            statements.extend(table_insert_sql(con, table, chunk))
            name = f"{migration_number:04d}_seed_{table}_{chunk_index:02d}.sql"
            (OUT / name).write_text("\n\n".join(statements) + "\n", encoding="utf-8")
            migration_number += 1


def main():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    try:
        write_schema(con)
        write_seed(con)
    finally:
        con.close()
    for path in sorted(OUT.glob("*.sql")):
        print(f"{path.relative_to(ROOT)}\t{path.stat().st_size / 1024:.1f} KiB")


if __name__ == "__main__":
    main()
