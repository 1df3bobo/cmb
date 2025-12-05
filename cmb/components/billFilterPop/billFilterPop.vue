<template>
	<view>
		<u-popup :show="show" round="16rpx" @close="close">
			<view class="main">
				<view class="title">选择筛选条件</view>
				<view class="filter">
					<view class="filter-title">快捷筛选</view>
					<view class="list">
						<view :class="['item',isValueInArray(item.name)?'active':'']" @click="select(item,index)"
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
						收入
					</view>
					<view class="list" v-if="!isOpen">
						<view :class="['item',isValueInArray(item.name)?'active':'']" @click="select(item,index)"
							v-for="(item,index) in income" :key="index">
							{{item.name}}
						</view>
						<view class="item" style="background: transparent;"></view>
					</view>
					<view class="sub-title" v-if="!isOpen">
						支出
					</view>
					<view class="list" v-if="!isOpen">
						<view :class="['item',isValueInArray(item.name)?'active':'']" @click="select(item,index)"
							v-for="(item,index) in spending" :key="index">
							{{item.name}}
						</view>
					</view>
					<view class="sub-title" v-if="!isOpen">
						本人资金往来
					</view>
					<view class="list" v-if="!isOpen">
						<view :class="['item',isValueInArray(item.name)?'active':'']" @click="select(item,index)"
							v-for="(item,index) in dealings" :key="index">
							{{item.name}}
						</view>
						<view class="item" style="background: transparent;"></view>
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
				income: [{
					name: '全部收入'
				}, {
					name: '红包'
				}],
				spending: [{
					name: '全部支出'
				}, {
					name: '转账给他人'
				}, {
					name: '餐饮'
				}, {
					name: '其他支出'
				}],
				dealings: [{
					name: '全部往来'
				}, {
					name: '转账给自己'
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
			removeCommonElements(arr1, arr2) {
				return (arr1, arr2, key) => {
					// 遍历数组一，从末尾开始遍历（避免删除时影响索引）
					for (let i = arr1.length - 1; i >= 0; i--) {
						// 判断数组一中的字符串是否存在于数组二的对象属性中
						if (arr2.some(obj => obj[key] === arr1[i])) {
							// 如果有相同的值，就移除数组一中的该元素
							arr1.splice(i, 1);
						}
					}
					return arr1;
				}
			}
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
				this.$emit('complete', {
					valueStr: valueStr,
					minAmount: this.minAmount,
					maxAmount: this.maxAmount,
				})
				this.close()
			},
			select(item, location) {
				let array = this.valueList
				const index = array.indexOf(item.name);
				if (index === -1) {
					if (item.name === '全部支出') {
						array = this.removeCommonElements(array, this.spending, 'name')
					}
					if (array.includes('全部支出')) {
						if (location > 0) {
							let i = array.indexOf('全部支出');
							if (i !== -1) {
								array.splice(i, 1); // 从索引位置移除 1 个元素
							}
						}
					}
					if (item.name === '全部往来') {
						array = this.removeCommonElements(array, this.dealings, 'name')
					}
					if (array.includes('全部往来')) {
						if (location > 0) {
							let i = array.indexOf('全部往来');
							if (i !== -1) {
								array.splice(i, 1); // 从索引位置移除 1 个元素
							}
						}
					}
					if (item.name === '全部收入') {
						array = this.removeCommonElements(array, this.income, 'name')
					}
					if (array.includes('全部收入')) {
						if (location > 0) {
							let i = array.indexOf('全部收入');
							if (i !== -1) {
								array.splice(i, 1); // 从索引位置移除 1 个元素
							}
						}
					}
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
			margin-top: 30rpx;
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
			max-height: calc(100vh * 0.7);
			overflow-y: auto;

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