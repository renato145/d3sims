import { min, range, scaleQuantile } from 'd3';

const batteryScale = scaleQuantile()
  .domain([0,100])
  .range(['#cc0000', '#ea9800', '#ffff00', '#00cc00']);

export const drawBattery = (selection, props) => {
  const { batteryLevel, width, height } = props;
  const rectHeight = height*0.93;
  const barsPadding = 10;
  const oneBarHeight = (rectHeight - barsPadding) / 10 - barsPadding;
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
  const barsEnter = bars.enter().append('rect')
      .attr('class', 'battery-bars')
      .attr('x', barsPadding)
      .attr('height', oneBarHeight)
      .attr('width', width - barsPadding*2)
      .style('opacity', 0)
      .attr('y', (d,i) =>  rectHeight - barsPadding*(i+1) - oneBarHeight*(i+1) );
  barsEnter
    .transition().duration(300).delay( d => {
      const minValue = min(barsEnter.data().map(o => o.n));
      return 100 * (d.n - minValue);
    })
      .style('opacity', 1);
  barsEnter.merge(bars)
      .style('fill', chargeColor);
  bars.exit()
    .transition().duration(25)
    .delay((d,i) => {
      const exitSelection = bars.exit();
      const size = exitSelection.size();
      const minValue = min(exitSelection.data().map(o => o.n));
      return 10 * (size - d.n + minValue);
    })
      .style('opacity', 0)
    .remove();
};