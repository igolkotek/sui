<script>
    import { fade } from 'svelte/transition';
    import { onDestroy } from 'svelte';
    export let notification = {};
    export let duration;
    export let removeNotificationHandler;

    const {
        id,
        text,
        status,
    } = notification;

    let timeout = null;
    if (duration) {
        timeout = setTimeout(removeNotificationHandler, duration);
    }

    onDestroy(() => {
        if (duration && timeout) clearTimeout(timeout);
    });

    const getClass = (suffix) => {
        suffix = suffix ? `-${suffix}` : '';
        return [`notif-${status}`, `notif${suffix}`].join(" ")
    };

</script>

<div class="notif {`notif-${status}`}" role="status" aria-live="polite" transition:fade>
    <div class={getClass('content')}>
        {@html text}
    </div>
    <button
            class={getClass('btn')}
            on:click={removeNotificationHandler}
            aria-label="delete notification"
    >
        &times;
    </button>
</div>

<style>
    .notif {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        margin: 12px;
        /*background: #fff;*/
        /*color: #000;*/
        border-radius: 6px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    }

    .notif-content {
        width: 210px;
        padding: 12px 6px 12px 12px;
        box-sizing: border-box;
        word-wrap: break-word;
    }
    .notif-info {
        background-color: #99bddd;
        color:#555555;
    }
    .notif-ok {
        background-color: #89eea1;
        color:#555555;
    }
    .notif-alert {
        background-color: #eec47b;
        color:#555555;
    }
    .notif-error {
        background-color: #ee6258;
        color:white;
    }

    .notif-btn {
        display: block;
        width: 40px;
        padding: 0 0 2px;
        margin: 0;
        border: none;
        border-left: 1px solid #eee;
        outline: none;
        background: none;
        cursor: pointer;
        font-size: 20px;
        color: #000;
        box-sizing: border-box;
    }

    .notif-btn:hover {
        background: rgba(0, 0, 0, 0.01);
    }
</style>