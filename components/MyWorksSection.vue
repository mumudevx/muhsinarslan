<template>
  <section ref="sectionRef" class="h-screen relative overflow-hidden flex flex-col items-center justify-center py-16 md:py-24">
    <!-- Background Video -->
    <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover z-0">
      <source src="/videos/worksbg-video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <!-- Video Overlay -->
    <div class="absolute inset-0 bg-primary-950/70 z-10"></div>

    <!-- Content -->
    <div class="relative z-20 w-full overflow-x-hidden">
      <div ref="worksContainerRef" class="flex flex-nowrap px-4 space-x-8 w-max">
        <ProjectCard class="flex-shrink-0 w-[70vw] md:w-[50vw] lg:w-[35vw]" />
        <ProjectCard class="flex-shrink-0 w-[70vw] md:w-[50vw] lg:w-[35vw]" />
        <ProjectCard class="flex-shrink-0 w-[70vw] md:w-[50vw] lg:w-[35vw]" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard.vue';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const worksContainerRef = ref(null);
let ctx;

onMounted(() => {
  setTimeout(() => {
    if (!sectionRef.value || !worksContainerRef.value) return;

    const works = worksContainerRef.value;
    const section = sectionRef.value;

    const scrollAmount = works.scrollWidth - section.clientWidth;

    const amountToScroll = Math.max(0, scrollAmount);

    ctx = gsap.context(() => {
      gsap.to(works, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          invalidateOnRefresh: true
        }
      });
    }, section);
  }, 100);
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>

<style scoped>
.w-max {
  width: max-content;
}
</style>