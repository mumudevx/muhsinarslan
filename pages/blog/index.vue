<template>
  <main class="py-32 px-4 sm:px-8 lg:px-16 bg-primary-950 min-h-screen text-white">
    <h1 class="text-4xl md:text-5xl font-bold font-merriweather text-center mb-16 text-accent-500">All Blog Posts</h1>

    <div v-if="displayedPosts && displayedPosts.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[250px]">
      <NuxtLink v-for="(post, index) in displayedPosts" :key="post._path" :to="`/blog/${post.slug}`"
        :class="getGridClass(index)"
        class="post-card rounded-lg overflow-hidden relative group cursor-pointer shadow-lg block">
        <!-- Background Image -->
        <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title || 'Blog post cover'"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-0">
        <div v-else class="absolute inset-0 bg-accent-800 z-0"></div>
        <!-- Dark Overlay -->
        <div
          class="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition-opacity duration-300 z-10">
        </div>
        <!-- Content -->
        <div class="absolute bottom-0 left-0 p-4 z-20">
          <h3 v-if="post.title" class="text-lg font-semibold font-montserrat text-white">{{ post.title }}</h3>
        </div>
      </NuxtLink>
    </div>
    <div v-else-if="!pending && !error" class="text-center text-gray-400">
      <p>No blog posts found.</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>Error loading posts: {{ error.message }}</p>
    </div>

    <!-- Show More Button -->
    <div v-if="hasMorePosts" class="text-center mt-12">
      <button @click="loadMore" :disabled="pending"
        class="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-primary-950 font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
        {{ pending ? 'Loading...' : 'Show More' }}
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';

const POSTS_PER_PAGE = 3;
const limit = ref(POSTS_PER_PAGE);

// Fetch all blog posts initially (consider fetching incrementally for very large sites)
const { data: allPosts, error, pending } = await useAsyncData('all-blog-posts', () =>
  queryCollection('blog')
    .select('id', 'title', 'coverImage', 'publishDate', 'slug')
    .order('publishDate', 'DESC')
    .order('id', 'DESC')
    .all()
);

// Filter posts to display based on the current limit
const displayedPosts = computed(() => {
  if (!allPosts.value) return [];
  return allPosts.value.slice(0, limit.value);
});

// Check if there are more posts to load
const hasMorePosts = computed(() => {
  if (!allPosts.value) return false;
  return limit.value < allPosts.value.length;
});

// Function to load more posts
const loadMore = () => {
  if (pending.value) return; // Prevent multiple clicks while loading
  limit.value += POSTS_PER_PAGE;
};

// Function to determine grid span (can be customized)
const getGridClass = (index) => {
  // Example Bento layout (same as LatestPostsSection for now)
  if (index === 0) return 'md:col-span-2 md:row-span-2';
  if ((index - 1) % 7 === 3) return 'md:col-span-2'; // Adjust pattern for more items
  return 'col-span-1 row-span-1';
};

useHead({
  title: 'Blog Posts',
  meta: [
    { name: 'description', content: 'Read all blog posts.' }
  ]
})

</script>

<style scoped>
.post-card {
  transition: all 0.3s ease-in-out;
}
</style>