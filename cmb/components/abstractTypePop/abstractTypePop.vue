<template>
	<view>
		<u-popup :show="show" round="16rpx" @close="close" closeable>
			<view class="main">
				<view class="title">选择摘要类型</view>
				<scroll-view scroll-y class="list">
					<view class="item" @click="change(item)" v-for="(item,index) in list" :key="index">
						<view class="content">
							<view>{{item.title}}</view>
							<view class="text">{{item.subTile}}</view>
						</view>
						<image v-if="id===item.title" src="/static/transfer/checked.png" class="icon" mode=""></image>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "abstractTypePop",
		props: {
			show: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				id: '交易摘要',
				list: [{
					title: '全部',
					subTile: '包含交易摘要和客户摘要',
				}, {
					title: '交易摘要',
					subTile: '为银行定义的交易摘要，可以清晰了解交易性质',
				}, {
					title: '客户摘要',
					subTile: '为客户定义的交易摘要，如转账时输入的转账附言',
				}]
			};
		},
		methods: {
			change(item) {
				this.id = item
				this.$emit('change', item.title)
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
				height: 156rpx;
				display: flex;
				font-size: 34rpx;
				color: #333333;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #f8f8f8;

				.text {
					color: #999;
					font-size: 24rpx;
					margin-top: 16rpx;
				}

				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>