const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const User = require('./models/user'); // Импортируем модель пользователя

const app = express();

// Подключение к базе данных MongoDB
mongoose.connect('mongodb+srv://alibi:3283390home@cluster0.tj5cp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Подключено к базе данных MongoDB'))
  .catch(err => console.log('Ошибка подключения к базе данных:', err));

// Middleware для обработки JSON-данных
app.use(express.json());
app.use(cors()); // Поддержка CORS

// Обработчик POST-запроса для регистрации
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Проверка, что все поля заполнены
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
  }

  // Проверка на существующего пользователя
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
  }

  // Хеширование пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Создание нового пользователя
  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });

  try {
    // Сохранение нового пользователя в базе данных
    await newUser.save();
    res.status(201).json({ message: 'Вы успешно зарегистрированы!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера. Попробуйте позже.' });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
