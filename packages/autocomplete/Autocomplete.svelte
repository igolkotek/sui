<svelte:window on:keydown={onWindowKeydown} on:click={onWindowClick}/>

<div on:click|stopPropagation
     class="autocomplete {wrapperClass}"
     class:hasIconRight={hasIcon}
     bind:this={elRefWr}
>
    <div class="lineWr">
        <input
                type="text"
                class={inputClass}
                bind:value
                bind:this={elRef}
                {tabindex}
                {name}
                {placeholder}
                {required}
                {disabled}
                autocomplete={name}
                on:input={onChange}
                on:keydown={onKeyDown}
                on:click={()=>elRef.setSelectionRange(0, value.length)}
        />

        {#if hasIcon && !isLoading}
            <div class="iconWr">
                <Icon data={search} class={iconClass}/>
            </div>
        {/if}
        {#if isLoading}
            <div class="iconWr">
                <Icon data={spinner} class={iconClass} pulse/>
            </div>
        {/if}
    </div>
<svelte:component this={ResultsComponent}
                  width={resultsWidth} height={resultsHeight}
                  {isOpen} {isLoading}
                  class={autocompleteResultsClass}
>
    {#each results as result, i}
    <svelte:component
            this={ResultItemComponent}
            on:click={()=>close(i)}
            class={autocompleteItemClass}
                    isActive={i===arrowCounter}
                {result} />
    {/each}
</svelte:component>

    {#if showDefaultList}
        <slot/>
    {/if}

</div>

<script>
    import {onMount} from "svelte";
    import {notificationStore} from '@sui/notifications';
    import Icon from 'svelte-awesome';
    import {search, spinner} from 'svelte-awesome/icons';
    import Results from "./components/Results.svelte";
    import ResultItem from "./components/ResultItem.svelte";

    let elRef;
    let elRefWr;

    export let name = '';
    export let placeholder = '';
    export let required = false;
    export let disabled = false;
    export let tabindex = 0;
    export let setFocus = true;
    let resultsWidth;
    let resultsHeight;

    export let hasIcon = true;

    export let wrapperClass = '';
    export let inputClass = '';
    export let iconClass = '';
    export let autocompleteResultsClass = '';
    export let autocompleteItemClass = '';

    export let threshold = 2;
    export let maxItemsDropDown = 10;
    export let maxItems;
    export let lookupFromStart = true; // Default type ahead

    export let resultsComp;
    export let resultItemComp;
    $: ResultsComponent = resultsComp || Results;
    $: ResultItemComponent = resultItemComp || ResultItem;

    // autocomplete props
    let value = ''; // input value bound
    let selectedValue; // selectedValue result
    let results = [];

    export let source = []; // src of search: list of strings or objects, or Function (api usually), returning list
    export let lookupFn;
    export let lookupKey; // required if *lookupFn* is NOT assigned. NOW it's string only! Search by 1 key
    export let onSelection; // fn receiving feedback
    export let renderItem; // fn rendering result item as label in results' object

    const lookupFnDefault = (srcList = [], value) => srcList.filter(item => {
        if (typeof item !== 'string') {
            item = item[lookupKey] || '' // Silent fail
        }
        return lookupFromStart
                ? item.toUpperCase().startsWith(value.toUpperCase())
                : item.toUpperCase().includes(value.toUpperCase())
    })

    const _lookupFn = lookupFn || lookupFnDefault;

    const renderItemDefault = (item) => {
        return `<div>${highlight(item[lookupKey])}</div>`
    }
    const _renderItem = renderItem || renderItemDefault;

    export let renderHighlight;
    const renderHighlightDefault = (txt) => txt.replace(
            RegExp(regExpEscape(value.trim()), 'i'), "<span class='txtHigh'>$&</span>"
    );
    const highlight = renderHighlight || renderHighlightDefault;

    // let isFocused = false;
    let isOpen = false;
    export let isLoading = false;

    $: showDefaultList = !isOpen;

    let arrowCounter = -1;
    // export let debounceTime = 250;
    // options

    const regExpEscape = (s) => {
        return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    onMount(() => {
        if (setFocus) elRef.focus();
    })

    // const onFocus = () => isFocused = true;
    //
    // const onBlur = () => {
    //     isFocused = false;
    //     results = [];
    // }

    const onChange = (e) => {
        if (value.length >= Number(threshold)) {
            isLoading = true;
            const _source = (typeof source === 'function')
                    ? Promise.resolve(source(value))
                    : Promise.resolve(source);
            _source.then(lst => {
                isLoading = false;
                getResults(_lookupFn(lst, value));
            })
                    .catch(err => {
                                isLoading = false;
                                console.log("err:", err, typeof err, err.toString());
                                notificationStore.add({
                                    text: err.toString(),
                                    status: 'error'
                                })
                            }
                    );
        } else if (value.length < Number(threshold)) {
            isOpen = false;
        }
    }

    const getResults = (list = []) => {
        results = list.map(item => {
            return {
                item: item,
                label: _renderItem(item, highlight, lookupKey)
            }
        }).slice(0, maxItems);

        isOpen = (results.length > 0);
        const _height = results.length > maxItems ? maxItems : results.length;
        resultsHeight = `${_height * 4}rem`
    }


    const onKeyDown = (e) => {
        if (e.keyCode === 40 && arrowCounter < (results.length - 1)) {
            // ArrowDown
            arrowCounter = arrowCounter + 1;
        } else if (e.keyCode === 38 && arrowCounter >= 0) {
            // ArrowUp
            arrowCounter = arrowCounter - 1
        } else if ((e.keyCode === 13) && (arrowCounter >= -1)) {
            // Enter
            e.preventDefault();
            // if (arrowCounter === -1) {
            //     //     arrowCounter = 0 // Default select first item of list
            //     return;
            // }
            close(arrowCounter);
        } else if (e.keyCode === 27) {
            // Escape
            e.preventDefault();
            close();
        }
    }
    const close = (index = -1) => {
        isOpen = false;
        arrowCounter = -1;
        if (index > -1) {
            selectedValue = results[index].item;
            value = selectedValue[lookupKey];
            if (onSelection) {
                onSelection({
                    // results: results,
                    selectionText: value,
                    selection: selectedValue
                })
            }
        } else if (selectedValue) {
            value = ''
        }
    }

    function onWindowKeydown(e) {
        if (isOpen) {
            if (e.keyCode === 27) {
                close();
            }
        }
    }

    function onWindowClick(e) {
        if (isOpen) {
            if (!elRefWr.contains(e.target)) {
                close();
            }
        }
    }
</script>

<style type="text/scss">
    $h: 2rem;
    $w: $h;

    .lineWr {
        position: relative;
        width: 100%;
    }

    input {
        height: $h;
        padding: 0 0.5rem;
        width: 100%;
    }

    .autocomplete {
        box-sizing: border-box;
        display: inline-block;
        font-size: 1rem;
        position: relative;
        text-align: left;

        &.hasIconRight input {
            padding-right: $w;
        }
    }

    .isHidden {
        display: none;
    }

    .iconWr {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: $h;
        width: $w;
    }
</style>

