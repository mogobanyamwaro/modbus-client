const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  setInterval(() => {
    const random = Math.floor(Math.random() * 100);
    console.log("Publishing", random);
    if (random > 50) {
      const payload = [
        {
          id: 1,
          name: "test",
          value: random,
        },
      ];
      client.publish("test", JSON.stringify(payload));
    }
  }, 3000);
});
// https://subscription.packtpub.com/book/application-development/9781787287815/1/ch01lvl1sec12/installing-a-mosquitto-broker-on-macos
