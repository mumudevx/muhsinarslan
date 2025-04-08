<template>
  <section class="h-screen relative overflow-hidden flex flex-col items-center justify-center py-16 md:py-24">
    <!-- Background Video -->
    <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover z-0">
      <source src="/videos/worksbg-video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    
    <!-- Video Overlay -->
    <div class="absolute inset-0 bg-primary-950/70 z-10"></div> <!-- Increased overlay opacity slightly -->
    
    <!-- Content -->
    <div class="relative z-20 flex flex-col items-center w-full"> <!-- Container for title and card -->
      <div class="w-full max-w-3xl px-4"> 
        <!-- Single Card -->
        <div class="rounded-3xl p-6 md:p-8 relative shadow-lg flex flex-col bg-black/10 backdrop-blur-2xl border border-white/10"> 
          
          <!-- Background SVG Lines -->
          <svg class="absolute top-0 left-0 w-full h-full opacity-[0.1] pointer-events-none" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M-50 350 C 250 100, 150 300, 350 150" stroke="#FFFFFF" stroke-width="1"/> 
          </svg>

          <div class="relative z-10 flex flex-col flex-grow">
            <div class="flex-grow px-2 md:px-4">
              <h3 class="font-serif text-6xl md:text-7xl font-semibold mb-3 text-primary-50">Project Title 1</h3> 
              <p class="font-sans text-base text-primary-100 mb-6 flex-grow">A complete process from discovery, branding, design, launch to post-launch optimization.</p>
            </div>
            <span class="self-end font-sans text-7xl md:text-8xl font-bold text-accent-300 mt-4 mr-2 md:mr-4">01</span> 
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script needed for this static component yet
</script>

<style scoped>
/* Removed container style as it's handled by section flex now */
</style> 