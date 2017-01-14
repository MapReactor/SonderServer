const url = require('url');
const uuid = require('node-uuid');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const createClient = require('./redis');

const clients = {};

const sendMessage = function (type, client_uuid, message) {
  let client = clients[client_uuid].ws;
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({
      "type":type,
      "message":message
    }));
  }
};

module.exports = function(server) {
  const wss = new WebSocketServer({ server: server});
  wss.on('connection', function connection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    const client_uuid = uuid.v4();
    const pub = createClient();
    const sub = createClient();

    sub.on("message", function (channel, message) {
      //console.log("sub channel " + channel + ": " + message);
      sendMessage('location', client_uuid, JSON.parse(message));
    });

    clients[client_uuid] = { client_uuid:client_uuid, ws:ws, pub:pub, sub:sub };
    //console.log(`${new Date()} :: Connected to ${clients[client_uuid].client_uuid}` );
    sendMessage('notification', client_uuid, 'Successfully Connected');

    ws.on('message', function incoming(message) {
      try {
        let socketMessage = JSON.parse(message);
        if (socketMessage.type === 'publish') {
          delete socketMessage.type;
          if (socketMessage.id && socketMessage.latitude && socketMessage.longitude) {
            clients[client_uuid].pub.publish(socketMessage.id, JSON.stringify(socketMessage));
            //console.log(`Client ${clients[client_uuid].client_uuid} published ${JSON.stringify(socketMessage)}`);
            sendMessage('notification', client_uuid, 'Publish Success');
          } else {
            sendMessage('error', client_uuid, 'Data Format Error, expected format: { type:publish id:123456, longitude:-126.5, latitude:134.7 }');
          }
        } else if (socketMessage.type === 'subscribe') {
          if (socketMessage.friends && Array.isArray(socketMessage.friends)) {
            try {
              clients[client_uuid].sub.subscribe(...socketMessage.friends);
              //console.log(`Client ${clients[client_uuid].client_uuid} subscribed to ${JSON.stringify(socketMessage.friends)}`);
              sendMessage('notification', client_uuid, 'Subscribe Success');
            } catch (error) {
              sendMessage('error', client_uuid, JSON.stringify(error));
            }
          } else {
            sendMessage('error', client_uuid, 'Data Format Error, expected format: { type:subscribe, friends:[123,345,456,567] }');
          }
        }
      } catch (error) {
        sendMessage('error', client_uuid, 'JSON Parsing Error');
      }
    });

    const closeSocket = function(client_uuid, message = 'Disconnecting') {
      //console.log(`${new Date()} :: Closing connection to ${client_uuid}`);
      sendMessage('notification', client_uuid, message);
      clients[client_uuid].pub.quit();
      clients[client_uuid].sub.quit();
      delete clients[client_uuid];
    }

    ws.on('close', function(){
      closeSocket(client_uuid);
    });

    process.on('SIGINT', function(){
      console.log(`${new Date()} :: Process ending: closing all the things`);
      for (let client_uuid in clients) {
        closeSocket(client_uuid, 'Server has disconnected');
      }
      process.exit();
    });
  });
}
