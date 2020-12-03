let hasOwn = {}.hasOwnProperty;

export default function classNames () {
    const classes = [];

    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i];
        if (!arg) continue;

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(this && this[arg] || arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(this, arg));
        } else if (argType === 'object') {
            for (let key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(this && this[key] || key);
                }
            }
        }
    }

    return classes.join(' ');
}