<template>
	<view>
		<u-popup :show="show" round="16rpx" @close="close">
			<view class="main">
				<view class="title">选择筛选条件</view>
				<view class="filter">
					<view class="filter-title">快捷筛选</view>
					<view class="list">
						<view :class="['item',isValueInArray(item.name)?'active':'']" @click="select(item)"
							v-for="(item,index) in fastList" :key="index">
							{{item.name}}
						</view>
					</view>
					<view class="money-filter">
						<view class="money-filter-item">
							<text>￥</text>
							<input class="money-filter-input" type="number" placeholder-class="placeholder"
								placeholder="最低金额" v-model="minAmount" />
						</view>
						<view class="money-filter-center">
							-
						</view>
						<view class="money-filter-item">
							<text>￥</text>
							<input class="money-filter-input" placeholder-class="placeholder" type="number"
								placeholder="最高金额" v-model="maxAmount" />
						</view>
					</view>
					<view class="filter-title">
						<text>分类</text>
						<image @click="isOpen = !isOpen" :class="['filter-title-icon',isOpen?'cate-icon-ani':'']"
							src="/static/icon/arrow-up.png" mode=""></image>
					</view>
					<view class="sub-title" v-if="!isOpen">
						支出
					</view>
					<view class="list" v-if="!isOpen">
						<view :class="['item',isValueInArray(item.name)?'active':'']" @click="select(item)"
							v-for="(item,index) in spending" :key="index">
							{{item.name}}
						</view>
					</view>
					<view class="sub-title" v-if="!isOpen">
						本人资金往来
					</view>
					<view class="list" v-if="!isOpen">
						<view :class="['item',isValueInArray(item.name)?'active':'']" @click="select(item)"
							v-for="(item,index) in dealings" :key="index">
							{{item.name}}
						</view>
					</view>
				</view>
				<view class="footer">
					<view class="btn" @click="reset">
						重置
					</view>
					<view class="btn complete-btn" @click="complete">
						完成
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "billFilterPop",
		props: {
			show: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				isOpen: false,
				fastList: [{
					name: '全部收入'
				}, {
					name: '全部支出'
				}, {
					name: '薪酬'
				}, {
					name: '他人转入'
				}, {
					name: '转账给他人'
				}, {
					name: '全部往来'
				}],
				spending: [{
					name: '全部支出'
				}, {
					name: '还款'
				}, {
					name: '缴费充值'
				}, {
					name: '餐饮'
				}, {
					name: '出行'
				}, {
					name: '休闲娱乐'
				}],
				dealings: [{
					name: '全部往来'
				}, {
					name: '转账给自己'
				}, {
					name: '还招行信用卡'
				}],
				minAmount: null,
				maxAmount: null,
				valueList: []
			};
		},
		computed: {
			isValueInArray() {
				return (value) => {
					return this.valueList.includes(value);
				};
			},
		},
		methods: {
			close() {
				this.$emit('close')
			},
			reset() {
				this.valueList = []
			},
			complete() {
				let valueStr = this.valueList.join(',')
				this.$emit('complete', valueStr)
				this.close()
			},
			select(item) {
				let array = this.valueList
				const index = array.indexOf(item.name);
				if (index === -1) {
					array.push(item.name);
				} else {
					array.splice(index, 1);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;
		min-height: 600rpx;

		.title {
			padding-top: 30rpx;
			font-size: 36rpx;
			color: #010101;
			text-align: center;
			line-height: 1;
			margin-bottom: 44rpx;
		}

		.footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 130rpx;
			padding: 0 52rpx 30rpx 58rpx;
			font-size: 28rpx;
			color: #010101;

			.complete-btn {
				width: 192rpx;
				height: 73rpx;
				background: #FFFFFF;
				border-radius: 37rpx 37rpx 37rpx 37rpx;
				border: 1rpx solid #010101;
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
			}
		}

		.filter {
			width: 100%;
			padding: 0 28rpx;
			box-sizing: border-box;

			.sub-title {
				color: #8E8E8E;
				font-size: 24rpx;
				line-height: 1;
				margin-top: 47rpx;
			}

			.filter-title {
				color: #010101;
				font-size: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.filter-title-icon {
					width: 50rpx;
					height: 50rpx;
					transition: all 0.3s ease
				}

				.cate-icon-ani {
					transform: rotate(180deg)
				}

			}

			.money-filter {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 78rpx;
				margin-bottom: 64rpx;

				.money-filter-item {
					width: 307rpx;
					height: 70rpx;
					background: #F8F8F8;
					border-radius: 0rpx 0rpx 0rpx 0rpx;
					display: flex;
					align-items: center;
					color: #090909;
					font-size: 24rpx;
					padding: 0 18rpx;
					box-sizing: border-box;

					.placeholder {
						color: #D0D0D0;
					}

					.money-filter-input {
						color: #090909;
						font-size: 24rpx;
						margin-left: 24rpx;
					}
				}

				.money-filter-center {
					color: #939393;
					font-size: 42rpx;
				}
			}

			.list {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin-top: 21rpx;

				.item {
					width: 216rpx;
					height: 67rpx;
					background: #F7F7F7;
					border-radius: 8rpx 8rpx 8rpx 8rpx;
					color: #010101;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 24rpx;

					&.active {
						background-color: #E6EBF5;
						color: #2F6EE5;
					}
				}
			}
		}
	}
</style>