import { drawBattery } from './battery';
import { drawLightbulb } from './lightbulb';

export const drawEnvironment = (selection, props) => {
  const { width, height, margin, batteryLevel } = props;
  const innerWidth = width - margin*2;
  const innerHeight = height - margin*2;

  const container = selection.selectAll('rect')
    .data([null])
    .enter().append('rect')
      .attr('class', 'background')
      .attr('x', margin)
      .attr('y', margin)
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('rx', 20);

  // Battery
  const battery = selection.selectAll('.battery-container').data([null]);
  const batteryEnter = battery.enter().append('g')
      .attr('transform', 'translate(30,130)')
      .attr('class', 'battery-container');
  batteryEnter.merge(battery)
      .call(drawBattery, {
        batteryLevel,
        width: innerWidth*0.15,
        height: innerHeight*0.7
      });

  // Lightbulb
  const lightbulb = selection.selectAll('.lightbulb-container').data([null]);
  const lightbulbEnter = lightbulb.enter().append('g')
      .attr('transform', 'translate(30,130)')
      .attr('class', 'lightbulb-container');
  lightbulbEnter.merge(lightbulb)
      .call(drawLightbulb, {
        type: 'classic'
      });

};