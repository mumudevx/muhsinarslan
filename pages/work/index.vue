<template>
  <main class="py-32 px-4 sm:px-8 lg:px-16 bg-primary-950 min-h-screen text-white">
    <h1 class="text-4xl md:text-5xl font-bold font-merriweather text-center mb-16 text-accent-500">My Works</h1>

    <div v-if="displayedWorks && displayedWorks.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Responsive columns: 1 -> 2 -> 3 -->
      <!-- Render ProjectCard dynamically within the grid -->
      <div v-for="(project, index) in displayedWorks" :key="project._path" :class="getGridClass(index)"
        class="work-item-container">
        <ProjectCard :title="project.title" :description="project.description" :slug="project.slug" :index="index"
          class="h-full" />
      </div>
    </div>
    <div v-else-if="!pending && !error" class="text-center text-gray-400">
      <p>No works found.</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>Error loading works: {{ error.message }}</p>
    </div>

    <!-- Show More Button -->
    <div v-if="hasMoreWorks" class="text-center mt-12">
      <button @click="loadMore" :disabled="pending"
        class="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-primary-950 font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
        {{ pending ? 'Loading...' : 'Show More' }}
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProjectCard from '~/components/ProjectCard.vue'; // Import ProjectCard

const ITEMS_PER_PAGE = 4;
const limit = ref(ITEMS_PER_PAGE);

// Fetch all works (assuming data in /content/works/)
const { data: allWorks, error, pending } = await useAsyncData('all-works', () =>
  queryCollection('works')
    .select('id', 'title', 'description', 'slug', 'coverImage')
    .order('id', 'ASC')
    .all()
);

// Filter works to display based on the current limit
const displayedWorks = computed(() => {
  if (!allWorks.value) return [];
  return allWorks.value.slice(0, limit.value);
});

// Check if there are more works to load
const hasMoreWorks = computed(() => {
  if (!allWorks.value) return false;
  return limit.value < allWorks.value.length;
});

// Function to load more works
const loadMore = () => {
  if (pending.value) return;
  limit.value += ITEMS_PER_PAGE;
};

// Updated function to determine grid span for responsive layout
const getGridClass = (index) => {
  // Large screens (lg: 3 columns)
  if (index === 0) return 'lg:col-span-2'; // First item spans 2 columns on large screens
  if (index === 1) return 'lg:row-span-2'; // Second item spans 2 rows on large screens
  // Other items will take default 1x1 space on large screens

  // Medium screens (sm: 2 columns) - No special spans needed here by default
  // Default: span 1 col, 1 row (applies to sm and base)
  return 'col-span-1 row-span-1';
};

useHead({
  title: 'My Works',
  meta: [
    { name: 'description', content: 'Browse all projects.' }
  ]
})

</script>

<style scoped></style>