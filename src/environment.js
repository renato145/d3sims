import { drawBattery } from './battery';

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

  const battery = selection.selectAll('.battery-container').data([null]);
  const batteryEnter = battery.enter().append('g')
      .attr('transform', 'translate(30,130)')
      .attr('class', 'battery-container');

  batteryEnter.merge(battery)
      .call(drawBattery, {
        batteryLevel,
        width: innerWidth*0.2,
        height: innerHeight*0.7
      });

};