import { select } from 'd3';
import { drawEnvironment } from './environment';

const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = 10;
let batteryLevel;
const frequency = 1000;

// general update pattern
const render = () => {
  drawEnvironment(svg, { width, height, margin, batteryLevel });
};

export const setBatteryLevel = level => {
  batteryLevel = level;
  render();
};

[100,80,60,25,10].map( (d,i) => {
  setTimeout(() => setBatteryLevel(d), i*frequency);
});
