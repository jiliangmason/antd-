import dva from 'dva';
import 'moment/locale/zh-cn';
import models from './models';
import './polyfill';
import './g2';
import './index.less';
import router from './router';

const app = dva({});

models.forEach(m => {
  app.model(m);
});

app.router(router);

app.start('#root');
