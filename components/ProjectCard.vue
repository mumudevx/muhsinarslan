<template>
  <div class="rounded-3xl p-6 md:p-8 relative shadow-lg flex flex-col bg-black/10 backdrop-blur-2xl border border-white/10">
    <!-- Background SVG Lines -->
    <svg class="absolute top-0 left-0 w-full h-full opacity-[0.1] pointer-events-none" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M-50 350 C 250 100, 150 300, 350 150" stroke="#FFFFFF" stroke-width="1"/>
    </svg>

    <div class="relative z-10 flex flex-col flex-grow">
      <div class="flex-grow px-2 md:px-4">
        <h3 class="font-serif text-6xl md:text-7xl font-semibold mb-3 text-primary-50">Project Title 1</h3>
        <p class="font-sans text-base text-primary-100 mb-6 flex-grow">A complete process from discovery, branding, design, launch to post-launch optimization.</p>
      </div>
      <span class="self-end font-sans text-7xl md:text-8xl font-bold text-accent-300 mt-4 mr-2 md:mr-4">01</span>
    </div>
  </div>
</template>

<script setup>
// Props can be defined here later if needed
</script>

<style scoped>
/* Scoped styles for the card if needed */
</style> 