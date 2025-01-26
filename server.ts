import logger from "./src/config/logger";
import { createMessageBroker } from "./src/factories/broker-factory";
import { MessageBroker } from "./src/types/broker";
import server from "./src/socket";

const startServer = async () => {
  let broker: MessageBroker | null = null;
  try {
    broker = createMessageBroker();
    await broker.connectConsumer();
    await broker.consumeMessage(["order"], false);
    server.server.listen(5504,()=>{
      console.log('listening to socket')
    });
  } catch (err) {
    logger.error("Error happened: ", err.message);
    process.exit(1);
  }
};

void startServer();
