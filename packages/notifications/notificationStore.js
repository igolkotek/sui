import {writable} from 'svelte/store';

const statuses = ['ok', 'info', 'alert', 'error'];

const isNotificationValid = notification => {
    if (!notification || !notification.text) return false;
    if (typeof notification.text !== 'string') return false;
    return statuses.includes(notification.status);
};

const addNotification = (notification, update) => {
    if (!isNotificationValid(notification)) throw new Error('Notification object is not valid');

    const {
        id = new Date().getTime(),
        // removeAfter = +notification.removeAfter,
        ...rest
    } = notification;

    update((notifications) => {
        return [...notifications, {
            id,
            // removeAfter,
            ...rest,
        }];
    });
};

const removeNotification = (notificationId, update) => update((notifications) => {
    return notifications.filter(n => n.id !== notificationId);
});

const clearNotifications = set => set([]);

const createNotificationsStore = () => {
    const {
        subscribe,
        set,
        update,
    } = writable([]);

    return {
        subscribe,
        add: notification => addNotification(notification, update),
        remove: notificationId => removeNotification(notificationId, update),
        clear: () => clearNotifications(set),
    };
};

export default createNotificationsStore();
