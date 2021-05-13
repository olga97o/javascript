const delay = Math.random() * (5000 - 2000) + 2000;

const str = "1 2 + 3 x 4 +";

const stack = [];

function sum(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a + b);
        }, delay)
    });
}

function sub(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a - b);
        }, delay)
    });
}

function multi(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a * b);
        }, delay)
    });
}

function split(a, b) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(a / b);
        }, delay)
    });
}

const array = str.split(' ');

async function countRes() {
    for (let i = 0; i < array.length; i++) {
        if (stack.length === 2) {
            switch (array[i]) {
                case '+' :
                    const sumRes = await sum(stack.splice(0, 1), stack.splice(1, 1));
                    stack.push(sumRes);
                    break;
                case '-':
                    const subRes = await sub(stack.splice(0, 1), stack.splice(1, 1));
                    stack.push(subRes);
                    break;
                case 'x':
                    const multiRes = await multi(stack.splice(0, 1), stack.splice(1, 1));
                    stack.push(multiRes);
                    break;
                case '/':
                    const splitRes = await split(stack.splice(0, 1), stack.splice(1, 1));
                    stack.push(splitRes);
                    break;
                default:
                    stack.push(array[i])
            }
        } else {
            stack.push(array[i]);
        }

    }

    return stack[0];
}

countRes().then(v => console.log(v));

