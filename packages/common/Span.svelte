<span
    use:useActions={use}
    use:forwardEvents
    {...exclude($$props, ['use'])}
><slot></slot></span>

<script>
    import {current_component} from 'svelte/internal';
    import {forwardEventsBuilder, useActions, exclude} from '@sui/utils';
    const forwardEvents = forwardEventsBuilder(current_component);
    export let use = [];
</script>