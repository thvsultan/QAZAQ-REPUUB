// models/user.js
const mongoose = require('mongoose');

// Схема пользователя
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Модель пользователя, которая будет работать с коллекцией 'users' в базе данных
const User = mongoose.model('User', UserSchema);

module.exports = User; // Экспортируем модель
