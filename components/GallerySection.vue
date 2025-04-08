<template>
  <section class="gallery-section px-4 sm:px-8 md:px-16 lg:px-24 py-16 bg-gradient-to-b from-[#21272f] to-[#33241f] overflow-hidden relative">
    <!-- Added relative positioning for potential absolute elements like overlay -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- Add refs to columns - Increased image count -->
      <div ref="col1" class="column flex flex-col space-y-4">
        <img src="https://picsum.photos/seed/col1img1/400/600" alt="Gallery Image 1" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
        <img src="https://picsum.photos/seed/col1img2/400/500" alt="Gallery Image 2" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
        <img src="https://picsum.photos/seed/col1img3/400/700" alt="Gallery Image 3" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
        <img src="https://picsum.photos/seed/col1img4/400/550" alt="Gallery Image 13" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
      </div>

      <div ref="col2" class="column flex flex-col space-y-4">
        <img src="https://picsum.photos/seed/col2img1/400/700" alt="Gallery Image 4" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
        <img src="https://picsum.photos/seed/col2img2/400/550" alt="Gallery Image 5" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
        <img src="https://picsum.photos/seed/col2img3/400/650" alt="Gallery Image 6" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
      </div>

      <div ref="col3" class="column hidden md:flex flex-col space-y-4">
        <img src="https://picsum.photos/seed/col3img1/400/500" alt="Gallery Image 7" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
        <img src="https://picsum.photos/seed/col3img2/400/600" alt="Gallery Image 8" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
        <img src="https://picsum.photos/seed/col3img3/400/750" alt="Gallery Image 9" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
        <img src="https://picsum.photos/seed/col3img4/400/620" alt="Gallery Image 14" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
      </div>

      <div ref="col4" class="column hidden lg:flex flex-col space-y-4">
        <img src="https://picsum.photos/seed/col4img1/400/650" alt="Gallery Image 10" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
        <img src="https://picsum.photos/seed/col4img2/400/700" alt="Gallery Image 11" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
        <img src="https://picsum.photos/seed/col4img3/400/550" alt="Gallery Image 12" class="gallery-image w-full h-auto rounded shadow-lg cursor-pointer">
      </div>
    </div>

    <!-- Simple Overlay for Image Zoom -->
    <div v-if="zoomedImageUrl" 
         @click="zoomedImageUrl = null" 
         class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer">
      <img :src="zoomedImageUrl" alt="Zoomed Image" class="max-w-[90%] max-h-[90%] object-contain rounded-lg">
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';

const col1 = ref(null);
const col2 = ref(null);
const col3 = ref(null);
const col4 = ref(null);
const columns = ref([]);
const timelines = ref([]); // Store timelines to manage them
const zoomedImageUrl = ref(null);

// Helper function for the vertical loop animation
const verticalLoop = (elements, config) => {
  elements = gsap.utils.toArray(elements);
  config = config || {};
  const tl = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 10) });

  // Adjust calculation if using space-y or gap
  const totalHeight = elements.reduce((sum, el) => sum + el.offsetHeight + parseFloat(getComputedStyle(el).marginBottom), 0);
  
  // --- DEBUG LOGGING --- 
  console.log(`Column: ${elements[0].parentNode.className}, Calculated Total Height: ${totalHeight}`);
  // --- END DEBUG LOGGING ---

  // Clone elements for seamless loop
  elements.forEach(el => {
    const clone = el.cloneNode(true);
    el.parentNode.appendChild(clone);
    // Add click listener to original and cloned images
    clone.addEventListener('click', () => {
      zoomedImageUrl.value = clone.src;
    });
    el.addEventListener('click', () => {
      zoomedImageUrl.value = el.src;
    });
  });

  // Animate
  tl.fromTo(elements[0].parentNode, {y: 0}, {
    y: `-=${totalHeight / 2}`, // Move half the total height (original + clones)
    duration: config.duration || 20, // Adjusted default duration slightly
  });

  // Add hover interaction
  elements[0].parentNode.addEventListener("mouseenter", () => tl.pause());
  elements[0].parentNode.addEventListener("mouseleave", () => tl.play());

  // Start the animation
  gsap.delayedCall(config.delay || 0, () => tl.play());

  return tl;
};

onMounted(async () => {
  await nextTick();
  columns.value = [col1.value, col2.value, col3.value, col4.value].filter(Boolean);

  if (columns.value.length > 0) {
    columns.value.forEach((col, index) => {
       const images = col.querySelectorAll('.gallery-image');
       if(images.length > 0) {
         gsap.delayedCall(0.5 + index * 0.1, () => {
           const duration = gsap.utils.random(15, 25);
           console.log(`Starting loop for column ${index + 1} after delay.`);
           const tl = verticalLoop(images, { duration: duration });
           timelines.value.push(tl);
         });
       }
    });
  }
});

// Clean up timelines when component is unmounted
onUnmounted(() => {
  timelines.value.forEach(tl => tl.kill());
});

</script>

<style scoped>
.gallery-section {
  /* Limit height to viewport height */
  height: 100vh; 
}

/* Ensure columns themselves don't overflow vertically initially */
.column {
  /* Set a max-height maybe? Or rely on parent overflow-hidden */
  /* Be careful with height/max-height here as it might interfere with layout */
}

/* Add some basic styling for the overlay */
.fixed.inset-0 {
  /* Tailwind handles positioning */
}
</style> 