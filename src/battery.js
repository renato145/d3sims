import { scaleQuantile } from 'd3';

const batteryScale = scaleQuantile()
  .domain([0,100])
  .range(['red', 'yellow', 'green']);

export const drawBattery = (selection, props) => {
  const { batteryLevel, width, height } = props;
  const rectHeight = height*0.93;

  selection.selectAll('rect').data([null]).enter()
    .append('rect')
      .attr('height', rectHeight)
      .attr('width', width)
      .attr('rx', 8);

  const text = selection.selectAll('text').data([null]);
  text.enter().append('text')
      .attr('x', width/2)
      .attr('y', height)
    .merge(text)
      .text(`${batteryLevel}%`)
      .attr('fill', batteryScale(batteryLevel));
};