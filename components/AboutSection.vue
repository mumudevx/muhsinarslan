<template>
    <section
        class="h-screen relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-primary-100">
        <div class="flex flex-col items-center justify-center h-screen mx-auto px-4 relative z-10">
            <div class="grid md:grid-cols-2 gap-12">
                <!-- Text Content -->
                <div class="text-content flex flex-col justify-center text-center md:text-left" ref="textContent">
                    <h2 class="font-serif text-4xl md:text-5xl font-bold mb-4 
                               text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
                        About Me
                    </h2>
                    <p class="font-sans text-base md:text-lg text-primary-300 leading-relaxed max-w-xl mx-auto md:mx-0">
                        I am Muhsin. As an indie SaaS developer, I am passionate about transforming innovative
                        ideas into software products that users love and value. I combine my software development
                        background with a vision for identifying market gaps and building practical, user-centric SaaS
                        solutions to fill them.
                    </p>
                </div>

                <!-- New Image Element -->
                <div class="relative flex justify-center items-center order-first md:order-last" ref="imageContainer">
                    <div
                        class="relative w-64 h-80 md:w-80 md:h-96 rounded-lg overflow-hidden shadow-xl bg-accent-800/30">
                        <img src="/images/profile.jpeg" alt="Portrait Placeholder"
                            class="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-90 mix-blend-multiply opacity-80" />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-accent-900/50 via-transparent to-accent-800/20 mix-blend-overlay">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const textContent = ref(null);
const imageContainer = ref(null);

onMounted(() => {
    if (import.meta.client) {
        // Ensure GSAP runs only on the client
        gsap.from(textContent.value, {
            duration: 1,
            opacity: 0,
            y: 30,
            ease: "power3.out",
            delay: 0.2,
        });
        gsap.from(imageContainer.value, {
            duration: 1.2,
            opacity: 0,
            scale: 0.9,
            ease: "power2.out",
            delay: 0.4,
        });
    }
});
</script>

<style scoped>
/* Scoped styles can be added here if needed for fine-tuning */

/* Assign refs to elements for GSAP targeting */
.text-content {
    /* reference point for GSAP */
}

.image-container {
    /* reference point for GSAP */
}

.filter {
    filter: grayscale(100%) contrast(125%) brightness(90%);
}

/* Fallback or additional custom styles can go here */
</style>
