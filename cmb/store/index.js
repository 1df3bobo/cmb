// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'
import toast from "@/utils/toast.js"
import {
	rpx2px
} from '@/utils/index.js'
import {
	getMemberInfo
} from '@/api/index.js'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {
		navBarHeight: rpx2px(88),
		statusBarHeight: 0, // 状态栏高度
		isLogin: false, // 登录状态
		userInfo: {}, // 用户信息
		token: '', // 登录token
		selectBankInfo: {},
		bankCardLabel: '消费卡'
	},
	mutations: {
		init_token(state, payload) { // 改变token
			state.token = payload.token
		},
		change_select_bank_info(state, payload) {
			state.selectBankInfo = payload.selectBankInfo
		},
		change_bank_card_label(state, payload) {
			state.bankCardLabel = payload.bankCardLabel
		},
		clac_nav_height(state) {
			// 获取状态栏高度
			state.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
		},
		change_login_state(state, payload) { // 改变登录状态
			state.isLogin = payload.state;
		},
		init_user_info(state, payload) {
			state.userInfo = payload.userInfo
		},
	},
	actions: {
		get_user_info({ // 获取用户信息
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				getMemberInfo().then(res => {
					if (res.code === 200) {
						commit('init_user_info', {
							userInfo: res.data,
						})
						resolve()
					} else {
						reject()
					}
				}).catch(() => {
					reject()
				})
			})
		},
	},
	plugins: [
		createPersistedState({
			paths: ['token', 'userInfo'],
			storage: {
				getItem: key => uni.getStorageSync(key),
				setItem: (key, value) => uni.setStorageSync(key, value),
				removeItem: key => uni.removeStorageSync(key)
			}
		})
	]
})
export default store