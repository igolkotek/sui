<div class={cn(
                className,
                {'col reverse': reverse},
                {[`col-xs-${xs}`]: xs && ((typeof xs) !== 'boolean')},
                {'col-xs': xs && ((typeof xs) === 'boolean')},
                {[`col-xs-${xsOffset}`]: xsOffset},
                {[`col-sm-${sm}`]: sm && ((typeof sm) !== 'boolean')},
                {'col-sm': sm && ((typeof sm) === 'boolean')},
                {[`col-sm-${smOffset}`]: smOffset},
                {[`col-md-${md}`]: md && ((typeof md) !== 'boolean')},
                {'col-md': md && ((typeof md) === 'boolean')},
                {[`col-md-${mdOffset}`]: mdOffset},
                {[`col-lg-${lg}`]: lg && ((typeof lg) !== 'boolean')},
                {'col-lg': lg && ((typeof lg) === 'boolean')},
                {[`col-lg-${lgOffset}`]: lgOffset},
            )
        }
>
    <slot/>
</div>


<script>
    import {classnames as cn} from "@sui/utils";

    export {className as class};
    let className;

    export let reverse;
    export let xs;
    export let xsOffset;
    export let sm;
    export let smOffset;
    export let md;
    export let mdOffset;
    export let lg;
    export let lgOffset;
</script>
