<path
        class={className}
        {fill}
        {stroke}
        stroke-width={strokeWidth}
        stroke-linejoin={linejoin}
        stroke-linecap={linecap}
        stroke-opacity={strokeOpacity}
        stroke-dasharray={dasharray}
        {d}
/>


<script>
    export {className as class};
    let className = '';

    export let fill = "inherit";
    export let stroke = "none";
    export let strokeWidth= null;
    export let strokeOpacity = null;
    export let dasharray= null;
    export let linejoin = "round"; // also: miter, bevel
    export let linecap = "round"; // also: butt, square
    export let d;
</script>
