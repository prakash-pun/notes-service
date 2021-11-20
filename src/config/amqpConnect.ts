import * as amqp from "amqplib";

export const amqpConnect = (setting: { url: string | amqp.Options.Connect }) =>
  amqp
    .connect(setting.url)
    .then((conn) => conn.createChannel())
    .then((channel) => {
      console.log("amqp connected");
      return channel;
    });

export const amqpSend = (
  channel: { sendToQueue: (arg0: any, arg1: Buffer) => void },
  message: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>,
  rpcQueue: any
) =>
  new Promise((resolve) => {
    channel.sendToQueue(rpcQueue, Buffer.from(message));
  });
// process.on('beforeExit', () => {
//   console.log('closing')
//   connection.close()
// // })
