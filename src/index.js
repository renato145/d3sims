import { select } from 'd3';
import { drawEnvironment } from './environment';

const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const margin = 10;
let batteryLevel;
let currentTime = 0;
const frequency = 1000;

// general update pattern
const render = () => {
  drawEnvironment(svg, { width, height, margin, batteryLevel });
};

const setBatteryLevel = level => {
  setTimeout(() => {
    batteryLevel = level;
    render();
  }, currentTime);
  currentTime += frequency;
};

setBatteryLevel(100);
setBatteryLevel(80);
setBatteryLevel(60);
setBatteryLevel(25);
setBatteryLevel(10);
