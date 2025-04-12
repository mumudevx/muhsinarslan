<template>
  <section ref="sectionRef"
    class="h-screen relative overflow-hidden flex flex-col items-center justify-center py-16 md:py-24">
    <!-- Background Video -->
    <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover z-0">
      <source src="/videos/worksbg-video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <!-- Video Overlay -->
    <div class="absolute inset-0 bg-primary-950/70 z-10"></div>

    <!-- Content -->
    <div class="relative z-20 w-full overflow-x-hidden">
      <div ref="worksContainerRef" class="flex flex-nowrap px-16 space-x-8 w-max">
        <ProjectCard 
          v-for="(project, index) in top3Works" 
          :key="project._path" 
          :title="project.title" 
          :description="project.description" 
          :index="index" 
          :slug="project.slug"  
          class="flex-shrink-0 w-[85vw] md:w-[65vw] lg:w-[45vw]" 
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard.vue';

const top3Works = await queryCollection('works').all()
console.log(top3Works)

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const worksContainerRef = ref(null);
let ctx;

onMounted(() => {
  setTimeout(() => {
    if (!sectionRef.value || !worksContainerRef.value) return;

    const works = worksContainerRef.value;
    const section = sectionRef.value;

    const visibleWidth = section.clientWidth;
    const scrollAmount = works.scrollWidth - visibleWidth;

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