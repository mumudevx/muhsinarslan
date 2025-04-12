<template>
    <section id="connect"
        class="connect-section py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-br from-primary-900 to-primary-950 text-primary-100 flex flex-col items-center justify-center min-h-[70vh]">
        <!-- Centering Container for the Form -->
        <div class="w-full max-w-lg">
            <h2 class="text-3xl md:text-4xl font-bold font-merriweather mb-8 text-white text-center">Let's Connect</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
                <!-- Name Field -->
                <div>
                    <label for="name"
                        class="block text-sm font-medium text-primary-300 mb-1 font-montserrat">Name</label>
                    <input type="text" id="name" v-model="formData.name"
                        :class="{ 'border-red-500 focus:ring-red-500': errors.name }" :disabled="isSubmitting"
                        class="w-full px-4 py-3 rounded-md bg-primary-800 border border-primary-700 text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500 transition duration-200 disabled:opacity-70"
                        placeholder="Your Name">
                    <p v-if="errors.name" class="mt-1 text-red-500 text-xs font-montserrat">{{ errors.name }}</p>
                </div>
                <!-- Email Field -->
                <div>
                    <label for="email"
                        class="block text-sm font-medium text-primary-300 mb-1 font-montserrat">Email</label>
                    <input type="email" id="email" v-model="formData.email"
                        :class="{ 'border-red-500 focus:ring-red-500': errors.email }" :disabled="isSubmitting"
                        class="w-full px-4 py-3 rounded-md bg-primary-800 border border-primary-700 text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500 transition duration-200 disabled:opacity-70"
                        placeholder="your.email@example.com">
                    <p v-if="errors.email" class="mt-1 text-red-500 text-xs font-montserrat">{{ errors.email }}</p>
                </div>
                <!-- Message Field -->
                <div>
                    <label for="message"
                        class="block text-sm font-medium text-primary-300 mb-1 font-montserrat">Message</label>
                    <textarea id="message" rows="5" v-model="formData.message"
                        :class="{ 'border-red-500 focus:ring-red-500': errors.message }" :disabled="isSubmitting"
                        class="w-full px-4 py-3 rounded-md bg-primary-800 border border-primary-700 text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500 transition duration-200 resize-none disabled:opacity-70"
                        placeholder="How can I help?"></textarea>
                    <p v-if="errors.message" class="mt-1 text-red-500 text-xs font-montserrat">{{ errors.message }}</p>
                </div>
                <!-- Submit Button -->
                <div class="pt-2">
                    <button type="submit" :disabled="isSubmitting"
                        class="w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-primary-950 font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-950 focus:ring-accent-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </button>
                </div>
                <!-- Submission Status Message -->
                <p v-if="submissionStatus" :class="submissionStatus === 'success' ? 'text-green-400' : 'text-red-400'"
                    class="text-sm text-center font-montserrat mt-4">
                    {{ submissionMessage }}
                </p>
            </form>
        </div>

        <!-- Social Links Column Removed -->

    </section>
</template>

<script setup>
import { ref } from 'vue';
// Removed GSAP import as it's no longer needed for icons

const FORM_ENDPOINT = "https://formspree.io/f/xblgwkbo"; // Your Formspree endpoint

const formData = ref({
    name: '',
    email: '',
    message: ''
});

const errors = ref({});
const isSubmitting = ref(false);
const submissionStatus = ref(null); // 'success', 'error', or null
const submissionMessage = ref('');

const validateForm = () => {
    errors.value = {}; // Clear previous errors
    submissionStatus.value = null; // Clear previous submission status
    submissionMessage.value = '';
    let isValid = true;

    if (!formData.value.name.trim()) {
        errors.value.name = 'Name is required.';
        isValid = false;
    }

    if (!formData.value.email.trim()) {
        errors.value.email = 'Email is required.';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.value.email = 'Please enter a valid email address.';
        isValid = false;
    }

    if (!formData.value.message.trim()) {
        errors.value.message = 'Message is required.';
        isValid = false;
    }

    return isValid;
};

const handleSubmit = async () => {
    if (!validateForm()) {
        console.log('Form validation failed', errors.value);
        return; // Stop if validation fails
    }

    isSubmitting.value = true;
    submissionStatus.value = null;
    submissionMessage.value = '';

    try {
        const response = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData.value)
        });

        if (response.ok) {
            // Success
            submissionStatus.value = 'success';
            submissionMessage.value = 'Thank you for your message! I will get back to you soon.';
            console.log('Form submitted successfully to Formspree');
            // Reset form
            formData.value = { name: '', email: '', message: '' };
            errors.value = {}; // Clear errors on success
        } else {
            // Handle Formspree or network errors
            let errorData = { message: "Submission failed. Please try again." };
            try {
                errorData = await response.json();
                // Formspree often provides field-specific errors in an 'errors' array
                if (errorData.errors) {
                    submissionMessage.value = errorData.errors.map(err => err.message || 'An error occurred').join(' ');
                } else {
                    submissionMessage.value = errorData.message || errorData.error || "Submission failed. Please try again.";
                }
            } catch (e) {
                console.error("Could not parse error response:", e);
                submissionMessage.value = "Submission failed due to a network or server issue. Please try again.";
            }
            submissionStatus.value = 'error';
            console.error('Formspree submission error:', errorData);
        }

    } catch (error) {
        // Handle network errors (e.g., user is offline)
        submissionStatus.value = 'error';
        submissionMessage.value = 'Network error. Please check your connection and try again.';
        console.error('Network error during form submission:', error);
    } finally {
        isSubmitting.value = false;
    }
};

// Removed GSAP Animation functions (animateIcon, resetIcon)

</script>

<style scoped>
/* Removed .error-bubble and .error-bubble::before styles */

/* Highlight invalid fields (kept) */
.border-red-500 {
    border-color: #ef4444;
}

.focus\\:ring-red-500:focus {
    --tw-ring-color: #ef4444;
}
</style>