import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandBus } from "@nestjs/cqrs";
import amqp, {
  AmqpConnectionManager,
  ChannelWrapper,
} from "amqp-connection-manager";
import { Connection, ConsumeMessage } from "amqplib";
import { AnnounceCategoryUpdateCommand } from "./commands/announce-category-update.command";
import { Consumer } from "./consumer";

@Injectable()
export class BrokerService {
  private connection: AmqpConnectionManager;
  private retryDelay: number = 20;
  private channel: ChannelWrapper;

  constructor(private config: ConfigService, private commandBus: CommandBus) {
    this.connection = amqp.connect([this.config.get<string>("rabbitmqUrl")], {
      reconnectTimeInSeconds: this.retryDelay,
      connectionOptions: { keepAlive: true },
    });
    this.connection.on("connect", this.onConnection);
    this.connection.on("disconnect", this.onDisconnection.bind(this));
    this.channel = this.connection.createChannel({ json: true });
    this.setupConsumer();
  }

  private setupConsumer() {
    const ch = this.channel;
    ch.consume(Consumer.CATEGORY_QUEUE, (msg: ConsumeMessage) => {
      const { fields, content, properties } = msg;
      if (fields.routingKey === Consumer.CATEGORY_SYNC_ROUTING_KEY) {
        const { categoryId, categoryDto } = JSON.parse(content.toString());
        this.commandBus
          .execute(new AnnounceCategoryUpdateCommand(categoryId, categoryDto))
          .then((res) => {
            if (res) ch.ack(msg);
          })
          .catch((err) => {
            Logger.log(err, "AvailabilitySyncError");
          });
      } else {
        Logger.log(fields, "NoRoutingKeyFound");
      }
    });
  }

  public isConnected(): boolean {
    return this.connection.isConnected();
  }
  onConnection(connection: Connection, connection_url: string) {
    Logger.log(`Rabbitmq connection established!`, "RMQBrokerService");
  }
  onDisconnection(error) {
    Logger.error("Rabbitmq disconnected!", "RMQBrokerService");
    Logger.log(
      `Retrying connection in ${this.retryDelay} second(s)`,
      "RMQBrokerService"
    );
  }
}
