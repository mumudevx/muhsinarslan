<template>
  <!-- Form Container (Max width applied by parent page now) -->
  <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
    <!-- Name Field -->
    <div>
      <label for="contact-name" class="block text-sm font-medium text-primary-300 mb-1 font-montserrat">Name</label>
      <input type="text" id="contact-name" v-model="formData.name"
        :class="{ 'border-red-500 focus:ring-red-500': errors.name }" :disabled="isSubmitting"
        class="w-full px-4 py-3 rounded-md bg-primary-800 border border-primary-700 text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500 transition duration-200 disabled:opacity-70"
        placeholder="Your Name">
      <p v-if="errors.name" class="mt-1 text-red-500 text-xs font-montserrat">{{ errors.name }}</p>
    </div>
    <!-- Email Field -->
    <div>
      <label for="contact-email" class="block text-sm font-medium text-primary-300 mb-1 font-montserrat">Email</label>
      <input type="email" id="contact-email" v-model="formData.email"
        :class="{ 'border-red-500 focus:ring-red-500': errors.email }" :disabled="isSubmitting"
        class="w-full px-4 py-3 rounded-md bg-primary-800 border border-primary-700 text-primary-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent placeholder-primary-500 transition duration-200 disabled:opacity-70"
        placeholder="your.email@example.com">
      <p v-if="errors.email" class="mt-1 text-red-500 text-xs font-montserrat">{{ errors.email }}</p>
    </div>
    <!-- Message Field -->
    <div>
      <label for="contact-message"
        class="block text-sm font-medium text-primary-300 mb-1 font-montserrat">Message</label>
      <textarea id="contact-message" rows="5" v-model="formData.message"
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
</template>

<script setup>
import { ref } from 'vue';

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
    return;
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
      submissionStatus.value = 'success';
      submissionMessage.value = 'Thank you for your message! I will get back to you soon.';

      formData.value = { name: '', email: '', message: '' };
      errors.value = {};
    } else {
      let errorData = { message: "Submission failed. Please try again." };
      try {
        errorData = await response.json();
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
    submissionStatus.value = 'error';
    submissionMessage.value = 'Network error. Please check your connection and try again.';
    console.error('Network error during form submission:', error);
  } finally {
    isSubmitting.value = false;
  }
};

</script>

<style scoped>
/* Highlight invalid fields (kept) */
.border-red-500 {
  border-color: #ef4444;
}

.focus\:ring-red-500:focus {
  --tw-ring-color: #ef4444;
}
</style>