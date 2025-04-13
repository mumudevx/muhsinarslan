<template>
  <div class="min-h-screen flex flex-col relative bg-primary-950">
    <!-- Import and use TheHeader component -->
    <TheHeader />
    <CursorFollower />

    <main class="flex-grow overflow-y-auto">
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

<style global>
/* Custom Scrollbar Styles */

/* Firefox */
html {
  scrollbar-width: thin; /* "auto" or "thin" */
  scrollbar-color: theme('colors.accent.500') theme('colors.primary.900'); /* thumb track */
}

/* Chrome, Edge, Safari */
::-webkit-scrollbar {
  width: 8px; /* Width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: theme('colors.primary.900'); /* Color of the tracking area */
  /* border-radius: 10px; */
}

::-webkit-scrollbar-thumb {
  background-color: theme('colors.accent.500'); /* Color of the scroll thumb */
  border-radius: 10px; /* Roundness of the scroll thumb */
  border: 2px solid theme('colors.primary.900'); /* Creates padding around thumb */
}

::-webkit-scrollbar-thumb:hover {
  background-color: theme('colors.accent.400'); /* Color on hover */
}

</style>

<style scoped>
/* Scoped styles for the default layout if needed */
/* Optional: If you want to hide the scrollbar specifically on main, but keep functionality */
/* main::-webkit-scrollbar {
  display: none;
} */
/* main {
  -ms-overflow-style: none;  
  scrollbar-width: none;  
} */
</style> 