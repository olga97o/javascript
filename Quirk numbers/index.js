const delay = Math.random() * (5000 - 2000) + 2000;

const str = "1 2 + 3 x 4 +";

const stack = [];

function sum(arr) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(+arr[0] + +arr[1]);
        }, delay)
    });
}

function sub(arr) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(arr[0] - arr[1]);
        }, delay)
    });
}

function multi(arr) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(arr[0] * arr[1]);
        }, delay)
    });
}

function split(arr) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(arr[0] / arr[1]);
        }, delay)
    });
}

const array = str.split(' ');

async function countRes() {
    for (let i = 0; i < array.length; i++) {
        switch (array[i]) {
            case '+':
                const sumRes = await sum(stack.splice(0, 2));
                stack.push(sumRes);
                break;
            case '-':
                const subRes = await sub(stack.splice(0, 2));
                stack.push(subRes);
                break;
            case 'x':
                const multiRes = await multi(stack.splice(0, 2));
                stack.push(multiRes);
                break;
            case '/':
                const splitRes = await split(stack.splice(0, 2));
                stack.push(splitRes);
                break;
            default:
                stack.push(array[i])
        }
    }

    return stack[0];
}

countRes().then(v => console.log(v));