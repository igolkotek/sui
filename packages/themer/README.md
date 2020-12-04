### Themer usage

Themer is a simple storage of selected, default + list of all available themes + changer function.

**Usage case:**
**_themes.scss file MUST be present in the _visible scss directory_**

themes.scss file format:

```@import "../../settings/settings";

:global(html) {
  --bg1: #{$bgColor};
  --color1: #{$color};
}
:global(html[data-theme="dark"]) {
  --bg1: #{$secondaryColorLight};
  --color1:#{$colorPrim};
}
:global(html[data-theme="pastel"]) {
  --bg1: #{$primaryColorDark};
  --color1:#{$grayColorLight};
}
```
The 1st theme is default one and has no [data-theme]

**App.svelte**
```
import {ThemeChanger} from sui_themer;

```
