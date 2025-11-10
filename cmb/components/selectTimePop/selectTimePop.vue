<template>
	<view>
		<u-popup :show="show" round="16rpx" @close="close" closeable>
			<view class="main">
				<view class="title">交易时间</view>
				<view class="shortcut">
					<view class="shortcut-title">快捷选择</view>
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
						:show="(type==1||type==2)" @change="pickerChange" v-model="value1" :showToolbar="false"
						mode="date"></u-datetime-picker>
				</view>
				<view class="customizep-confirm" v-if="type==1||type==2">
					<view>最长时间可跨度一年的交易</view>
					<view class="customizep-confirm-btn" @click="customizepConfirm">
						确认
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
		getCurrentMonthRange,
		getLastThreeMonthsRange,
		getLastHalfYearRange,
		getLastYearRange
	} from '@/utils/index.js'
	export default {
		name: "selectTimePop",
		props: {
			show: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				type: '',
				maxDate: Date.now(),
				minDate: setMinDate(),
				value1: '',
				selectTime: 'lastThreeMonths',
				customizepStartTime: {},
				customizepEndTime: {},
				list: [{
						title: '本月',
						time: '',
						id: 'thisMonth',
					},
					{
						title: '近三个月',
						time: '',
						id: 'lastThreeMonths',
					},
					{
						title: '近半年',
						time: '',
						id: 'lastSixMonths',
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

		},

		computed: {
			formatDate() {
				return (date, format) => {
					const year = date.getFullYear();
					const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，所以要加1
					const day = date.getDate().toString().padStart(2, '0');

					if (format === 'yyyy-mm-dd') {
						return `${year}-${month}-${day}`;
					} else if (format === 'yyyy年mm月dd日') {
						return `${year}年${month}月${day}日`;
					}
				}
			},
			getDateRanges() {
				const today = new Date();
				// 本月
				const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
				const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
				// 近三个月
				const firstDayOfThreeMonthsAgo = new Date(today);
				firstDayOfThreeMonthsAgo.setMonth(today.getMonth() - 3);

				// 近半年
				const firstDayOfSixMonthsAgo = new Date(today);
				firstDayOfSixMonthsAgo.setMonth(today.getMonth() - 6);

				// 近一年
				const firstDayOfOneYearAgo = new Date(today);
				firstDayOfOneYearAgo.setFullYear(today.getFullYear() - 1);

				// 输出日期范围
				return {
					thisMonth: {
						start: this.formatDate(firstDayOfMonth, 'yyyy-mm-dd'),
						end: this.formatDate(today, 'yyyy-mm-dd'),
						startCn: this.formatDate(firstDayOfMonth, 'yyyy年mm月dd日'),
						endCn: this.formatDate(today, 'yyyy年mm月dd日'),
						text: '本月'
					},
					lastThreeMonths: {
						start: this.formatDate(firstDayOfThreeMonthsAgo, 'yyyy-mm-dd'),
						end: this.formatDate(today, 'yyyy-mm-dd'), // 结束时间为今天
						startCn: this.formatDate(firstDayOfThreeMonthsAgo, 'yyyy年mm月dd日'),
						endCn: this.formatDate(today, 'yyyy年mm月dd日'), // 结束时间为今天
						text: '近三个月'
					},
					lastSixMonths: {
						start: this.formatDate(firstDayOfSixMonthsAgo, 'yyyy-mm-dd'),
						end: this.formatDate(today, 'yyyy-mm-dd'), // 结束时间为今天
						startCn: this.formatDate(firstDayOfSixMonthsAgo, 'yyyy年mm月dd日'),
						endCn: this.formatDate(today, 'yyyy年mm月dd日'), // 结束时间为今天
						text: '近半年'
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
		created() {
			this.$emit('select', this.getDateRanges[this.selectTime])
		},
		methods: {
			shortcutSelect(item) {
				if (this.selectTime === item.id) return
				this.selectTime = item.id
				this.$emit('select', this.getDateRanges[item.id])
				this.close()
				this.type = ''
			},
			close() {
				this.$emit('close')
			},
			async selectCustomizep(type) {
				let date
				if (type == 1) {
					date = new Date(this.customizepStartTime.start);
					const timestamp = date.getTime();
					this.value1 = timestamp
				} else {
					date = new Date(this.customizepEndTime.end);
					const timestamp = date.getTime();
					this.value1 = timestamp
				}
				await this.$nextTick();
				this.$refs.datetimepicker.init()
				this.type = type
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
			customizepConfirm() {
				let text = this.customizepStartTime.start.replace(/-/g, '') + '-' + this.customizepEndTime.end.replace(
					/-/g, '')
				let obj = {
					...this.customizepEndTime,
					...this.customizepStartTime,
					text: text

				}
				this.$emit('select', obj)
				this.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;
		min-height: 500rpx;

		.title {
			padding: 28rpx 0;
			font-size: 36rpx;
			color: #333333;
			text-align: center;
			border-bottom: 1rpx solid #F7F7F7;
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
				justify-content: space-between;

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
					color: #111;

					&.active {
						color: #ffffff;
						background-color: #666;
					}

				}
			}
		}

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

				.u-picker__view {
					// height: 220rpx !important;

					// .u-picker__view__column__item {
					// 	height: 30rpx !important;
					// }
				}
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
</style>