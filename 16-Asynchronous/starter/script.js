'use strict';

// const { data } = require("autoprefixer");

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${data.languages ? Object.values(data.languages)[0] : 'N/A'}</p>
        <p class="country__row"><span>💰</span>${data.currencies ? Object.values(data.currencies)[0].name : 'N/A'}</p>
      </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderCountry(data);

    // ✅ check if borders exist
    if (!data.borders || data.borders.length === 0) return;

    const neighbour = data.borders[0]; // first neighbour

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      // ✅ ensure correct access
      renderCountry(data2[0], 'neighbour');
    });
  });
};

// // Example calls
// // getCountryData('india');
// // getCountryData('usa');
// // getCountryData('uae');
// getCountryData('pakistan');
// getCountryData('china');


// setTimeout(()=>{
//   console.log('1 second passed');
//   setTimeout(()=>{
//   console.log('2 second passed');
//     setTimeout(()=>{
//   console.log('3 second passed');
//       setTimeout(()=>{
//   console.log('4 second passed');

// },1000);
// },1000);
// },1000);
// },1000);



// const request=fetch(`https://restcountries.com/v3.1/name/usa`);
// console.log(request);
// const renderError=function(msg){
//   countriesContainer.insertAdjacentText('beforeend',msg);
//   countriesContainer.style.opacity=1;
// }

// const getCountryData2 = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       // check if borders exist
//       const neighbour = data[0].borders?.[0];
//       if (!neighbour) return;

//       // fetch neighbour
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response) return; // if no neighbour, stop here
//       if (!response.ok) throw new Error(`Neighbour not found (${response.status})`);
//       return response.json();
//     })
//     .then(data => {
//       if (!data) return; // no neighbour
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(err);
//       renderError(`Something went wrong: ${err.message}. Try again!`);
//     }).finally(()=>{
//       countriesContainer.style.opacity=1;
//     })
// };

// btn.addEventListener('click',function(){
//   getCountryData2('sex');
// })
// // getCountryData2('usa')

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=863306064189229789130x24816`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding: ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       console.log(data);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
//     }).then(res=>{
//        if (!res.ok) throw new Error(`Problem with geocoding: ${res.status}`);
//        return res.json();
// }).then(data=>renderCountry(data[0]))
//     .catch(err => {
//       console.error(`Error: ${err.message}`);
//     });
// };

// whereAmI(18.5912888, 74.0018887);


// console.log('test start');
// setTimeout(()=>console.log('0 sec timer'),5000);
// Promise.resolve('revised promise 1').then(res=>console.log(res));
// console.log('test end');


// const lotteryPromise= new Promise(function(resolve, reject){
  
//   console.log(`lotter draw is happening`);
//   setTimeout(function(){
// if(Math.random()>=0.5){
//     resolve(`You win`);
//   }else{
//     reject(new Error(`you lost your money`));
//   }
//   },2000)
// });


// lotteryPromise.then(res=>console.log(res)).
// catch(err=>console.error(err));

// const wait=function(seconds){
//   return new Promise(function(resolve){
//     setTimeout(resolve,seconds*1000);

//   })
// }
// wait(2).then(()=>{console.log('i Waited for 2 seconds');
// return wait(2);}

// ).then(()=>console.log(`I waited for 1 second`))



// navigator.geolocation.getCurrentPosition(position => console.log(position),
// err=>console.error(err));
// console.log('getting position');

// const imagesContainer=document.querySelector('.images');
// function createImage(imgpath){
//   return new Promise((resolve,reject)=>
//   {
//     const img=document.createElement('img');
//     img.src=imgpath;
//     img.addEventListener('load',()=>
//     {
//       imagesContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error',()=>{
//       reject(new Error(`images not found at path :${imgpath}`));
//     });
//   });
// };


// function wait(seconds){
//   return new Promise(resolve=>setInterval(resolve,seconds*1000));
// }

// let currentImg; // global variable to track currently displayed image

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => {
//     console.error('Error:', err);
//   });


// Helper function to promisify geolocation
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    console.log('Getting position...');

    // 1) Get current position
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // 2) Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=863306064189229789130x24816`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);

    // 3) Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country data');
    const data = await res.json();
    console.log(data);

    renderCountry(data[0]);
return `${dataGeo.city}, ${dataGeo.country}`;

  } catch (err) {
    console.error(`💥 ${err.message}`);
  }
};
// console.log('1 : will get loaction');

// whereAmI().then(city=>console.log(`2:${city}`)).catch(err=>console.error(`2:${err.message}`)).
// finally(()=>console.log('3 : finished getting loaction'));


// console.log('3: finished getting loaction');

// (async function () {
//   try{
//     const city = await whereAmI();
//     console.log(`2: ${city}`)

//   }
//   catch(err){
//     console.error(`2: ${err.message}`)

//   }
//   finally{
//     console.log('3: finished getting loaction');
//   }
// })();

const getJSON=function(url, errorMsg='something went wrong'){
  return fetch(url).then(response =>{
    if(!response.ok)throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  })
}


// const get3Countries=async function(c1,c2,c3){
//   try{
//     // const [data1]=await getJSON( `https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2]=await getJSON( `https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3]=await getJSON( `https://restcountries.com/v3.1/name/${c3}`);
//     //  console.log(data1.capital, data2.capital,data3.capital);
//     const data= await Promise.all([
//       getJSON( `https://restcountries.com/v3.1/name/${c1}`),
//       getJSON( `https://restcountries.com/v3.1/name/${c2}`),
//       getJSON( `https://restcountries.com/v3.1/name/${c3}`),

//     ]);
    
//    console.log(data.map(d=>d[0].capital));
//   }catch(err){
//       console.error(err);
//   }
// }

// get3Countries('usa','uae','india');
(async function (c1, c2, c3) {
  try {
    const res = await Promise.race([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(res[0]);
  } catch (err) {
    console.error('Error:', err.message);
  }
})('usa', 'uae', 'india');




(async function () {
  try {
    const res = await Promise.race([
      getJSON(`https://restcountries.com/v3.1/name/india`),
      getJSON(`https://restcountries.com/v3.1/name/usa`),
      getJSON(`https://restcountries.com/v3.1/name/uae`),
    ]);

    console.log(res[0]);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();



const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));