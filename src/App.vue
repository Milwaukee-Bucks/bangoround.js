<template>
  <vue-carousel :slides="mySlides" minWidth="500px" maxWidth="500px">
    <template #default="{ slide }">
      <!-- Custom content for each slide -->
      <div>{{ slide.content }}</div>
    </template>
  </vue-carousel>
</template>

<script setup>
import VueCarousel from './components/VueCarousel.vue';
import { ref } from 'vue';

const mySlides = ref([
  { content: 'Slide 1 Content' },
  { content: 'Slide 2 Content' },
  { content: 'Slide 3 Content' },
  { content: 'Slide 4 Content' },
  { content: 'Slide 5 Content' },
  { content: 'Slide 6 Content' },
  { content: 'Slide 7 Content' },
  // Add more slide contents
]);
</script>