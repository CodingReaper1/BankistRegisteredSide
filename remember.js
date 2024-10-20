'use strict'; // Always write this at start of code prevents bugs from happening

//////////////////////////////////////////////////////////
// Valuable information

// If you want to add/remove css by javascript using html classes is good option

// Most variables defined in function will only be avalable in same function

// Const and let are block-scoped

// Var is function-scoped

// Arrow functions "this" uses outside scope's "this"

// "this" in normal functions points to undefined

// "this" on event handler will always point to selected DOM element

// Primitives: Number, String, Boolean, Undefined, Null, Symbol, Bigint

// Objects/Reference: Object literal, Arrays, Functions, Many more...

// Even if we use const on object we can still change it becouse value is not changed in call stack, but change happens in heap

// Iterables: arrays, strings, maps, sets. NOT objects

// We can only use spread when building an array or when we pass argument in function

// JSON is data format which is coming from web APIs, which can be easily converted into javascript objects

// We should use maps as data structure when we need something other than strings as keys of maps

// Destructuring can be rly strong :)

// FIRST-CLASS FUNCTIONS(are simply values) are just concept which makes possible HIGHER-ORDER FUNCTIONS in practise

// Closure is connection between innerfunction and outerfunction even after outerfunction has finished executing CLOSURES also have priority over scope chain

// in console something shown in [[]] (example: [[Scopes]]) we cant access them by code

// Higher-order function requires call-back function in order to use it

// When in html form is btn when adding event listner it reloades page so use .preventDefault()

//////////////////////////////////////////////////////////
// Functions

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

const greet = () => console.log('Hey Giorgi'); // Callback function
btnClose.addEventListener('click', greet); // Higher-order function

const greet2 = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet2('Hey');

greeterHey('Jonas');
greeterHey('Giorgi');

greet2('Hello')('Giorgi');

const greet3 = greeting => name => console.log(`${greeting} ${name}`);

book.call(eurowings, 23, 'Sarah Williams'); // First argument points to what "this" keyword should be
book.apply(swiss, flightData); // Similar like .call but second argument must be array of data (always use .call anyways (we can use spread operator))
const bookEW = book.bind(eurowings); // Sets "this" keyword to eurowings, first is to what we want to set this keyword to and second what should we pass as argument(maybe in function)
bookEW(23, 'Steven Williams');
const bookEW23 = book.bind(eurowings, 23); // Partial application, so we can preset parameters

(function () {
  console.log(`This will never run again`);
})(); // Function which will be executed only once

(() => console.log(`This will also never run again`))();

//////////////////////////////////////////////////////////

debugger; // Stops javascript and opens debugger in console
console.dir(booker); // To see closures
prompt(); // Popup window which returns string
alert();
const guestCorrect = restaurant.numGuests ?? 10; // If restaurants.numGuests===0 variable will be 0. Nullish coalesing operator works on Nullish: null and undefined
rest1.numGuests ||= 10; // === rest1.numGuests = rest1.numGuests || 10;
rest1.numGuests ??= 10;
rest1.owner &&= '<ANNONYMOUS>'; // === rest2.owner = rest2.owner && '<ANNONYMOUS>';
(answer === 0 || answer) && this.answers[answer]++; // Maybe be usefull as ??s && version
e.preventDefault(); // To prevent default
inputLoginPin.blur(); // Input field to lose focus

// Toggle example
let sorted = false;
sorted = !sorted; // add this to click event

let g = 10; // g++ returns 10 however g =11 so we have to use ++g which returns 11

//////////////////////////////////////////////////////////
// For Arrays

const friends = ['Michael', 'Steven', 'Peter'];
friends.push('Jay'); // Adds element at the end
friends.unshift('John'); // Adds element at the start
friends.length; // To get length of array
// all 3 of them returns length of array
console.log(...friends); // Logs whole array but inside of it, we can only use it in places where we would otherwise write values seperated by comas
friends[friends.length] = 'someone'; // Adds at the end
const ar3 = array1.concat(array2); // To merge 2 arrays

friends.pop(); // Removes last in array
friends.shift(); // Removes first in array
// Returns value of removed element

friends.indexOf('Steven'); // Finds index of element in array
friends.includes('Steven'); // Checks if element is in array

const [x, y, z] = arr; // Array destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;

const arr = [1, 2, ...[3, 4]]; // SPREAD,becouse on RIGHT side of =

const [a, b, ...others] = [1, 2, 3, 4, 5]; // REST, becouse on LEFT side of =

const [players1, players2] = game.players;
const [gk1, ...fieldPlayers1] = players1;
const [gk2, ...fieldPlayers2] = players2;
const allPlayers = [...players1, ...players2];
const players1Finals = [...players1, 'Thiago', 'Countinho', 'Perisic'];

console.log(users[0]?.name ?? 'Users array empty'); // Checks if array is empty

console.log(arr.slice(2, 4)); // Doesnt mutate original array and returns new array and not includes
console.log(arr.slice()); // Shallow copy
console.log([...arr]); // Shallow copy
console.log(arr.splice(2)); // MUTATES ARRAY and does alot
console.log(arr2.reverse()); // MUTATES ARRAY
const letters = arr.concat(arr2);
console.log([...arr, ...arr2]);
console.log(letters.join(' - '));
console.log(arr.at(0)); // Same as console.log(arr[0]);
console.log(arr[arr.length - 1]); // Get last element
console.log(arr.at(-1)); // Get last element

movements.forEach(function (movement, index, array) {}); // Recieves current element as argument(movement),index and whole array. doesnt have continue/break

const movementsUSD = movements.map(function (mov) {}); // Just like .forEach method but returns new array(not mutates original)

// Functions should recieve data instead of using global variable to get data

const deposits = movements.filter(function (mov) {
  return mov > 0;
}); // filters out new array

const balance = movements.reduce((acc, cur, i, arr) => (acc += cur), 0); // First argument is accumulator = "sum" , reduces second parameter is where to start counting from OP OP OP

const maxValue = movements.reduce(
  (acc, mov) => (mov > acc ? (acc = mov) : acc),
  movements[0]
);

const firstWithdrawal = movements.find(mov => mov < 0); // Returns first elemnt of array which satisfys condition

const index = accounts.findIndex(acc => acc.owner === currentAccount.owner);

const anyDeposits = movements.some(mov => mov > 0); // (ANY) if theres any value which satisfys condition it returns true(or false)

console.log(movements.every(mov => mov > 0)); // Returns true if all satisfy codition

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8].flat(2); // unnests array takes as argument how deep should unnesting be

const overalBalance2 = accounts.flatMap(acc => acc.movements); // map+flat but only goes one lvl deep in nest

console.log(owners.sort()); // Sorts alphabetally and MUTATES ARRAY WORKS ONLY ARRAY WITH STRINGS

movements.sort((a, b) => a - b); // SORTING WORKING FOR NUMBERS ARRAY

x.fill(1, 3, 5); // First parameter with what to be filled two and thrid from which possition to where

const d = Array.from({ length: 7 }, (cur, i) => i + 1); // Array constructure, Array here is function and on that we call .from() method

const movmentsUI = Array.from(
  document.querySelectorAll('.movements__value')
).map(el => Number(el.textContent.replace('€', ''))); // Turining dom elements into nodelist ,array and getting textcontent at the en

//////////////////////////////////////////////////////////
// For Objects. Properties/keys with their values. Order doesnt matter which is different from arrays.

const giorgi = {
  firstName: 'Giorga',
  lastName: 'Gamgebeli',
  birthYear: 2005,
  job: 'programmer',
  friends: ['Michael', 'Steven', 'Peter'],

  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  }, // this gets same object in which method is in and also to be able to use age as property first you need to call the method
};

const { name, openingHours, categories } = restaurant; // Destructuring objects

const {
  fri: { open: o, close: c },
} = openingHours; // Destructuring nested object

const { menu = [], starterMenu: starter = [] } = restaurant; // Default values

({ a, b } = obj); // Mutating variables

const jessicaCopy = Object.assign({}, jessica2); // Only creates shallow copy and not deep clone
const restaurantCopy = { ...restaurant }; // Shallow copy

console.log(giorgi.lastName); // Only real properties
console.log(giorgi['lastName']); // Can wrie any expresion

giorgi.location = 'Tbilisi'; // To add property and value
giorgi['discord'] = 'Reaper'; // To add property and value

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); // Checks if restaurant.order exists
console.log(restaurant.openingHours?.mon?.open); // Checks if restaurant.opening hours and restaurant.openinghours.mon exists

// property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours); // Converts object into Iterable
console.log(entries);
console.log(entries[0][0]);

// [key, value]
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// If we want index
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// If we want key and value
for (const [key, val] of Object.entries(game.odds)) {
  console.log(`Odd of victory ${game[key] ?? 'Draw'}: ${val}`);
}

//////////////////////////////////////////////////////////
// Sets

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Rissotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet.size);
console.log(ordersSet.has('Pizza')); // Methods
ordersSet.add('Garlic Bread');
ordersSet.delete('Rissotto');
ordersSet.clear();
currenciesUnique.forEach(function (value, key, map) {});

//////////////////////////////////////////////////////////
// MAPS similar like objects but keys can be anything (number, boolean) also after updating it returns new map value

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.has('categories'));
rest.delete(2);
console.log(rest.size);
rest.clear();

const arra = [1, 2];
rest.set(arr, 'Test');

console.log(rest.get(arr));

rest.set(document.querySelector('h1'), 'Heading');

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]); // Is very similar to Object.entries(obj)
const hoursMap = new Map(Object.entries(openingHours)); // Creating map by object
console.log([...question]); // Converting back to object but to question.entries()
console.log(question.keys());
console.log(question.values());
currencies.forEach(function (value, _, map) {});

//////////////////////////////////////////////////////////
// For loop keeps running while condition 2 is TRUE

// const giorga = [
//   "Giorga",
//   "Gamgebeli",
//   2037 - 2005,
//   "programmer",
//   ["Michael", "Steven", "Peter"],
//   true,
// ];
// const types = [];

for (let i = 0; i < giorga.length; i++) {
  console.log(giorga[i], typeof giorga[i]);

  types.push(typeof giorga[i]);
  // types[types.length] = typeof giorga[i];
  // types[i] = typeof giorga[i];
}
for (let i = 0; i < giorga.length; i++) {
  if (typeof giorga[i] !== 'string') continue;
  // "continue" If condition is true cycle will be skipped
  // if (typeof giorga[i] === "number") break;
  // "break" if codition is true stops loop

  console.log(giorga[i], typeof giorga[i]);
}

for (const item of menu) console.log(item); // for of loop

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
} // Prints index with its element

//////////////////////////////////////////////////////////
// While loops

let rep = 1;
while (rep <= 10) {
  console.log(`Lifting weights repetition ${rep}`);
  rep++;
}

//////////////////////////////////////////////////////////
// Dom manipulation starter

document.querySelector('.message'); // Selecting html element
document.querySelector('.message').textContent; // Text
document.querySelector('.guess').value; // Other than text
document.querySelector('.check').addEventListener('click', function () {});
document.querySelector('body').style.backgroundColor = 'green';
modal.classList.remove('hidden');
modal.classList.add('hidden');
modal.classList.contains('hidden');
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
section1.classList.toggle('player--active'); // Removes class if its there, adds class if not

containerMovements.insertAdjacentHTML('afterbegin', html); // insert html

containerMovements.innerHTML = ''; // Like text.content but returns html elements

//////////////////////////////////////////////////////////
// Math

secretNumber = Math.trunc(Math.random() * 20) + 1;
Math.abs(movement); // Removes -

//////////////////////////////////////////////////////////
// STRINGS

console.log('B737'[0]);
console.log('B737'.length);
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));
console.log(airline.slice(4)); // Substring returns new string
console.log(airline.slice(4, 7)); // Excluding 4, including 7
airline.slice(-1); // Gets last one
airline.toLowerCase();
airline.toUpperCase();
lowerEmail.trim(); // Removes whitespace
// trim start, trim end exist -_-
priceGB.replace('#', '$').replace(',', '.');
announcement.replaceAll('door', 'gate');
announcement.replace(/door/g, 'gate');
plane.includes('A320');
plane.startsWith('Air');
plane.endsWith('neo');
console.log('a+very+nice+string'.split('+')); // Creates array of words divided by +
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log(message2.repeat(5));
