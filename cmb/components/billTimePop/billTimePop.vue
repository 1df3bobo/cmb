<template>
	<view>
		<u-popup :show="show" round="16rpx" @close="close" closeable>
			<view class="main">
				<view class="title">
					<view :class="['title-item',activeTitle==1?'active-title':'']" @click="changeTitle(1)">
						月份选择
					</view>
					<view :class="['title-item',activeTitle==2?'active-title':'']" @click="changeTitle(2)">
						自定义
					</view>
				</view>
				<view class="month-select" v-if="activeTitle==1">
					<u-datetime-picker :show="monthShow" @change="monthChange" :showToolbar="false" :max-date="maxMonth"
						v-model="monthValue" mode="year-month"></u-datetime-picker>
					<view class="customizep-confirm">
						<view class="customizep-confirm-btn" @click="monthConfirm">
							确认
						</view>
					</view>
				</view>
				<view class="custom" v-if="activeTitle==2">
					<view class="shortcut">
						<view class="shortcut-title">交易时间</view>
						<view class="shortcut-list">
							<view @click="shortcutSelect(item)" :class="['item',selectTime===item.id?'active':'']"
								v-for="(item,index) in list" :key="index">{{item.title}}</view>
						</view>
					</view>
					<view class="customizep-time">
						<view class="customizep-title">自定义</view>
						<view class="customizep-content">
							<view :class="['item',type==1?'active':'']" @click="selectCustomizep('1')">
								{{customizepStartTime.startCn}}
							</view>
							<view class="item-centent">
								-
							</view>
							<view :class="['item',type==2?'active':'']" @click="selectCustomizep('2')">
								{{customizepEndTime.endCn}}
							</view>
						</view>
						<u-datetime-picker ref="datetimepicker" :minDate="minDate" itemHeight="34" :maxDate="maxDate"
							:show="(type==1||type==2)" @change="pickerChange" v-model="timeValue" :showToolbar="false"
							mode="date"></u-datetime-picker>
						<view class="customizep-confirm" v-if="(type==1||type==2)">
							<view class="customizep-confirm-btn" @click="pickerConfirm">
								确认
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	let setMinDate = () => {
		// 获取当前时间
		const currentDate = new Date();
		// 设置为三年前
		currentDate.setFullYear(currentDate.getFullYear() - 2);
		// 设置为 1 月 1 日
		currentDate.setMonth(0); // 0 表示一月
		currentDate.setDate(1); // 设置为 1 号
		// 获取时间戳（单位：毫秒）
		return currentDate.getTime();
	}
	import {
		mapState,
	} from 'vuex'
	export default {
		name: "billTimePop",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: [Number, String],
				default: 1
			},
			time: {
				type: [Number, String],
				default: 'thisMonth'
			}
		},
		data() {
			return {
				type: '',
				activeTitle: 1,
				monthShow: true,
				monthValue: Date.now(),
				maxMonth: Date.now(),
				customizepStartTime: {
					beginTime: '',
					beginTimeCn: '',
				},
				customizepEndTime: {
					endTime: '',
					endTimeCn: '',
				},
				selectTime: 'thisMonth',
				minDate: setMinDate(),
				maxDate: Date.now(),
				timeValue: '',
				list: [{
						title: '上个月',
						time: '',
						id: 'lastMonth',
					},
					{
						title: '近三个月',
						time: '',
						id: 'lastThreeMonths',
					},
					{
						title: '近一年',
						time: '',
						id: 'lastOneYear',
					}
				],
			};
		},
		watch: {
			selectTime: {
				handler(n, o) {
					if (n) {
						this.customizepStartTime = {
							startCn: this.getDateRanges[n].startCn,
							start: this.getDateRanges[n].start
						}
						this.customizepEndTime = {
							endCn: this.getDateRanges[n].endCn,
							end: this.getDateRanges[n].end
						}
					}

				},
				immediate: true
			},
			time: {
				handler(n, o) {
					if (n) {
						this.selectTime = n
						this.customizepStartTime = {
							startCn: this.getDateRanges[n].startCn,
							start: this.getDateRanges[n].start
						}
						this.customizepEndTime = {
							endCn: this.getDateRanges[n].endCn,
							end: this.getDateRanges[n].end
						}
					}

				},
				immediate: true
			},
			title: {
				handler(n, o) {
					if (n) {
						this.activeTitle = n
					}

				},
				immediate: true
			}
		},
		computed: {
			...mapState(['userInfo']),
			formatDate() {
				return (date, format, isMonth) => {
					const year = date.getFullYear();
					const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，所以要加1
					const day = date.getDate().toString().padStart(2, '0');

					if (format === 'yyyy-mm-dd') {
						return `${year}-${month}-${day}`;
					} else if (format === 'yyyy年mm月dd日') {
						if (isMonth) {
							return `${year}年${month}`;
						} else {
							return `${year}年${month}月${day}日`;
						}
					}
				}
			},
			getDateRanges() {
				const today = new Date();
				// 上个月
				const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
				const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
				// 本月
				const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
				const lastDayOfMonth = today
				// 近三个月
				const firstDayOfThreeMonthsAgo = new Date(today);
				firstDayOfThreeMonthsAgo.setMonth(today.getMonth() - 3);
				// 近一年
				const firstDayOfOneYearAgo = new Date(today);
				firstDayOfOneYearAgo.setFullYear(today.getFullYear() - 1);

				// 输出日期范围
				return {
					lastMonth: {
						start: this.formatDate(firstDayOfLastMonth, 'yyyy-mm-dd'),
						end: this.formatDate(lastDayOfLastMonth, 'yyyy-mm-dd'),
						startCn: this.formatDate(firstDayOfLastMonth, 'yyyy年mm月dd日'),
						endCn: this.formatDate(lastDayOfLastMonth, 'yyyy年mm月dd日'),
						text: '上个月'
					},
					thisMonth: {
						start: this.formatDate(firstDayOfMonth, 'yyyy-mm-dd'),
						end: this.formatDate(lastDayOfMonth, 'yyyy-mm-dd'),
						startCn: this.formatDate(firstDayOfMonth, 'yyyy年mm月dd日'),
						endCn: this.formatDate(lastDayOfMonth, 'yyyy年mm月dd日'),
						text: ''
					},
					lastThreeMonths: {
						start: this.formatDate(firstDayOfThreeMonthsAgo, 'yyyy-mm-dd'),
						end: this.formatDate(today, 'yyyy-mm-dd'), // 结束时间为今天
						startCn: this.formatDate(firstDayOfThreeMonthsAgo, 'yyyy年mm月dd日'),
						endCn: this.formatDate(today, 'yyyy年mm月dd日'), // 结束时间为今天
						text: '近三个月'
					},
					lastOneYear: {
						start: this.formatDate(firstDayOfOneYearAgo, 'yyyy-mm-dd'),
						end: this.formatDate(today, 'yyyy-mm-dd'), // 结束时间为今天
						startCn: this.formatDate(firstDayOfOneYearAgo, 'yyyy年mm月dd日'),
						endCn: this.formatDate(today, 'yyyy年mm月dd日'), // 结束时间为今天
						text: '近一年'
					},
				};
			},
		},
		methods: {
			close() {
				this.$emit('close')
			},
			changeTitle(type) {
				this.activeTitle = type
				if (type == 2) {
					this.customizepStartTime = {
						startCn: this.getDateRanges['thisMonth'].startCn,
						start: this.getDateRanges['thisMonth'].start
					}
					this.customizepEndTime = {
						endCn: this.getDateRanges['thisMonth'].endCn,
						end: this.getDateRanges['thisMonth'].end
					}
				}
			},
			monthChange(e) {
				let date = new Date(e.value)
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0')
				const firstDay = new Date(year, month - 1, 1);
				const lastDay = new Date(year, month, 0);
				this.customizepEndTime = {
					endCn: this.formatDate(lastDay, 'yyyy年mm月dd日', true),
					end: this.formatDate(lastDay, 'yyyy-mm-dd')
				}
				this.customizepStartTime = {
					startCn: this.formatDate(firstDay, 'yyyy年mm月dd日', true),
					start: this.formatDate(firstDay, 'yyyy-mm-dd')
				}
			},
			// 月份选择确认
			monthConfirm() {
				const parts = this.customizepStartTime.start.split('-');
				const text = `${parts[0]}.${parts[1]}`;
				let obj = {
					...this.customizepEndTime,
					...this.customizepStartTime,
					text: text
				}
				this.$emit('select', {
					data: obj,
					activeTitle: this.activeTitle
				})
				this.close()
			},
			pickerConfirm() {
				let text = this.customizepStartTime.start.replace(/-/g, '.') + '-' + this.customizepEndTime.end.replace(
					/-/g, '.')
				let obj = {
					...this.customizepEndTime,
					...this.customizepStartTime,
					text: text

				}
				this.$emit('select', {
					data: obj,
					activeTitle: this.activeTitle
				})
				this.close()
			},
			shortcutSelect(item) { // 自定义选择交易时间快捷选择
				if (this.selectTime === item.id) return
				this.selectTime = item.id
				this.$emit('select', {
					data: this.getDateRanges[item.id],
					activeTitle: this.activeTitle
				})
				this.close()
				this.type = ''
			},
			// 自定义选择交易时间切换
			async selectCustomizep(type) {
				this.type = type
				let date
				if (type == 1) {
					date = new Date(this.customizepStartTime.start);
					const timestamp = date.getTime();
					this.timeValue = timestamp
				} else {
					date = new Date(this.customizepEndTime.end);
					const timestamp = date.getTime();
					this.timeValue = timestamp

				}
				await this.$nextTick();
				this.$refs.datetimepicker.init()
			},
			pickerChange(e) {
				if (this.type == 1) {
					this.customizepStartTime = {
						startCn: this.formatDate(new Date(e.value), 'yyyy年mm月dd日'),
						start: this.formatDate(new Date(e.value), 'yyyy-mm-dd')
					}
					const selectedDate = new Date(e.value);
					const currentDate = new Date();
					const selectedYear = selectedDate.getFullYear();
					const currentYear = currentDate.getFullYear();
					let finalDate;
					if (selectedYear === currentYear) {
						finalDate = currentDate;
					} else {
						const oneYearLater = new Date(selectedDate);
						oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
						finalDate = oneYearLater > currentDate ? currentDate : oneYearLater;
					}
					this.customizepEndTime = {
						endCn: this.formatDate(new Date(finalDate), 'yyyy年mm月dd日'),
						end: this.formatDate(new Date(finalDate), 'yyyy-mm-dd')
					}
				}
				if (this.type == 2) {
					this.customizepEndTime = {
						endCn: this.formatDate(new Date(e.value), 'yyyy年mm月dd日'),
						end: this.formatDate(new Date(e.value), 'yyyy-mm-dd')
					}
				}
				this.selectTime = ''
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;
		min-height: 600rpx;

		.title {
			font-size: 36rpx;
			color: #333333;
			height: 116rpx;
			display: flex;
			align-items: center;
			padding-left: 40rpx;
			border-bottom: 1rpx solid #f8f8f8;

			.title-item {
				margin-right: 75rpx;
				height: 100%;
				display: flex;
				align-items: center;
			}

		}

		.custom {
			width: 100%;

			.customizep-time {
				width: 100%;
				padding: 0 30rpx;
				box-sizing: border-box;
				margin-top: 30rpx;

				.customizep-title {
					color: #777;
					font-size: 26rpx;

				}

				::v-deep .u-transition {
					position: relative !important;
					z-index: 1;
					transition-duration: 0ms !important;

				}

				.customizep-content {
					display: flex;
					align-items: center;
					margin-top: 26rpx;
					margin-bottom: 36rpx;

					.item {
						width: 290rpx;
						height: 70rpx;
						background-color: #f8f8f8;
						text-align: center;
						line-height: 70rpx;
						font-size: 28rpx;
						border-radius: 8rpx;
						color: #999;

					}

					.active {
						border: 1rpx solid #111111,
					}

					.item-centent {
						margin: 0 22rpx;
					}
				}
			}

			.shortcut {
				width: 100%;
				margin-top: 20rpx;
				padding: 0 30rpx;
				box-sizing: border-box;

				.shortcut-title {
					color: #777;
					font-size: 26rpx;
				}

				.shortcut-list {
					display: flex;
					align-items: center;

					.item {
						width: 20%;
						height: 60rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 1rpx solid #888;
						border-radius: 8rpx;
						margin-top: 26rpx;
						box-sizing: border-box;
						font-size: 26rpx;
						margin-right: 26rpx;
						color: #111;

						&.active {
							color: #ffffff;
							background-color: #666;
						}

					}
				}
			}

		}


		::v-deep .u-transition {
			position: relative !important;
			z-index: 1;
			transition-duration: 0ms !important;

			.u-picker__view {}
		}

		.active-title {
			position: relative;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				height: 4rpx;
				background-color: #333333;
				bottom: 8rpx;
				border-radius: 4rpx;
			}
		}

		.customizep-confirm {
			width: 100%;
			padding: 0 30rpx;
			box-sizing: border-box;
			text-align: center;
			color: #999;
			font-size: 24rpx;
			margin-top: 50rpx;

			.customizep-confirm-btn {
				width: 100%;
				height: 84rpx;
				background: #E75258;
				border-radius: 42rpx 42rpx 42rpx 42rpx;
				text-align: center;
				line-height: 84rpx;
				font-size: 34rpx;
				color: #FFFFFF;
				margin-top: 26rpx;
				margin-bottom: 50rpx;
			}
		}
	}
</style>