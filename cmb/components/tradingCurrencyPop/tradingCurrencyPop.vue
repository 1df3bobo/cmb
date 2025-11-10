<template>
	<view>
		<u-popup :show="show" round="16rpx" @close="close" closeable>
			<view class="main">
				<view class="title">选择交易币种</view>
				<scroll-view scroll-y class="list">
					<view class="item" @click="change(item)" v-for="(item,index) in list" :key="index">
						<text>{{item}}</text>
						<image v-if="id===item" src="/static/transfer/checked.png" class="icon" mode=""></image>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "tradingCurrencyPop",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			value: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				id: '全部',
				list: ['全部', '人民币CNY', '美元USD', '港币HKD', '澳元AUD', '英镑GBP', '加拿大元CAD', '新加坡元SGD', '新西兰元UZD', '瑞士法郎CHF',
					'其他'
				]
			};
		},
		watch: {
			value(n, o) {
				this.id = n
			}
		},
		methods: {
			change(item) {
				this.id = item
				this.$emit('change', item)
				this.close()
			},
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 750rpx;
		min-height: 600rpx;

		.title {
			padding-top: 28rpx;
			font-size: 34rpx;
			color: #333333;
			text-align: center;
			margin-bottom: 40rpx;
		}

		.list {
			height: 600rpx;
			width: 100%;
			padding: 0 24rpx;
			box-sizing: border-box;

			.item {
				height: 120rpx;
				display: flex;
				font-size: 34rpx;
				color: #333333;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #f8f8f8;

				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>