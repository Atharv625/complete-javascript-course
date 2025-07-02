'use strict';

const { doc } = require("firebase/firestore/lite");
const { textarea } = require("framer-motion/client");

// Data needed for a later exercise
// const flights =
//   '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function(starterIndex, mainIndex)
  {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery:function({starterIndex,mainIndex,time,address})
  {
    console.log(`order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

restaurant.orderDelivery({
  time:'22:30',
  address:'shelapur',
  mainIndex:2,
  starterIndex:2,
})

const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: ['computer science', 'programming', 'algorithms', 'data structures', 'java', 'math', 'software', 'engineering'],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13
      }
    },
    highlighted: true
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: ['Harold Abelson', 'Gerald Jay Sussman', 'Julie Sussman (Contributor)'],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: ['computer science', 'programming', 'javascript', 'software', 'engineering'],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0
      }
    },
    highlighted: true
  },
  {
    title: 'Computer Systems: A Programmer\'s Perspective',
    author: ['Randal E. Bryant', 'David Richard O\'Hallaron'],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: ['computer science', 'computer systems', 'programming', 'software', 'C', 'engineering'],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16
      }
    },
    highlighted: true
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: ['computer science', 'operating systems', 'programming', 'software', 'C', 'Java', 'engineering'],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65
      }
    }
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6
      }
    },
    highlighted: true
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090
      }
    }
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: ['computer science', 'compilers', 'engineering', 'interpreters', 'software', 'engineering'],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0
      }
    }
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808
      }
    },
    highlighted: true
  }
];


const {name , openingHours, categories}=restaurant;
console.log(name, openingHours, categories);


const {name:restaurantname, 
  openingHours:hours,
  categories:tags,
}=restaurant;
console.log(restaurantname,hours,tags);

// const{menu =[], starterMenu:starters=[]}=restaurant;
// console.log(menu, starters);


// let a=111;
// let b=999;
// const obj={a:23,b:7,c:14};
// ({a,b}=obj);

// console.log(a,b);



// const arr=[7,8,9];
// const badNewsArr=[1,2,arr[0],arr[1]];

// console.log(badNewsArr)

// const newArr=[1,2,3,...arr];
// console.log(newArr);
// console.log(...newArr); 


// const str ='Atharv';
// const letters=[...str,' ','S.'];
// console.log(letters)

// const str1 = 'Atharv';
// const letters1 = { ...str };
// console.log(letters1); 



// const add = function(...numbers)
// {
//   let sum=0;
//   for(let i=0;i<numbers.length;i++)
//   {
//     sum+=numbers[i];
    
//   }
//   console.log(sum);
// }

// add(2,3);
// add(5,2,8,5,6,4);
// const x=[23,58,95,77];
// add(...x);

// console.log(3 || "Alpha");

// // And
// console.log(3 && "Alpha");



// const rest1={
//   name:'capri',
//   numGuest:20,
// };

// const rest2={
//   name:'la piazza',
//   owner:'Alpha',
// }

// rest1.numGuest=rest1.numGuest|| 10;
// rest2.numGuest=rest2.numGuest||10;
// console.log(rest1);
// console.log(rest2);



const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};


const [players1, players2]=game.players;
console.log(players1, players2);

const [gk, ...fieldPlayers]=players1;
const allPlayers=[...players1,...players2];
console.log(allPlayers);

const players1Final=[...players1,'thiago','alpha'];


const {odds:{team1,x:draw,team2}}=game;
console.log(team1,draw,team2);

const printGoals=function(...players){
  console.log(`${players.length} goals were scored `);
};

// printGoals('alpha','sigma','Giga');
printGoals(...game.scored);

team1<team2 && console.log("Team1 is more likely to win");
team1>team2 && console.log("Team2 is more likely to win");


for(const day of Object.keys(openingHours))
{
  console.log(day)
}
const properties=Object.keys(openingHours);
console.log(properties);


console.log(`we are open on ${properties.length} DAYS`)

const values=Object.values(openingHours)
console.log(values)

const entries =Object.entries(openingHours)

for(const [key,{open,close}] of entries)
{
  console.log(`on ${key} we open at ${open} and close at ${close}`);
}

// set
const orderSet=new Set(['Alpha','sigma','Giga','chad']);
console.log(orderSet);
console.log(orderSet.size);
console.log(orderSet.has('Alpha'));
orderSet.delete('Alpha');
console.log(orderSet.has('Alpha'));
orderSet.add("Pizza");
// orderSet.clear();
for(const order of orderSet)
  console.log(order);   
console.log(orderSet);

const rest=new Map();
rest.set("name", "classico italiano");
rest.set(1,"Firenze, italy");
rest.set(rest.set(2,"lisbon , portugal"));
console.log(rest);

const question =new Map([['question', 'what is the best programming language in the world?'], [1,'c'],[2,"Python"]]);
console.log(question);



const gameEvents=new Map([
[17,"Goal"],
[36,"Substitution"],
[47,'Goat'],
[61,'Substitution'],
[64,"Yellow card"],
[69,"Red Card"],
[70,'Substitution'],
[72,'substitution'],
[76,'Goal'],
[80,'Goal'],
[92,'Yellow card'],
]) 


const events=new Set(gameEvents.values());
console.log(events);
 
const time=[...gameEvents.keys()];
console.log(time);



const airline="Alpha Air";
const plane="A380";
// console.log(plane[0]);
// console.log(plane[1]);
// console.log(airline.length);
// console.log('B737'[0]);
// console.log(airline.indexOf('r'));
// console.log(airline.lastIndexOf('A'));
// console.log(airline.slice(4));
// console.log(airline.slice(airline.indexOf(' ')+1)); 


// const checkMiddleSeat= function(seat)
// {
//   const s=seat.slice(-1);
//   if(s==='B'|| s==='E')
//   {
//     console.log('you got the middle seat');
//   }
//   else
//   {
//     console.log("you got lucky");
//   }

// }
// checkMiddleSeat('11B');


console.log(airline.toLowerCase());

const email="     Hello@Alpha.in\n";
const trimmedEmail=email.trim();
console.log(trimmedEmail)
const normalizedEmail=email.toLowerCase().trim();
console.log(normalizedEmail);



const checkBaggage=function(items)
{
  const baggage=items.toLowerCase();
  if(baggage.includes('knife')||baggage.includes('gun'))
  {
    console.log('You are Not Allowed on board');

  }
  else
  {
    console.log("welcome aboard");
  }
}

checkBaggage('i have knife to kill people');

console.log('A+nice+sex+run'.split('+'));


// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));
// document.querySelector('button').addEventListener('click',function()
// {
//   const text=document.querySelector('textarea').value;
//   console.log(text);

// });

const flights ='_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
const getCode=str=> str.slice(0,3).toUpperCase();
for(const flight of flights.split('+'))
{

  const [type, from, to, time]=flight.split(';');

  const output=`${type.startsWith('_Delayed')?'🔴':'🟢'} ${type.replaceAll('_',' ')} ${getCode(from)} ${getCode(to)} (${time.replace(':','h')})`;
  console.log(output);

  // console.log(`${type}  ${from}  ${to} ${time}\n`);
  // console.log(flight);
}
