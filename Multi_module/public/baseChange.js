console.log('baseChange', Date.now())
export function baseChange() {
    const base = document.getElementById('base');
    const baseOutput = document.getElementById('baseOutput');
    baseOutput.innerText = base.value;
    const inputs = document.querySelectorAll('input[name="chooseSymbols"]');
    inputs.forEach(el => {
        el.remove();
    })
    const labels = document.querySelectorAll('label[for="chooseSymbols"]');
    labels.forEach(el => {
        el.remove();
    })
}
