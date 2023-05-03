import { Environment } from '../common/enums';

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  db: parseInt(process.env.REDIS_DB),
  auth_pass: process.env.REDIS_PASSWORD,
};

// ========== FOR BOTH DEV AND PROD SERVER ========== //
if (
  process.env.NODE_ENV === Environment.PRODUCTION ||
  process.env.NODE_ENV === Environment.DEVELOP
) {
  redisConfig['auth_pass'] = process.env.REDIS_PASSWORD;
}

export default redisConfig;
