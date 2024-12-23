<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');

// Обработчик отправки формы
const handleSubmit = async () => {
  // Очистка предыдущих сообщений
  errorMessage.value = '';
  successMessage.value = '';

  // Валидация формы
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Все поля обязательны для заполнения';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Пароли не совпадают';
    return;
  }

  try {
    // Отправка данных на сервер
    const response = await fetch('https://your-api-endpoint.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Успешная регистрация
      successMessage.value = 'Вы успешно зарегистрированы!';
      // Можно закрыть модальное окно после успешной регистрации
      // emit('closeRegisterModal');
    } else {
      // Ошибка при регистрации
      errorMessage.value = data.message || 'Произошла ошибка при регистрации';
    }
  } catch (error) {
    errorMessage.value = 'Ошибка сети, попробуйте позже.';
  }
};
</script>

<template>
  <div class="registration-form">
    <h2 class="text-2xl font-bold mb-4">Регистрация</h2>

    <!-- Сообщения об ошибках и успехе -->
    <div v-if="errorMessage" class="text-red-500 mb-4">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="text-green-500 mb-4">
      {{ successMessage }}
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium">Имя</label>
        <input
          v-model="name"
          type="text"
          id="name"
          class="border border-gray-300 p-2 rounded-md w-full"
          placeholder="Введите ваше имя"
          required
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium">Электронная почта</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="border border-gray-300 p-2 rounded-md w-full"
          placeholder="Введите ваш email"
          required
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium">Пароль</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="border border-gray-300 p-2 rounded-md w-full"
          placeholder="Введите пароль"
          required
        />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium">Подтверждение пароля</label>
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          class="border border-gray-300 p-2 rounded-md w-full"
          placeholder="Подтвердите пароль"
          required
        />
      </div>

      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md">
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<style scoped>
.registration-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

button[type="submit"] {
  cursor: pointer;
}

input:focus {
  border-color: #4F46E5;
  outline: none;
}
</style>
