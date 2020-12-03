<img
        bind:this={ref}
        src={_src}
        {alt}
        title={alt}
        class="{className}"
        class:img={responsive}
        class:fitContain
        class:circle
        {style}
        width={w}
        height={h}
        use:lazyLoad
        use:forwardEvents
/>
<style>
    .img {
        display: block;
        height: auto;
        max-width: 100%;
        object-fit: cover;
    }

    .fitContain {
        object-fit: contain;
    }

    .circle {
        border-radius: 50%;
    }
</style>

<script>
    import {current_component} from 'svelte/internal';
    import {forwardEventsBuilder} from "./utils";

    const forwardEvents = forwardEventsBuilder(current_component);

    export let src;
    export let alt;
    export let lazy = true;
    export let margin = 200;
    export let threshold = 0.1;
    export {className as class};
    let className = '';
    export let responsive = true;
    export let fitCover = false;
    export let fitContain = false;
    export let circle = false;
    export let radius;
    $: style = radius ? `border-radius:${radius}px` : '';

    export let h; //height -\d+
    export let w; // width \d+

    let ref;
    let _src = src;
    let observer = null;
    const options = {
        rootMargin: margin + 'px',
        threshold: threshold
    }

    if (lazy && ("IntersectionObserver" in window)) {
        _src = null;
        observer = new IntersectionObserver(onIntersect, options);
    }

    function onIntersect(entries) {
        if (!_src && entries[0].isIntersecting) {
            _src = src;
            observer && observer.unobserve(ref);
        }
    }

    function lazyLoad(node) {
        observer && observer.observe(node);
        return {
            destroy() {
                observer && observer.unobserve(node)
            }
        }
    }
</script>