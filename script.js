'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__value">${mov}€</div>
</div>
`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => (acc += mov), 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements.filter(mov => mov < 0)[0]
    ? acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov)
    : 0;

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summaryyyy
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from subbmiting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welocme back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update ui
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // Doint the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // const foundAcc = accounts.filter(acc => acc.owner === currentAccount.owner);

  if (
    currentAccount.pin === Number(inputClosePin.value) &&
    currentAccount.username === inputCloseUsername.value
  ) {
    const index = accounts.findIndex(acc => acc.owner === currentAccount.owner);

    // console.log(...accounts.splice(accounts.indexOf(...foundAcc), 1));

    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    inputClosePin.value = inputCloseUsername.value = '';
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));
console.log(arr.slice());
console.log([...arr]);

//  SPLICE
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));
*/
/////////////////////////////////////////////////////////////
/*
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('Giorga'.at(-1));
*/
/////////////////////////////////////////////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log(`------------FOREACH-----------`);
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
*/
/////////////////////////////////////////////////////////////
// MAP
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/
/////////////////////////////////////////////////////////////
/*
const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];

// const julia = [9, 16, 6, 8, 3];
// const kate = [10, 5, 6, 1, 4];

const checkDogs = function (juliaDogs, kateDogs) {
  [...juliaDogs.slice(1, 3), ...kateDogs].forEach(function (dog, index) {
    const checker = dog >= 3 ? 'adult' : 'puppy';
    console.log(
      `Dog number ${index} is an ${checker}, and is ${dog} years old.`
    );
  });
};
checkDogs(julia, kate);
*/
/////////////////////////////////////////////////////////////
/*
const euroToUsd = 1.1;

const movementsUSD = movements.map(mov => mov * euroToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * euroToUsd);
}
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
*/
/////////////////////////////////////////////////////////////
/*
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/
/////////////////////////////////////////////////////////////
/*
console.log(movements);

// accumulator -> SNOWBALL
const balance = movements.reduce((acc, cur) => (acc += cur), 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

// Maximum value
const maxValue = movements.reduce(
  (acc, mov) => (mov > acc ? (acc = mov) : acc),
  movements[0]
);
console.log(maxValue);
*/
/////////////////////////////////////////////////////////////
/*
const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
    .filter(humAge => humAge >= 18)
    .reduce((acc, hAge, i, arr) => acc + hAge / arr.length, 0);
  console.log(humanAge);
};
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/
/////////////////////////////////////////////////////////////
/*
const euroToUsd = 1.1;

//  PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
*/
/////////////////////////////////////////////////////////////
/*
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

for (const account of accounts) {
  account.owner === 'Jessica Davis' && console.log(account);
}
*/
/////////////////////////////////////////////////////////////
/*
console.log(movements);
console.log(movements.includes(-130));

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Seperate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/
/////////////////////////////////////////////////////////////
/*
const arr = [[1, 2, 3], [(4, 5, 6)], 7, 8].flat();
console.log(arr);

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8].flat(2);
console.log(arrDeep);

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);
*/
/////////////////////////////////////////////////////////////
/*
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
// movements.sort((a, b) => {
//   console.log(a, b);
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// movements.sort((a, b) => {

//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
*/
/////////////////////////////////////////////////////////////
/*
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill methods
const x = new Array(7);
console.log(x);
// x.fill(2, 3);
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);
// const dices = Array.from(
//   { length: 100 },
//   (cur, i) => Math.trunc(Math.random() * 6) + 1
// );
// console.log(dices);

labelBalance.addEventListener('click', function () {
  const movmentsUI = Array.from(
    document.querySelectorAll('.movements__value')
  ).map(el => Number(el.textContent.replace('€', '')));

  console.log(movmentsUI);

  const movmentsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movmentsUI2[0]);
});
*/
/////////////////////////////////////////////////////////////
/*
const backDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(backDepositSum);

// 2.
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur, i, arr) => (cur >= 1000 ? ++acc : acc), 0);

console.log(numDeposits1000);

let a = 10;
console.log(a++);
console.log(a);

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalizie = str => str[0].toUpperCase() + word.slice(1);

  const exceptions = [
    'a',
    'an',
    'and',
    'the',
    'but',
    'or',
    'on',
    'on',
    'in',
    'with',
  ];

  const titleCase = title
    .toLocaleLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalizie(word)))
    .join(' ');
  return capitalizie(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/
/////////////////////////////////////////////////////////////
/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are 
eating too much or too little.
Eating too much means the dog's current food portion is larger than the 
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% 
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate 
the recommended food portion and add it to the object as a new property. Do 
not create a new array, simply loop over the array. Forumla: 
recommendedFood = weight ** 0.75 * 28. (The result is in grams of 
food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too 
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in 
the owners array, and so this one is a bit tricky (on purpose) �

3. Create an array containing all owners of dogs who eat too much 
('ownersEatTooMuch') and an array with all owners of dogs who eat too little 
('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and 
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat 
too little!"

5. Log to the console whether there is any dog eating exactly the amount of food 
that is recommended (just true or false)

6. Log to the console whether there is any dog eating an okay amount of food 
(just true or false)

7. Create an array containing the dogs that are eating an okay amount of food (try 
to reuse the condition used in 6.)

8. Create a shallow copy of the 'dogs' array and sort it by recommended food 
portion in an ascending order (keep in mind that the portions are inside the 
array's objects �)

The Complete JavaScript Course 26

GOOD LUCK 
*/
// 1.

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => (dog.recommendedFood = (dog.weight ** 0.75 * 28) / 1000));
// 2.

const findDog = function (ownerName) {
  const obj = dogs.find(obj => obj.owners.includes(ownerName));

  const rec = obj.owners.includes(ownerName) && obj.recommendedFood;
  const cur = obj.owners.includes(ownerName) && obj.curFood / 1000;

  if (rec * 1.1 > cur && rec * 0.9 < cur) {
    // Eats fine
    // return `${ownerName}'s dog is eating okay amount`;
  } else if (rec * 1.1 < cur) {
    // Eats too much
    return `${ownerName}'s dog is eating a lot!!!`;
  } else if (rec * 0.9 > cur) {
    // Eats too little
    return `${ownerName}'s dog is not eating at all!!!`;
  } else {
    console.log(`PIZDEEEEEEEEEEEEEEEEEEEEEEEEEEEEC`);
  }
};
console.log(findDog('Sarah'));

// 4.
const [ownersEatTooMuch, ownersEatTooLittle] = dogs.reduce(
  (acc, obj) => {
    for (const name of obj.owners) {
      if (obj.recommendedFood * 1.1 < obj.curFood / 1000) acc[0].push(name);
      if (obj.recommendedFood * 0.9 > obj.curFood / 1000) acc[1].push(name);
    }
    return acc;
  },
  [[], []]
);
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!!!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!!!`);

console.log(ownersEatTooMuch, ownersEatTooLittle);

// 5.
const eatingExact = dogs.some(obj => obj.curFood === obj.recommendedFood);
console.log(eatingExact);

// 6.
const eatingOkAmount = dogs.some(
  obj =>
    obj.recommendedFood * 1.1 > obj.curFood / 1000 &&
    obj.recommendedFood * 0.9 < obj.curFood / 1000
);
console.log(eatingOkAmount);

// 7.
const dogsEatingOkAmount = dogs.reduce((acc, obj) => {
  obj.recommendedFood * 1.1 > obj.curFood / 1000 &&
    obj.recommendedFood * 0.9 < obj.curFood / 1000 &&
    acc.push(obj.owners);
  return acc.flat();
}, []);
console.log(dogsEatingOkAmount);

// 8.
const shallowCopySorted = dogs
  .slice()
  .reduce((acc, obj) => {
    acc.push(obj.recommendedFood);
    return acc;
  }, [])
  .sort((a, b) => a - b);
console.log(shallowCopySorted);
