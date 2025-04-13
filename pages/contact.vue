<template>
  <main class="py-32 px-4 sm:px-8 lg:px-16 bg-primary-950 text-white flex flex-col items-center">
    <header class="max-w-4xl mx-auto text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold font-merriweather mb-6 text-accent-500">Let's Create Something Together</h1>
      <p class="text-lg text-primary-200 font-montserrat">
        Whether you have a project in mind, a question about my work, or just want to say hi, I'd love to hear from you. 
        Fill out the form below, or find me on social media. Let's bring your ideas to life!
        <!-- Replace with your actual story/pitch -->
      </p>
    </header>

    <!-- Centered Form Container -->
    <div class="w-full max-w-lg">
        <ContactForm />
    </div>

    <!-- Removed 3D Object Column -->

  </main>
</template>

<script setup>
// Removed Three.js related imports and refs
// import { ref, onMounted, onUnmounted, nextTick } from 'vue'; // Keep vue imports if needed elsewhere, remove if not
import ContactForm from '~/components/ContactForm.vue';

// Removed all Three.js variables and functions (initThree, onResize, etc.)

// Removed Three.js related lifecycle hooks
// onMounted(() => { ... });
// onUnmounted(() => { ... });

useHead({
  title: 'Contact Me',
  meta: [
    { name: 'description', content: 'Get in touch to discuss your project or ideas.' }
  ]
})
</script>

<style scoped>
/* Removed Three.js related styles */
</style> 