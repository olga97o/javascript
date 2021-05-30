'use strict';

var symbolsVarArr = [];
var amountVar = void 0;
var resultsArr = [];

function baseChange() {
    var base = document.getElementById('base');
    var baseOutput = document.getElementById('baseOutput');
    baseOutput.innerText = base.value;
    var inputs = document.querySelectorAll('input[name="chooseSymbols"]');
    inputs.forEach(function (el) {
        el.remove();
    });
    var labels = document.querySelectorAll('label[for="chooseSymbols"]');
    labels.forEach(function (el) {
        el.remove();
    });
}

function symbolChange(event) {
    event.preventDefault();

    var output = document.getElementById('output');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var valuesSymbols = new Set();
    checkboxes.forEach(function (symbol) {
        symbolsVarArr.push(symbol.value);
        valuesSymbols.add(symbol.value);
        symbol.checked = false;
    });
    fetch('http://localhost:8000/api/v1/latest?access_key=' + ACCESS_KEY + '&base=EUR&symbols=' + symbolsVarArr.join(',')).then(function (res) {
        return res.json();
    }).then(function (data) {
        console.log(data);
        valuesSymbols.forEach(function (val) {
            var input = document.createElement('input');
            var label = document.createElement('label');
            input.setAttribute('type', 'number');
            input.setAttribute('min', '0.01');
            input.setAttribute('name', 'chooseSymbols');
            input.setAttribute('title', '' + val);
            input.value = data.rates[input.title];
            resultsArr.push(input.value);
            label.setAttribute('for', 'chooseSymbols');
            label.innerText = val;
            output.append(label);
            output.append(input);
        });
    });
}

function amountChange(e) {
    var chooseBase = document.getElementById('chooseBase');
    amountVar = chooseBase.value;
    var inputs = document.querySelectorAll('input[name="chooseSymbols"]');
    var iterator = resultsArr.values();
    inputs.forEach(function (val) {
        if (!!amountVar) {
            val.value = amountVar * iterator.next().value;
        } else {
            console.log('Enter base value.');
        }
    });
}

var ACCESS_KEY = "57a22e3912016cc8fc2b123240e068f7";
var base = document.getElementById('base');
var symbols = document.getElementById('symbols');
fetch('http://localhost:8000/api/v1/symbols?access_key=' + ACCESS_KEY).then(function (res) {
    return res.json();
}).then(function (data) {
    var optionDef = document.createElement('option');
    optionDef.innerText = ' ';
    //optionDef.setAttribute('value', '');
    base.append(optionDef);
    Object.entries(data.symbols).forEach(function (el) {
        var option = document.createElement('option');
        var li = document.createElement('li');
        var input = document.createElement('input');
        var label = document.createElement('label');
        input.type = 'checkbox';
        input.setAttribute('value', '' + el[0]);
        label.innerText = el[0];
        label.setAttribute('title', '' + el[1]);
        option.innerText = el[0] + ' : ' + el[1];
        option.setAttribute('value', '' + el[0]);
        symbols.append(li);
        li.append(input);
        li.append(label);
        base.append(option);
    });
}).catch(function (e) {
    console.log(new Error(e));
});