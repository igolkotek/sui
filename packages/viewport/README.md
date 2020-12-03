### Viewport usage

--at the top level file App.svelte
`import {Viewport, viewportStore} from "@sui/viewport";`

viewportStore monitors the following variables:
width, height, isMobile

Set mobileWidth of the layout
`<Viewport mobileWidth={900}/>`

`<h3 class:active={$viewportStore.isMobile}>x: {$viewportStore.width}, y: {$viewportStore.height}, is
     mobile?: {$viewportStore.isMobile} </h3>`