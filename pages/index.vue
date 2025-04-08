<template>
  <div ref="transitionContainer">
    <!-- Wrapper for pinning -->
    <div class="relative h-screen">
      <!-- Hero Section (will be pinned) - Added ref -->
      <HeroSection ref="heroSectionRef" class="absolute inset-0 z-10" />

      <!-- Dummy section (initially hidden behind Hero) -->
      <div ref="nextSection"
           class="absolute inset-0 z-0 h-screen flex items-center justify-center bg-gradient-to-br from-accent-500 via-primary-500 to-accent-700 opacity-0 scale-90">
        <h2 class="text-4xl font-bold text-white">Next Section Content Here</h2>
      </div>
    </div>

    <!-- Reduced height temporary section to allow scrolling beyond pin -->
    <div class="h-[50vh] bg-primary-800"></div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeroSection from '~/components/HeroSection.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const transitionContainer = ref(null);
const nextSection = ref(null);
const heroSectionRef = ref(null); // Ref for the HeroSection component

onMounted(() => {
  // Access elements via refs after component is mounted
  // Wait a tick to ensure child component refs are available
  setTimeout(() => {
    const heroHeadline = heroSectionRef.value?.headline;
    const heroImage = heroSectionRef.value?.imageContainer;

    if (!heroHeadline || !heroImage || !nextSection.value || !transitionContainer.value) {
      console.error("Required elements for animation not found. Refs:", {
        headline: !!heroHeadline,
        image: !!heroImage,
        nextSection: !!nextSection.value,
        container: !!transitionContainer.value
      });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: transitionContainer.value,
        start: "top top",
        end: "+=200%",
        scrub: 1.5,
        pin: true,
        // markers: true,
      }
    });

    // Animate Hero Headline out (zoom and fade)
    tl.to(heroHeadline, {
      scale: 15,
      opacity: 0,
      ease: 'power1.in'
    }, 0);

    // Animate Hero Image out (fade quickly) - Start shortly after headline zoom begins
    tl.to(heroImage, {
      opacity: 0,
      ease: 'power1.out', // Use ease out for a quick but smooth disappearance
      duration: 0.3 // Adjust duration for desired fade speed
    }, 0.1); // Start slightly after time 0 (e.g., 0.1 seconds into the timeline)

    // Animate Next Section in (fade and scale up)
    tl.to(nextSection.value, {
      opacity: 1,
      scale: 1,
      ease: 'power1.out'
    }, "<75%");
  }, 0); // Use setTimeout with 0 delay (next tick)
});
</script> 