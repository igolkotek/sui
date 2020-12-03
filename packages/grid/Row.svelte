<div class={cn("row",
  {reverse},
  className,
  {[`start-${start}`]: start},
  {[`center-${center}`]: center},
  {[`end-${end}`]: end},
  {[`top-${top}`]: top},
  {[`middle-${middle}`]: middle},
  {[`bottom-${bottom}`]: bottom},
  {[`around-${around}`]: around},
  {[`between-${between}`]: between},
  {[`first-${first}`]: first},
  {[`last-${last}`]: last}
    )}
     style={textAlign ? `text-align:${textAlign}`: null}
>
    <slot/>
</div>

<script>
    import {classnames as cn} from "@sui/utils";

    export {className as class};
    let className = '';
    export let reverse;
    export let start;
    export let center;
    export let end;
    export let top;
    export let middle;
    export let bottom;
    export let around;
    export let between;
    export let first;
    export let last;
    export let textAlign;
</script>
