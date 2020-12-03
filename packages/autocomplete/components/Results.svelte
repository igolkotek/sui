<ul bind:this={ref}
    class="autocomplete-results {className}"
    class:isHidden={!isOpen}
    class:isLoading
    {style}>

    <slot/>

</ul>

<style>
    .autocomplete-results {
        position: absolute;
        top: 2.2rem;
        padding: 0;
        margin: 0;
        border: 1px solid #efefef;
        border-radius: 0;
        overflow: auto;
        width: 100%;

        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 1px 5px 0 rgba(0, 0, 0, 0.12);
        z-index: 1000;
    }

    .isLoading {
        opacity: 0.3;
    }

    .isHidden {
        display: none;
    }
</style>
<script>
    export let width;
    export let height;
    export let isOpen;
    export let isLoading;
    export {className as class};
    let className = '';

    let ref;
    $: _width = width ? `width:${width};` : null;
    $: _height = height ? `height:${height};` : null;
    $: style = _width + _height;

</script>