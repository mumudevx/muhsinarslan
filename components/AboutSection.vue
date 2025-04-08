<template>
    <section
        class="relative py-16 md:py-24 overflow-hidden text-primary-100">
        <div class="container mx-auto px-4 relative z-10">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <!-- Text Content -->
                <div class="text-content text-center md:text-left" ref="textContent">
                    <h2
                        class="font-serif text-6xl md:text-7xl font-bold mb-4 
                               text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600">
                        ABOUT ME
                    </h2>
                    <p class="font-sans text-base md:text-lg text-primary-300 leading-relaxed max-w-xl mx-auto md:mx-0">
                        I am Muhsin. As an indie SaaS developer, I am passionate about transforming innovative
                        ideas into software products that users love and value. I combine my software development
                        background with a vision for identifying market gaps and building practical, user-centric SaaS
                        solutions to fill them.
                    </p>
                </div>

                <!-- New Image Element with Glitch Effect Container -->
                <div class="relative flex justify-center items-center order-first md:order-last group"
                    ref="imageContainer">
                    <div
                        class="glitch-image-container relative w-64 h-80 md:w-80 md:h-96 rounded-lg overflow-hidden shadow-xl bg-accent-800/30">
                        <img src="/images/profile.jpeg" alt="Portrait Placeholder"
                            class="main-image absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-90 mix-blend-multiply opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
                        <div
                            class="overlay absolute inset-0 bg-gradient-to-t from-accent-900/50 via-transparent to-accent-800/20 mix-blend-overlay">
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
        gsap.from(textContent.value, {
            duration: 1, opacity: 0, y: 30, ease: "power3.out", delay: 0.2,
        });
        gsap.from(imageContainer.value, {
            duration: 1.2, opacity: 0, scale: 0.9, ease: "power2.out", delay: 0.4,
        });
    }
});
</script>

<style scoped>
/* Glitch Effect Styles */
.glitch-image-container {
    position: relative;
    overflow: hidden;
}

.glitch-image-container::before,
.glitch-image-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/images/profile.jpeg');
    background-size: cover;
    background-position: center;
    filter: grayscale(100%) contrast(125%) brightness(90%);
    mix-blend-mode: multiply;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.1s ease-out;
}

.group:hover .glitch-image-container::before {
    opacity: 1;
    animation: glitch-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    mix-blend-mode: screen;
}

.group:hover .glitch-image-container::after {
    opacity: 1;
    animation: glitch-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
    mix-blend-mode: difference;
}

@keyframes glitch-1 {
    0% {
        transform: translate(0);
        clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%);
    }

    10% {
        transform: translate(-4px, 2px);
        clip-path: polygon(0 20%, 100% 20%, 100% 35%, 0 35%);
    }

    30% {
        transform: translate(3px, -1px);
        clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
    }

    50% {
        transform: translate(-2px, 3px);
        clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%);
    }

    70% {
        transform: translate(4px, -2px);
        clip-path: polygon(0 10%, 100% 10%, 100% 25%, 0 25%);
    }

    90% {
        transform: translate(-1px, 1px);
        clip-path: polygon(0 75%, 100% 75%, 100% 90%, 0 90%);
    }

    100% {
        transform: translate(0);
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
}

@keyframes glitch-2 {
    0% {
        transform: translate(0);
        clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0 100%);
    }

    15% {
        transform: translate(2px, -3px);
        clip-path: polygon(0 5%, 100% 5%, 100% 15%, 0 15%);
    }

    35% {
        transform: translate(-4px, 1px);
        clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%);
    }

    55% {
        transform: translate(1px, -2px);
        clip-path: polygon(0 80%, 100% 80%, 100% 95%, 0 95%);
    }

    75% {
        transform: translate(-3px, 2px);
        clip-path: polygon(0 25%, 100% 25%, 100% 40%, 0 40%);
    }

    95% {
        transform: translate(2px, -1px);
        clip-path: polygon(0 55%, 100% 55%, 100% 70%, 0 70%);
    }

    100% {
        transform: translate(0);
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
}
</style>
