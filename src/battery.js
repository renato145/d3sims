// const battery = drawEnvironment(container, batteryLevel);
export const drawBattery = (selection, props) => {
  const { batteryLevel, width, height } = props;
  const rectHeight = height*0.95;

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
      .text(`${batteryLevel}%`);
};