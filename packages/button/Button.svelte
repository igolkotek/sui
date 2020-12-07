<button
        class={className}
        class:raised
        class:outlined={outlined && !(raised || flat)}
        class:round={round && !icon}
        class:dense
        class:fab={fab && icon}
        class:icon-button={icon}
        class:active
        class:full-width={fullWidth && !icon}
        {type}
        tabindex={disabled ? -1 : tabindex}
        disabled={disabled ? 'true' : null}

        use:useActions={use}
        use:forwardEvents
        {...exclude($$props, ['use'])}
>
    <div class="slot">
        <slot />
    </div>
    {#if ripple}
        <Ripple/> {/if}

</button>

<script>
    import {get_current_component} from 'svelte/internal';
    import {forwardEventsBuilder, exclude, useActions} from 'sui_helpers';
    import {Ripple} from "sui_ripple"

    const forwardEvents = forwardEventsBuilder(get_current_component());

    export let use = [];
    export {className as class};
    let className = '';
    export let type = 'button'; //|| 'submit' || 'reset'
    export let ripple = true;
    export let raised = false;
    export let outlined = false;
    export let flat = false;
    export let dense = false;
    export let round = false;
    // export let radius = 0;
    export let fab = false;
    export let icon = false;
    export let fullWidth = false;
    export let active = false;
    export let disabled = false;
    export let tabindex = 0;

</script>
<style>
    button {
        cursor: pointer;
        font-family: Roboto, Helvetica, sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        letter-spacing: 0.75px;
        text-decoration: none;
        text-transform: uppercase;
        will-change: transform, opacity;
        margin: 0;
        padding: 0 16px;
        display: -ms-inline-flexbox;
        display: inline-flex;
        position: relative;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        height: 36px;
        border: none;
        outline: none;
        line-height: inherit;
        user-select: none;
        overflow: hidden;
        vertical-align: middle;
        border-radius: 4px;
        background-color: #efefef;
    }

    /**
 * Correct the inability to style clickable types in iOS and Safari.
 */

    button,
    [type="button"],
    [type="reset"],
    [type="submit"] {
        -webkit-appearance: button;
        border-width: 0;
    }

    /**
     * Remove the inner border and padding in Firefox.
     */

    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }

    /**
     * Restore the focus styles unset by the previous rule.
     */

    button:-moz-focusring,
    [type="button"]:-moz-focusring,
    [type="reset"]:-moz-focusring,
    [type="submit"]:-moz-focusring {
        outline: 1px dotted ButtonText;
    }

    button:before {
        box-sizing: inherit;
        border-radius: inherit;
        color: inherit;
        bottom: 0;
        content: '';
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        transition: 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
        will-change: background-color, opacity;
    }
    .slot {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        align-content: center;
    }
</style>