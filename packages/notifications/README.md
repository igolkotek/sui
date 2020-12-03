### Notifications usage

--at the top level file App.svelte
import {Notifications, notificationStore} from '@sui/notifications';

notificationStore has the following statuses:
['ok', 'info', 'alert', 'error'];


**Usage case:**

`<button 
on:click={
()=>notificationStore.addNotification(
{text: "It's OK", status: 'ok'}
)}>
Notification OK
</button>`

**Also you can clear all notifications:**

`notificationStore.clearNotifications()`

**or remove notification by it's id** 
not sure it is working

`notificationStore.removeNotification(id)`