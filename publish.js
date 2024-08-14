const { connect, StringCodec } = require("nats");

const publishMessage = async () => {
  try {
    const nc = await connect({ servers: "nats://localhost:4223" });
    const sc = StringCodec();

    nc.publish("updates", sc.encode("Hello from Laabhum!!!"));

    console.log("Message published");

    await nc.drain();
  } catch (err) {
    console.error("Failed to publish message", err);
  }
};

publishMessage();