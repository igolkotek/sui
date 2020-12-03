<div class={cn(
  "container",
  {"container-fluid": fluid},
  className
)}>
    <slot/>
</div>

<script>
    import {classnames as cn} from "@sui/utils";
    export {className as class};
    export let fluid;
    let className = '';
</script>
