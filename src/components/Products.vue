<template>
  <div>
    <h1>Список товаров</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }} ₸
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]); // Хранение списка товаров

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:7754/api/products');
    products.value = response.data;
    console.log('Полученные товары:', response.data); // Лог в консоли
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
  }
});

// Функция для добавления товара
const addProduct = async (product) => {
  try {
    const response = await axios.post('http://localhost:7754/api/products', product);
    console.log('Товар добавлен:', response.data); // Лог добавленного товара
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
  }
};

// Пример вызова функции addProduct
addProduct({
  title: 'Новый товар',
  description: 'Описание товара',
  price: 100,
  imageUrl: 'http://example.com/image.jpg',
});
</script>
