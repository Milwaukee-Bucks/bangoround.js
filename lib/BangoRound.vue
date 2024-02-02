<template>
  <div class="carousel-container">
    <div class="carousel-slides" :style="slidesWrapperStyles">
      <div
          class="carousel-slide"
          v-for="(slide, index) in slides"
          :key="index"
          :style="slideStyles"
      >
        <slot :slide="slide" :index="index"></slot>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button @click="prevSlide">Prev</button>
    <button @click="nextSlide">Next</button>

    <!-- Indicators -->
    <div class="indicators">
      <span
          v-for="n in Math.ceil(slides.length / computedSlidesToShow)"
          :key="n"
          :class="{ active: n === currentIndicator }"
          @click="goToSlide(n)"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineProps } from 'vue';

interface Props {
  slides: any[];
  minWidth?: string;
  maxWidth?: string;
  startSlide?: number;
}

const props = withDefaults(defineProps<Props>(), {
  minWidth: '100px',
  maxWidth: '300px',
  startSlide: 0,
});

const currentSlide = ref(0);
const carouselWidth = ref(0);
const currentIndicator = computed(() => Math.ceil((currentSlide.value + 1) / computedSlidesToShow.value));

const updateCarouselWidth = () => {
  const carouselElement = document.querySelector('.carousel-container') as HTMLElement | null;
  carouselWidth.value = carouselElement ? carouselElement.offsetWidth : window.innerWidth;
};

onMounted(() => {
  updateCarouselWidth();
  window.addEventListener('resize', updateCarouselWidth);
  if (props.startSlide) {
    currentSlide.value = props.startSlide;
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateCarouselWidth);
});

const computedSlidesToShow = computed(() => {
  const minSlideWidth = parseInt(props.minWidth);
  const maxSlideWidth = parseInt(props.maxWidth);
  const maxSlides = Math.floor(carouselWidth.value / minSlideWidth);
  const minSlides = Math.ceil(carouselWidth.value / maxSlideWidth);
  return Math.max(1, Math.min(maxSlides, minSlides));
});

const slidesWrapperStyles = computed(() => {
  const totalPrevSlideWidths = currentSlide.value * parseInt(props.minWidth);
  return {
    display: 'flex',
    transition: '0.3s ease',
    transform: `translateX(-${totalPrevSlideWidths}px)`
  };
});

const slideStyles = computed(() => ({
  flex: `1 0 ${props.minWidth}`,
  maxWidth: props.maxWidth
}));

const nextSlide = () => {
  if (currentSlide.value < (props.slides.length - 1)) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (indicator: number) => {
  currentSlide.value = (indicator - 1) * computedSlidesToShow.value;
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  overflow: hidden;
}

.carousel-slide {
  /* Add your slide styles here */
}

.indicators {
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.indicators span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicators span.active {
  background-color: #333;
}

</style>
