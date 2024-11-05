import { cleanEnv, str, port, num } from 'envalid';

const validateEnv = () => {
  return cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
    PORT: port({ default: 3000 }),
    MONGODB_URI: str(),
    REDIS_HOST: str({ default: 'localhost' }),
    REDIS_PORT: port({ default: 6379 }),
    RATE_LIMIT_WINDOW_MS: num({ default: 900000 }),
    RATE_LIMIT_MAX_REQUESTS: num({ default: 100 }),
    LOG_LEVEL: str({ choices: ['error', 'warn', 'info', 'debug'], default: 'info' }),
    LOG_FILE_PATH: str({ default: 'logs/app.log' }),
  });
};

export default validateEnv;
