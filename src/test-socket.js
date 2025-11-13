// const { io } = require('socket.io-client');
// const socket = io('http://localhost:5000', { transports: ['websocket'] });

// socket.on('connect', () => {
//   console.log('✅ Connected to WebSocket server');

//   socket.emit('notification', {
//     userId: 1,
//     type: 'shipment.test',
//     message: 'Mensaje de prueba desde el cliente API'
//   }, (ack) => {
//     console.log('ACK recibido del servidor:', ack);
//   });
// });

// socket.on('connect_error', (err) => {
//   console.error('❌ Error conectando:', err.message);
// });
const { io } = require('socket.io-client');
const socket = io('http://localhost:5000', { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('✅ Connected to WebSocket server');

  // 1️⃣ Unirte a la sala del usuario
  socket.emit('join-room', { userId: 1 });

  // 2️⃣ Enviar notificación al servidor
  socket.emit('notification', {
    userId: 1,
    type: 'shipment.test',
    message: 'Mensaje de prueba desde el cliente API'
  }, (ack) => {
    console.log('ACK recibido del servidor:', ack);
  });
});

socket.on('connect_error', (err) => {
  console.error('❌ Error conectando:', err.message);
});
