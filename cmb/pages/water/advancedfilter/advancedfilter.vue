<template>
	<view class="app">
		<navbar bg-color="#f8f8f8">
			<view class="nav">
				<image class="nav-home" src="/static/navIcon/fangzi.png" mode=""></image>
				<view class="title">流水打印</view>
				<image class="nav-right" src="/static/navIcon/xiaochengxu.png" mode=""></image>
			</view>
		</navbar>
		<view class="main">
			<view class="form">
				<view class="item">
					<view class="label">卡号</view>
					<view class="content">{{repeatCardNumber(userInfo.bankList[0].bankCard)}}</view>
				</view>
			</view>
			<view class="form">
				<view class="item" @click="openDatePop('start')">
					<view class="label">起始时间</view>
					<view class="content">
						<view class="time">
							<text>{{startTime}}</text>
							<image class="time-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="item" @click="openDatePop('end')">
					<view class="label">结束时间</view>
					<view class="content">
						<view class="time">
							<text>{{endTime}}</text>
							<image class="time-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="tips">交易流水数据更新截止至{{getDatesRelativeToToday.twoDaysAgo}}</view>
			</view>
			<view class="form">
				<view class="item" @click="abstractTypeShow = true">
					<view class="label">展示摘要类型</view>
					<view class="content">
						<view class="time">
							<text>{{abstractType}}</text>
							<image class="time-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="label">展示对方交易信息</view>
					<view class="content">
						<u-switch v-model="transactioninfShow" inactiveColor='#D2CFC8' activeColor="#316EE5"
							size="24"></u-switch>
					</view>
				</view>
				<view class="item">
					<view class="label">显示完整卡号</view>
					<view class="content">
						<u-switch v-model="cardNumberShow" inactiveColor='#D2CFC8' activeColor="#316EE5"
							size="24"></u-switch>
					</view>
				</view>
				<view class="item">
					<view class="label">展示收支及支出汇总金额</view>
					<view class="content">
						<u-switch v-model="summarizeAmountShow" inactiveColor='#D2CFC8' activeColor="#316EE5"
							size="24"></u-switch>
					</view>
				</view>
				<view class="item" @click="tradingCurrencyShow = true">
					<view class="label">交易币种</view>
					<view class="content">
						<view class="time">
							<text>{{currency}}</text>
							<image class="time-icon" src="/static/icon/arrow-gray-right.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="label">金额区间</view>
					<view class="content">
						<u-switch v-model="amountRangeShow" inactiveColor='#D2CFC8' activeColor="#316EE5"
							size="24"></u-switch>
					</view>
				</view>
				<view class="item" v-if="amountRangeShow">
					<view class="label">输入区间范围</view>
					<view class="content">
						<view class="amount-range">
							<input v-model="minAmount" type="number" class="amount-range-input" placeholder="最小值" />
							<text class="txt">-</text>
							<input v-model="maxAmount" type="number" class="amount-range-input" placeholder="最大值" />
						</view>
					</view>
				</view>
			</view>
			<view class="form">
				<view class="item">
					<view class="label">仅展示活期流水</view>
					<view class="content">
						<u-switch v-model="currentAccountFlowShow" inactiveColor='#D2CFC8' activeColor="#316EE5"
							size="24"></u-switch>
					</view>
				</view>
				<view class="item">
					<view class="label">交易类型</view>
					<view class="content">
						<view class="list">
							<view v-for="(item,index) in transactionType" :key="index"
								:class="['time-item' ,selectTransactionType===item.name?'active':'']"
								@click="changeTransactionType(item)">{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="form">
				<view class="item">
					<view class="label">接收邮箱</view>
					<view class="content">
						<input type="text" v-model="email" class="input" placeholder="请输入邮箱"
							placeholder-style="color:#999999">
					</view>
				</view>
			</view>
			<view class="agreement">
				<image @click="agreement = true" v-show="!agreement" class="agreement-icon"
					src="/static/icon/no-selectde.png" mode=""></image>
				<image @click="agreement = false" v-show="agreement" class="agreement-icon"
					src="/static/icon/selectde.png" mode=""></image>
				<view class="agreement-text" @click="goAgreement('/static/pages/lsdyfwxy_1.png')">
					我已阅读并同意<text>《招商银行打印交易流水服务协议》</text>
				</view>
			</view>
			<view :class="['btn',agreement?'active':'']" @click="submit">确认并提交</view>
			<view class="footer">
				<view class="footer-item" @click="goRecord">
					申请记录
				</view>
				<view class="footer-item" @click="samplePreview">
					样例预览
				</view>
				<view class="footer-last" @click="goAgreement('/static/pages/lsdy_wzsm.png')">
					常见问题
				</view>
			</view>
			<view class="tips-content">
				<view class="title">
					温馨提示
				</view>
				<view class="content">
					1.交易流水涉及您的个人隐私，为保护您的隐私，收件人限本人
				</view>
				<view class="content">
					2.请根据需要选择是否展示完整卡号
				</view>
			</view>
		</view>
		<u-datetime-picker confirmColor="#2F6EE5" @confirm="confirmTime" @cancel="closeTime" v-if="datePop"
			closeOnClickOverlay @close="closeTime"
			:max-date="convertDateToTimestamp(getDatesRelativeToToday.twoDaysAgo)" itemHeight="40" :show="dateShow"
			v-model="dateValue" mode="date"></u-datetime-picker>
		<!-- 交易币种弹窗 -->
		<tradingCurrencyPop :value="currency" @change="changeTradingCurrency" @close="tradingCurrencyShow = false"
			:show="tradingCurrencyShow"></tradingCurrencyPop>
		<u-modal @cancel="confirmTipsShow = false" closeOnClickOverlay @close="confirmTipsShow = false"
			:show="confirmTipsShow" @confirm="confirm" confirmText="确认邮箱" confirm-color="#2F6EE5" showCancelButton
			cancelText="更改">
			<view class="slot-content">
				<view class="slot-confirm">
					<view class="slot-content-title">
						提示
					</view>
					<view class="slot-content-text" style="word-break: break-all;
			word-wrap: break-word;line-height: 48rpx;">
						请确认您的邮箱<text style="color: #2F6EE5;"
							class="slot-content-text-active">{{email}}</text>填写无误，证明文件包含个人重要隐私信息，请勿随意发送他人
					</view>
				</view>
			</view>
		</u-modal>
		<abstractTypePop @change="changeAbstractType" @close="abstractTypeShow = false" :show="abstractTypeShow">
		</abstractTypePop>
		<passwordPop @confirm="flowExportPrint" @close="passwordShow= false" :show="passwordShow"></passwordPop>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import {
		navigateTo,
		repeatCardNumber
	} from '@/utils/index.js'
	import {
		flowExportPrint
	} from '@/api/index.js'
	import toast from '../../../utils/toast'
	export default {
		data() {
			return {
				abstractType: '交易摘要', // 摘要类型
				abstractTypeShow: false, // 摘要类型弹窗
				passwordShow: false,
				confirmTipsShow: false, // 确认提示弹窗是否展示
				tradingCurrencyShow: false,
				type: '',
				agreement: false,
				dateShow: false,
				datePop: false,
				dateValue: '',
				repeatCardNumber: repeatCardNumber,
				startTime: '',
				endTime: '',
				currency: '全部', // 币种
				transactioninfShow: true, // 展示对方交易信息
				cardNumberShow: false, // 显示完整卡号
				summarizeAmountShow: false, // 展示收支及汇总金额
				amountRangeShow: false, // 金额区间是否展示
				currentAccountFlowShow: false, // 是否仅展示活期流水
				maxAmount: '', // 最大交易金额
				minAmount: '', // 最小交易金额
				email: '', //邮箱
				transactionType: [{
						name: '全部',
					},
					{
						name: '收入类',
					},
					{
						name: '支出类',
					},
				],
				selectTransactionType: '全部'
			}
		},
		computed: {
			...mapState(['userInfo']),
			convertDateToTimestamp() {
				return (dateString) => {
					const regex = /(\d{4})年(\d{2})月(\d{2})日/;
					const match = dateString.match(regex);
					if (match) {
						const year = match[1];
						const month = match[2] - 1; // 月份从0开始
						const day = match[3];
						const date = new Date(year, month, day);

						return date.getTime();
					} else {
						return null;
					}
				}
			},
			// 将 "2025年09月03日" 转换为 "2025-09-03" 格式
			convertToStandardDate(dateString) {
				return (dateString) => {
					const regex = /(\d{4})年(\d{2})月(\d{2})日/;
					const match = dateString.match(regex);

					if (match) {
						const year = match[1];
						const month = match[2];
						const day = match[3];

						return `${year}-${month}-${day}`;
					} else {
						return null;
					}
				}

			},

			// 时间戳转日期格式
			convertTimestampToDate() {
				return (timestamp) => {
					const date = new Date(timestamp);
					const year = date.getFullYear();
					const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
					const day = String(date.getDate()).padStart(2, '0');
					return `${year}年${month}月${day}日`;
				}
			},

			//获取前两天的日期， 半年前和一年前的日期
			getDatesRelativeToToday() {
				// 获取当前日期
				const today = new Date();
				// 获取前两天的日期
				const twoDaysAgo = new Date(today);
				twoDaysAgo.setDate(today.getDate() - 2);
				// 获取前两天的半年前的日期
				const sixMonthsAgo = new Date(twoDaysAgo);
				sixMonthsAgo.setMonth(twoDaysAgo.getMonth() - 6);
				// 获取前两天的一年前的日期
				const oneYearAgo = new Date(twoDaysAgo);
				oneYearAgo.setFullYear(twoDaysAgo.getFullYear() - 1);
				// 格式化日期为 "YYYY年MM月DD日"
				const formatDate = (date) => {
					const year = date.getFullYear();
					const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
					const day = String(date.getDate()).padStart(2, '0');
					return `${year}年${month}月${day}日`;
				};

				// 返回结果
				return {
					twoDaysAgo: formatDate(twoDaysAgo),
					sixMonthsAgo: formatDate(sixMonthsAgo),
					oneYearAgo: formatDate(oneYearAgo)
				};
			}
		},
		onLoad() {
			this.get_user_info()
			this.startTime = this.getDatesRelativeToToday.sixMonthsAgo
			this.endTime = this.getDatesRelativeToToday.twoDaysAgo
		},
		methods: {
			...mapActions(['get_user_info']),
			submit() {
				if (!this.agreement) return
				const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				if (!regex.test(this.email)) {
					toast.msgBox('请输入正确的接受邮箱')
					return
				}
				this.confirmTipsShow = true
			},
			confirm() {
				this.confirmTipsShow = false
				this.passwordShow = true
			},
			flowExportPrint() {
				let transactioninf = this.transactioninfShow ? '0' : ''
				let cardNumber = this.cardNumberShow ? '1' : ''
				let summarizeAmount = this.summarizeAmountShow ? '2' : ''
				let currentAccountFlow = this.currentAccountFlowShow ? '3' : ''
				let values = [transactioninf, cardNumber, summarizeAmount, currentAccountFlow].filter(val => val !==
					'');
				let showType = values.length > 0 ? values.join(',') : '';
				flowExportPrint({
					currency: this.currency,
					beginTime: this.convertToStandardDate(this.startTime),
					endTime: this.convertToStandardDate(this.endTime),
					maxAmount: this.maxAmount,
					minAmount: this.minAmount,
					email: this.email,
					fileType: 'pdf',
					showType: showType,
					transactionType: this.selectTransactionType,
					excerptType: this.abstractType
				}).then((res) => {
					if (res.code === 200) {
						toast.showSuccess('验证成功').then(() => {
							navigateTo({
								url: '/pages/water/result/result?email=' + this.email
							})
							this.passwordShow = false
						})
					}
				})
			},
			// 交易类型切换
			changeTransactionType(item) {
				this.selectTransactionType = item.name
			},
			// 选择交易币种
			changeTradingCurrency(item) {
				this.currency = item
			},
			// 选择摘要类型
			changeAbstractType(item) {
				this.abstractType = item
			},
			openDatePop(type) {
				if (type === 'start') {
					this.dateValue = this.convertDateToTimestamp(this.startTime)

				} else {
					this.dateValue = this.convertDateToTimestamp(this.endTime)
				}
				this.datePop = true
				this.type = type
				this.$nextTick(() => {
					this.dateShow = true
				})

			},
			confirmTime(e) {
				if (this.type === 'start') {
					this.startTime = this.convertTimestampToDate(e.value)
				} else {
					this.endTime = this.convertTimestampToDate(e.value)
				}
				this.closeTime()
			},
			closeTime() {
				this.dateShow = false
				setTimeout(() => {
					this.datePop = false
				}, 500)
			},
			samplePreview() {
				navigateTo({
					url: '/pages/water/samplePreview/samplePreview'
				})
			},
			goAgreement(pageImage) {
				navigateTo({
					url: '/pages/water/agreement/agreement?pageImage=' + pageImage
				})
			},
			goRecord() {
				navigateTo({
					url: '/pages/water/applyRecord/applyRecord'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.app {
		width: 750rpx;
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.nav {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 400;
		font-size: 36rpx;
		padding-left: 126rpx;
		padding-right: 26rpx;
		box-sizing: border-box;

		.nav-right {
			width: 172rpx;
			height: 72rpx;
		}

		.nav-home {
			width: 44rpx;
			height: 44rpx;

		}

	}

	.main {
		width: 100%;

		.form {
			width: 100%;
			margin-bottom: 20rpx;
			background: #FFFFFF;

			.item {
				width: 750rpx;
				height: 98rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 26rpx;
				box-sizing: border-box;
				color: #333333;
				font-size: 30rpx;

				.label {
					margin-right: 20rpx;
				}

				.content {
					margin-left: 20rpx;


					.amount-range {
						width: 100%;
						display: flex;

						.amount-range-input {
							width: 150rpx;
							font-size: 30rpx;
							// text-align: center;
						}

						.txt {
							margin-right: 50rpx;
						}

					}

					.list {
						display: flex;
						align-items: center;

						.time-item {
							width: 110rpx;
							height: 60rpx;
							background: #E4E4E4;
							border-radius: 4rpx;
							text-align: center;
							line-height: 60rpx;
							margin-left: 23rpx;
							color: #666666;
							font-size: 30rpx;

							&.active {
								background-color: #E6EBF5;
								color: #2F6EE5;
							}
						}
					}

					.time {
						display: flex;
						align-items: center;

						.time-icon {
							width: 44rpx;
							height: 44rpx;
						}
					}

					.input {
						text-align: right;
					}
				}
			}


			.tips {
				margin-top: 15rpx;
				text-align: right;
				padding-bottom: 42rpx;
				padding-right: 30rpx;
				color: #666666;
				font-size: 28rpx;
			}
		}

		.sift-btn {
			margin: 28rpx 0 56rpx 0;
			padding: 0 18rpx;
			box-sizing: border-box;
			text-align: right;
			color: #2F6EE5;
			font-size: 30rpx;
			line-height: 1;
		}


		.agreement {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 20rpx;
			box-sizing: border-box;
			margin-bottom: 26rpx;

			.agreement-icon {
				width: 42rpx;
				height: 42rpx;
				margin-right: 20rpx;
			}

			.agreement-text {
				color: #666666;
				font-size: 28rpx;

				text {
					color: #2F6EE5;
				}
			}
		}

		.btn {
			width: 690rpx;
			height: 84rpx;
			background: #FC8A8E;
			border-radius: 42rpx;
			color: #FFFFFF;
			font-size: 34rpx;
			text-align: center;
			line-height: 84rpx;
			margin: 0 auto 47rpx;

			&.active {
				background-color: #E75258;
			}
		}

		.footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 147rpx;
			box-sizing: border-box;
			color: #2F6EE5;
			font-size: 30rpx;

			.footer-item {
				margin-bottom: 50rpx;
				position: relative;

				&:before {
					width: 1rpx;
					height: 30rpx;
					background-color: #2D6FE8;
					content: '';
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: -24rpx;
				}


			}

			.footer-last {
				margin-bottom: 50rpx;
				position: relative;
			}
		}
	}

	.slot-confirm {
		width: 100%;

		.slot-content-title {

			font-size: 32rpx;
			color: #333333;
			line-height: 48rpx;
			margin-bottom: 24rpx;

			.slot-content-text {
				color: #2F6EE5;

				.slot-content-text-active {
					color: #2F6EE5;
				}
			}
		}
	}

	.tips-content {
		width: 100%;
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;

		.title {
			font-size: 32rpx;
			color: #333;
			margin-bottom: 10rpx;

		}

		.content {
			font-size: 28rpx;
			line-height: 40rpx;
		}
	}
</style>