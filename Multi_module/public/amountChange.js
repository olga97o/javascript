console.log('amountChange',  Date.now())
import { resultsArr } from "./symbolChange.js";

export let amountVar;
export function amountChange() {
    const chooseBase = document.getElementById('chooseBase');
    amountVar = chooseBase.value;
    const inputs = document.querySelectorAll('input[name="chooseSymbols"]');
    const iterator = resultsArr.values();
    inputs.forEach(val => {
        if (!!amountVar) {
            val.value = amountVar * iterator.next().value;
        } else {
            console.log('Enter base value.')
        }

    })
}