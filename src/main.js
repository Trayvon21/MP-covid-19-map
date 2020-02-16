import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入dayjs
import dayjs from 'dayjs'
//引入axios
import axios from './http'
//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs
Vue.prototype.$axios = axios
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')