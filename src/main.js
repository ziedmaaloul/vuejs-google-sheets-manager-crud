import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import 'font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
