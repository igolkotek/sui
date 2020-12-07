//src: https://github.com/matyunya/svelte-waypoint/blob/master/src/Waypoint.svelte

export function throttleFn(fn, time) {
    let last, deferTimer;
    return () => {
        const now = +new Date;
        if (last && now < last + time) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn();
            }, time);
        } else {
            last = now;
            fn();
        }
    };
}
