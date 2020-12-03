import {writable, get} from 'svelte/store';

const changeHtmlTheme = (themeSelected, themeDefault) => {
    if (get(themeStore).current === themeSelected) return;
    (themeSelected !== themeDefault) ?
        document.documentElement.setAttribute('data-theme', themeSelected)
        : document.documentElement.removeAttribute('data-theme');
}

function createThemeStore() {
    const {subscribe, set, update} = writable({
        themes:[],
        default:null,
        current:null
    });
    return {
        subscribe,
        initiate: (themeList = [], themeDefault, themeCurrent) => {
            if (themeList.includes(themeDefault) && themeList.includes(themeCurrent)){
                changeHtmlTheme(themeCurrent, themeDefault)
                themeStore._set(themeList, themeDefault, themeCurrent);
            }

        },
        _set: (themeList = [], themeDefault, themeCurrent) => set({
            themes: themeList,
            default: themeDefault,
            current: themeCurrent
        }),

        changeTheme: (themeSelected) => {
            const state = get(themeStore);
            if (state.themes.includes(themeSelected)) {
                changeHtmlTheme(themeSelected, state.default)
                themeStore._changeTheme(themeSelected);
            }
        },
        _changeTheme: (newTheme) => update(state =>
            Object.assign({}, state, {current: newTheme})
        )
    }
}

export const themeStore = createThemeStore();

