<a
    use:useActions={use}
    use:forwardEvents
    {href}
    {...exclude($$props, ['use', 'href'])}
>
    <slot></slot>
</a>

<script>
    import {current_component} from 'svelte/internal';
    import {forwardEventsBuilder, useActions, exclude} from '@sui/utils';

    const forwardEvents = forwardEventsBuilder(current_component);
    export let use = [];
    export let href = 'javascript:void(0);';
</script>