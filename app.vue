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
  isLoading.value = false;
});
</script>

<style>
/* Gerekirse global stiller buraya eklenebilir */
</style>
