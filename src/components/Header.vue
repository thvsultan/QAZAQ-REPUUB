<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Register from '../components/Register.vue'; // Убедитесь, что путь правильный

defineProps({
  total: Number
});

const emit = defineEmits(['openDrawer']);
const route = useRoute();

// Состояние для управления видимостью модального окна регистрации
const showRegisterModal = ref(false);

const openRegisterModal = () => {
  showRegisterModal.value = true;
};

const closeRegisterModal = () => {
  showRegisterModal.value = false;
};
</script>

<template>
  <header
    class="flex justify-between items-center flex-wrap gap-4 border-b border-slate-300 px-10 py-8"
  >
    <router-link :to="{ name: 'home' }">
      <div class="flex items-center">
        <img src="/logo.png" alt="Logo" class="w-10 mr-4" />
        <div>
          <span class="text-xl font-bold uppercase">QAZAQ STREET SHOP</span>
          <h1 class="text-slate-500">QAZAQ STYLE</h1>
        </div>
      </div>
    </router-link>

    <nav>
      <ul class="flex items-center gap-4 flex-wrap sm:gap-10">
        <li
          v-if="route.path !== '/'"
          class="flex items-center cursor-pointer gap-3 text-slate-600 hover:text-black"
        >
          <router-link
            :to="{ name: 'home' }"
            class="bg-[url(/)] bg-no-repeat pl-8 bg-left bg-contain"
            active-class="text-black"
            >Каталог</router-link
          >
        </li>
        <li class="cursor-pointer text-slate-600 hover:text-black">
          <button
            aria-label="Корзина"
            @click="emit('openDrawer')"
            class="font-bold bg-[url(/cart.svg)] bg-no-repeat pl-8 bg-left"
            type="button"
          >
            {{ total }} ₸.
          </button>
        </li>
        <li class="flex items-center cursor-pointer gap-3 text-slate-600 hover:text-black">
          <router-link
            :to="{ name: 'favorites' }"
            class="bg-[url(/heart.svg)] bg-no-repeat pl-8 bg-left"
            active-class="text-black"
            >Закладки</router-link
          >
        </li>
        <li class="flex items-center cursor-pointer gap-3 text-slate-600 hover:text-black">
          <router-link
            :to="{ name: 'profile' }"
            class="bg-[url(/profile.svg)] bg-no-repeat pl-8 bg-left"
            active-class="text-black"
            >Профиль</router-link
          >
        </li>

        <!-- Кнопка для открытия окна регистрации -->
        <li class="flex items-center cursor-pointer gap-3 text-slate-600 hover:text-black">
          <button
            @click="openRegisterModal"
            class="font-bold text-slate-600 hover:text-black"
          >
            Регистрация
          </button>
        </li>
      </ul>
    </nav>
  </header>

  <!-- Модальное окно для регистрации -->
  <div v-if="showRegisterModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <Register />
      <button
        @click="closeRegisterModal"
        class="absolute top-2 right-2 text-black font-bold"
      >
        X
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Добавим стили для модального окна */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

.z-50 {
  z-index: 50;
}

.bg-white {
  background-color: white;
}

.p-6 {
  padding: 1.5rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-lg {
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
}
</style>
