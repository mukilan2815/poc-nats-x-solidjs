// src/natsClient.ts
import { connect, NatsConnection, NatsError } from "nats.ws";

let natsConnection: NatsConnection | null = null;

export async function connectNATS() {
  try {
    natsConnection = await connect({
      servers: "ws://localhost:4222", // Update with your NATS server URL
      reconnect: true, // Optional: Auto-reconnect settings
    });
    console.log("Connected to NATS");
    return natsConnection;
  } catch (error) {
    console.error("Failed to connect to NATS:", error);
    throw error;
  }
}

export function getNATSConnection() {
  if (!natsConnection) {
    throw new Error("NATS client is not initialized.");
  }
  return natsConnection;
}
