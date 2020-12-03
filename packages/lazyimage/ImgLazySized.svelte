<img
        bind:this={ref}
        src={_src && setUrl(_src)}
        {alt}
        title={alt}
        class="{className}"
        class:img={responsive}
        class:fitContain
        class:circle
        {style}
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
    /*<!--width={(w && w !== '-' && op !== 'orig')? w: null}
    height={(h && h !== '-' && op !== 'orig')? h: null}-->*/
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
    export let radius = 0;
    $: style = radius > 0 ? `border-radius:${radius}px` : '';

    export let h = '-'; //height [-\d+]
    export let w = '-'; // width [-\d+]
    export let op = 'orig'; // image operation, type of ops

    export let isLocalServer = true;
    export let baseUrl="img";

    const ops = {
        orig: 'o',
        resize: 'r',
        crop: 'c'
    };

    let ref;
    let _src = src;
    let observer = null;
    const options = {
        rootMargin: margin + 'px',
        threshold: threshold
    }
    if (typeof window === 'undefined') {
        lazy = false
    } else if (lazy && ("IntersectionObserver" in window)) {
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

    function setUrl(url) {
        return `/${baseUrl}/${ops[op]}/${w}/${h}/${url}`;
    }
</script>