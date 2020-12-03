<script>
    import viewportStore from './viewportStore.js';

    export let mobileWidth = 900;
    let width, height;

    $: viewportStore.onChange(width, height, mobileWidth);

</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />