'use strict';
// const bookings=[];
//  const createBooking=function(
//     flightNum, numpassenger,price
//  ){
//     const booking={flightNum,numpassenger,price};
//     console.log(booking);
//  }

//  createBooking(1,5,3);


//  const flight = 'LH234';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 24739479284,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 24739479284) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// const flightNum = flight;
// // const passenger = jonas;

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 100000000000);
// };

// newPassport(jonas);
// checkIn(flight, jonas); 
  

// const lufthansa = {
//   airline: 'Lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   // book: function() {}
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };

// lufthansa.book(239, 'Jonas Schmedtmann');
// lufthansa.book(635, 'John Smith');

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const book = lufthansa.book;

// // Does NOT work
// // book(23, 'Sarah Williams');

// // Call method
// book.call(eurowings, 23, 'Sarah Williams');
// console.log(eurowings);

// book.call(lufthansa, 239, 'Mary Cooper');
// console.log(lufthansa);

// const swiss = {
//   airline: 'Swiss Air Lines',
//   iataCode: 'LX',
//   bookings: [],
// };

// book.call(swiss, 583, 'Mary Cooper');

// // Apply method
// const flightData = [583, 'George Cooper'];
// book.apply(swiss, flightData);
// console.log(swiss);

// book.call(swiss, ...flightData);

// ///////////////////////////////////////
// // The bind Method
// // book.call(eurowings, 23, 'Sarah Williams');

// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, 'Steven Williams');

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23('Jonas Schmedtmann');
// bookEW23('Martha Cooper');


// lufthansa.planes=300;
// lufthansa.buyPlane=function()
// {
//    cons.log(this);
//    this.planes++;
//    console.log(this.planes);

// };
//  document.querySelector('.buy').addEventListener('click',lufthansa.buyPlane.bind(lufthansa));



// const poll={
//   question:'what is your favourite programming language?',
//   options:['0:Javascript', '1:python','2:Rust','3:c++'],
//   answers:new Array(4).fill(0),
//   registerNewAnswer(){
//     const answer=Number(prompt(`${this.question}\n ${this.options.join('\n')}\n (write option number)`));
//     console.log(answer);
//     typeof answer=='number' && answer< this.answers.length && this.answers[answer]++;
//     this.displayResults();
//     this.displayResults('string');

//     console.log(this.answers);
//   },
//   displayResults(type ='array')
//   {
//     if(type === 'array')
//     {
//       console.log(this.answers);
//     }
//     else if(type === 'string')
//     {
//       console.log(`Poll results are ${this.answers.join(',')}`)
//     }
//   }
// };

// // poll.registerNewAnswer();


// document.querySelector('.poll').addEventListener('click',poll.registerNewAnswer.bind(poll));
// poll.displayResults.call({answers:[5,2,3]}, 'string');

// const runOnce =function()
// {
//   console.log('this will never run again');
// }
// runOnce();
// (function(){
//   console.log('this will never run again');
// })();

// (()=>console.log('this will Also never run again'))
// ();


let f;
const g=function(){
  const a=22;
  f=function(){
    console.log(a*2);
  }
}

const h=function()
{
  const b=777;
  f=function()
  {
    console.log(b*2);
  }
}

g();
f();

h();
f();

const boardPassengers=function(n,wait)
{
  const perGroup=n/3;
  setTimeout(function(){
    console.log(`we are Now boarding all ${n} passengers`);
    console.log(`there are 3 groups , each with ${perGroup} passengers `);
  },wait*1000);

};

boardPassengers(180,3);


(function(){
  const header=document.querySelector('h1');
  header.style.color='red';

  document.querySelector('body').addEventListener('click',function(){
    header.style.color='blue';
  });
})();