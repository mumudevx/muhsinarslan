<template>
  <section
    class="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 pb-12 relative overflow-hidden">
    <!-- Optional: Scroll Down Text -->
    <!-- <div class="absolute top-1/2 left-8 transform -translate-y-1/2 -rotate-90 origin-bottom-left">
      <span class="text-primary-300 font-sans text-xs uppercase tracking-widest">
        ↓ Scroll Down
      </span>
    </div> -->

    <!-- Image Placeholder - Absolute positioning at bottom: 0 -->
    <div ref="imageContainer" class="mb-12 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-3xl bg-gradient-to-br from-accent-400 via-accent-600 to-accent-800 overflow-hidden shadow-xl z-0">
      <!-- <nuxt-img src="/path/to/your/image.jpg" alt="Muhsin Arslan" class="w-full h-full object-cover" /> -->
      <!-- Placeholder visual -->
      <div class="w-full h-full flex items-center justify-center text-primary-950 font-bold">
        <img src="/images/logo-transparent.png" alt="Muhsin Arslan" class="w-[80%] h-[80%] object-cover" />
      </div>
    </div>

    <!-- Main Headline -->
    <h1 ref="headline" class="font-serif text-8xl font-bold text-primary-50 max-w-4xl z-10">
      Indie SaaS Developer
      <!-- Was: An indie SaaS developer helping businesses grow. -->
    </h1>

    <!-- Optional: Background Gradient/Effect (Can be added later) -->
    <!-- <div class="absolute inset-0 -z-10 bg-gradient-radial from-accent-950/30 via-transparent to-transparent"></div> -->

  </section>
</template>

<script setup>
import { ref } from 'vue';

// Ref for the headline (potentially used by parent)
const headline = ref(null);
const imageContainer = ref(null); // Added ref for image container

// Expose refs for parent component access
defineExpose({
  headline,
  imageContainer
});

// REMOVED GSAP and ScrollTrigger related code
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);
// onMounted(() => { ... });

</script>

<style scoped>
/* Add any specific styles for the hero section if needed */

/* Example for background effect */
/* .bg-gradient-radial {
  background-image: radial-gradient(circle at 50% 70%, var(--tw-gradient-stops));
} */
</style>