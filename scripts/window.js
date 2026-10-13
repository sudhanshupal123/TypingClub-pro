export function disableCopy() {
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
    })
};
disableCopy();