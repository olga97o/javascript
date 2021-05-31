function saveData(event) {
    //event.preventDefault();
    let output = document.getElementById('output');
    let username = document.getElementById('username');
    let theme = document.getElementById('theme');
    sessionStorage.setItem('username', `${username.value}`);
    sessionStorage.setItem('theme', `${theme.value}`);
    output.remove();
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let body = document.getElementsByTagName('body')[0];
    console.log(sessionStorage);
    p1.innerText = `Hi, ${sessionStorage.getItem('username')}!`;
    console.log(p1.innerText);
    body.className = sessionStorage.getItem('theme');
    p2.innerText = `You choose ${sessionStorage.getItem('theme')} theme.`;
    console.log(p2.innerText);
    body.append(p1);
    body.append(p2);
}