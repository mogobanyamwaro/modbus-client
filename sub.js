const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:1883");

// Subscribe to the topic "test"

client.on("connect", () => {
  client.subscribe("test");
  console.log("Subscribed to topic test");
});

// When a message arrives, console.log it

client.on("message", (topic, message) => {
  console.log(JSON.parse(message));
});
