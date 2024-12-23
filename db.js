// db.js
const mysql = require('mysql2');

// Создаем подключение к базе данных
const connection = mysql.createConnection({
  host: 'localhost', // или IP-адрес, если база на удаленном сервере
  user: 'root',      // ваше имя пользователя
  password: 'yourpassword',  // ваш пароль
  database: 'yourdatabase'  // имя базы данных
});

// Проверка соединения
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ', err.stack);
    return;
  }
  console.log('Подключение к базе данных прошло успешно');
});

module.exports = connection;
