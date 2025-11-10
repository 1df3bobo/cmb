export default {
	//成功提示
	showSuccess(message) {
		let duration = 1500;
		return new Promise((resolve, reject) => {
			uni.showToast({
				title: message,
				icon: 'success',
				mask: true,
				duration: duration,
				success: () => {
					setTimeout(() => {
						resolve();
					}, duration)
				},
				fail: () => {
					reject();
				}
			})
		})
	},
	//失败提示
	showError(message) {
		let duration = 1500;
		return new Promise((resolve, reject) => {
			uni.showToast({
				icon: 'error',
				title: message,
				mask: true,
				duration: duration,
				success: () => {
					setTimeout(() => {
						resolve();
					}, duration)
				},
				fail: () => {
					reject();
				}
			})
		})
	},
	//消息提示
	msgBox(message) {
		console.log(message, 'msgBox')
		uni.showToast({
			icon: 'none',
			title: message,
			duration: 1500,
			mask: true,
		})
	},
	//加载提示
	showLoading(message) {
		uni.showLoading({
			title: message || '加载中...',
			mask: true,
		})
	},
	//关闭加载提示
	hideLoading() {
		uni.hideLoading();
	},
	//提示框
	alert(config) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: config.title,
				content: config.content,
				showCancel: false, // 不显示取消按钮
				confirmText: config.confirmText || '确定',
				success: (res) => {
					if (res.confirm) {
						resolve(true); // 用户点击确定
					}
				},
				fail: (err) => {
					reject(err);
				}
			});
		});
	},
	//确认框
	confirm(config) {
		return new Promise((resolve, reject) => {
			uni.showModal({
				title: config.title,
				content: config.content,
				confirmText: config.confirmText || '确定',
				confirmColor: config.confirmColor || '#F20029',
				cancelText: config.cancelText || '取消',
				cancelColor: config.cancelColor || '#111111',
				success: (res) => {
					if (res.confirm) {
						resolve(true); // 用户点击确定
					} else if (res.cancel) {
						resolve(false); // 用户点击取消
					}
				},
				fail: (err) => {
					reject(err);
				}
			});
		});
	},
}