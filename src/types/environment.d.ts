export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      NODE_ENV: 'dev' | 'qa' | 'prod';
      SEND_CONFIRMATION_EMAIL_QUEUE: string;
      JWT_SECRET: string;
      COUNT_API_BASE_URL: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
      SOURCE_EMAIL: string;
      SMTP_USER: string;
      SMTP_PASS: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
    }
  }
}
