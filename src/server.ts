import './config/env';
import { App } from './app';

const PORT = process.env.PORT || 3000;
const app = new App();
const boot = app.boot();

boot.listen(PORT, () => {
  const { log } = console;
  log('App started in PORT ', PORT);
});
