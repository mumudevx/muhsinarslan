<template>
  <div class="min-h-screen flex flex-col relative">
    <!-- Import and use TheHeader component -->
    <TheHeader />
    <CursorFollower />

    <main class="flex-grow">
      <slot /> <!-- Page content will be injected here -->
    </main>

    <!-- Footer Implementation -->
    <TheFooter />
  </div>
</template>

<script setup>
// Import TheHeader component
import TheHeader from '~/components/TheHeader.vue';
import CursorFollower from '~/components/CursorFollower.vue';
import TheFooter from '~/components/TheFooter.vue';
</script>

<style scoped>
/* Scoped styles for the default layout if needed */
</style> 