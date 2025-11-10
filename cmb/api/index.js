import {
	request,
	uploadFileRequest
} from '@/utils/request.js'
/*
 * 全局请求封装
 * @param url 请求路径
 * @param method 请求类型(GET/POST/DELETE等)
 * @oaram data 请求体数据
 * @param loading 请求未完成是是否显示加载中，默认不加载
 */
// 登录
const login = (params = {}) => request('/auth/api/login', params)
// 获取用户信息
const getMemberInfo = (params = {}) => request('/servicecmb/member/info', params)
// 获取会员账户总览
const getAccountView = (params = {}) => request('/servicecmb/member/accountView', params, false, 'GET')
// 获取联系人列表
const getContactsList = (params = {}) => request('/servicecmb/contacts/list', params, false, 'GET')
// 银行卡转账
const billTransfer = (params = {}) => request('/servicecmb/bill/transfer', params, true)
// 获取银行列表
const getBankList = (params = {}) => request('/servicecmb/bank/list', params, true, 'GET')
// 查询转账列表记录
const getTransferRecord = (params = {}, loading = true) => request('/servicecmb/bill/transferPage', params, loading,
	'GET')
// 账单信息打印 流水打印
const flowExportPrint = (params = {}) => request('/servicecmb/flowExport/print', params, true, )
// 账单信息打印 流水打印记录列表
const flowExportRecordList = (params = {}) => request('/servicecmb/flowExport/applyPage', params, false, 'GET')
// 查询转账详情
const getTransferInfo = (params = {}) => request('/servicecmb/bill/transferInfo', params, false, 'GET')
// 获取账单列表
const getBillPage = (params = {}) => request('/servicecmb/bill/page', params, false, 'GET')
// 获取范围账单列表
const getBillPageRangePayment = (params = {}) => request('/servicecmb/bill/pageRangePayment', params, false, 'GET')
// 获取月度账单列表
const getMonthBillList = (params = {}) => request('/servicecmb/bill/monthBillList', params, false, 'GET')
// 获取月度账单详情
const getMonthBillDetails = (params = {}) => request('/servicecmb/bill/monthBill', params, false, 'GET')
// 获取收支分析
const getBillAnalysis = (params = {}) => request('/servicecmb/bill/analysis', params, false, 'GET')
// 获取收支分析
const incomeExpenseRank = (params = {}) => request('/servicecmb/bill/incomeExpenseRank', params, false, 'GET')
// 获取分类账单列表信息
const getBillCategoryList = (params = {}) => request('/servicecmb/bill/categoryList', params, false, 'GET')
export {
	login,
	getMemberInfo,
	getAccountView,
	getContactsList,
	billTransfer,
	getBankList,
	getTransferRecord,
	flowExportPrint,
	flowExportRecordList,
	getTransferInfo,
	getBillPage,
	getMonthBillList,
	getBillPageRangePayment,
	getMonthBillDetails,
	getBillAnalysis,
	incomeExpenseRank,
	getBillCategoryList
}