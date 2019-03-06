// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './state/store'
import VueShowdown from 'vue-showdown'
import VueTextareaAutosize from 'vue-textarea-autosize'

import "bootstrap/dist/css/bootstrap.min.css"
import "material-design-icons/iconfont/material-icons.css"
import "./assets/style.css"

Vue.use(VueTextareaAutosize);
Vue.use(VueShowdown, { emoji: true, table: true });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
 el: '#app',
 router,
 store,
 components: { App },
 template: '<App/>'
});
