<template>
  <div ref="follower" class="fixed top-0 left-0 w-auto h-auto p-2 rounded-full bg-primary-100/80 text-primary-950 font-sans text-xs uppercase tracking-widest pointer-events-none z-50 opacity-0 scale-0 transition-opacity duration-300 ease-out">
    ↓ Scroll Down
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

const follower = ref(null);
let moveTimeout = null;

const onMouseMove = (event) => {
  if (!follower.value) return;

  // Move the follower
  gsap.to(follower.value, {
    x: event.clientX + 10, // Offset from cursor
    y: event.clientY + 10, // Offset from cursor
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
    gsap.to(follower.value, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: 'power1.in'
    });
  }, 1000); // Hide after 1 second of inactivity
};

onMounted(() => {
  // Initial position off-screen
  if (follower.value) {
    gsap.set(follower.value, { x: -100, y: -100 });
  }
  window.addEventListener('mousemove', onMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  if (moveTimeout) {
    clearTimeout(moveTimeout);
  }
});
</script>

<style scoped>
/* Scoped styles if needed */
</style> 