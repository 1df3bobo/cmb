import App from './App'
import toast from './utils/toast.js'
import store from './store'
import uView from '@/uni_modules/uview-ui'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
Vue.prototype.$toast = toast;
App.mpType = 'app'
Vue.use(uView)
store.commit('clac_nav_height')
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif