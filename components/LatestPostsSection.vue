<template>
  <section class="latest-posts-section py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-primary-900">
    <h2 class="text-3xl font-bold font-merriweather text-center mb-12 text-white">Latest Blog Posts</h2>
    <!-- Check if data exists and has items -->
    <div v-if="posts && posts.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[250px]">
      <NuxtLink v-for="(post, index) in posts" :key="post._path" :to="`/blog/${post.slug}`" :class="getGridClass(index)"
        class="post-card rounded-lg overflow-hidden relative group cursor-pointer shadow-lg block">
        <!-- Background Image -->
        <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title || 'Blog post cover'"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-0">
        <!-- Fallback background if no cover image -->
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
    <div v-else class="text-center text-gray-400">
      <p>No blog posts found.</p>
    </div>
  </section>
</template>

<script setup>
// Fetch latest 8 blog posts using Nuxt Content
const posts = await queryCollection('blog')
  .select('title', 'coverImage', 'publishDate', 'slug') // Fetch only needed fields
  .order("publishDate", "DESC")
  .limit(5)
  .all()

// Function to determine grid span based on index (example bento layout)
const getGridClass = (index) => {
  // Example: First item spans 2 cols and 2 rows on medium screens and up
  if (index === 0) {
    return 'md:col-span-2 md:row-span-2';
  }
  // Example: Make the 5th item wider on medium screens and up (adjust index if needed, now 0-7)
  if (index === 4) {
    return 'md:col-span-2';
  }
  // Default: span 1 col, 1 row
  return 'col-span-1 row-span-1';
};

</script>

<style scoped>
.post-card {
  transition: all 0.3s ease-in-out;
}
</style>