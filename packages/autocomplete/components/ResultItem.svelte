<li use:forwardEvents
    class="autocomplete-item {className}"
    class:isActive >
    {@html result.label}
</li>

<style>
    .autocomplete-item {
        list-style: none;
        text-align: left;
        padding: 0.5rem;
        cursor: pointer;
        border-bottom: 1px dotted #efefef;
    }

    .autocomplete-item :global(.txtHigh) {
        background-color: transparent;
        font-weight: bold;
    }

    .autocomplete-item.isActive,
    .autocomplete-item:hover {
        background-color: #efefef;
    }
</style>
<script>
    import {current_component} from 'svelte/internal';
    import {forwardEventsBuilder} from "@sui/utils";
    const forwardEvents = forwardEventsBuilder(current_component);

    export let isActive;
    export let result;
    export {className as class}
    let className = '';
</script>