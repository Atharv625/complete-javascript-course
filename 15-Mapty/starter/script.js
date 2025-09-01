'use strict';

// const { animate } = require("framer-motion");

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
class Workout{
  date=new Date();
 id = (Date.now() + '').slice(-10);


  constructor(coords,distance, duration){
    this.coords=coords;
    this.distance=distance;
    this.duration=duration;

    
  }
  
}
class Running extends Workout{
  

  constructor(coords,distance,duration,cadence){
    super(coords,distance,duration);
    this.cadence=cadence;
    this.CalcPace();
    this.type = 'running';

  }
  CalcPace()
  {
    this.pace=this.duration/this.distance;
    return this.pace;
  }
}
class Cycling extends Workout{
  constructor(coords,distance,duration,elevationGain){
    super(coords,distance,duration);
    this.elevationGain=elevationGain; 
    this.type = 'cycling';


    this.CalcSpeed();
  }
  CalcSpeed(){
    this.speed=this.distance/(this.duration/60);
    return this.speed;

  }
}
// const run1=new Running([39,-12],5.2,24,170);
// const cycle1=new Cycling([39,-12],5.2,24,170)


class App {
  #map;
  #mapEvent;
  #workouts=[];
  #mapZoomLevel = 13;  // default zoom level

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change',this._toggleElevationField.bind(this) );
    containerWorkouts.addEventListener('click', this._moveTopop.bind(this));

  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    // To be implemented
     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    
  }

  _newWorkout(e) {
    const validInputs=(...inputs)=>
      inputs.every(inp=>Number.isFinite(inp));
    const allPositive=(...inputs)=>inputs.every(inp=>inp>0);
    e.preventDefault();

    e.preventDefault();

const type = inputType.value;

if (
  inputDistance.value === '' ||
  inputDuration.value === '' ||
  (type === 'running' && inputCadence.value === '') ||
  (type === 'cycling' && inputElevation.value === '')
) {
  alert('Please fill out all required fields');
  return;
}

const distance = +inputDistance.value;
const duration = +inputDuration.value;
const { lat, lng } = this.#mapEvent.latlng;

let workout;

if (type === 'running') {
  const cadence = +inputCadence.value;

  if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) {
    alert('Inputs must be positive numbers');
    return;
  }

  workout = new Running([lat, lng], distance, duration, cadence);
} else if (type === 'cycling') {
  const elevation = +inputElevation.value;

  if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) {
    alert('Inputs must be valid numbers and positive (elevation can be negative)');
    return;
  }

  workout = new Cycling([lat, lng], distance, duration, elevation);
}


  
      this.#workouts.push(workout);
      console.log(workout);
    form.classList.add('hidden');
    this._renderWorkoutMarker(workout)
    this._renderWorkout(workout);

    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

   
  }
  _renderWorkoutMarker(workout){
     L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
     .setPopupContent(`${workout.type[0].toUpperCase() + workout.type.slice(1)} on ${months[new Date(workout.date).getMonth()]} ${new Date(workout.date).getDate()}`)

      .openPopup();
  }
  _renderWorkout(workout){
  let html=`<li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.type[0].toUpperCase() + workout.type.slice(1)} on ${months[new Date(workout.date).getMonth()]} ${new Date(workout.date).getDate()}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;
          if(workout.type==='running')
          {
            html+=` 
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>`
          }
          if(workout.type==='cycling'){
            html+=` 
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>`
          }
          form.insertAdjacentHTML('afterend',html)
  }
  _moveTopop(e){
    const workoutEl=e.target.closest('.workout');
    console.log(workoutEl);
    if(!workoutEl) return;
    const workout=this.#workouts.find(
      work=>work.id===workoutEl.dataset.id
    );
    console.log(workout);
    this.#map.setView(workout.coords,this.#mapZoomLevel,{animate:true,
      pan:{
        duration:1,
      },
    });

   workout.clicks = (workout.clicks || 0) + 1;

  }
  _setLocalStorage(){
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));

  }
_getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('workouts'));
  if (!data) return;

  this.#workouts = data.map(work => {
    if (work.type === 'running') {
      return new Running(work.coords, work.distance, work.duration, work.cadence);
    } else if (work.type === 'cycling') {
      return new Cycling(work.coords, work.distance, work.duration, work.elevationGain);
    }
  });

  this.#workouts.forEach(work => this._renderWorkout(work));
}

// After map is ready, also render markers:
_loadMap(position) {
  const { latitude, longitude } = position.coords;
  const coords = [latitude, longitude];

  this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(this.#map);

  this.#map.on('click', this._showForm.bind(this));

  // Render markers from restored data
  this.#workouts.forEach(work => this._renderWorkoutMarker(work));
}


}

const app = new App();
