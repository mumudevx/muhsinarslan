<template>
  <div class="fixed inset-0 flex items-center justify-center bg-primary z-50">
    <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-400"></div>
    <!-- Alternatif olarak bir metin de gösterebiliriz: -->
    <!-- <p class="text-white text-xl">Yükleniyor...</p> -->
  </div>
</template>

<script setup>
// Bu component için özel bir script gerekmiyor.
</script>

<style scoped>
/* Tailwind'in animate-spin'i zaten animasyonu sağlıyor. */
/* Ek özel stiller gerekirse buraya eklenebilir. */
</style> 