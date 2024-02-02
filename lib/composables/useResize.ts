import { ref, onMounted, onUnmounted, Ref } from 'vue';

// A composable function that tracks the width of the window or a specific element
function useResize(elementRef?: Ref<HTMLElement | null>) {
    const width = ref(window.innerWidth);
    const updateWidth = () => {
        width.value = elementRef?.value?.offsetWidth || window.innerWidth;
    };

    onMounted(() => {
        window.addEventListener('resize', updateWidth);
        // Initial update in case of element-based width
        updateWidth();
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateWidth);
    });

    return { width };
}

export default useResize;