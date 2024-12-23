import Database from 'better-sqlite3';

const db = new Database('database.sqlite');

try {
  // Создание таблицы [order]
  db.exec(`
    CREATE TABLE IF NOT EXISTS [order] (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      total_price REAL NOT NULL,
      created_at TEXT NOT NULL,
      items TEXT NOT NULL
    )
  `);

  console.log('Таблица "order" успешно создана или уже существует.');
} catch (error) {
  console.error('Ошибка при создании таблицы:', error.message);
}
