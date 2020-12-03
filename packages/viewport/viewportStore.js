import {writable} from 'svelte/store';

function createViewportStore() {
    const {subscribe, set, update} = writable({
        width: undefined,
        height: undefined,
        isMobile: undefined
    });

    return {
        subscribe,
        onChange: (width, height, mobileWidth) => update(v => Object.assign(
            {}, v, {width, height, isMobile: (width < mobileWidth)}
        )),
    };
}

export default createViewportStore();
