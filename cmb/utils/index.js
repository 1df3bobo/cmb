import store from "../store";
// 获取当前路由信息
const getCurrentRoute = () => {
	let pages = getCurrentPages();
	let currPage = null;
	if (pages.length) {
		currPage = pages[pages.length - 1];
	}
	return currPage.route

}
const rpx2px = (rpx) => { //rpx转px
	return rpx / 750 * uni.getSystemInfoSync().windowWidth;
}
const px2rpx = (px) => { //px转rpx
	return px * 750 / uni.getSystemInfoSync().windowWidth;
}
const navigateTo = (options) => { // 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
	const loginRequiredPages = [
		'/pages/account/account/account',
		'/pages/transfer/index/index',
		'/pages/bill/bill',
		'/pages/water/water/water',
		'pages/my/my',
		'/pages/message/center'
	];
	console.log(store.state.isLogin);
	const path = options.url.split('?')[0];
	// 检查是否需要登录
	if (loginRequiredPages.includes(path) && !store.state.isLogin) {
		// 跳转到登录页，并传递原目标页面URL
		uni.redirectTo({
			url: `/pages/login/login?path=${getCurrentRoute()}`
		})
		return;
	}
	uni.navigateTo({
		url: options.url,
		complete: options.complete
	})
}
const redirectTo = (options) => { // 关闭当前页面，跳转到应用内的某个页面。
	uni.redirectTo({
		url: options.url,
		...options
	})
}
const reLaunch = (options) => { // 关闭所有页面，打开到应用内的某个页面。
	uni.reLaunch({
		url: options.url
	})
}
const switchTab = (options) => { // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
	uni.switchTab({
		url: options.url
	})
}
const navigateBack = () => { // 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages() 获取当前的页面栈，决定需要返回几层。
	uni.navigateBack({
		fail: () => {
			switchTab({
				url: '/pages/index/index'
			})
		}
	})
}
// 获取时间戳
const getTime = (date) => {
	if (!date) {
		return Date.now()
	}
	let newTime = date.replace(/-/g, '/')
	return new Date(newTime).getTime();
}

// 获取当前日期
const getCurrentDate = () => {
	return new Date();
};

// 获取本月开始和结束日期
const getCurrentMonthRange = () => {
	const now = getCurrentDate();
	const start = new Date(now.getFullYear(), now.getMonth(), 1);
	const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
	end.setHours(23, 59, 59, 999); // 设置为当天的最后一刻

	return {
		start: formatDate(start),
		end: formatDate(end)
	};
};

// 获取近三个月的日期范围
const getLastThreeMonthsRange = () => {
	const now = getCurrentDate();
	const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
	const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
	end.setHours(23, 59, 59, 999);

	return {
		start: formatDate(start),
		end: formatDate(end)
	};
};

// 获取近半年的日期范围
const getLastHalfYearRange = () => {
	const now = getCurrentDate();
	const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
	const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
	end.setHours(23, 59, 59, 999);

	return {
		start: formatDate(start),
		end: formatDate(end)
	};
};

// 获取近一年的日期范围
const getLastYearRange = () => {
	const now = getCurrentDate();
	const start = new Date(now.getFullYear() - 1, now.getMonth(), 1);
	const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
	end.setHours(23, 59, 59, 999);

	return {
		start: formatDate(start),
		end: formatDate(end)
	};
};

// 格式化日期为 YYYY-MM-DD
const formatDate = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};
const showPhoneNo = (phoneNo) => { //手机号*号显示
	if (!phoneNo) {
		return ''
	}
	return phoneNo.substring(0, 3) + '****' + phoneNo.substring(7);
}
//取卡号的前四位和后四位 其余*号代替
const repeatCardNumber = (cardNumber) => {
	if (!cardNumber || cardNumber.length < 5) return
	let firstFour = cardNumber.substring(0, 4); // 提取前四位
	let lastFour = cardNumber.substring(cardNumber.length - 4); // 提取后四位
	let masked = '*'.repeat(cardNumber.length - 8); // 中间部分用 * 替代

	return `${firstFour} ${masked} ${lastFour}`; // 返回格式化后的银行卡号
}
const formatAmount = (amount) => { //将数字格式化为每三位用逗号分隔：
	if (amount === 0) {
		return amount
	}
	if (!amount) return
	let [integerPart, decimalPart] = amount.toString().split('.'); // 拆分整数部分和小数部分
	integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 给整数部分每三位添加逗号
	return decimalPart ? `${integerPart}.${decimalPart}` : integerPart; // 如果有小数部分，重新拼接
}
// 取数字的整数或者小数部分
const numberParts = (number) => {
	const numStr = String(number);
	const [integerPart, decimalPart = ''] = numStr.split('.');
	return {
		integer: integerPart,
		decimal: decimalPart ? decimalPart : '00',
	}
}

export {
	rpx2px,
	px2rpx,
	navigateTo,
	redirectTo,
	reLaunch,
	switchTab,
	navigateBack,
	getTime,
	getCurrentMonthRange,
	getLastThreeMonthsRange,
	getLastHalfYearRange,
	getLastYearRange,
	showPhoneNo,
	getCurrentRoute,
	repeatCardNumber,
	formatAmount,
	numberParts,
}