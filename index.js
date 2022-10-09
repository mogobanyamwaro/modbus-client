const ModbusRTU = require("modbus-serial");
const modbusClient = new ModbusRTU();
const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://localhost:1883");

modbusClient.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600 }, write);

function write() {
  modbusClient.setID(1);
  client.on("connect", () => {
    client.subscribe("test");
    console.log("Subscribed to topic test");
  });

  client.on("message", (_, message) => {
    console.log(JSON.parse(message));
    modbusClient
      .writeRegister(5, JSON.parse(message)[0].value)
      .then(console.log);
  });
}

function read() {
  client.on("connect", () => {
    const modbusdata = modbusClient.readHoldingRegisters(0, 10);
    const payload = [
      {
        id: 1,
        name: "test",
        value: modbusdata,
      },
    ];
    client.publish("test", JSON.stringify(payload));
  });
}
