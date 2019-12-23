export const initSocket = ( selection, props ) => {
  const {
    uri,
    pythonClient,
    setBatteryLevel,
    setBulbState,
    flipBulb
  } = props;
  const socket = new WebSocket(uri);
  let closeMessage = '';

  socket.onopen = () => {
    socket.send(JSON.stringify({client: 'web_client'}));
    selection
        .attr('class', 'connected')
        .text('Connected');
  };

  socket.onmessage = event => {
    const msg = JSON.parse(event.data);
    switch (msg.event) {
      case 'close':
        closeMessage = ` (${msg.msg}).`;
        break;
      case 'pythonClientStatus':
        pythonClient
            .attr('class', () => msg.msg === 'Online'
                  ? 'connected'
                  : 'disconnected')
            .text(msg.msg);
        break;
      case 'setBatteryLevel':
          setBatteryLevel(msg.msg);
          break;
      case 'setBulbState':
          setBulbState(msg.msg);
          break;
      case 'flipBulb':
          flipBulb();
          break;
      default:
        console.log(`Invalid event: ${msg.event}.`)
    }
  };

  socket.onclose = () => {
    selection
        .attr('class', 'disconnected')
        .text('Disconnected' + closeMessage);
    pythonClient
        .attr('class', 'disconnected')
        .text('Offline');
  };

  return socket
};
