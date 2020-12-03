<div
        bind:this={ref}
        {title}
        {style}
        class="img {className}"
        class:fitContain
        class:circle
        use:lazyLoad
        use:forwardEvents
/>

<style>
    .img {
        background-position: 50%;
        background-repeat: no-repeat;
        display: block;
        height: auto;
        width: 100%;
        background-size: cover;
    }

    .fitContain {
        background-size: contain;
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
    export let title;
    export let lazy = true;
    export let margin = 200;
    export let threshold = 0.1;
    export {className as class};
    let className = '';
    export let fitContain = false;
    export let circle = false;
    export let radius;
    export let h;
    export let w;

    let ref;
    let _src = src;
    let observer = null;

    $: style = `background-image: url(${_src})${radius ? `;border-radius:${radius}px` : ''}${w ? `;width:${w}` : ''}${h ? `;height:${h}` : ''}`;

    const options = {
        rootMargin: margin + 'px',
        threshold: threshold
    }


    if (lazy && ("IntersectionObserver" in window)) {
        _src = "";
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