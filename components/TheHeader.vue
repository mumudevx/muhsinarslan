<template>
  <header :class="['top-0', 'left-0', 'right-0', 'p-8', 'z-10', { 'absolute': route.path === '/' }]">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <!-- Left: Name -->
      <div class="text-primary-100 font-sans text-lg font-semibold">
        <NuxtLink to="/">Muhsin Arslan</NuxtLink>
      </div>

      <!-- Right: Navigation -->
      <nav class="space-x-3 md:space-x-6 flex flex-row justify-center items-center mt-6 md:mt-0">
        <NuxtLink to="/work" class="text-primary-200 hover:text-accent-400 font-sans text-sm uppercase tracking-wider">Work</NuxtLink>
        <NuxtLink to="/blog" class="text-primary-200 hover:text-accent-400 font-sans text-sm uppercase tracking-wider">Blog</NuxtLink>
        <NuxtLink to="/contact" class="text-primary-200 hover:text-accent-400 font-sans text-sm uppercase tracking-wider">Let's connect</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped>
/* Add any specific styles for the header if needed */
</style> 