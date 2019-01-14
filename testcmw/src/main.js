import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueI18n from 'vue-i18n'
import abi from "./js/contract/abi"
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage['lang'] || 'en', // 设置语言 
  messages: {
    'zh': require('./common/lang/zh'),
    'en': require('./common/lang/en'),
  }
})

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
  i18n,
}).$mount('#app')