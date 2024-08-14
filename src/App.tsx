import { createSignal, onCleanup, onMount } from "solid-js";
import { connect, StringCodec } from "nats.ws";

const App = () => {
  const [messages, setMessages] = createSignal<string[]>([]);

  const connectToNATS = async () => {
    try {
      const nc = await connect({
        servers: "ws://localhost:8080", 
      });

      const sc = StringCodec();

      const subscription = nc.subscribe("updates");
      (async () => {
        for await (const msg of subscription) {
          const decodedMessage = sc.decode(msg.data);
          console.log("Received message:", decodedMessage);
          setMessages((prevMessages) => [...prevMessages, decodedMessage]);
        }
      })();

      console.log("Connected to NATS");

      onCleanup(() => {
        nc.close();
      });
    } catch (err) {
      console.error("Failed to connect to NATS", err);
    }
  };

  onMount(() => {
    connectToNATS();
  });

  return (
    <div>
      <h1>NATS Messages</h1>
      <ul>
        {messages().map((msg, index) => (
          <li data-key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
