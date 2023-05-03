import { dataSourceOptions } from "src/data-source";
import redisConfig from "./redis.config";

export default () => ({
  port: parseInt(process.env.PORT),
  cache: redisConfig,
  rabbitmqUrl: process.env.RABBITMQ_URL,
  database: dataSourceOptions,
  redis: redisConfig,
  secretKey: process.env.SECRET_KEY,
  nodeEnv: process.env.NODE_ENV,
});
