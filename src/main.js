import Vue from 'vue'
// import App from './App.vue'

import animation from './animation';

import './assets/index.less'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  // render: h => h(App),
  render: h => h(animation),
}).$mount('#app')
