'use strict';
// const person =function(firstName, birthYear)
// {
//     this.firstName=firstName;
//     this.birthYear=birthYear;
// }

// const alpha=new person('Alpha',2005);
// console.log(alpha);
// console.log(alpha instanceof person);

// console.log(person.prototype);

// person.prototype.calcAge=function()
// {
//     console.log(2025-this.birthYear);
// };

// alpha.calcAge();
// console.log(alpha.__proto__);
// console.log(person.prototype.isPrototypeOf(alpha));

// console.log(alpha.hasOwnProperty('firstName'));
// console.log(alpha.__proto__.__proto__);

// const arr=[3,5,8,9,3,560];
// console.log(arr.__proto__);
// console.log(arr.__proto__.__proto__);


class personCl{
    constructor(firstName, birthYear)
    {
        this.birthYear=birthYear;
        this.firstName=firstName;
    }
    calcAge()
    {
        console.log(2025-this.birthYear);
    }
}
const Alpha=new personCl('Alpha',2005);
console.log(Alpha);
Alpha.calcAge();
console.log(Alpha.__Proto__);


const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);