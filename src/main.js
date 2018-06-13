import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from 'axios';

// 引入样式
import 'vue-easytable/libs/themes-base/index.css';
// 导入 table 和 分页组件
import {VTable, VPagination} from 'vue-easytable';

Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);

// import './mock/index.js';  // 该项目所有请求使用mockjs模拟
// import './mock/indexex.js';  // 该项目所有请求使用mockjs模拟
import './login.js';
import './ui.js';

Vue.prototype.$axiso = axios;

Vue.config.productionTip = false;

// require('./mock/index.js');

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App},
});
