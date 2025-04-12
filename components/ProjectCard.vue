<template>
  <NuxtLink :to="`/work/${slug}`" class="block rounded-3xl relative shadow-lg group" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @mousemove="onMouseMove">
  <div
      class="project-card rounded-3xl p-6 md:p-8 relative overflow-hidden bg-black/10 backdrop-blur-2xl border border-white/10 h-full flex flex-col">
    <!-- Background SVG Lines -->
    <svg class="absolute top-0 left-0 w-full h-full opacity-[0.1] pointer-events-none" viewBox="0 0 300 400" fill="none"
      xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M-50 350 C 250 100, 150 300, 350 150" stroke="#FFFFFF" stroke-width="1" />
    </svg>

    <div class="relative z-10 flex flex-col flex-grow">
      <div class="flex-grow px-2 md:px-4">
        <h3 class="font-serif text-6xl md:text-7xl font-semibold mb-3 text-primary-50">{{ title }}</h3>
        <p class="font-sans text-base text-primary-100 mb-6 flex-grow">{{ description }}</p>
      </div>
      <span class="self-end font-sans text-7xl md:text-8xl font-bold text-accent-300 mt-4 mr-2 md:mr-4">{{
        formattedIndex }}</span>
    </div>

      <!-- Cursor Follower -->
      <div ref="follower" class="absolute top-0 left-0 w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 pointer-events-none z-20 flex items-center justify-center opacity-0 scale-0 transition-opacity,transform duration-300 ease-out">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
  </div>
  </NuxtLink>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  title: {
    type: String,
    default: 'Project Title'
  },
  description: {
    type: String,
    default: 'Project description goes here.'
  },
  index: {
    type: Number,
    required: true
  },
  slug: {
    type: String,
    required: true,
    default: 'default-slug'
  }
});

const follower = ref(null);

// Format index to always have two digits (e.g., 01, 02, 10)
const formattedIndex = computed(() => {
  return String(props.index + 1).padStart(2, '0');
});

const onMouseEnter = () => {
  if (!follower.value) return;
  gsap.to(follower.value, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  });
};

const onMouseLeave = () => {
  if (!follower.value) return;
  gsap.to(follower.value, {
    opacity: 0,
    scale: 0,
    duration: 0.2,
    ease: 'power1.in'
  });
};

const onMouseMove = (event) => {
  if (!follower.value) return;
  
  // Get position relative to the card, not the viewport
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  gsap.to(follower.value, {
    x: x - (follower.value.offsetWidth / 2), // Center follower on cursor
    y: y - (follower.value.offsetHeight / 2), // Center follower on cursor
    duration: 0.1, // Faster follow speed
    ease: 'power1.out'
  });
};

onMounted(() => {
  // Set initial state if needed
  if (follower.value) {
     gsap.set(follower.value, { xPercent: -50, yPercent: -50 }); // Ensure transform origin is center
  }
});

</script>

<style scoped>
.project-card {
  /* Ensure card takes full height of the link wrapper */
  height: 100%;
}
</style>