<template>
  <main class="py-32 px-4 sm:px-8 lg:px-16 bg-primary-950 min-h-screen text-white">
    <header class="max-w-4xl mx-auto text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold font-merriweather mb-6 text-accent-500">Let's Create Something Together</h1>
      <p class="text-lg text-primary-200 font-montserrat">
        Whether you have a project in mind, a question about my work, or just want to say hi, I'd love to hear from you. 
        Fill out the form below, or find me on social media. Let's bring your ideas to life!
        <!-- Replace with your actual story/pitch -->
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
      <!-- Form Column -->
      <div class="w-full">
        <ContactForm />
      </div>

      <!-- 3D Object Column -->
      <div class="w-full h-96 md:h-auto md:aspect-square bg-primary-900 rounded-lg flex items-center justify-center text-primary-400 relative overflow-hidden">
        <!-- Three.js canvas will be mounted here -->
        <div ref="canvasContainer" class="absolute inset-0"></div>
        <!-- Placeholder text -->
        <!-- <p>3D Object Placeholder</p> -->
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import ContactForm from '~/components/ContactForm.vue';
import * as THREE from 'three';
// Optional: Import OrbitControls or other helpers if needed
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const canvasContainer = ref(null);
let renderer, scene, camera, cube, animationFrameId;

// Basic Three.js Setup Function
const initThree = () => {
  if (!canvasContainer.value) return;

  // Scene
  scene = new THREE.Scene();
  // Use transparent background for renderer, background color from parent div
  // scene.background = new THREE.Color(0x21272f); // Match primary-900 roughly

  // Camera
  const sizes = { 
      width: canvasContainer.value.clientWidth,
      height: canvasContainer.value.clientHeight 
  };
  if (sizes.width === 0 || sizes.height === 0) {
      console.warn("Canvas container has zero dimensions. Skipping Three.js init for now.");
      return;
  }
  camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
  camera.position.z = 3; // Slightly closer
  scene.add(camera);

  // Simple Cube Geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1); // Smaller cube
  const material = new THREE.MeshStandardMaterial({ 
      color: 0xbd9a52, // accent-500
      metalness: 0.4,
      roughness: 0.5
  });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Renderer
  renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Make renderer background transparent
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasContainer.value.appendChild(renderer.domElement);

  // Optional: Controls
  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.enableDamping = true;

  // Animation Loop
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.007;
    // controls.update(); // Update controls if used
    renderer.render(scene, camera);
  };
  animate();

  // Handle Resize
  window.addEventListener('resize', onResize);
};

const onResize = () => {
  if (!canvasContainer.value || !camera || !renderer) return;
  // Use a small delay or nextTick if dimensions are not immediately correct
  nextTick(() => {
      const sizes = {
          width: canvasContainer.value.clientWidth,
          height: canvasContainer.value.clientHeight
      };
      if (sizes.width > 0 && sizes.height > 0) {
          camera.aspect = sizes.width / sizes.height;
          camera.updateProjectionMatrix();
          renderer.setSize(sizes.width, sizes.height);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
  });
};

// Mount and Cleanup
onMounted(() => {
  // Wait a tick to ensure container is rendered and has dimensions
  nextTick(() => {
      initThree();
  });
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  window.removeEventListener('resize', onResize);
  // Dispose Three.js objects
  if (scene) {
      // Dispose geometries, materials, textures
      scene.traverse(object => {
          if (object instanceof THREE.Mesh) {
              if (object.geometry) object.geometry.dispose();
              if (object.material) {
                  if (Array.isArray(object.material)) {
                      object.material.forEach(material => material.dispose());
                  } else {
                      object.material.dispose();
                  }
              }
          }
      });
  }
  if (renderer) {
    renderer.dispose();
    if(canvasContainer.value && renderer.domElement) {
        canvasContainer.value.removeChild(renderer.domElement);
    }
  }
  // Nullify references
  renderer = null;
  scene = null;
  camera = null;
  cube = null;
});

useHead({
  title: 'Contact Me',
  meta: [
    { name: 'description', content: 'Get in touch to discuss your project or ideas.' }
  ]
})
</script>

<style scoped>
/* Ensure canvas container takes up grid space and fills it */
.w-full.h-96.md\:h-auto.md\:aspect-square {
  position: relative;
}
.absolute.inset-0 {
    /* Canvas will fill this div */
}
</style> 