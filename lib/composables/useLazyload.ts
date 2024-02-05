import { Ref, onUnmounted, ref } from 'vue';

interface UseLazyLoadOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
    onVisible?: () => void; // Callback when the element becomes visible
    onExit?: () => void; // Callback when the element exits the viewport
    persistAfterLoad?: boolean; // Prevents the slide being removed from the observer after it's visible, even if it leaves view.
}

export function useLazyLoad(target: Ref<Element | null>, options: UseLazyLoadOptions) {
    const isVisible = ref(false);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                // Update visibility state
                isVisible.value = entry.isIntersecting;
                // Call the callback if the target is visible
                if (entry.isIntersecting) {
                    options.onVisible?.();
                    if (options.persistAfterLoad) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    options.onExit?.();
                }
            });
        },
        {
            root: options.root || null,
            rootMargin: options.rootMargin || '0px',
            threshold: options.threshold || 0.1,
        }
    );

    if (target.value) {
        observer.observe(target.value);
    }

    onUnmounted(() => {
        if (target.value) {
            observer.disconnect();
        }
    });

    return { isVisible };
}

export type { UseLazyLoadOptions };
