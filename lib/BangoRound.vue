<template>
  <div ref="brContainerRef" class="bangoround--carousel-container">
    <div ref="brCarouselRef" class="bangoround--carousel-slides" :style="slidesWrapperStyles">
      <div
          class="bangoround--carousel-slide"
          v-for="(slide, index) in slides"
          :key="index"
          :style="slideStyles"
      >
        <template v-if="slidesVisibility[index]">
          <slot :slide="slide" :index="index"></slot>
        </template>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button @click="toPrevSlide">Prev</button>
    <button @click="toNextSlide">Next</button>

    <!-- Indicators -->
    <div class="bangoround--indicators" v-if="indicators">
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
import {ref, computed, onMounted, defineProps, defineExpose, reactive} from 'vue';
import useResize from './composables/useResize';
import {useLazyLoad} from './composables/useLazyload';
import {UseLazyLoadOptions} from './composables/useLazyload';
import {useSwipeAndDrag} from './composables/useSwipeAndDrag';

// Define props here.
interface Props {
  slides: any[];
  minWidth?: string;
  maxWidth?: string;
  startSlide?: number;
  lazyLoad?: UseLazyLoadOptions;
  indicators?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  minWidth: '100px',
  maxWidth: '300px',
  startSlide: 0,
  indicators: false,
  lazyLoad: () => ({ enabled: false, rootMargin: '0px', threshold: 0.1, persistAfterLoad: false}),
});

// Keep refs and composition functions here.
const currentSlide = ref(0);
const brCarouselRef = ref<HTMLElement | null>(null);
const brContainerRef = ref<HTMLElement | null>(null);
const {width: carouselWidth} = useResize();
const currentIndicator = computed(() => Math.ceil((currentSlide.value + 1) / computedSlidesToShow.value));
const slidesVisibility = reactive(new Array(props.slides.length).fill(false));

onMounted(() => {
  if (props.startSlide) {
    currentSlide.value = props.startSlide;
  }

    if (brCarouselRef.value) {
      const children = brCarouselRef.value.children;
      for (let i = 0; i < children.length; i++) {
        // Dynamically apply useLazyLoad for each slide
        useLazyLoad(ref(children[i]), {
          root: brContainerRef.value,
          onVisible: () => {
            slidesVisibility[i] = true; // Update visibility state
          },
          onExit: () => {
            if (props.lazyLoad.persistAfterLoad === true) {
              return;
            }
            slidesVisibility[i] = false; // Update visibility state
          },
        });
      }
    }
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

const toNextSlide = () => {
  if (currentSlide.value < (props.slides.length - 1)) {
    currentSlide.value++;
  }
};

const toPrevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (indicator: number) => {
  currentSlide.value = (indicator - 1) * computedSlidesToShow.value;
};

const handleSwipe = (distance: number, velocity: number) => {
  const sensitivity = 100; // Adjust based on testing
  const slidesToMove = Math.round(Math.abs(distance) / sensitivity * velocity);

  if (distance < 0) {
    // Swiped left / Dragged left
    currentSlide.value = Math.min(currentSlide.value + slidesToMove, props.slides.length - 1);
  } else {
    // Swiped right / Dragged right
    currentSlide.value = Math.max(currentSlide.value - slidesToMove, 0);
  }
};

useSwipeAndDrag(brCarouselRef, handleSwipe);

defineExpose({
  toNextSlide,
  toPrevSlide,
  goToSlide
});
</script>

<style module lang="scss">
@import 'main.scss';
</style>