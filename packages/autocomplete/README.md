### Autocomplete usage

`import {Autocomplete} from "@sui/autocomplete";`
**requires** directory in scss path having 1 file, event empty: 
_user_settings.scss

**Usage case:**

**source**: src of search: list of strings or objects, or Function (api usually), returning list

**lookupFn**: fn to search data with. If undefined - default simple fn for arrays is used.
This function has 2 params: *(srcList, value)*. Returns list of items from *srcList*, meeting requirements.

**lookupKey**: required if *lookupFn* is NOT assigned. NOW it's string only! Search by 1 key

**onSelection**: fn receiving feedback. Has 1 param as object of type
```
{
   results: results,
   selectionText: value,
   selection: selectedValue
}
```

- __hasIcon__:true - if icon on input should be visible
- __threshold__ = 2 - number of chars to start lookup with 
- __maxItemsDropDown__ = 10 - max number of items to be visible in the drop down list as it has position:absolute;
- __maxItems__ = undefined - max number of items to be in the list. If undefined - all the data received will be in list;
- __lookupFromStart__ = true - start lookup from the beginning or any position match
- __resultsComp__ custom Results Block component to be used instead of the default one
- __resultItemComp__ custom result item component to be used instead of the default one
- **renderItem**: fn rendering result item as label in results' object
This function has 3 params (item, highlight, lookupKey).
_All css class used in rendered element must be global!_
- __renderHighlight__ custom fn to be used instead of the default one to highlight matched part
- __slot__: here you can send any component or html block to show default data to be visible before search


**css classes**
- wrapperClass;
- inputClass;
- iconClass;
- autocompleteResultsClass;
- autocompleteItemClass;

```
<Autocomplete  
    name='testAuto' 
    placeholder='sho nebud'
   tabindex={1} 
    lookupKeys={['name']} 
    displayKeys={['name']}
   source={[
   {'name': 'qwa'},
   {'name': 'qwaqa'},
   {'name': 'qwaqaqa'}
    ]}
/>

```

