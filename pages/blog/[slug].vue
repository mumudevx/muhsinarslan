<template>
  <main class="py-32 px-4 sm:px-8 lg:px-16 bg-primary-950 min-h-screen text-white">
    <article v-if="post">
      <header class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold font-merriweather mb-4 text-accent-500 max-w-4xl mx-auto">{{
          post.title }}</h1>
        <p v-if="post.publishDate" class="text-gray-400 text-sm font-montserrat">
          Published on: {{ formatDate(post.publishDate) }}
        </p>
        <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title"
          class="mt-8 w-full max-w-4xl mx-auto rounded-lg shadow-lg object-cover h-64 md:h-96">
      </header>

      <!-- Render Markdown Content -->
      <div class="prose prose-invert prose-lg max-w-4xl mx-auto font-montserrat">
        <ContentRenderer :value="post" />
      </div>
    </article>

    <div v-else-if="error" class="text-center text-red-500">
      <p>Error loading post: {{ error.message }}</p>
      <NuxtLink to="/" class="text-accent-400 hover:text-accent-300 font-montserrat">&larr; Back to Home</NuxtLink>
    </div>

    <div v-else class="text-center text-gray-400">
      <p>Loading post...</p>
    </div>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug;

const { data: post, error } = await useAsyncData(slug, () => {
  return queryCollection('blog').where('slug', '==', slug).first();
})

// Helper function to format date (optional)
const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    console.error("Date formatting error:", e);
    return dateString; // Return original string if formatting fails
  }
};

// Set head metadata (optional but good for SEO)
if (post.value) {
  useHead({
    title: post.value.title,
    meta: [
      { name: 'description', content: post.value.description || 'Read this blog post' } // Add description field to MD if needed
    ]
  })
}
</script>

<style>
/* Apply styles for the rendered markdown content */
/* You might need to install @tailwindcss/typography if you haven't already */
/* npm install -D @tailwindcss/typography */
/* Then add require('@tailwindcss/typography') to plugins in tailwind.config.js */

.prose {
  /* Add custom prose styles here if needed */
}

/* Ensure code blocks have a background in dark mode if using prose */
.prose :where(pre) {
  background-color: #1f2937;
  /* Example: gray-800 */
  color: #d1d5db;
  /* Example: gray-300 */
  border-radius: 0.375rem;
  /* rounded-md */
  padding: 1em;
  overflow-x: auto;
}

.prose :where(code):not(:where([class~="not-prose"] *))::before,
.prose :where(code):not(:where([class~="not-prose"] *))::after {
  content: "";
}
</style>