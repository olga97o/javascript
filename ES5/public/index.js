let symbolsVarArr = [];
let amountVar;
let resultsArr = [];

function baseChange() {
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

function symbolChange(event) {
    event.preventDefault();

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

function amountChange(e) {
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

const ACCESS_KEY = "57a22e3912016cc8fc2b123240e068f7";
const base = document.getElementById('base');
const symbols = document.getElementById('symbols');
fetch(`http://localhost:8000/api/v1/symbols?access_key=${ACCESS_KEY}`)
    .then(res => {
        return res.json()
    })
    .then(data => {
        const optionDef = document.createElement('option');
        optionDef.innerText = ' ';
        //optionDef.setAttribute('value', '');
        base.append(optionDef);
        Object.entries(data.symbols).forEach(el => {
            const option = document.createElement('option');
            const li = document.createElement('li');
            const input = document.createElement('input');
            const label = document.createElement('label');
            input.type = 'checkbox';
            input.setAttribute('value', `${el[0]}`);
            label.innerText = el[0];
            label.setAttribute('title', `${el[1]}`);
            option.innerText = el[0] + ' : ' + el[1];
            option.setAttribute('value', `${el[0]}`)
            symbols.append(li);
            li.append(input);
            li.append(label);
            base.append(option);
        });
    })
    .catch(e => {
        console.log(new Error(e))
    })