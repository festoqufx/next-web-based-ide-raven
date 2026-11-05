export const debounced = (fn, delay) => {
    let timeoutId;
    const wrapped = (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
    wrapped.cancel = () => {
        clearTimeout(timeoutId);
    };
    return wrapped;
};