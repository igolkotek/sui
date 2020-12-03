<script>
    import notificationStore from './notificationStore';
    import Notification from './Notification.svelte';

    export let duration = 3000;
</script>

<div class="notifs">
    {#each $notificationStore as notification (notification.id)}
        <Notification {notification} {duration}
                      removeNotificationHandler={()=> notificationStore.removeNotification(notification.id)}/>
    {/each}
</div>

<style>
    .notifs {
        z-index: 99;
        position: fixed;
        padding: 4px;
        width: 500px;
        box-sizing: border-box;
        color: #fff;
        top: 1em;
        left: 50%;
        margin-left: -250px;
    }

    @media screen and (max-width: 900px) {
        .notifs {
            width: 100vw;
            padding: 0;
            left: 0;
            margin: 0;
            top: 0;
        }
    }
</style>