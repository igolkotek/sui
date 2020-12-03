<svelte:window bind:scrollY={y}/>
<div use:setTransitionDuration class="navSticky {stickyClass} {className}" class:fixed>
    <slot/>
</div>

<script>
    export {className as class};
    let className = '';
    export let fixed = false;
    export let duration = 300; // ms
    export let tolerance = 0; // scroll tolerance in px before state changes
    export let offset = 0; // vertical offset in px before element is first unpinned (hidden)

    const STICKY_SHOW = 'sticky';
    const STICKY_HIDDEN = 'nonsticky';
    let stickyClass = STICKY_SHOW;
    let y = 0;
    let lastY = 0;

    function deriveClass(y, dy) {
        if (y < offset) {
            fixed = false;
            return STICKY_SHOW;
        }

        if (Math.abs(dy) <= tolerance) {
            return stickyClass;
        }

        if (dy > 0) {
            fixed = true;
            return STICKY_SHOW;
        }
        return STICKY_HIDDEN;
    }

    function updateClass(y) {
        const dy = lastY - y;
        lastY = y;
        return deriveClass(y, dy);
    }

    function setTransitionDuration(node) {
        node.style.transitionDuration = duration + 'ms';
    }

    $: stickyClass = updateClass(y);

</script>

<style>
    .fixed {
        position: fixed;
        top: 0;
    }

    .navSticky {
        /*width: 100%;*/
        transition: transform 300ms linear;
        z-index: 100;
    }

    .sticky {
        transform: translateY(0%);
    }

    .nonsticky {
        transform: translateY(-100%);
    }

</style>