<script>
    export {className as class};
    let className = '';
    export let size;
</script>

<style type=text/scss>
    $size: 1.4rem !default;
    $unit-4: 1rem !default;
    $unit-10: 2rem !default;

    .delete {
        user-select: none;
        appearance: none;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        pointer-events: auto;
        display: inline-block;
        position: relative;
        background-color: #696969;
        color: #fff;
        font-size: 0;

        height: $size;
        max-height: $size;
        max-width: $size;
        min-height: $size;
        min-width: $size;

        outline: none;
        padding: 0.2rem;
        text-align: center;
        text-decoration: none;
        transition: background .2s, border .2s, box-shadow .2s, color .2s;
        flex-grow: 0;
        flex-shrink: 0;
        vertical-align: top;
        z-index: 1;

        &::before,
        &::after {
            background-color: #fff;
            content: "";
            display: block;
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translateX(-50%) translateY(-50%) rotate(45deg);
            transform-origin: center center;
        }

        &::before {
            height: 2px;
            width: 50%;
        }

        &::after {
            height: 50%;
            width: 2px;
        }

        &:hover,
        &:focus,
        &:active {
            background-color: #999;
        }
    }

    // Sizes
    .btn-sm {
        height: $unit-4;
        max-height: $unit-4;
        max-width: $unit-4;
        min-height: $unit-4;
        min-width: $unit-4;
        width: $unit-4;
    }

    .btn-lg {
        height: $unit-10;
        max-height: $unit-10;
        max-width: $unit-10;
        min-height: $unit-10;
        min-width: $unit-10;
        width: $unit-10;
    }

</style>


<button
        type=button
        class:btn-sm={size==='sm'}
        class:btn-lg={size==='lg'}
        class="delete {className}"
        on:click
>
    <slot/>
</button>