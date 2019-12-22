import { select, min } from "d3";

const lightbulbPath = {
    'classic': {
        'bulbPath': 'M247.248 123.799C247.248 53.3826 188.064 -3.56938 116.928 0.174621C52.488 3.91862 1.512 57.1266 0 121.567C0 153.751 11.952 183.703 32.976 206.959C67.32 243.751 62.928 286.375 62.928 286.375C62.928 294.583 69.696 301.351 77.904 301.351L169.272 301.351C177.48 301.351 184.248 294.583 184.968 286.375C184.968 286.375 179.928 244.831 214.2 207.751C235.224 185.215 247.248 155.263 247.248 123.799Z',
        'extraPath': 'M94.7 0L20.8 0C9.4 0 0 9.4 0 20.8C0 32.2 9.4 41.6 20.8 41.6L94.7 41.6C106.1 41.6 115.5 32.2 115.5 20.8C115.5 9.4 106.2 0 94.7 0Z',
        'width': 441,
        'height': 441,
        'extraX': 68,
        'extraY': 307,
        'className': 'classic-bulb'
    }
};

export const drawLightbulb = ( selection, props ) => {
  const { type, size, x, y, isOn } = props;
  const { bulbPath, extraPath, width, height, extraX, extraY, className } = lightbulbPath[type];
  const scale = size / min([width, height]);

  // Position
  selection
      .attr('transform', `translate(${x}, ${y})`);

  // Draw lightbulb
  const lightbulb = selection.selectAll('.lightbulb').data([null]);
  const lightbulbEnter = lightbulb.enter().append('path')
      .attr('class', `lightbulb ${className}`)
      .attr('d', bulbPath)
      .style('opacity', 0)
      .style('fill-opacity', 0);
  lightbulbEnter.merge(lightbulb)
    .transition().duration(() => {
      return isOn | (lightbulbEnter.size()>0) ? 400 : 25;
    })
      .style('opacity', 1)
      .style('fill-opacity', isOn ? 1 : 0);

  // Draw extras
  const extrasEnter = selection.selectAll('.lightbulb-extra').data([null]).enter()
    .append('path')
      .attr('class', 'lightbulb-extra')
      .attr('d', extraPath)
      .attr('transform', `translate(${scale*extraX}, ${scale*extraY})`);

  // Set scale
  [lightbulbEnter, extrasEnter].map(o => {
      o.attr('transform', d => {
        const tfm = o.attr('transform');
        return `${tfm === null ? '' : tfm} scale(${scale}) translate(0, ${-height*scale/2})`
      });
  });

};