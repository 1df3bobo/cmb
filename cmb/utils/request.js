import store from "../store"
import toast from "@/utils/toast.js"
let config = process.env.config;
import {
	getCurrentRoute
} from '@/utils/index.js'

//默认配置
const options = {
	timeout: 10000, // 增加到30秒，针对复杂查询
	dataType: 'json',
	header: {
		'content-type': 'application/json',
		'Access-Control-Allow-Origin':'*',
	},
  // baseUrl: 'http://api.chinajianse.com',
	baseUrl: '/api',
	// 新增：重试配置
	retry: {
		count: 2, // 重试次数
		delay: 1000, // 重试延迟（毫秒）
		timeoutUrls: ['/servicecmb/bill/page', '/servicecmb/bill/pageRangePayment'] // 需要重试的接口
	}
}

// 请求队列管理，防止重复请求
const requestQueue = new Map()

// 生成请求唯一标识
const getRequestKey = (url, data, method) => {
	return `${method}_${url}_${JSON.stringify(data)}`
}

// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/*
 * 全局请求封装：普通请求（增强版）
 * @param url 请求路径
 * @param method 请求类型(GET/POST/DELETE等)
 * @param data 请求体数据
 * @param loading 请求未完成是是否显示加载中，默认不显示
 * @param retryCount 当前重试次数（内部使用）
 */
const request = (url, data = {}, loading = false, method = 'POST', retryCount = 0) => {
	const requestKey = getRequestKey(url, data, method)
	
	// 如果已有相同请求在进行，返回该请求的Promise
	if (requestQueue.has(requestKey)) {
		return requestQueue.get(requestKey)
	}
	
	const requestPromise = new Promise((resolve, reject) => {
		if (loading) {
			toast.showLoading('加载中')
		}
		
		const requestTask = uni.request({
			url: options.baseUrl + url,
			method: method,
			data: data,
			header: {
				...options.header,
				'Authorization': store.state.token,
				'client_type': 'APP',
				'BANKTYPE': '7'
			},
			timeout: options.timeout,
			dataType: options.dataType,
			success: res => {
				requestQueue.delete(requestKey)
				handleResponse(res, resolve, reject, loading)
			},
			fail: err => {
				requestQueue.delete(requestKey)
				
				// 判断是否需要重试
				const needRetry = options.retry.timeoutUrls.some(timeoutUrl => url.includes(timeoutUrl))
				const isTimeout = err.errMsg && (err.errMsg.includes('timeout') || err.errMsg.includes('超时'))
				
				if (needRetry && isTimeout && retryCount < options.retry.count) {
					// 延迟后重试
					delay(options.retry.delay * (retryCount + 1)).then(() => {
						console.log(`请求重试 ${retryCount + 1}/${options.retry.count}: ${url}`)
						request(url, data, loading, method, retryCount + 1)
							.then(resolve)
							.catch(reject)
					})
				} else {
					// 最终失败处理
					if (isTimeout) {
						toast.showError('请求超时，请检查网络后重试')
					} else {
						toast.showError('网络请求失败，请稍后重试')
					}
					reject(err)
				}
			}
		})
		
		// 存储请求任务，用于取消
		requestTask.requestKey = requestKey
	})
	
	// 将请求Promise存入队列
	requestQueue.set(requestKey, requestPromise)
	
	return requestPromise
}

// 取消请求
const cancelRequest = (url, data = {}, method = 'POST') => {
	const requestKey = getRequestKey(url, data, method)
	requestQueue.delete(requestKey)
}

// 取消所有请求
const cancelAllRequests = () => {
	requestQueue.clear()
}

/*
 * 全局请求封装：文件上传请求
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
	uploadFileRequest,
	cancelRequest,
	cancelAllRequests
}