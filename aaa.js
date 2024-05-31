function createIncrement(incBy) {
  let value = 0;

  function increment() {
    value += incBy;
    console.log(value);
  }
  const message = `the value is ${value}`;
  function log() {
    console.log(message);
  }
  return [increment, log];
}

const [increment, log] = createIncrement(1);

increment(); // 1
increment(); // 2
increment(); // 3

log(); // the value is 0

// ====================================================

Promise.reject('a')
  .then((s) => s + 'b')
  .catch((s) => s + 'c')
  .catch((s) => s + 'd')
  .finally((s) => s + 'e')
  .then((s) => s + 'f')
  .then((s) => console.log(s + 'g'))
  .catch((s) => console.log(s + 'h')); // acfg

// =====================================================

function foo() {
  const x = 10;

  return {
    x: 20,

    bar: () => {
      console.log('bar', this.x);
    },

    baz: function () {
      console.log('baz', this.x);
    },
  };
}

const obj1 = foo();
obj1.bar(); // TypeError: Cannot read properties of undefined (reading 'x')
// bar стрелочная, не имеет контекста, обращается к контексту foo, у нее глобальный объект, так как без call и apply, который в use strict = undefined
obj1.baz(); // 20
// baz обычная функция, обращается к контексту obj1

const obj2 = foo.call({ x: 30 });
console.log(obj2); // { x: 20, bar: [Function: bar], baz: [Function: baz] }
// хоть и call, x внутри foo устанавливается в 20

let y = obj2.bar;
let x = obj2.baz;

y(); // 30
//
x(); // TypeError: Cannot read properties of undefined (reading 'x')
//

obj2.bar(); // 30
obj2.baz(); // 20

// ========================================================

let a = a + 1;
console.log(a); // ReferenceError: Cannot access 'a' before initialization потому что let

// ========================================================

var a = a + 1;
console.log(a); // NaN

// ========================================================

Promise.reject('a')
  .then(
    (p) => p + '1',
    (p) => p + '2',
  )
  .catch((p) => p + 'b')
  .catch((p) => p + 'c')
  .then((p) => p + 'd1')
  .then('d2')
  .then((p) => p + 'd3')
  .finally((p) => p + 'e')
  .then((p) => console.log(p)); // a2d1d3

// ========================================================

Promise.reject('a')
  .catch((p) => p + 'b')
  .catch((p) => p + 'c')
  .then((p) => p + 'd')
  .finally((p) => p + 'e')
  .then((p) => console.log(p)); // abd

// ========================================================

Promise.resolve(1)
  .then(() => {
    console.log(2);
  })
  .then(console.log(3))
  .then(() => {
    console.log(4);
  }); // 3 2 4

// ========================================================

console.log(1);

setTimeout(() => {
  console.log(2);
});

Promise.resolve().then(() => {
  console.log(3);
});

Promise.resolve().then(() => {
  setTimeout(() => {
    console.log(4);
  });
});

Promise.resolve().then(() => {
  console.log(5);
});

setTimeout(() => {
  console.log(6);
});

console.log(7);

// 1 7 3 5 2 6 4

// ========================================================

let a = 5;
console.log(a++); // 5
console.log(++a); // 7

// ========================================================

console.log(1);
setTimeout(() => console.log(2));
Promise.reject(3).catch(console.log);
new Promise((resolve) => setTimeout(resolve)).then(() => console.log(4));
Promise.resolve(5).then(console.log);
console.log(6);
setTimeout(() => console.log(7), 0);

// 1 6 3 5 2 4 7

// ========================================================

const myPromise = (delay) =>
  new Promise((res, rej) => {
    setTimeout(res, delay);
  });
setTimeout(() => console.log('in setTimeout1'), 1000); // 2
myPromise(1000).then((res) => console.log('in Promise 1')); // 3
setTimeout(() => console.log('in setTimeout2'), 100); // 1
myPromise(2000).then((res) => console.log('in Promise 2')); // 6
setTimeout(() => console.log('in setTimeout3'), 2000); // 7
myPromise(1000).then((res) => console.log('in Promise 3')); // 4
setTimeout(() => console.log('in setTimeout4'), 1000); // 5
myPromise(5000).then((res) => console.log('in Promise ')); // 8

// ========================================================

// todo Объяснить код, рассказать какие консоли и в какой последовательности будут, а затем предложить более оптимальное решение
function resolveAfter2Seconds(x) {
  console.log('Какой Х пришёл -> ' + x);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x); //
    }, 5000);
  });
}
async function add1(x) {
  console.log('add1 Hello');
  const a = await resolveAfter2Seconds(20);
  const b = await resolveAfter2Seconds(30);
  console.log('add1 Bye');
  return x + a + b;
}
add1(10).then(console.log);
