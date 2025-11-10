<template>
	<view>
		<u-popup :show="show" @close="close" zIndex="10" :overlayStyle="{zIndex:10}" round="8rpx" mode="center"
			closeable>
			<view class="main">
				<view class="info">
					<view class="title">卡号信息</view>
					<view class="content">
						<view class="label">户名：</view>
						<view>{{userInfo.realName}}</view>
					</view>
					<view class="content">
						<view class="label">卡号：</view>
						<view>{{bankInfo.bankCard}}</view>
					</view>
					<view class="content">
						<view class="label">开户行：</view>
						<view>{{bankInfo.branchBelongs}}</view>
					</view>
				</view>
				<view class="footer">
					<view class="btn" @click="copyAll">复制全部</view>
					<view class="btn active" @click="copy">仅复制卡号</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		name: "bankCardInfoPop",
		props: {
			show: {
				type: Boolean,
				default: false,
			},
		},
		computed: {
			...mapState(['userInfo', 'statusBarHeight']),
			bankInfo() {
				if (this.userInfo.bankList.lengtn <= 0) return {}
				return this.userInfo.bankList[0]
			},
		},
		data() {
			return {

			};
		},
		methods: {
			close() {
				this.$emit('close')
			},
			copy() {
				uni.setClipboardData({
					data: this.bankInfo.bankCard,
					complete: () => {
						this.close()
					}
				});
			},
			copyAll() {
				let content =
					`户名：${this.bankInfo.realName}\n卡号：${this.bankInfo.bankCard}\n开户行：${this.bankInfo.branchBelongs}`
				uni.setClipboardData({
					data: content,
					complete: () => {
						this.close()
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		width: 690rpx;

		.info {
			color: #666;
			padding: 50rpx 30rpx 30rpx;
			;
			box-sizing: border-box;

			.title {
				margin-bottom: 20rpx;
			}

			.content {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
			}
		}

		.footer {
			width: 100%;
			height: 110rpx;
			border-top: 1rpx solid #F1f1f1;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #999999;

			.btn {
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.active {
				color: #73A5F1;
			}
		}
	}
</style>