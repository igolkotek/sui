<svelte:window on:keydown={keydown}/>

{#if active}
    <div class='modalBg {modalBgClass}' class:flex={flexBg} on:click={onClick}>
        <div bind:this={elRef} class="modal {className}">
            {#if showClose}
                <div class="closeWr">
                    <ButtonDelete on:click={close}/>
                </div>
            {/if}

            <div class="title">
                <slot name='header'></slot>
            </div>
            <slot></slot>
            <div class="footer">
                <slot name='footer'></slot>
            </div>
        </div>
    </div>
{/if}


<style type=text/scss>
    .modalBg {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.3);
        z-index: 999;

        &.flex {
            display: flex;
        }
    }

    .modal {
        /*border: 1px solid darkred;*/
        padding: 1rem;
        z-index: 1001;
        background-color: white;
        max-height: calc(100% - 32px);
        max-width: calc(100% - 32px);
        box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12);
        /*flex-direction: column;*/
        /*flex-grow: 0;*/
        /*flex-shrink: 0;*/
        box-sizing: border-box;
        pointer-events: auto;
        overflow-y: auto;
        position: relative;
    }

    .closeWr {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
    }
    .title, .footer {
        margin:1rem 0;
    }
</style>


<script>
    import {ButtonDelete} from 'sui_buttondelete';

    let elRef;
    export let active = false;
    export let showClose = true;
    export let modalBgClass = '';
    export let flexBg = true;
    export {className as class};
    let className = '';

    const close = () => active = false;

    function keydown(e) {
        if (active && e.keyCode && e.keyCode === 27) {
            close();
        }
    }

    function onClick(e) {
        if (active && !elRef.contains(e.target)) {
            close();
        }
    }
</script>
