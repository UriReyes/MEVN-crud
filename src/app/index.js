import Vue from 'vue'
import Toasted from 'vue-toasted';
Vue.use(Toasted)

import App from './components/App.vue'
new Vue({
    render: h => h(App)
}).$mount('#app')