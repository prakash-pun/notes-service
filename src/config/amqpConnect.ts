import * as amqp from 'amqplib';

export const amqpConnect = (setting) => amqp.connect(setting.url)
  .then(conn => conn.createChannel())
  .then(channel => {
    console.log("amqp connected");
    return channel;
  });

export const amqpSend = (channel, message, rpcQueue) => new Promise(resolve => {
  channel.sendToQueue(rpcQueue, Buffer.from(message));
});
// process.on('beforeExit', () => {
//   console.log('closing')
//   connection.close()
// // })