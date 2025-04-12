<template>
  <div> <!-- Root element -->
    <div ref="transitionContainer">
      <!-- Wrapper for pinning -->
      <div class="relative h-screen">
        <!-- Hero Section (will be pinned) - Added ref -->
        <HeroSection ref="heroSectionRef" class="absolute inset-0 z-10" />

        <!-- About Section Container (initially hidden behind Hero) -->
        <div ref="nextSection" 
             class="absolute inset-0 z-0 overflow-hidden flex items-center justify-center 
                    bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950">
             <!-- Added background gradient classes -->
          <AboutSection />
        </div>
      </div>

      <!-- Reduced height temporary section to allow scrolling beyond pin -->
      <!-- <div class="h-[50vh] bg-primary-800"></div> -->

    </div>

    <!-- Add MyWorksSection after the pinning container -->
    <MyWorksSection />

    <!-- GallerySection (Yeni eklenen) -->
    <GallerySection />

    <!-- LatestPostsSection (Yeni eklenen) -->
    <LatestPostsSection />

    <!-- ConnectSection (Yeni eklenen) -->
    <ConnectSection />

  </div> <!-- Close root element -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeroSection from '~/components/HeroSection.vue';
import AboutSection from '~/components/AboutSection.vue'; // Import AboutSection
import MyWorksSection from '~/components/MyWorksSection.vue'; // Import MyWorksSection
import GallerySection from '~/components/GallerySection.vue'; // GallerySection'ı import et
import LatestPostsSection from '~/components/LatestPostsSection.vue'; // LatestPostsSection'ı import et
import ConnectSection from '~/components/ConnectSection.vue'; // ConnectSection'ı import et
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

    // Initialize the state for the animation (start hidden)
    gsap.set(nextSection.value, { opacity: 0, scale: 0.9 });

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

    // Animate Next Section container in (fade and scale up)
    tl.to(nextSection.value, {
      opacity: 1,
      scale: 1,
      ease: 'power1.out'
    }, "<75%");
  }, 0); // Use setTimeout with 0 delay (next tick)
});
</script>