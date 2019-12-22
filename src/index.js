import { select } from 'd3';
import { drawEnvironment } from './environment';
import { initSocket } from './socket';

const svg = select('svg');
export const socketStatus = select('#socketStatus');
export const pythonClient = select('#pythonClient');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = 10;
let batteryLevel = 100;
let bulbIsOn = false;
const frequency = 1000;

// general update pattern
const render = () => {
  drawEnvironment(svg, { width, height, margin, batteryLevel, bulbIsOn });
};

export const setBatteryLevel = level => {
  batteryLevel = level;
  render();
};

export const setBulbState = state => {
  if ( state !== bulbIsOn) {
    bulbIsOn = state;
    render();
  }
};

export const flipBulb = () => {
  bulbIsOn = !bulbIsOn;
  render();
};

// initial Example
// [100,80,20].map( (d,i) => {
//   setTimeout(() => setBatteryLevel(d), i*frequency);
// });

render();

// Socket connection
export const socket = initSocket(socketStatus, {
  'uri': 'ws://localhost:8000/ws',
  pythonClient,
  setBatteryLevel,
  setBulbState,
  flipBulb
});
