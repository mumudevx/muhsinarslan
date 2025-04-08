<template>
  <div>
    <LoadingIndicator v-if="isLoading" />
    <div v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LoadingIndicator from '~/components/LoadingIndicator.vue';

const isLoading = ref(true);

onMounted(() => {
  // Sayfa yüklendiğinde loading state'ini false yap
  // Gerekirse daha karmaşık bir yükleme kontrolü (örn. API istekleri) eklenebilir.
  // Şimdilik basit bir zamanlayıcı veya doğrudan false atama yeterli.
  setTimeout(() => {
    isLoading.value = false;
  }, 1500); // 1.5 saniye gecikme
});
</script>

<style>
/* Gerekirse global stiller buraya eklenebilir */
</style>
