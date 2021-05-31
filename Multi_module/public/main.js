let base = document.getElementById('base');
let btn = document.getElementById('btn');
let chooseBase = document.getElementById('chooseBase');

import * as fetchModule from './fetch.js';

btn.addEventListener('click', event => {
    import ('./symbolChange.js')
        .then(module => {
            //event.preventDefault();
            module.symbolChange(event);
        });
});


chooseBase.addEventListener('change', () => {
    import ('./amountChange.js')
        .then(module => {
            module.amountChange();
        });
});

base.addEventListener('change', () => {
    import ('./baseChange.js')
        .then(module => {
            module.baseChange();
        });
});
