<template>
	<view>
		<u-popup :show="show" @close="close" zIndex="10" :overlayStyle="{zIndex:10}" round="16rpx" mode="bottom">
			<view class="main">
				<view class="title">
					<image @close="close" class="title-icon" src="/static/icon/greyLeft.png" mode=""></image>
					<text>还款计划</text>
				</view>
				<view class="list">
					<view class="item">
						<image class="item-icon" src="/static/icon/C.png" mode=""></image>
						<text class="content">还他行银行卡</text>
						<text class="btn">去添加</text>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "repaymentPlanPop",
		props: {
			show: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {

			};
		},
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 100%;
		padding-top: 20rpx;
		height: 500rpx;

		.list {
			width: 100%;
			padding: 0 26rpx 0 36rpx;
			box-sizing: border-box;
			margin-top: 70rpx;


			.item {
				display: flex;
				align-items: center;


				.item-icon {
					width: 48rpx;
					height: 48rpx;
					margin-right: 16rpx;
				}

				.content {
					flex: 1;
				}

				.btn {
					width: 120rpx;
					height: 50rpx;
					border-radius: 40rpx;
					border: 1rpx solid #111;
					box-sizing: border-box;
					font-size: 26rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.title {
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			font-size: 36rpx;

			.title-icon {
				width: 18rpx;
				height: 34rpx;
				position: absolute;
				left: 30rpx;

			}
		}

	}
</style>