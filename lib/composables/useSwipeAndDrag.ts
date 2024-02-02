import { Ref, onMounted, onUnmounted, ref } from 'vue';

interface SwipeHandler {
    (distance: number, velocity: number): void;
}

export function useSwipeAndDrag(elementRef: Ref<HTMLElement | null>, onSwipe: SwipeHandler): void {
    const startX = ref<number>(0);
    const startTime = ref<number>(Date.now());
    const isDragging = ref<boolean>(false);

    const calculateVelocity = (start: number, end: number, time: number): number => {
        const distance: number = end - start;
        return Math.abs(distance / time);
    };

    const onStart = (clientX: number): void => {
        startX.value = clientX;
        startTime.value = Date.now();
        isDragging.value = true;
    };

    const onEnd = (clientX: number): void => {
        if (!isDragging.value) return;
        isDragging.value = false;

        const endTime: number = Date.now();
        const swipeDuration: number = endTime - startTime.value;
        const swipeDistance: number = clientX - startX.value;
        const swipeVelocity: number = calculateVelocity(startX.value, clientX, swipeDuration);

        // Pass the swipe details to the callback
        onSwipe(swipeDistance, swipeVelocity);

        // Reset
        startX.value = 0;
        startTime.value = Date.now();
    };

    /**
     * Prevent text selection while dragging.
     * @param enable
     */
    const preventTextSelection = (enable: boolean) => {
        if (enable) {
            document.body.style.userSelect = 'none';

        } else {
            // Re-enable text selection by resetting the style
            document.body.style.userSelect = '';
        }
    };

    const onTouchStart = (event: TouchEvent): void => onStart(event.touches[0].clientX);
    const onTouchEnd = (event: TouchEvent): void => onEnd(event.changedTouches[0].clientX);

    const onMouseDown = (event: MouseEvent): void => {
        onStart(event.clientX);
        preventTextSelection(true);
        // Add global listeners for mouse move and up to handle drag outside the element
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    const onMouseMove = (event: MouseEvent): void => {
        if (isDragging.value) {
            // Optional: Implement logic here if you want to track mouse movement while dragging
        }
    };
    const onMouseUp = (event: MouseEvent): void => {
        onEnd(event.clientX);
        preventTextSelection(false);
        // Remove global listeners to prevent unnecessary calls
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    onMounted(() => {
        const el = elementRef.value;
        if (el) {
            el.addEventListener('touchstart', onTouchStart);
            el.addEventListener('touchend', onTouchEnd);
            el.addEventListener('mousedown', onMouseDown);
        }
    });

    onUnmounted(() => {
        const el = elementRef.value;
        if (el) {
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchend', onTouchEnd);
            el.removeEventListener('mousedown', onMouseDown);
        }
        // Clean up global mouse event listeners
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    });


}
