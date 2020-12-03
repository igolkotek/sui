<i
        class={'icon ' + className}
        class:flip={flip && typeof flip === 'boolean'}
        class:flip-h={flip === 'h'}
        class:flip-v={flip === 'v'}
        class:spin
        class:pulse={pulse && !spin}
        class:isRight={pos==='right'}
        class:isLeft={pos==='left'}
        {style}
>

    <svg xmlns="http://www.w3.org/2000/svg"
         width={24 * scale}
         height={24 * scale}
         viewBox={box}
         fill={color}
    >

        {#if typeof content === 'string'}
            <path d={content}/>
        {:else}
            <svelte:component this={content}/>
        {/if}
    </svg>
</i>

<script>
    export {className as class};
    let className = '';
    export let style = null;
    export let content = null;
    export let scale = 1;
    export let box = '0 0 24 24';
    export let color = 'currentColor';
    export let flip = false;
    export let spin = false;
    export let pulse = false;
    export let pos;
</script>
<style>
    .icon {
        align-items: center;
        display: inline-flex;
        justify-content: center;
        position: relative;
        line-height: 0.5;
    }

    .flip {
        transform: scale(-1, -1);
    }

    .flip-h {
        transform: scale(-1, 1);
    }

    .flip-v {
        transform: scale(1, -1);
    }

    .spin {
        animation: spin 1s 0s infinite linear;
    }

    .pulse {
        animation: spin 1s infinite steps(8);
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .isRight {
        height: 2.25em;
        pointer-events: none;
        position: absolute;
        right: 0;
        width: 2.25em;
        z-index: 4;
        font-size: 1.5rem;
    }

    .isLeft {
        height: 2.25em;
        pointer-events: none;
        position: absolute;
        left: 0;
        width: 2.25em;
        z-index: 4;
        font-size: 1.5rem;
    }

</style>
