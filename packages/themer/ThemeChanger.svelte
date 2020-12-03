<style type="text/scss">
    @import "themes";
    .themer {display: none;}
</style>
<script>
    import {themeStore} from "./themeStore";
    import {onMount} from 'svelte';

    export let themes = [
        ['white', 'світла'],
    ];
    $: _themes = themes.map(opt=>opt[0]);
    export let themeDefault = themes[0][0];
    export let themeSelected = themes[0][0];
    let themeCurrent;

    $: if (themeSelected !== themeCurrent && _themes.includes(themeSelected)){
        themeCurrent = themeSelected;
        onChange();
    }
    const onChange=()=> themeStore.changeTheme(themeSelected)
    onMount(()=>{
        themeStore.initiate(_themes, themes[0][0], themeSelected)
    })
</script>

<span class="themer" />