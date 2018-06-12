import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';

import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js' 
import './ui.js'

Vue.prototype.$axiso = axios;

Vue.config.productionTip = false;

require('./mock/index.js');

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
