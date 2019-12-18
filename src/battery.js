import { range, scaleQuantile } from 'd3';

const batteryScale = scaleQuantile()
  .domain([0,100])
  .range(['red', 'orange', 'yellow', 'green']);

export const drawBattery = (selection, props) => {
  const { batteryLevel, width, height } = props;
  const rectHeight = height*0.93;
  const barsPadding = 10;
  const barsHeight = rectHeight*0.95;
  const oneBarHeight = (barsHeight - barsPadding*9) / 10
  const chargeColor = batteryScale(batteryLevel);

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
      .attr('fill', chargeColor);

  const barsData = range(Math.round(batteryLevel / 10)).map(d => ({n: d}) );
  const bars = selection.selectAll('.battery-bars').data(barsData);
  bars.enter().append('rect')
      .attr('class', 'battery-bars')
      .attr('x', barsPadding)
      .attr('height', oneBarHeight)
      .attr('width', width - barsPadding*2)
    .merge(bars)
      .attr('y', (d,i) => barsHeight - barsPadding*(i+1) - oneBarHeight*i)
      .style('fill', chargeColor);
  bars.exit().remove();
};