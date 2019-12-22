import { drawBattery } from './battery';
import { drawLightbulb } from './lightbulb';

export const drawEnvironment = (selection, props) => {
  const { width, height, margin, batteryLevel, bulbIsOn } = props;
  const innerWidth = width - margin*2;
  const innerHeight = height - margin*2;
  const batteryXMargin = 15;
  const batteryWidth = 0.15;
  const batteryHeight = 0.7;

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
      .attr('transform', `translate(${margin + batteryXMargin}, 130)`)
      .attr('class', 'battery-container');
  batteryEnter.merge(battery)
      .call(drawBattery, {
        batteryLevel,
        width: innerWidth*batteryWidth,
        height: innerHeight*batteryHeight
      });

  // Lightbulb
  const lightbulb = selection.selectAll('.lightbulb-container').data([null]);
  const lightbulbEnter = lightbulb.enter().append('g')
      .attr('class', 'lightbulb-container');
  lightbulbEnter.merge(lightbulb)
      .call(drawLightbulb, {
        type: 'classic',
        size: 120,
        x: margin*2 + batteryXMargin + innerWidth*batteryWidth,
        y: innerHeight*batteryHeight + 20,
        isOn: bulbIsOn
      });

};