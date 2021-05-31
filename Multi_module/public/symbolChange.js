import { ACCESS_KEY } from "./fetch.js";

export let symbolsVarArr = [];
export let resultsArr = [];
console.log('symbolChange', Date.now())
export function symbolChange() {
    //event.preventDefault();
    const output = document.getElementById('output');
    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const valuesSymbols = new Set();
    checkboxes.forEach(symbol => {
        symbolsVarArr.push(symbol.value);
        valuesSymbols.add(symbol.value);
        symbol.checked = false;
    })
    fetch(`http://localhost:8000/api/v1/latest?access_key=${ACCESS_KEY}&base=EUR&symbols=${symbolsVarArr.join(',')}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            valuesSymbols.forEach(val => {
                const input = document.createElement('input');
                const label = document.createElement('label');
                input.setAttribute('type', 'number');
                input.setAttribute('min', '0.01');
                input.setAttribute('name', 'chooseSymbols');
                input.setAttribute('title', `${val}`);
                input.value = data.rates[input.title];
                resultsArr.push(input.value);
                label.setAttribute('for', 'chooseSymbols');
                label.innerText = val;
                output.append(label);
                output.append(input);
            })
        })
}
