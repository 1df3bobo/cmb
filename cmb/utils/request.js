import store from "../store"
import toast from "@/utils/toast.js"
import {
	getCurrentRoute
} from '@/utils/index.js'

//默认配置
const options = {
	timeout: 10000,
	dataType: 'json',
	header: {
		'content-type': 'application/json',
	},
	baseUrl: 'http://47.102.135.129:8001'
}

/*
 * 全局请求封装：普通请求
 * @param url 请求路径
 * @param method 请求类型(GET/POST/DELETE等)
 * @param data 请求体数据
 * @param loading 请求未完成是是否显示加载中，默认不显示
 */
const request = (url, data = {}, loading = false, method = 'POST') => {
	return new Promise((resolve, reject) => {
		if (loading) {
			toast.showLoading('加载中')
		}
		uni.request({
			url: options.baseUrl + url,
			method: method,
			data: data,
			header: {
				...options.header,
				'Authorization': store.state.token,
				'client_type': 'APP',
				'Authorization': store.state.token,
				'BANKTYPE': '7'
			},
			timeout: options.timeout,
			dataType: options.dataType,
			success: res => {
				handleResponse(res, resolve, reject, loading)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

/*
 * 全局请求封装：文件上传请求
 * @param url 请求路径
 * @param filePath 文件路径
 * @param name 文件字段名
 */
const uploadFileRequest = (url, filePath, name = 'file') => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: options.baseUrl + url,
			filePath: filePath,
			name: name,
			header: {
				...options.header,
				'client_type': 'APP',
				'Authorization': store.state.token,
				'BANKTYPE': '7'
			},
			timeout: options.timeout,
			dataType: options.dataType,
			success: res => {
				handleResponse({
					...res,
					data: JSON.parse(res.data)
				}, resolve, reject)
			},
			fail: err => {
				toast.hideLoading()
				reject(err)
			}
		})
	})
}

// 处理响应
const handleResponse = (res, resolve, reject, loading) => {
	if (res.statusCode === 200) {
		if (res.data.code === 401) {
			uni.redirectTo({
				url: `/pages/login/login?path=${getCurrentRoute()}`
			})
		} else {
			resolve(res.data)
		}
	} else if (res.statusCode === 401) {
		uni.redirectTo({
			url: `/pages/login/login?path=${getCurrentRoute()}`
		})
		reject(res)
	} else {
		reject(res)
	}
	if (loading) {
		toast.hideLoading()
	}
}

export {
	request,
	uploadFileRequest
}