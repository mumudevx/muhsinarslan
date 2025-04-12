<template>
  <div 
    ref="follower" 
    v-if="shouldShowScrollMessage" 
    class="fixed top-0 left-0 w-auto h-auto p-2 rounded-full bg-primary-100/80 text-primary-950 font-sans text-xs uppercase tracking-widest pointer-events-none z-50 opacity-0 scale-0 transition-opacity duration-300 ease-out"
  >
    ↓ Scroll Down
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap';

const follower = ref(null);
const route = useRoute();
let moveTimeout = null;

// State for visibility conditions
const isAtBottom = ref(false);

// Check if the current route is the homepage
const isOnHomepage = computed(() => route.path === '/');

// Computed property to determine if the message should be shown
const shouldShowScrollMessage = computed(() => isOnHomepage.value && !isAtBottom.value);

const onMouseMove = (event) => {
  if (!follower.value || !shouldShowScrollMessage.value) { // Only move if visible
    // Hide immediately if conditions are not met
    gsap.to(follower.value, { opacity: 0, scale: 0, duration: 0 }); 
    return;
  }

  // Move the follower
  gsap.to(follower.value, {
    x: event.clientX + 10,
    y: event.clientY + 10,
    duration: 0.3,
    ease: 'power2.out'
  });

  // Show the follower and reset hide timer
  gsap.to(follower.value, {
    opacity: 1,
    scale: 1,
    duration: 0.2,
    ease: 'power1.out'
  });

  // Clear previous timeout
  if (moveTimeout) {
    clearTimeout(moveTimeout);
  }

  // Set timeout to hide after inactivity
  moveTimeout = setTimeout(() => {
    if (follower.value) { // Check if follower still exists
      gsap.to(follower.value, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'power1.in'
      });
    }
  }, 1000);
};

const checkScrollPosition = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  // Check if scrolled to the bottom (with a small tolerance)
  if (scrollTop + clientHeight >= scrollHeight - 50) { 
    isAtBottom.value = true;
  } else {
    isAtBottom.value = false;
  }
};

onMounted(() => {
  // Initial position off-screen
  if (follower.value) {
    gsap.set(follower.value, { x: -100, y: -100 });
  }
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('scroll', checkScrollPosition);
  checkScrollPosition(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('scroll', checkScrollPosition);
  if (moveTimeout) {
    clearTimeout(moveTimeout);
  }
});
</script>

<style scoped>
/* Scoped styles if needed */
</style> 