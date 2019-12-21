export const initSocket = ( selection, props ) => {
  const { uri } = props;
  const socket = new WebSocket(uri);
  
  socket.onopen = () => {
    selection
        .attr('class', 'connected')
        .text('Connected');
  };

  socket.onmessage = event => {
    console.log('MESSAGE');
    console.log(event);
  };

  socket.onclose = () => {
    selection
        .attr('class', 'disconnected')
        .text('Disconnected');
  };

  return socket
};
