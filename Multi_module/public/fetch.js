console.log('fetch',  Date.now())
export const ACCESS_KEY = "57a22e3912016cc8fc2b123240e068f7";
export const base = document.getElementById('base');
export const symbols = document.getElementById('symbols');
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

