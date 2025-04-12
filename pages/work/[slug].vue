<template>
    <main class="py-32 px-4 sm:px-8 lg:px-16 bg-primary-950 min-h-screen text-white">
        <article v-if="work">
            <header class="mb-12 text-center">
                <h1 class="text-4xl md:text-5xl font-bold font-merriweather mb-4 text-accent-500">{{ work.title }}</h1>
                <p v-if="work.description" class="text-gray-400 text-sm font-montserrat">{{ work.description
                    }}</p>
                <img v-if="work.coverImage" :src="work.coverImage" :alt="work.title"
                    class="mt-8 w-full max-w-4xl mx-auto rounded-lg shadow-lg object-cover h-64 md:h-96">
            </header>

            <!-- Render Markdown Content -->
            <div class="prose prose-invert prose-lg max-w-4xl mx-auto font-montserrat">
                <ContentRenderer :value="work" />
            </div>
        </article>

        <div v-else-if="error" class="text-center text-red-500 py-16">
            <h1 class="text-2xl font-semibold mb-4">Error loading work</h1>
            <p class="mb-4">{{ error.message }}</p>
            <NuxtLink to="/" class="text-accent-400 hover:text-accent-300 font-montserrat">&larr; Back to Home
            </NuxtLink>
        </div>
        <div v-else class="text-center text-gray-400 py-16">
            <p>Loading work details...</p>
        </div>
    </main>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug;

const { data: work, error } = await useAsyncData(slug, () => {
    return queryCollection('works').where('slug', '==', slug).first();
})

// Set head metadata (optional but good for SEO)
if (work.value) {
    useHead({
        title: `${work.value.title} - Project Details`,
        meta: [
            { name: 'description', content: work.value.description || `Details for the project ${work.value.title}` }
        ]
    })
} else if (error.value) {
    useHead({
        title: 'Error Loading Project'
    })
}

</script>

<style scoped>
/* Add specific styles for this page if needed */
main {
    /* Ensure enough padding at the top if you have a fixed header */
}
</style>